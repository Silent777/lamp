(function () {
    'use strict';

    function startPlugin() {
        console.log('UA Plugin: Start initialization');

        // Функція для створення та додавання кнопки
        function addButton() {
            var container = $('.full-start__buttons');
            
            // Якщо контейнер є і кнопки ще немає
            if (container.length && !container.find('.my-ua-button').length) {
                var btn = $(`
                    <div class="button full-start__button selector my-ua-button" style="background: rgba(255, 215, 0, 0.2) !important;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="gold"/>
                        </svg>
                        <span>Дивитись UA</span>
                    </div>
                `);

                btn.on('hover:enter', function () {
                    var title = $('.full-start__title').text() || 'фільму';
                    Lampa.Noty.show('Шукаю солов\'їною для: ' + title);
                    window.open('https://toloka.to/tracker.php?nm=' + encodeURIComponent(title), '_blank');
                });

                container.append(btn);
                console.log('UA Plugin: Button added successfully');
                
                if (Lampa.Controller) Lampa.Controller.render();
            }
        }

        // Стежимо за змінами в DOM (для динамічного рендеру Lampa)
        var observer = new MutationObserver(function(mutations) {
            if ($('.full-start__buttons').length) {
                addButton();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Запуск
    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();