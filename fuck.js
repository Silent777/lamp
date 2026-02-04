(function () {
    'use strict';

    function addButton() {
        var container = $('.full-start__buttons');

        if (!container.length) return;
        if (container.find('.my-ua-button').length) return;

        var btn = $(`
            <div class="button full-start__button my-ua-button"
                 style="background: rgba(255,215,0,.2)">
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29Z"
                          fill="gold"/>
                </svg>
                <span>Дивитись UA</span>
            </div>
        `);

        btn.on('click', function () {
            var title = $('.full-start__title').text();
            Lampa.Noty.show('Шукаю UA для: ' + title);
            window.open(
                'https://toloka.to/tracker.php?nm=' + encodeURIComponent(title),
                '_blank'
            );
        });

        container.append(btn);
        console.log('UA Plugin: Button added');
    }

    function startPlugin() {
        addButton();

        new MutationObserver(addButton).observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') startPlugin();
        });
    }
})();
