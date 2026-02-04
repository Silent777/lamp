(function () {
    'use strict';

    function startPlugin() {
        // 1. Створюємо логіку того, що буде всередині сторінки
        Lampa.Component.add('my_plugin', function (object) {
            var comp = new Lampa.Interaction();

            this.create = function () {
                // Створюємо простий блок з текстом
                this.dom = $('<div><h1 style="text-align:center; margin-top:100px;">Слава Україні! 🇺🇦</h1><p style="text-align:center;">Ваш плагін успішно працює.</p></div>');
                return this.dom;
            };

            this.render = function () {
                return this.create();
            };

            this.terminate = function () {
                this.dom.remove();
            };
        });

        // 2. Додаємо пункт у меню з параметрами відображення
        Lampa.Menu.add({
            id: 'my_plugin_menu',
            title: 'Мій UA Контент',
            icon: `<svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" fill="white"/></svg>`,
            onSelect: function () {
                Lampa.Activity.push({
                    url: '',
                    title: 'Мій UA Контент',
                    component: 'my_plugin', // назва компонента, який ми створили вище
                    page: 1
                });
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