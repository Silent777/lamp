(function () {
    'use strict';

    var BUTTON_CLASS = 'ua-card-button';

    /* =========================
       ADD BUTTON TO CARD
    ========================= */
    function addButton(activity) {
        if (!activity || !activity.render) return;

        var buttons = activity.render().find('.full-start-new__buttons');

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
            var movie = activity.movie;
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

        if (Lampa.Controller) Lampa.Controller.render();
    }

    /* =========================
       LISTEN FULL CARD OPEN
    ========================= */
    function bind() {
        Lampa.Listener.follow('activity', function (e) {
            if (e.type !== 'start') return;
            if (!e.activity) return;

            // ці компоненти мають full-start
            if (
                e.activity.component === 'full' ||
                e.activity.component === 'movie' ||
                e.activity.component === 'tv'
            ) {
                // даємо DOM дорендеритись
                setTimeout(function () {
                    addButton(e.activity);
                }, 0);
            }
        });
    }

    /* =========================
       START
    ========================= */
    if (window.appready) bind();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') bind();
        });
    }
})();
