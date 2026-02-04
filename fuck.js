(function () {
    'use strict';

    function startPlugin() {
        // Додаємо пункт у головне меню
        Lampa.Component.add('my_plugin', function (object) {
            // Тут логіка вашого компонента
        });

        // Додаємо кнопку в бічне меню
        Lampa.Menu.add({
            id: 'my_plugin_menu',
            title: 'Мій UA Контент',
            icon: '<svg>...</svg>', // Ваш іконка
            onSelect: function () {
                Lampa.Activity.push({
                    url: '',
                    title: 'Мій UA Контент',
                    component: 'my_plugin',
                    page: 1
                });
            }
        });
    }

    // Чекаємо, поки Lampa завантажиться
    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();