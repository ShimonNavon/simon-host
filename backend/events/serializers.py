from urllib.parse import urlsplit

from rest_framework import serializers

from .models import ClickEvent

REFERRER_MAX = ClickEvent._meta.get_field("referrer").max_length


def referrer_host(value: str) -> str:
    """Reduce a full referrer URL to its host — that's all we keep."""
    try:
        host = urlsplit(value.strip()).hostname or ""
    except ValueError:
        return ""
    return host[:REFERRER_MAX]


class ClickEventSerializer(serializers.ModelSerializer):
    # Accept a full URL from the browser but store only its host.
    referrer = serializers.CharField(max_length=2048, required=False, allow_blank=True)

    class Meta:
        model = ClickEvent
        fields = [
            "kind",
            "page",
            "campaign",
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "referrer",
        ]
        extra_kwargs = {"kind": {"required": True}}

    def validate_page(self, value):
        # Same-site path only, never an arbitrary URL.
        if not value.startswith("/") or "//" in value:
            raise serializers.ValidationError("page must be a site path")
        return value

    def validate_referrer(self, value):
        return referrer_host(value)
