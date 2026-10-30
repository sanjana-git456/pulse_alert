from django.contrib import admin
from .models import User, Alert, MicroReview

admin.site.register(User)
admin.site.register(Alert)
admin.site.register(MicroReview)