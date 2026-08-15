from django.urls import path

from .views import DomainCheckView

urlpatterns = [
    path("check/", DomainCheckView.as_view(), name="domain-check"),
]
