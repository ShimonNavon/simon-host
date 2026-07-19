from django.contrib import admin

from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "email", "message", "created_at", "handled")
    list_filter = ("handled", "created_at")
    list_editable = ("handled",)
    search_fields = ("name", "phone", "email", "message")
    readonly_fields = ("created_at",)
    date_hierarchy = "created_at"
