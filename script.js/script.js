// ===== МУЗЫКАЛЬНЫЙ ПЛЕЕР =====
const audio = document.getElementById('backgroundMusic');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const volumeSlider = document.getElementById('volumeSlider');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const togglePlayerBtn = document.getElementById('togglePlayer');
const firstClickMessage = document.getElementById('firstClickMessage');

let musicEnabled = false;

// Включаем музыку при первом клике по странице
document.addEventListener('click', function enableMusic() {
    if (!musicEnabled) {
        audio.volume = 0.3;
        audio.play().then(() => {
            console.log('Музыка включена');
            musicEnabled = true;
            firstClickMessage.style.display = 'none';
            musicToggleBtn.innerHTML = '<i class="fas fa-music"></i> Музыка включена';
        }).catch(error => {
            console.log('Ошибка воспроизведения:', error);
            // Альтернативный способ
            document.body.innerHTML += '<p style="color:red;text-align:center">Нажмите Play для музыки</p>';
        });
        
        // Удаляем обработчик после первого клика
        document.removeEventListener('click', enableMusic);
    }
}, { once: true });

// Управление музыкой
playBtn.addEventListener('click', () => {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
});

pauseBtn.addEventListener('click', () => {
    audio.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
});

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

musicToggleBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicToggleBtn.innerHTML = '<i class="fas fa-music"></i> Музыка включена';
    } else {
        audio.pause();
        musicToggleBtn.innerHTML = '<i class="fas fa-music"></i> Включить музыку';
    }
});

// Скрыть/показать плеер
if (togglePlayerBtn) {
    togglePlayerBtn.addEventListener('click', () => {
        const player = document.querySelector('.music-player');
        const icon = togglePlayerBtn.querySelector('i');
        
        if (player.style.transform === 'translateY(-100px)') {
            player.style.transform = 'translateY(0)';
            icon.className = 'fas fa-chevron-up';
        } else {
            player.style.transform = 'translateY(-100px)';
            icon.className = 'fas fa-chevron-down';
        }
    });
}

// ===== КОПИРОВАНИЕ ТЕКСТА =====
const copyButtons = document.querySelectorAll('.copy-btn, .contact-copy-btn, .copy-text');
const notification = document.getElementById('copyNotification');
const copiedText = document.getElementById('copiedText');

copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const textToCopy = button.getAttribute('data-text') || button.textContent;
        
        // Копируем в буфер обмена
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Показываем уведомление
            copiedText.textContent = textToCopy;
            notification.classList.add('show');
            
            // Скрываем уведомление через 3 секунды
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
            
            // Мигание скопированного элемента
            if (button.classList.contains('copy-text')) {
                const originalColor = button.style.color;
                button.style.color = '#00ff00';
                setTimeout(() => {
                    button.style.color = originalColor;
                }, 500);
            }
        }).catch(err => {
            console.error('Ошибка копирования:', err);
            alert('Не удалось скопировать. Скопируйте вручную: ' + textToCopy);
        });
        
        e.stopPropagation();
    });
});

// ===== МОДАЛЬНОЕ ОКНО ЗАЯВКИ =====
const joinClanBtn = document.getElementById('joinClanBtn');
const applicationModal = document.getElementById('applicationModal');
const modalClose = document.querySelector('.modal-close');
const closeModalBtn = document.getElementById('closeModal');

if (joinClanBtn) {
    joinClanBtn.addEventListener('click', () => {
        applicationModal.classList.add('show');
        
        // Автоматически копируем Discord тег при отправке заявки
        const discordTag = '@darkerd1';
        navigator.clipboard.writeText(discordTag).then(() => {
            console.log('Discord тег скопирован автоматически');
        });
    });
}

// Закрытие модального окна
function closeModal() {
    applicationModal.classList.remove('show');
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

// Закрытие по клику вне окна
applicationModal.addEventListener('click', (e) => {
    if (e.target === applicationModal) {
        closeModal();
    }
});

// ===== АНИМАЦИИ =====
// Анимация появления элементов
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за карточками
document.querySelectorAll('.info-card, .clan-box, .join-clan-card, .stats-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// ===== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ =====
// Обновление времени игры
function updateGameTime() {
    const timeElements = document.querySelectorAll('.game-time');
    timeElements.forEach(el => {
        const currentTime = el.textContent;
        const [hours, minutes] = currentTime.split('ч ').map(str => parseInt(str));
        const newMinutes = (minutes + 1) % 60;
        const newHours = minutes === 59 ? hours + 1 : hours;
        el.textContent = `${newHours}ч ${newMinutes}м`;
    });
}

// Обновляем каждую минуту (60 секунд)
setInterval(updateGameTime, 60000);

// Пульсация онлайн-статуса
setInterval(() => {
    const dot = document.querySelector('.status-dot.online');
    if (dot) {
        dot.style.animation = 'none';
        setTimeout(() => {
            dot.style.animation = 'pulse 2s infinite';
        }, 10);
    }
}, 4000);

// Инициализация
console.log('GrandProfile.ru загружен!');