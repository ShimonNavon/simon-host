from rest_framework.generics import CreateAPIView
from rest_framework.throttling import AnonRateThrottle

from .models import Lead
from .serializers import LeadSerializer


class LeadThrottle(AnonRateThrottle):
    scope = "leads"


class LeadCreateView(CreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    throttle_classes = [LeadThrottle]
