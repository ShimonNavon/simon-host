from unittest.mock import patch

from django.core.cache import cache
from django.test import TestCase

from .checker import AVAILABLE, TAKEN, UNKNOWN, check_domain
from .validation import InvalidQuery, parse_query


class ParseQueryTests(TestCase):
    def test_exact_domain_checks_only_itself(self):
        self.assertEqual(parse_query("MyBusiness.com"), ["mybusiness.com"])

    def test_bare_name_fans_out(self):
        self.assertEqual(
            parse_query("mybusiness"),
            ["mybusiness.co.il", "mybusiness.com", "mybusiness.net", "mybusiness.io"],
        )

    def test_hebrew_is_idna_encoded(self):
        domains = parse_query("שלום")
        self.assertEqual(domains[0], "xn--9dbne9b.co.il")

    def test_url_paste_is_cleaned(self):
        self.assertEqual(parse_query("https://www.example.co.il/"), ["example.co.il"])

    def test_garbage_is_rejected(self):
        for bad in ["", " ", "a b.com", "-x.com", "x" * 101, "x..com", "x.c", "x.123"]:
            with self.assertRaises(InvalidQuery, msg=bad):
                parse_query(bad)


class CheckDomainTests(TestCase):
    def setUp(self):
        cache.clear()

    @patch("domains.checker._check_il", return_value=AVAILABLE)
    def test_il_uses_isoc_whois(self, mock_il):
        self.assertEqual(check_domain("free-name.co.il"), AVAILABLE)
        mock_il.assert_called_once_with("free-name.co.il")

    @patch("domains.checker._check_rdap", return_value=TAKEN)
    def test_allowlisted_tld_uses_rdap(self, mock_rdap):
        self.assertEqual(check_domain("example.com"), TAKEN)
        mock_rdap.assert_called_once_with("example.com")

    def test_unsupported_tld_is_unknown(self):
        self.assertEqual(check_domain("example.zz"), UNKNOWN)

    @patch("domains.checker._check_rdap", return_value=AVAILABLE)
    def test_results_are_cached(self, mock_rdap):
        check_domain("cache-me.com")
        check_domain("cache-me.com")
        mock_rdap.assert_called_once()


class DomainCheckViewTests(TestCase):
    def test_invalid_query_is_400(self):
        response = self.client.get("/api/domains/check/", {"q": "not a domain"})
        self.assertEqual(response.status_code, 400)

    @patch("domains.views.check_domains")
    def test_valid_query_returns_results(self, mock_check):
        mock_check.return_value = [{"domain": "x.com", "status": AVAILABLE}]
        response = self.client.get("/api/domains/check/", {"q": "x.com"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["results"][0]["status"], AVAILABLE)
