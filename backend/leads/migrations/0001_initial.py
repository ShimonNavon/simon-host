from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Lead",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120, verbose_name="שם")),
                ("phone", models.CharField(max_length=30, verbose_name="טלפון")),
                ("email", models.EmailField(blank=True, max_length=254, verbose_name="אימייל")),
                ("message", models.TextField(blank=True, verbose_name="הודעה")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="התקבל בתאריך")),
                ("handled", models.BooleanField(default=False, verbose_name="טופל")),
            ],
            options={
                "verbose_name": "ליד",
                "verbose_name_plural": "לידים",
                "ordering": ["-created_at"],
            },
        ),
    ]
