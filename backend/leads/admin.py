from django.contrib import admin

from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    """The CRM. Stage and source are edited inline in the list view."""

    list_display = (
        "name",
        "company",
        "phone",
        "email",
        "source",
        "stage",
        "created_at",
        "handled",
    )
    list_filter = ("stage", "source", "handled", "created_at")
    list_editable = ("stage", "source", "handled")
    search_fields = ("name", "company", "phone", "email", "message", "notes")
    readonly_fields = ("created_at",)
    date_hierarchy = "created_at"
    fieldsets = (
        (None, {"fields": ("name", "company", "phone", "email", "message")}),
        ("CRM", {"fields": ("source", "stage", "notes", "handled", "created_at")}),
    )
