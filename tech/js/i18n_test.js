    i18n
        .init({
            lng: 'en', // Начальный язык
            resources: {
                en: {
                    translation: {
                        "hello": "Hello",
                        "welcome": "Welcome to my site"
                    }
                },
                ru: {
                    translation: {
                        "hello": "Привет",
                        "welcome": "Добро пожаловать на мой сайт"
                    }
                }
            }
        })
        .then(() => {
            document.getElementById('greeting').textContent = i18n.t('hello');
            document.getElementById('welcome').textContent = i18n.t('welcome');
        });