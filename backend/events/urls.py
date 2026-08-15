from django.urls import path

from .views import ClickEventCreateView

urlpatterns = [
    path("events/", ClickEventCreateView.as_view(), name="event-create"),
]
