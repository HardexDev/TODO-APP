from django.db import models

# Create your models here.

class Task(models.Model):
    name = models.TextField(max_length=50)
    done = models.BooleanField(default=False)


