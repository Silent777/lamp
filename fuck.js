(function () {
    'use strict';

    function startPlugin() {
        // 1. Створюємо компонент (те, що відкриється при натисканні)
        Lampa.Component.add('my_plugin', function (object) {
            var network = new Lampa.Reguest(); // Для майбутніх запитів
            var scroll  = new Lampa.Scroll({mask:true,over:true});
            var items   = [];
            var html    = $('<div></div>');

            this.create = function () {
                var container = $('<div class="category-full"></div>');
                var text = $('<div style="padding: 20px; text-align: center;"><h1>Слава Україні! 🇺🇦</h1><p>Ваш плагін активовано.</p></div>');
                
                container.append(text);
                html.append(scroll.render());
                scroll.append(container);
                
                return html;
            };

            this.render = function () {
                return this.create();
            };

            this.terminate = function () {};
        });

        // 2. Додаємо в меню з чітким вказанням місця
        Lampa.Menu.add({
            id: 'my_ua_plugin',
            title: 'Мій UA Контент',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="white"/></svg>',
            onSelect: function () {
                Lampa.Activity.push({
                    url: '',
                    title: 'Мій UA Контент',
                    component: 'my_plugin',
                    page: 1
                });
            }
        }, 'animes'); // Ми кажемо Лампі поставити ваш пункт ПІСЛЯ розділу "Аніме"
    }

    // Очікування готовності системи
    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();