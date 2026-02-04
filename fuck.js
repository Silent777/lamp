(function () {
    'use strict';

    function startPlugin() {
        // Додаємо шаблон кнопки (аналогічно до Lampa.Template.add у вашому прикладі)
        Lampa.Template.add('my_ua_button_template', `
            <div class="button full-start__button selector my-ua-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="gold"/>
                </svg>
                <span>Дивитись UA</span>
            </div>
        `);

        // Слухаємо подію завантаження картки фільму
        Lampa.Listener.follow('full', function (e) {
            // Тип 'complite' означає, що дані завантажені і інтерфейс побудований
            if (e.type == 'complite') {
                var container = e.object.find('.full-start__buttons');
                
                // Перевіряємо, чи ми вже не додали кнопку
                if (container.length && !container.find('.my-ua-button').length) {
                    // Створюємо елемент з шаблону
                    var btn = Lampa.Template.get('my_ua_button_template');

                    // Логіка при натисканні
                    btn.on('hover:enter', function () {
                        var movie = e.data.movie;
                        var title = movie.title || movie.name;
                        
                        Lampa.Noty.show('Шукаю солов\'їною: ' + title);
                        
                        // Відкриваємо пошук (можна замінити на свій парсер)
                        window.open('https://toloka.to/tracker.php?nm=' + encodeURIComponent(title), '_blank');
                    });

                    // Додаємо в контейнер
                    container.append(btn);
                    
                    // Оновлюємо контролер, щоб кнопка стала доступною для пульта
                    Lampa.Controller.render();
                }
            }
        });
    }

    // Запуск плагіна тільки коли Lampa готова
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') startPlugin();
        });
    }
})();