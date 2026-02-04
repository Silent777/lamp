(function () {
    'use strict';

    /* =========================
       MANIFEST
    ========================= */
    var manifest = {
        id: 'ua_plugin',
        name: 'UA Дивитись',
        version: '1.0.0',
        description: 'Українські джерела перегляду',
        author: 'UA Plugin',
        type: 'plugin'
    };

    /* =========================
       MAIN COMPONENT
    ========================= */
    function UAMain() {
        var html = $('<div class="ua-plugin"></div>');
        var scroll = new Lampa.Scroll({ mask: true });
        var items = $('<div class="ua-plugin__list"></div>');

        this.create = function () {
            scroll.append(items);

            addItem('🔎 Шукати українською', function () {
                var activity = Lampa.Activity.active();
                var title = activity && activity.movie
                    ? activity.movie.title || activity.movie.name
                    : '';

                if (!title) {
                    Lampa.Noty.show('Немає назви');
                    return;
                }

                Lampa.Noty.show('Шукаю: ' + title);
                window.open(
                    'https://toloka.to/tracker.php?nm=' +
                        encodeURIComponent(title),
                    '_blank'
                );
            });

            addItem('ℹ️ Про плагін', function () {
                Lampa.Noty.show('UA Plugin · v' + manifest.version);
            });

            html.append(scroll.render());
            return html;
        };

        this.start = function () {
            scroll.focus();
        };

        function addItem(title, onEnter) {
            var item = $(`
                <div class="ua-plugin__item selector">
                    <div class="ua-plugin__title">${title}</div>
                </div>
            `);

            item.on('hover:enter', onEnter);
            items.append(item);
        }
    }

    /* =========================
       REGISTER COMPONENT
    ========================= */
    Lampa.Component.add('ua_plugin_main', UAMain);

    /* =========================
       MENU BUTTON (SaloPower style)
    ========================= */
    function addMenuButton() {
        if ($('.menu__item.ua-plugin-button').length) return;

        var button = $(`
            <li class="menu__item selector ua-plugin-button">
                <div class="menu__ico">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10l10 5 10-5V7z"></path>
                    </svg>
                </div>
                <div class="menu__text">${manifest.name}</div>
            </li>
        `);

        button.on('hover:enter', function () {
            Lampa.Activity.push({
                component: 'ua_plugin_main',
                title: manifest.name
            });
        });

        $('.menu .menu__list').eq(0).append(button);
    }

    /* =========================
       START
    ========================= */
    function start() {
        addMenuButton();
        console.log('UA Plugin loaded');
    }

    if (window.appready) start();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') start();
        });
    }
})();
