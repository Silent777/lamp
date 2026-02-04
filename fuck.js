(function () {
    'use strict';

    function injectButton() {
        const container = $('.full-start-new__buttons');

        if (!container.length) return;
        if (container.find('.my-ua-button').length) return;

        const btn = $(`
            <div class="full-start__button my-ua-button">
                <span>🇺🇦 Дивитись UA</span>
            </div>
        `);

        btn.on('click', () => {
            const title = $('.full-start-new__title').text();
            Lampa.Noty.show('UA пошук: ' + title);

            window.open(
                'https://toloka.to/tracker.php?nm=' + encodeURIComponent(title),
                '_blank'
            );
        });

        container.append(btn);
        console.log('[UA] button added');
    }

    Lampa.Listener.follow('activity', e => {
        if (
