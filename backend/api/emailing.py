from pathlib import Path
from string import Template

import requests
from django.conf import settings
from django.core.mail import EmailMultiAlternatives


EMAIL_DIR = Path(settings.BASE_DIR).parent / "emails"


def render_email(template_name: str, context: dict) -> str:
    template = Template((EMAIL_DIR / template_name).read_text(encoding="utf-8"))
    return template.safe_substitute(context)


def send_email(subject: str, to_email: str, html: str, text: str = "") -> None:
    if settings.RESEND_API_KEY:
        requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": settings.DEFAULT_FROM_EMAIL,
                "to": [to_email],
                "subject": subject,
                "html": html,
                "text": text or subject,
            },
            timeout=10,
        )
        return

    message = EmailMultiAlternatives(subject=subject, body=text or subject, to=[to_email])
    message.attach_alternative(html, "text/html")
    message.send(fail_silently=True)
