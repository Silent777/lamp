(function () {
    'use strict';

    function startPlugin() {
        // 1. Створюємо компонент сторінки
        Lampa.Component.add('my_plugin', function (object) {
            var comp = new Lampa.Interaction();
            this.create = function () {
                this.dom = $('<div><h1 style="text-align:center; margin-top:100px;">UA Plugin v4</h1><p style="text-align:center;">Метод Lampa.Listener спрацював!</p></div>');
                return this.dom;
            };
            this.render = function () { return this.create(); };
            this.terminate = function () { this.dom.remove(); };
        });

        // 2. Додаємо пункт через слухач подій (це надійніше за прямий виклик)
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                var menu_item = $('<li class="menu__item selector" data-action="my_plugin_action">' +
                    '<div class="menu__ico">' +
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line></svg>' +
                    '</div>' +
                    '<div class="menu__title">Мій UA Контент</div>' +
                '</li>');

                menu_item.on('hover:enter', function () {
                    Lampa.Activity.push({
                        url: '',
                        title: 'Мій UA Контент',
                        component: 'my_plugin',
                        page: 1
                    });
                });

                // Додаємо в кінець списку меню
                $('.menu .menu__list').append(menu_item);
            }
        });
    }

    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();