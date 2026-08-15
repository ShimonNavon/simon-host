from django.contrib.admin.sites import site
from django.test import TestCase

from .admin import LeadAdmin
from .models import Lead


class LeadCrmFieldsTests(TestCase):
    def test_defaults_are_site_and_new(self):
        lead = Lead.objects.create(name="דנה", phone="0501234567")
        self.assertEqual(lead.source, "site")
        self.assertEqual(lead.stage, "new")
        self.assertEqual(lead.company, "")
        self.assertEqual(lead.notes, "")

    def test_choices_cover_the_pipeline(self):
        stages = [value for value, _ in Lead.STAGE_CHOICES]
        self.assertEqual(
            stages, ["new", "contacted", "audit-sent", "plan-sent", "migrating", "won", "lost"]
        )
        sources = [value for value, _ in Lead.SOURCE_CHOICES]
        self.assertEqual(
            sources, ["site", "whatsapp", "warm", "cold-email", "linkedin", "referral", "other"]
        )

    def test_admin_is_the_crm(self):
        admin = LeadAdmin(Lead, site)
        self.assertIn("stage", admin.list_editable)
        self.assertIn("source", admin.list_editable)
        self.assertIn("stage", admin.list_filter)
        self.assertIn("source", admin.list_filter)
        self.assertIn("company", admin.search_fields)


class LeadApiTests(TestCase):
    def test_public_api_cannot_set_crm_fields(self):
        response = self.client.post(
            "/api/leads/",
            {"name": "דנה", "phone": "0501234567", "stage": "won", "source": "referral"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201, response.content)
        lead = Lead.objects.get()
        self.assertEqual(lead.stage, "new")
        self.assertEqual(lead.source, "site")
