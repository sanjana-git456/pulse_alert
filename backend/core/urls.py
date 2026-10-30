from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, MeView, AlertViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'alerts', AlertViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/me/', MeView.as_view()),
    path('', include(router.urls)),
]