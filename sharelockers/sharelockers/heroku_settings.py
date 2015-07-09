from .settings import *
import os

SECRET_KEY = os.environ['SECRET_KEY']
DEBUG = False

APP_BLACKLIST = ['debug_toolbar', 'django_extensions']
INSTALLED_APPS = tuple([app for app in INSTALLED_APPS
                        if app not in APP_BLACKLIST])

# Parse database configuration from $DATABASE_URL
import dj_database_url
DATABASES['default'] =  dj_database_url.config()

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers
ALLOWED_HOSTS = ['*']

# Static asset configuration
STATIC_ROOT = 'staticfiles'
