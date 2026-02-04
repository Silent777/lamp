(function () {
    'use strict';

    function startPlugin() {
        // Слухаємо відкриття картки фільму
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var btn = $(`
                    <div class="button full-start__button selector">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="white"/>
                        </svg>
                        <span>Дивитись UA</span>
                    </div>
                `);

                // При натисканні на кнопку
                btn.on('hover:enter', function () {
                    Lampa.Noty.show('Шукаю українську озвучку для: ' + e.data.movie.title);
                    
                    // Тут ми пізніше додамо логіку відкриття плеєра
                    console.log('Дані фільму:', e.data.movie);
                });

                // Вставляємо кнопку в блок з кнопками
                e.object.find('.full-start__buttons').append(btn);
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