(function () {
    'use strict';

    function inject() {
        const buttons = $('.full-start .buttons, .full-start__buttons');

        if (!buttons.length) return;
        if (buttons.find('.my-ua-button').length) return;

        const btn = $(`
            <div class="button my-ua-button">
                <span>🇺🇦 Дивитись UA</span>
            </div>
        `);

        btn.on('click', () => {
            const title = $('.full-start__title').text();
            Lampa.Noty.show('UA пошук: ' + title);
        });

        buttons.append(btn);
        console.log('[UA] button injected');
    }

    Lampa.Listener.follow('activity', e => {
        if (e.type === 'start' && e.object?.component === 'full') {
            setTimeout(inject, 300);
        }
    });
})();
