from django.urls import path, include
from .views import MessagesView, UsersView, IdenteficateUserView
from django.conf import settings

urlpatterns = [
    path("check/", IdenteficateUserView.as_view(), name="check"),
    path("users/", UsersView.as_view(), name="get_users"),
    path("messages/", MessagesView.as_view(), name="get_messages"),
    # path("products/", get_products, name="get_products"),
    # path("reviews/", get_reviews, name="get_reviews"),
]