from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("leads.urls")),
    path("api/domains/", include("domains.urls")),
    path("api/", include("events.urls")),
]

admin.site.site_header = "Simon Host — ניהול"
admin.site.site_title = "Simon Host"
admin.site.index_title = "לוח בקרה"
