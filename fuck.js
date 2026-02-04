(function() {
    'use strict';

    // Функція створення нашої кнопки
    function createMyButton() {
        var btn = $(`
            <div class="button full-start__button selector my-ua-button" style="background: rgba(255, 215, 0, 0.2) !important;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="gold"/>
                </svg>
                <span>Дивитись UA</span>
            </div>
        `);

        btn.on('hover:enter', function() {
            var title = $('.full-start__title').text() || $('title').text();
            Lampa.Noty.show('Шукаю солов\'їною для: ' + title);
            window.open('https://toloka.to/tracker.php?nm=' + encodeURIComponent(title), '_blank');
        });

        return btn;
    }

    // Стежимо за зміною активності (як у вашому прикладі)
    Lampa.Storage.listener.follow("change", function(e) {
        if (e.name == "activity") {
            // Коли відкривається картка фільму (компонент 'full' або 'vod')
            var timer = setInterval(function() {
                var container = $(".full-start__buttons");
                
                // Якщо знайшли блок кнопок і нашої кнопки там ще нема
                if (container.length > 0) {
                    if (!$(".my-ua-button").length) {
                        container.append(createMyButton());
                        // Обов'язково оновлюємо навігацію
                        if (Lampa.Controller) Lampa.Controller.render();
                    }
                    clearInterval(timer); // Зупиняємо пошук, коли додали
                }
            }, 100);

            // Обмежуємо час пошуку (наприклад, 5 секунд), щоб не вантажити систему
            setTimeout(function() { clearInterval(timer); }, 5000);
        }
    });

    console.log('UA Plugin: Monitoring started via Storage listener');
})();