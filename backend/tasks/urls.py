from django.urls import path, include
from rest_framework import routers
from tasks import views

# api versioning

router = routers.DefaultRouter()
router.register(r'carreras', views.CarreraView)


urlpatterns = [
    path("api/v1/", include(router.urls))
]











