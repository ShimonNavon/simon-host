from django.db import models


class ClickEvent(models.Model):
    """One outbound click — today only the WhatsApp buttons.

    The site has no form funnel: every CTA is a WhatsApp deep link. This
    row is the only trace a click leaves, so it carries where on the site
    it happened (``page`` + ``campaign``), how the visitor arrived
    (``utm_*``, captured once per session by the frontend) and the
    referrer's host. Everything is bounded and anonymous — no IP, no
    user agent, no cookie.
    """

    KIND_CHOICES = [("whatsapp", "וואטסאפ")]

    kind = models.CharField("סוג", max_length=20, choices=KIND_CHOICES, default="whatsapp")
    page = models.CharField("עמוד", max_length=120)
    campaign = models.CharField("קמפיין", max_length=80, blank=True)
    utm_source = models.CharField("utm_source", max_length=80, blank=True)
    utm_medium = models.CharField("utm_medium", max_length=80, blank=True)
    utm_campaign = models.CharField("utm_campaign", max_length=80, blank=True)
    referrer = models.CharField("מפנה (דומיין)", max_length=120, blank=True)
    created_at = models.DateTimeField("בתאריך", auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "קליק"
        verbose_name_plural = "קליקים"

    def __str__(self):
        return f"{self.kind} {self.page} {self.campaign}".strip()
