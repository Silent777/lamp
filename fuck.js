function addUaButton(activity) {
    var BUTTON_CLASS = 'ua-card-button';

    var createButton = function(title) {
        var btn = $(`
            <div class="full-start__button selector ${BUTTON_CLASS}" style="background: rgba(255, 215, 0, 0.25)">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 2L4.5 20.3L5.2 21L12 18L18.8 21L19.5 20.3Z" fill="gold"/>
                </svg>
                <span>UA</span>
            </div>
        `);

        btn.on('hover:enter', function() {
            if (!title) {
                Lampa.Noty.show('Немає назви');
                return;
            }
            Lampa.Noty.show('Шукаю українською: ' + title);
            window.open('https://toloka.to/tracker.php?nm=' + encodeURIComponent(title), '_blank');
        });

        return btn;
    };

    // Спостерігаємо за появою кнопок
    var root = activity.render(true);
    if (!root || !root.length) return;

    var observer = new MutationObserver(function(mutations, obs) {
        var buttons = root.find('.full-start-new__buttons');
        if (buttons.length) {
            var movie = activity.movie || {};
            var title = movie.title || movie.name || movie.original_title || movie.original_name;

            if (!buttons.find('.' + BUTTON_CLASS).length) {
                buttons.append(createButton(title));
            }

            if (Lampa.Controller) Lampa.Controller.render();
            obs.disconnect();
        }
    });

    observer.observe(root[0], { childList: true, subtree: true });
}

// Підключаємо до listener full_start
Lampa.Listener.follow('full_start', function(e) {
    if (!e || !e.activity) return;
    addUaButton(e.activity);
});
