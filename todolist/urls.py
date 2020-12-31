from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path('task-list/', views.taskList),
    path('task-detail/<str:pk>/', views.taskDetail),
    path('task-create/', views.createTask),
    path('task-update/<str:pk>/', views.updateTask),
    path('task-delete/<str:pk>/', views.deleteTask),
]