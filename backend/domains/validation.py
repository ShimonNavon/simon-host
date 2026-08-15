"""Bounded, abuse-resistant parsing of what a visitor types into the
domain search. Hebrew is welcome (IDNA-encoded); everything else is
validated hard before any network lookup happens."""

import re

from .checker import EXPANSION_TLDS

MAX_QUERY_LENGTH = 100
LABEL_RE = re.compile(r"^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$")


class InvalidQuery(ValueError):
    pass


def _to_ascii(text: str) -> str:
    try:
        return text.encode("idna").decode("ascii")
    except UnicodeError as error:
        raise InvalidQuery("שם לא תקין") from error


def parse_query(raw: str) -> list[str]:
    """Turn user input into 1–4 validated ASCII domains to check.

    "mybusiness.com" checks exactly that domain; a bare "mybusiness"
    (or Hebrew name) fans out across EXPANSION_TLDS.
    """
    query = raw.strip().lower()
    query = re.sub(r"^https?://", "", query).rstrip("/").removeprefix("www.")
    if not query or len(query) > MAX_QUERY_LENGTH:
        raise InvalidQuery("שם לא תקין")
    if any(ch.isspace() for ch in query):
        raise InvalidQuery("שם לא תקין")

    if "." in query:
        domains = [query]
    else:
        domains = [f"{query}.{tld}" for tld in EXPANSION_TLDS]

    ascii_domains = []
    for domain in domains:
        raw_labels = domain.rstrip(".").split(".")
        if any(not label for label in raw_labels):
            raise InvalidQuery("שם לא תקין")
        ascii_domain = ".".join(_to_ascii(label) for label in raw_labels)
        labels = ascii_domain.split(".")
        if len(labels) < 2 or len(ascii_domain) > 253:
            raise InvalidQuery("שם לא תקין")
        if not all(LABEL_RE.match(label) for label in labels):
            raise InvalidQuery("שם לא תקין")
        if not labels[-1].isalpha() or len(labels[-1]) < 2:
            raise InvalidQuery("שם לא תקין")
        ascii_domains.append(ascii_domain)
    return ascii_domains
