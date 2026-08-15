from django.contrib import admin

from .models import ClickEvent


@admin.register(ClickEvent)
class ClickEventAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "kind",
        "page",
        "campaign",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "referrer",
    )
    list_filter = ("page", "utm_source", "campaign", "created_at")
    search_fields = ("page", "campaign", "utm_source", "utm_medium", "utm_campaign", "referrer")
    readonly_fields = [f.name for f in ClickEvent._meta.fields]
    date_hierarchy = "created_at"

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False
