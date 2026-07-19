from django.db import models


class Lead(models.Model):
    name = models.CharField("שם", max_length=120)
    phone = models.CharField("טלפון", max_length=30)
    email = models.EmailField("אימייל", blank=True)
    message = models.TextField("הודעה", blank=True)
    created_at = models.DateTimeField("התקבל בתאריך", auto_now_add=True)
    handled = models.BooleanField("טופל", default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "ליד"
        verbose_name_plural = "לידים"

    def __str__(self):
        return f"{self.name} ({self.phone})"
