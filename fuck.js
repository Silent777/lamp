(function () {
    'use strict';

    var BUTTON_CLASS = 'ua-card-button';

    function addButton(activity) {
        if (!activity) return;

        var root = activity.render();
        if (!root || !root.length) return;

        var buttons = root.find('.full-start-new__buttons');
        if (!buttons.length) return;

        if (buttons.find('.' + BUTTON_CLASS).length) return;

        var btn = $(`
            <div class="full-start__button selector ${BUTTON_CLASS}"
                 style="background: rgba(255, 215, 0, 0.25)">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 2L4.5 20.3L5.2 21L12 18L18.8 21L19.5 20.3Z"
                          fill="gold"/>
                </svg>
                <span>UA</span>
            </div>
        `);

        btn.on('hover:enter', function () {
            var movie = activity.movie || {};
            var title =
                movie.title ||
                movie.name ||
                movie.original_title ||
                movie.original_name;

            if (!title) {
                Lampa.Noty.show('Немає назви');
                return;
            }

            Lampa.Noty.show('Шукаю українською: ' + title);

            window.open(
                'https://toloka.to/tracker.php?nm=' +
                    encodeURIComponent(title),
                '_blank'
            );
        });

        buttons.append(btn);

        if (Lampa.Controller) {
            Lampa.Controller.render();
        }
    }

    function bind() {
        // ГОЛОВНЕ: full_start
        Lampa.Listener.follow('full_start', function (e) {
            if (!e || !e.activity) return;
            addButton(e.activity);
        });
    }

    if (window.appready) bind();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') bind();
        });
    }
})();
