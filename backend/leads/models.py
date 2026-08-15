from django.db import models


class Lead(models.Model):
    """A prospect — and the row that *is* the CRM.

    There is no separate CRM tool: the Django admin for this model is the
    pipeline. Leads arrive from the site's signup form (``source=site``) or
    are typed in by hand after a WhatsApp chat, a warm intro or outreach,
    and move through ``stage`` from *new* to *won*/*lost* by editing the
    list view inline.
    """

    SOURCE_CHOICES = [
        ("site", "אתר"),
        ("whatsapp", "וואטסאפ"),
        ("warm", "היכרות"),
        ("cold-email", "מייל קר"),
        ("linkedin", "לינקדאין"),
        ("referral", "הפניה"),
        ("other", "אחר"),
    ]
    STAGE_CHOICES = [
        ("new", "חדש"),
        ("contacted", "יצרתי קשר"),
        ("audit-sent", "נשלח אבחון"),
        ("plan-sent", "נשלחה הצעה"),
        ("migrating", "בהעברה"),
        ("won", "נסגר"),
        ("lost", "אבד"),
    ]

    name = models.CharField("שם", max_length=120)
    phone = models.CharField("טלפון", max_length=30)
    email = models.EmailField("אימייל", blank=True)
    company = models.CharField("עסק", max_length=120, blank=True)
    message = models.TextField("הודעה", blank=True)
    source = models.CharField("מקור", max_length=20, choices=SOURCE_CHOICES, default="site")
    stage = models.CharField("שלב", max_length=20, choices=STAGE_CHOICES, default="new")
    notes = models.TextField("הערות", blank=True)
    created_at = models.DateTimeField("התקבל בתאריך", auto_now_add=True)
    handled = models.BooleanField("טופל", default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "ליד"
        verbose_name_plural = "לידים"

    def __str__(self):
        return f"{self.name} ({self.phone})"
