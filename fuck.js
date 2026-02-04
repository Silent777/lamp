(function () {
    'use strict';

    function startPlugin() {
        // Реєструємо компонент
        Lampa.Component.add('my_plugin', function (object) {
            var comp = new Lampa.Interaction();
            this.create = function () {
                this.dom = $('<div><h1 style="text-align:center; margin-top:100px;">UA Plugin v3</h1><p style="text-align:center;">Якщо ви це бачите — ви перемогли кеш!</p></div>');
                return this.dom;
            };
            this.render = function () { return this.create(); };
            this.terminate = function () { this.dom.remove(); };
        });

        // Додаємо в меню через невелику паузу
        setTimeout(function(){
            Lampa.Menu.add({
                id: 'my_ua_plugin',
                title: 'Мій UA Контент',
                icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>',
                onSelect: function () {
                    Lampa.Activity.push({
                        url: '',
                        title: 'Мій UA Контент',
                        component: 'my_plugin',
                        page: 1
                    });
                }
            });
        }, 100); 
    }

    // Більш надійний спосіб перевірки готовності
    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();