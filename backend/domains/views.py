from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .checker import check_domains
from .validation import InvalidQuery, parse_query


class DomainThrottle(AnonRateThrottle):
    scope = "domains"


class DomainCheckView(APIView):
    throttle_classes = [DomainThrottle]

    def get(self, request):
        raw = request.query_params.get("q", "")
        try:
            domains = parse_query(raw)
        except InvalidQuery:
            return Response({"error": "invalid"}, status=400)
        return Response({"results": check_domains(domains)})
