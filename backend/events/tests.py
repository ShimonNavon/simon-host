from unittest.mock import patch

from django.core.cache import cache
from django.test import TestCase

from .models import ClickEvent
from .serializers import referrer_host
from .views import EventThrottle


class ReferrerHostTests(TestCase):
    def test_keeps_host_only(self):
        self.assertEqual(referrer_host("https://www.google.com/search?q=x"), "www.google.com")

    def test_garbage_or_empty_becomes_blank(self):
        self.assertEqual(referrer_host(""), "")
        self.assertEqual(referrer_host("not a url"), "")

    def test_bounded(self):
        self.assertLessEqual(len(referrer_host("https://" + "a" * 500 + ".com/")), 120)


class ClickEventCreateTests(TestCase):
    url = "/api/events/"

    def setUp(self):
        cache.clear()

    def test_creates_whatsapp_click(self):
        response = self.client.post(
            self.url,
            {
                "kind": "whatsapp",
                "page": "/wordpress",
                "campaign": "wordpress-hero",
                "utm_source": "facebook",
                "utm_medium": "cpc",
                "utm_campaign": "aug-launch",
                "referrer": "https://l.facebook.com/l.php?u=x",
            },
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201, response.content)
        event = ClickEvent.objects.get()
        self.assertEqual(event.kind, "whatsapp")
        self.assertEqual(event.page, "/wordpress")
        self.assertEqual(event.campaign, "wordpress-hero")
        self.assertEqual(event.utm_source, "facebook")
        self.assertEqual(event.referrer, "l.facebook.com")

    def test_minimal_payload_is_enough(self):
        response = self.client.post(
            self.url, {"kind": "whatsapp", "page": "/"}, content_type="application/json"
        )
        self.assertEqual(response.status_code, 201, response.content)

    def test_garbage_is_400(self):
        for payload in [
            {},
            {"kind": "signup", "page": "/"},
            {"kind": "whatsapp", "page": "x" * 121},
            {"kind": "whatsapp", "page": "/", "campaign": "c" * 81},
            {"kind": "whatsapp", "page": "https://evil.example/steal"},
        ]:
            response = self.client.post(self.url, payload, content_type="application/json")
            self.assertEqual(response.status_code, 400, payload)
        self.assertEqual(ClickEvent.objects.count(), 0)

    def test_text_plain_beacon_body_is_accepted(self):
        # navigator.sendBeacon with a string body sends text/plain.
        response = self.client.post(
            self.url, '{"kind": "whatsapp", "page": "/apps"}', content_type="text/plain"
        )
        self.assertEqual(response.status_code, 201, response.content)

    def test_get_is_not_allowed(self):
        self.assertEqual(self.client.get(self.url).status_code, 405)

    def test_throttled(self):
        with patch.object(EventThrottle, "THROTTLE_RATES", {"events": "2/hour"}):
            for _ in range(2):
                self.client.post(
                    self.url, {"kind": "whatsapp", "page": "/"}, content_type="application/json"
                )
            response = self.client.post(
                self.url, {"kind": "whatsapp", "page": "/"}, content_type="application/json"
            )
        self.assertEqual(response.status_code, 429)
