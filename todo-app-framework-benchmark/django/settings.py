import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SECRET_KEY = 'django-insecure-change-in-production'

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'todos',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'todos.db'),
    }
}

DEBUG = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

USE_TZ = False
