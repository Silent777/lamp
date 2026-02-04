(function () {
    'use strict';

    function startPlugin() {
        // Слухаємо подію завантаження картки фільму
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                // Створюємо кнопку
                var btn = $(`
                    <div class="button full-start__button selector my-ua-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="gold"/>
                        </svg>
                        <span>Дивитись UA</span>
                    </div>
                `);

                // Обробник натискання
                btn.on('hover:enter', function () {
                    Lampa.Noty.show('Шукаю солов\'їною для: ' + e.data.movie.title);
                    
                    // Відкриваємо пошук на UA ресурсі (приклад для Toloka)
                    var query = encodeURIComponent(e.data.movie.title);
                    window.open('https://toloka.to/tracker.php?nm=' + query, '_blank');
                });

                // Шукаємо контейнер кнопок через стандартний клас Lampa
                var container = $('.full-start__buttons');
                
                // Додаємо кнопку, якщо її там ще немає
                if (container.length && !container.find('.my-ua-button').length) {
                    container.append(btn);
                    // Оновлюємо навігацію, щоб пульт/курсор бачив нову кнопку
                    Lampa.Controller.render();
                }
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