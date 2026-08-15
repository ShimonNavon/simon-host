import json

from rest_framework.exceptions import ParseError
from rest_framework.generics import CreateAPIView
from rest_framework.parsers import BaseParser, JSONParser
from rest_framework.throttling import AnonRateThrottle

from .models import ClickEvent
from .serializers import ClickEventSerializer


class EventThrottle(AnonRateThrottle):
    scope = "events"


class PlainTextJSONParser(BaseParser):
    """navigator.sendBeacon(url, string) posts as text/plain — still JSON."""

    media_type = "text/plain"

    def parse(self, stream, media_type=None, parser_context=None):
        try:
            return json.loads(stream.read(4096).decode("utf-8"))
        except (ValueError, UnicodeDecodeError) as error:
            raise ParseError("invalid json") from error


class ClickEventCreateView(CreateAPIView):
    queryset = ClickEvent.objects.all()
    serializer_class = ClickEventSerializer
    throttle_classes = [EventThrottle]
    parser_classes = [JSONParser, PlainTextJSONParser]
    authentication_classes = []  # anonymous, no CSRF/session dance for a beacon
    permission_classes = []
