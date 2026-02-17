from django.urls import path
from .views import log_interaction # We will create this view next

urlpatterns = [
    path('logs/', log_interaction), 
]