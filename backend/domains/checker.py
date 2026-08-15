"""Domain availability lookups for the site's search bar.

Two authoritative sources, chosen per TLD:

- ``.il`` domains: the ISOC-IL whois server (port 43). An unregistered
  domain answers "No data was found".
- A fixed allowlist of global TLDs: RDAP via rdap.org, which redirects to
  the registry's endpoint. HTTP 404 means unregistered.

Anything else is reported as "unknown" rather than guessed — a wrong
"available" here would send someone to WhatsApp excited about a domain
that is taken.
"""

import socket
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from django.core.cache import cache

TIMEOUT_SECONDS = 4
CACHE_SECONDS = 600

ISOC_WHOIS_HOST = "whois.isoc.org.il"

RDAP_TLDS = {
    "com", "net", "org", "io", "co", "me", "info", "biz",
    "app", "dev", "online", "shop", "site", "xyz",
}

# What a bare name (no dot) expands to, in display order.
EXPANSION_TLDS = ("co.il", "com", "net", "io")

AVAILABLE = "available"
TAKEN = "taken"
UNKNOWN = "unknown"


def _check_il(domain: str) -> str:
    try:
        with socket.create_connection((ISOC_WHOIS_HOST, 43), timeout=TIMEOUT_SECONDS) as sock:
            sock.settimeout(TIMEOUT_SECONDS)
            sock.sendall(domain.encode("ascii") + b"\r\n")
            chunks = []
            while True:
                data = sock.recv(4096)
                if not data:
                    break
                chunks.append(data)
        reply = b"".join(chunks).decode("utf-8", errors="replace").lower()
    except OSError:
        return UNKNOWN
    if "no data was found" in reply:
        return AVAILABLE
    if "domain:" in reply or "descr:" in reply:
        return TAKEN
    return UNKNOWN


def _check_rdap(domain: str) -> str:
    request = urllib.request.Request(
        f"https://rdap.org/domain/{domain}",
        headers={"User-Agent": "simon-host-domain-search"},
    )
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT_SECONDS):
            return TAKEN
    except urllib.error.HTTPError as error:
        return AVAILABLE if error.code == 404 else UNKNOWN
    except OSError:
        return UNKNOWN


def check_domain(domain: str) -> str:
    """Return "available" | "taken" | "unknown" for one ASCII domain."""
    cached = cache.get(f"domain-status:{domain}")
    if cached is not None:
        return cached

    if domain.endswith(".il"):
        status = _check_il(domain)
    elif domain.rsplit(".", 1)[-1] in RDAP_TLDS:
        status = _check_rdap(domain)
    else:
        status = UNKNOWN

    if status != UNKNOWN:
        cache.set(f"domain-status:{domain}", status, CACHE_SECONDS)
    return status


def check_domains(domains: list[str]) -> list[dict]:
    with ThreadPoolExecutor(max_workers=len(domains)) as pool:
        statuses = list(pool.map(check_domain, domains))
    return [
        {"domain": domain, "status": status}
        for domain, status in zip(domains, statuses)
    ]
