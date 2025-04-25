docker exec -it psg psql -U postgres


permissions_by_role = {
    "superadmin": [
        "manage_users", "manage_admins", "manage_orders", "manage_products",
        "manage_categories", "manage_roles", "view_logs", "edit_logs",
        "manage_discounts", "platform_settings", "delete_anything"
    ],
    "admin": [
        "manage_users", "manage_orders", "manage_products", "manage_categories",
        "view_analytics", "manage_discounts", "reply_reviews"
    ],
    "moderator": [
        "moderate_reviews", "edit_products", "view_orders", "view_users", "reply_messages"
    ],
    "support": [
        "view_orders", "view_users", "reply_messages"
    ]
}
