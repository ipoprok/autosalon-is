import './style.css'

const cars = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 2800000,
    stock: 3,
    updated: '2026-03-17 09:00',
    image:
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 2,
    brand: 'LADA',
    model: 'Vesta',
    year: 2025,
    price: 2100000,
    stock: 5,
    updated: '2026-03-17 14:30',
    image:
      'https://images.pexels.com/photos/100653/pexels-photo-100653.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 3,
    brand: 'Hyundai',
    model: 'Solaris',
    year: 2023,
    price: 1900000,
    stock: 2,
    updated: '2026-03-17 08:15',
    image:
      'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 4,
    brand: 'BMW',
    model: '3 Series',
    year: 2024,
    price: 4200000,
    stock: 4,
    updated: '2026-03-17 10:10',
    image:
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 5,
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    year: 2024,
    price: 4500000,
    stock: 3,
    updated: '2026-03-17 11:20',
    image:
      'https://images.pexels.com/photos/1124606/pexels-photo-1124606.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 6,
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    price: 3900000,
    stock: 2,
    updated: '2026-03-17 12:30',
    image:
      'https://images.pexels.com/photos/2100191/pexels-photo-2100191.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 7,
    brand: 'Kia',
    model: 'K5',
    year: 2023,
    price: 2300000,
    stock: 6,
    updated: '2026-03-17 13:00',
    image:
      'https://images.pexels.com/photos/1124608/pexels-photo-1124608.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 8,
    brand: 'Skoda',
    model: 'Octavia',
    year: 2022,
    price: 2600000,
    stock: 3,
    updated: '2026-03-17 13:45',
    image:
      'https://images.pexels.com/photos/2100193/pexels-photo-2100193.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 9,
    brand: 'Volkswagen',
    model: 'Passat',
    year: 2021,
    price: 2500000,
    stock: 2,
    updated: '2026-03-17 14:10',
    image:
      'https://images.pexels.com/photos/3580701/pexels-photo-3580701.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 10,
    brand: 'Nissan',
    model: 'Qashqai',
    year: 2022,
    price: 2700000,
    stock: 4,
    updated: '2026-03-17 15:05',
    image:
      'https://images.pexels.com/photos/1124607/pexels-photo-1124607.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 11,
    brand: 'Mazda',
    model: 'CX-5',
    year: 2023,
    price: 3100000,
    stock: 3,
    updated: '2026-03-17 15:40',
    image:
      'https://images.pexels.com/photos/1124609/pexels-photo-1124609.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 12,
    brand: 'Renault',
    model: 'Duster',
    year: 2021,
    price: 1900000,
    stock: 5,
    updated: '2026-03-17 16:15',
    image:
      'https://images.pexels.com/photos/2100194/pexels-photo-2100194.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 13,
    brand: 'Tesla',
    model: 'CyberTruck',
    year: 2025,
    price: 9900000,
    stock: 1,
    updated: '2026-03-24 20:00',
    image:
      'https://images.pexels.com/photos/2036544/pexels-photo-2036544.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
] as const

const localCarPhotos = import.meta.glob<string>('../photo/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default'
})

function normalizeName(value: string) {
  return value
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-z0-9а-я]/gi, '')
}

const photoByName = new Map<string, string>()
Object.entries(localCarPhotos).forEach(([path, url]) => {
  const fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, '') ?? ''
  photoByName.set(normalizeName(fileName), url)
})

const catalogCars = cars.map((car) => {
  const expectedFileName = `${car.brand} ${car.model}`
  const matchedPhoto =
    photoByName.get(normalizeName(expectedFileName)) ?? photoByName.get(normalizeName(car.model))
  return {
    ...car,
    image: matchedPhoto ?? car.image
  }
})

const heroPremiumImage =
  photoByName.get(normalizeName('CyberTruck')) ??
  'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1400'

const staffPhotos = {
  alexey:
    photoByName.get(normalizeName('Алексей Иванов')) ??
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  maria:
    photoByName.get(normalizeName('Мария Смирнова')) ??
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
  dmitry:
    photoByName.get(normalizeName('Дмитрий Орлов')) ??
    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600'
}

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
<div class="page">
  <header class="header">
    <div class="logo">
      <span class="logo-mark">AS</span>
      <span class="logo-text">AutoSalon IS 2026</span>
    </div>
    <nav class="nav">
      <button class="nav-link nav-link--active" data-page="home">Главная</button>
      <button class="nav-link" data-page="cars">Автомобили</button>
      <button class="nav-link" data-page="services">Услуги</button>
      <button class="nav-link" data-page="staff">Сотрудники</button>
      <button class="nav-link" data-page="about">О компании</button>
      <button class="nav-link" data-page="contacts">Контакты</button>
    </nav>
    <div class="header-actions">
      <button class="login-button login-button--secondary nav-link" data-page="notifications">
        Уведомления
      </button>
      <button id="adminLoginButton" class="login-button">Вход</button>
      <button id="adminLogoutButton" class="login-button login-button--secondary hidden">Выход</button>
    </div>
  </header>

  <main class="main">
    <section id="page-home" class="page-section">
      <div class="hero-block">
        <div class="hero-text">
          <p class="hero-kicker">Информационная система автодилера</p>
          <h1 id="heroTitle">Подбор автомобиля в пару кликов</h1>
          <p id="heroSubtitle">
            AutoSalon IS 2026 создана в марте 2026 года как учебный, но при этом максимально
            приближенный к реальности проект автодилерской системы. Мы объединили каталог,
            аналитику и управление сделками в одном интерфейсе.
          </p>
          <div class="hero-actions">
            <a href="#" class="hero-button" data-page-jump="cars">Открыть каталог</a>
            <button class="hero-ghost" data-page-jump="about">Узнать о компании</button>
          </div>
          <p class="hero-story">
            Наш автосалон вырос из небольшой команды, которая сначала вручную вела Excel‑таблицы с
            клиентами и сделками. Постепенно стало ясно, что без единой информационной системы
            невозможно быстро отвечать на запросы, контролировать обновление цен и качество
            сервиса. Так появился этот сайт — витрина системы, которая автоматизирует работу
            менеджеров и делает выбор автомобиля для клиента удобным и честным.
          </p>
          <p class="hero-story">
            Мы не прячем информацию о наличии и стоимости, показываем дату последнего обновления
            цен и даём прозрачную историю сделок. Именно поэтому выбирать наш автосалон выгодно:
            вы видите реальные машины в наличии, понятные условия и можете оформить заявку онлайн.
          </p>
        </div>
        <div class="hero-panel">
          <div class="hero-metric">
            <span class="metric-label">Поиск авто</span>
            <span class="metric-value">1250 → 180 мс</span>
          </div>
          <div class="hero-metric">
            <span class="metric-label">Фильтр бренд+цена</span>
            <span class="metric-value">890 → 120 мс</span>
          </div>
          <div class="hero-metric">
            <span class="metric-label">Создание заказа</span>
            <span class="metric-value">450 → 95 мс</span>
          </div>
          <p class="hero-note">
            Эти показатели используются в курсовой работе для демонстрации ускорения системы
            после оптимизации индексов и кэша.
          </p>
        </div>
      </div>
      <article class="main-banner">
        <img
          src="${heroPremiumImage}"
          alt="Премиальный автомобиль CyberTruck от AutoSalon IS"
          class="main-banner__image"
          loading="lazy"
        />
        <div class="main-banner__content">
          <h2>Весеннее предложение 2026</h2>
          <p>
            Новая поставка седанов и кроссоверов уже в наличии. Запишитесь на тест-драйв и
            получите персональные условия по кредиту и трейд-ин.
          </p>
        </div>
      </article>
    </section>

    <section id="page-cars" class="page-section hidden">
      <div class="page-title-row">
        <h1>Каталог автомобилей</h1>
        <p class="page-subtitle">
          Фильтр по бренду и цене помогает быстро подобрать автомобиль в наличии.
        </p>
      </div>

      <section id="catalog" class="catalog-section">
      <div class="section-header">
        <h2>Подбор по параметрам</h2>
        <div class="filters">
          <input id="brandFilter" class="input" placeholder="Марка (например, Toyota)" />
          <input id="minPriceFilter" class="input" placeholder="Цена от, ₽" />
          <input id="maxPriceFilter" class="input" placeholder="Цена до, ₽" />
        </div>
      </div>
      <div id="carsGrid" class="cars-grid"></div>
      </section>
    </section>

    <section id="page-about" class="page-section hidden">
      <div class="page-title-row">
        <h1>История создания AutoSalon IS</h1>
        <p class="page-subtitle">
          Всё началось с простой задачи — перестать терять клиентов и считать сделки в блокноте и
          Excel.
        </p>
      </div>

      <div class="about-grid">
        <article class="info-card">
          <h3>Первые шаги</h3>
          <p>
            Несколько менеджеров автосалона в 2024 году вели учёт обращений в разрозненных таблицах
            и мессенджерах. Клиент мог позвонить утром, а к вечеру его запрос уже терялся среди
            десятков сообщений.
          </p>
        </article>
        <article class="info-card">
          <h3>Идея системы</h3>
          <p>
            Стало понятно, что нужен единый центр: каталог машин, база клиентов, история сделок и
            аналитика по продажам. Так родилась идея AutoSalon IS — системы, которая связывает
            склад, отдел продаж и маркетинг.
          </p>
        </article>
        <article class="info-card">
          <h3>Учебный проект, близкий к реальности</h3>
          <p>
            В 2026 году на основе реальных процессов автосалона был создан прототип сайта —
            витрина информационной системы. Он показывает, как могли бы выглядеть рабочее место
            менеджера, каталог и дашборд руководителя.
          </p>
        </article>
        <article class="info-card">
          <h3>Почему нас выбирают</h3>
          <p>
            Мы делаем ставку на прозрачность: показываем наличие, дату обновления цен и историю
            обслуживания автомобиля. Клиент получает понятные условия и поддержку на всех этапах
            сделки.
          </p>
        </article>
      </div>

      <div class="about-actions">
        <button class="btn-primary about-tab" data-about-tab="news">Новости</button>
        <button class="btn-secondary about-tab" data-about-tab="procurement">Закупки</button>
      </div>

      <section class="about-section" id="about-news">
        <h2>Новости автосалона</h2>
        <ul class="about-list">
          <li>
            <strong>Новые автомобили в каталоге.</strong> Появилась расширенная линейка моделей BMW
            3 Series, Mercedes‑Benz C‑Class, Audi A4, а также кроссоверы Kia K5, Mazda CX‑5 и
            Nissan Qashqai.
          </li>
          <li>
            <strong>Выгодные условия на Mercedes‑Benz C‑Class.</strong> При покупке автомобиля
            действует акция: полис КАСКО в подарок при оформлении кредита у партнёрского банка.
          </li>
          <li>
            <strong>Праздничный розыгрыш к 9 Мая.</strong> Среди клиентов, оформивших сделку с 1 по
            9 мая, разыгрываются сертификаты на дополнительное оборудование и бесплатное ТО.
          </li>
        </ul>
      </section>

      <section class="about-section about-section--hidden" id="about-procurement">
        <h2>Закупки в цифрах</h2>
        <div class="proc-table">
          <div class="proc-year">
            <h3>2023</h3>
            <p><strong>16 млрд. руб</strong></p>
            <p>объём закупок</p>
            <p><strong>480</strong></p>
            <p>привлеченных поставщиков из малого и среднего бизнеса</p>
            <p>
              Сроки проведения закупочных процедур варьируются от 3 дней до 12 месяцев, в
              зависимости от сложности и объема.
            </p>
          </div>
          <div class="proc-year">
            <h3>2024</h3>
            <p><strong>15 млрд. руб</strong></p>
            <p>объём закупок</p>
            <p><strong>485</strong></p>
            <p>привлеченных поставщиков из малого и среднего бизнеса</p>
            <p>
              Акцент на укрепление партнерства с проверенными и надежными компаниями.
            </p>
          </div>
          <div class="proc-year">
            <h3>2025</h3>
            <p><strong>14 млрд. руб</strong></p>
            <p>объём закупок</p>
            <p><strong>481</strong></p>
            <p>привлеченных поставщиков из малого и среднего бизнеса</p>
            <p>
              Глубокое погружение в формирование себестоимости партнера для поиска взаимной
              оптимизации и наращивания эффективности.
            </p>
          </div>
        </div>
        <div class="proc-strategy">
          <h3>2025+</h3>
          <p><strong>Стратегия на 2025–2030 годы:</strong></p>
          <p>На ближайшие пять лет компания ставит перед собой амбициозные цели:</p>
          <ul class="about-list">
            <li>сокращение количества поставщиков</li>
            <li>укрупнение заказов</li>
            <li>получение наиболее выгодных предложений с рынка</li>
          </ul>
          <p>
            Этот подход позволит оптимизировать процессы закупок, повысить качество сотрудничества и
            укрепить позиции компании на рынке. Таким образом, стратегия компании в области закупок и
            партнёрства направлена на создание устойчивой и эффективной системы взаимодействия с
            поставщиками, что способствует долгосрочному развитию бизнеса.
          </p>
        </div>
      </section>
    </section>

    <section id="page-services" class="page-section hidden">
      <div class="page-title-row">
        <h1>Услуги</h1>
        <p class="page-subtitle">Клиентские сервисы для покупки и дальнейшего обслуживания.</p>
      </div>
      <div class="services-grid">
        <article class="info-card">
          <h3>Запись на тест-драйв</h3>
          <p>Выберите модель и удобное время, менеджер подтвердит запись в течение 15 минут.</p>
          <form class="feedback-form" id="testDriveForm">
            <input class="admin-input" name="fullName" placeholder="ФИО" required />
            <input class="admin-input" name="phone" placeholder="Номер телефона" required />
            <input class="admin-input" name="email" type="email" placeholder="E-mail" required />
            <button type="submit" class="btn-primary">Оставить заявку</button>
            <p id="testDriveFeedback" class="feedback-message hidden"></p>
          </form>
        </article>
        <article class="info-card">
          <h3>Запись на сервис</h3>
          <p>Плановое ТО, диагностика и ремонт у сертифицированных специалистов автоцентра.</p>
          <form class="feedback-form" id="serviceForm">
            <input class="admin-input" name="fullName" placeholder="ФИО" required />
            <input class="admin-input" name="phone" placeholder="Номер телефона" required />
            <input class="admin-input" name="email" type="email" placeholder="E-mail" required />
            <button type="submit" class="btn-primary">Оставить заявку</button>
            <p id="serviceFeedback" class="feedback-message hidden"></p>
          </form>
        </article>
        <article class="info-card">
          <h3>Документы</h3>
          <p>Быстрый доступ к договорам, актам и ПТС в личном кабинете клиента.</p>
        </article>
        <article class="info-card">
          <h3>История обслуживания</h3>
          <p>Хранение всех обращений и выполненных работ по каждому автомобилю.</p>
        </article>
        <article class="info-card">
          <h3>Отзывы клиентов</h3>
          <p>
            <strong>Ирина П.</strong>: "Быстро оформили документы, менеджер был на связи весь день."
          </p>
          <p>
            <strong>Сергей К.</strong>: "Прошел ТО без очередей, подробно объяснили все выполненные
            работы."
          </p>
        </article>
      </div>
    </section>

    <section id="page-staff" class="page-section hidden">
      <div class="page-title-row">
        <h1>Сотрудники</h1>
        <p class="page-subtitle">Ключевые специалисты, которые сопровождают вас на каждом этапе.</p>
      </div>
      <div class="staff-grid">
        <article class="staff-card">
          <img
            src="${staffPhotos.alexey}"
            alt="Алексей Иванов"
            class="staff-photo"
            loading="lazy"
          />
          <h3>Алексей Иванов</h3>
          <p class="staff-role">Руководитель отдела продаж</p>
          <p>10+ лет в автобизнесе, помогает подобрать оптимальный вариант покупки.</p>
        </article>
        <article class="staff-card">
          <img
            src="${staffPhotos.maria}"
            alt="Мария Смирнова"
            class="staff-photo"
            loading="lazy"
          />
          <h3>Мария Смирнова</h3>
          <p class="staff-role">Сервис-консультант</p>
          <p>Координирует обслуживание, контролирует сроки и качество сервисных работ.</p>
        </article>
        <article class="staff-card">
          <img
            src="${staffPhotos.dmitry}"
            alt="Дмитрий Орлов"
            class="staff-photo"
            loading="lazy"
          />
          <h3>Дмитрий Орлов</h3>
          <p class="staff-role">Специалист по кредитованию</p>
          <p>Подбирает финансовые программы и сопровождает оформление документов.</p>
        </article>
      </div>
    </section>

    <section id="page-notifications" class="page-section hidden">
      <div class="page-title-row">
        <h1>Уведомления</h1>
        <p class="page-subtitle">Важные события по заказам, сервису и документам.</p>
      </div>
      <div class="notification-list">
        <article class="info-card">
          <h3>Тест-драйв подтвержден</h3>
          <p>Заявка на BMW 3 Series подтверждена. Дата: 25.03.2026, 14:00.</p>
        </article>
        <article class="info-card">
          <h3>Сервис завершен</h3>
          <p>Работы по ТО для Kia K5 выполнены. Автомобиль готов к выдаче.</p>
        </article>
        <article class="info-card">
          <h3>Документы готовы</h3>
          <p>Договор купли-продажи и ПТС доступны для скачивания в личном кабинете.</p>
        </article>
      </div>
    </section>

    <section id="page-contacts" class="page-section hidden">
      <h1>Контакты и режим работы</h1>
      <section id="contacts" class="contacts-grid">
        <article class="contact-card">
          <div class="contact-icon">📍</div>
          <div>
            <h3>Фактический адрес</h3>
            <p>125171, г. Москва, Ленинградское шоссе, 18А, стр. 2</p>
          </div>
        </article>
        <article class="contact-card">
          <div class="contact-icon">✉️</div>
          <div>
            <h3>Почтовый адрес</h3>
            <p>125171, г. Москва, 4‑й Войковский проезд, 10, а/я №18</p>
          </div>
        </article>
        <article class="contact-card">
          <div class="contact-icon">☎️</div>
          <div>
            <h3>Телефон</h3>
            <p>8 (495) 923-96-22</p>
          </div>
        </article>
        <article class="contact-card">
          <div class="contact-icon">📧</div>
          <div>
            <h3>E‑mail</h3>
            <p>info@autosalon-is.local</p>
          </div>
        </article>
        <article class="contact-card">
          <div class="contact-icon">⏰</div>
          <div>
            <h3>Часы работы</h3>
            <p>9:00 – 20:00, без выходных</p>
          </div>
        </article>
      </section>
    </section>
  </main>

  <div id="adminPanel" class="admin-panel hidden">
    <h2>Управление главной страницей</h2>
    <label>
      Заголовок:
      <input id="heroTitleInput" class="admin-input" />
    </label>
    <label>
      Описание:
      <textarea id="heroSubtitleInput" class="admin-input admin-input--textarea"></textarea>
    </label>
    <div class="admin-panel__buttons">
      <button id="saveHeroButton" class="btn-primary">Сохранить</button>
      <button id="resetHeroButton" class="btn-secondary">Сбросить по умолчанию</button>
    </div>
    <p class="admin-hint">Данные сохраняются в браузере (LocalStorage) и не требуют сервера.</p>
  </div>

  <div id="loginModal" class="modal hidden">
    <div class="modal__backdrop"></div>
    <div class="modal__content">
      <h2>Вход в AutoSalon IS</h2>
      <p class="modal-subtitle">Выберите тип пользователя и введите данные для входа.</p>
      <form id="loginForm" class="modal__form">
        <fieldset class="role-switch">
          <label>
            <input type="radio" name="loginRole" value="client" checked />
            Клиент
          </label>
          <label>
            <input type="radio" name="loginRole" value="admin" />
            Админ
          </label>
        </fieldset>
        <label>
          Логин
          <input id="loginUsername" class="admin-input" autocomplete="off" />
        </label>
        <label>
          Пароль
          <input id="loginPassword" type="password" class="admin-input" autocomplete="off" />
        </label>
        <label id="captchaLabel">
          <span id="captchaQuestion"></span>
          <input id="captchaAnswer" class="admin-input" autocomplete="off" />
        </label>
        <div id="loginError" class="login-error hidden"></div>
        <div class="admin-panel__buttons">
          <button type="submit" class="btn-primary">Войти</button>
          <button type="button" id="loginCancel" class="btn-secondary">Отмена</button>
        </div>
      </form>
    </div>
  </div>

  <div id="carRequestModal" class="modal hidden">
    <div class="modal__backdrop"></div>
    <div class="modal__content">
      <h2>Оформление заявки</h2>
      <p id="carRequestTitle" class="modal-subtitle"></p>
      <form id="carRequestForm" class="modal__form">
        <label>
          ФИО
          <input id="requestFullName" class="admin-input" autocomplete="off" required />
        </label>
        <label>
          Номер телефона
          <input id="requestPhone" class="admin-input" autocomplete="off" required />
        </label>
        <label>
          E-mail
          <input id="requestEmail" type="email" class="admin-input" autocomplete="off" required />
        </label>
        <div id="carRequestFeedback" class="feedback-message hidden"></div>
        <div class="admin-panel__buttons">
          <button type="submit" class="btn-primary">Отправить</button>
          <button type="button" id="carRequestCancel" class="btn-secondary">Закрыть</button>
        </div>
      </form>
    </div>
  </div>

  <div id="carDetailsModal" class="modal hidden">
    <div class="modal__backdrop"></div>
    <div class="modal__content modal__content--wide">
      <h2 id="carDetailsTitle">Информация об автомобиле</h2>
      <img id="carDetailsImage" class="car-details-image" alt="Фото автомобиля" loading="lazy" />
      <div id="carDetailsBody" class="car-details-body"></div>
      <div class="admin-panel__buttons">
        <button type="button" id="carDetailsClose" class="btn-secondary">Закрыть</button>
      </div>
    </div>
  </div>
</div>
`

function formatPrice(value: number) {
  return value.toLocaleString('ru-RU') + ' ₽'
}

function renderCars() {
  const brand = (document.querySelector<HTMLInputElement>('#brandFilter')!.value || '').toLowerCase()
  const minPriceStr = document.querySelector<HTMLInputElement>('#minPriceFilter')!.value
  const maxPriceStr = document.querySelector<HTMLInputElement>('#maxPriceFilter')!.value

  const minPrice = minPriceStr ? Number(minPriceStr) : undefined
  const maxPrice = maxPriceStr ? Number(maxPriceStr) : undefined

  const filtered = catalogCars.filter((car) => {
    if (brand && !car.brand.toLowerCase().includes(brand)) return false
    if (typeof minPrice === 'number' && car.price < minPrice) return false
    if (typeof maxPrice === 'number' && car.price > maxPrice) return false
    return car.stock > 0
  })

  const grid = document.querySelector<HTMLDivElement>('#carsGrid')!
  if (filtered.length === 0) {
    grid.innerHTML = '<p class="empty">Автомобили по выбранным условиям не найдены.</p>'
    return
  }

  grid.innerHTML = filtered
    .map(
      (car) => `
      <article class="car-card">
        <div class="car-image-wrap">
          <img src="${car.image}" alt="${car.brand} ${car.model}" class="car-image" loading="lazy" />
        </div>
        <header class="car-header">
          <div>
            <h3>${car.brand} ${car.model}</h3>
            <span class="car-year">${car.year} год</span>
          </div>
          <div class="car-price">${formatPrice(car.price)}</div>
        </header>
        <dl class="car-meta">
          <div>
            <dt>Остаток</dt>
            <dd>${car.stock} шт.</dd>
          </div>
          <div>
            <dt>Обновлено</dt>
            <dd>${new Date(car.updated).toLocaleString('ru-RU')}</dd>
          </div>
        </dl>
        <div class="car-actions">
          <button class="btn-primary" data-action="request" data-car-id="${car.id}">Оформить заявку</button>
          <button class="btn-secondary" data-action="details" data-car-id="${car.id}">Подробнее</button>
        </div>
      </article>
    `
    )
    .join('')
}

document
  .querySelector<HTMLInputElement>('#brandFilter')!
  .addEventListener('input', renderCars)
document
  .querySelector<HTMLInputElement>('#minPriceFilter')!
  .addEventListener('input', renderCars)
document
  .querySelector<HTMLInputElement>('#maxPriceFilter')!
  .addEventListener('input', renderCars)

renderCars()

let selectedCarId: number | null = null

function getCarById(id: number) {
  return catalogCars.find((car) => car.id === id) ?? null
}

function showModalById(id: string, show: boolean) {
  const modal = document.querySelector<HTMLDivElement>(id)
  if (modal) modal.classList.toggle('hidden', !show)
}

function openCarRequestModal(carId: number) {
  const car = getCarById(carId)
  if (!car) return
  selectedCarId = carId
  const title = document.querySelector<HTMLParagraphElement>('#carRequestTitle')
  const feedback = document.querySelector<HTMLDivElement>('#carRequestFeedback')
  if (title) title.textContent = `${car.brand} ${car.model}, ${car.year} год`
  if (feedback) {
    feedback.textContent = ''
    feedback.classList.add('hidden')
  }
  showModalById('#carRequestModal', true)
}

function openCarDetailsModal(carId: number) {
  const car = getCarById(carId)
  if (!car) return
  const title = document.querySelector<HTMLHeadingElement>('#carDetailsTitle')
  const image = document.querySelector<HTMLImageElement>('#carDetailsImage')
  const body = document.querySelector<HTMLDivElement>('#carDetailsBody')
  if (title) title.textContent = `${car.brand} ${car.model}`
  if (image) {
    image.src = car.image
    image.alt = `${car.brand} ${car.model}`
  }
  if (body) {
    body.innerHTML = `
      <p><strong>Год выпуска:</strong> ${car.year}</p>
      <p><strong>Стоимость:</strong> ${formatPrice(car.price)}</p>
      <p><strong>Наличие:</strong> ${car.stock} шт.</p>
      <p><strong>Последнее обновление:</strong> ${new Date(car.updated).toLocaleString('ru-RU')}</p>
      <p>
        Автомобиль прошёл предпродажную подготовку и доступен для тест-драйва. Менеджер поможет
        подобрать комплектацию, кредит и условия трейд-ин.
      </p>
    `
  }
  showModalById('#carDetailsModal', true)
}

document.querySelector<HTMLDivElement>('#carsGrid')?.addEventListener('click', (event) => {
  const target = event.target as HTMLElement
  const actionButton = target.closest<HTMLButtonElement>('button[data-action][data-car-id]')
  if (!actionButton) return
  const carId = Number(actionButton.dataset.carId)
  const action = actionButton.dataset.action
  if (!Number.isFinite(carId)) return

  if (action === 'request') {
    openCarRequestModal(carId)
  }
  if (action === 'details') {
    openCarDetailsModal(carId)
  }
})

document.querySelector<HTMLButtonElement>('#carRequestCancel')?.addEventListener('click', () => {
  showModalById('#carRequestModal', false)
})

document.querySelector<HTMLButtonElement>('#carDetailsClose')?.addEventListener('click', () => {
  showModalById('#carDetailsModal', false)
})

document.querySelector<HTMLFormElement>('#carRequestForm')?.addEventListener('submit', (event) => {
  event.preventDefault()
  const feedback = document.querySelector<HTMLDivElement>('#carRequestFeedback')
  const car = selectedCarId ? getCarById(selectedCarId) : null
  if (!feedback || !car) return
  feedback.textContent = `Спасибо! Заявка на ${car.brand} ${car.model} отправлена, мы скоро свяжемся с вами.`
  feedback.classList.remove('hidden')
  ;(event.currentTarget as HTMLFormElement).reset()
})

// --- Работа с входом и "капчей" ---

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin123'
const CLIENT_USER = 'client'
const CLIENT_PASS = 'client123'
const HERO_STORAGE_KEY = 'autosalon_hero'

type HeroState = {
  title: string
  subtitle: string
}

let captchaAnswer = 0

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1
  const b = Math.floor(Math.random() * 9) + 1
  captchaAnswer = a + b
  const question = document.querySelector<HTMLSpanElement>('#captchaQuestion')
  if (question) {
    question.textContent = `Подтвердите, что вы человек: ${a} + ${b} = ?`
  }
  const input = document.querySelector<HTMLInputElement>('#captchaAnswer')
  if (input) {
    input.value = ''
  }
}

function loadHeroFromStorage(): HeroState | null {
  try {
    const raw = localStorage.getItem(HERO_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as HeroState
  } catch {
    return null
  }
}

function applyHeroState(state: HeroState | null) {
  const defaultState: HeroState = {
    title: 'Современный автосалон с онлайн‑каталогом',
    subtitle:
      'Подберите автомобиль по бренду, цене и году выпуска. Вся информация об остатках и обновлении цен доступна в режиме реального времени.'
  }

  const finalState = state ?? defaultState
  const titleEl = document.querySelector<HTMLHeadingElement>('#heroTitle')
  const subtitleEl = document.querySelector<HTMLParagraphElement>('#heroSubtitle')
  if (titleEl) titleEl.textContent = finalState.title
  if (subtitleEl) subtitleEl.textContent = finalState.subtitle

  const titleInput = document.querySelector<HTMLInputElement>('#heroTitleInput')
  const subtitleInput = document.querySelector<HTMLTextAreaElement>('#heroSubtitleInput')
  if (titleInput) titleInput.value = finalState.title
  if (subtitleInput) subtitleInput.value = finalState.subtitle
}

function setAdminMode(enabled: boolean) {
  const panel = document.querySelector<HTMLDivElement>('#adminPanel')
  const loginBtn = document.querySelector<HTMLButtonElement>('#adminLoginButton')
  const logoutBtn = document.querySelector<HTMLButtonElement>('#adminLogoutButton')
  if (panel) panel.classList.toggle('hidden', !enabled)
  if (loginBtn) loginBtn.classList.toggle('hidden', enabled)
  if (logoutBtn) logoutBtn.classList.toggle('hidden', !enabled)
}

function showLoginModal(show: boolean) {
  const modal = document.querySelector<HTMLDivElement>('#loginModal')
  const error = document.querySelector<HTMLDivElement>('#loginError')
  if (modal) modal.classList.toggle('hidden', !show)
  if (show) {
    generateCaptcha()
    if (error) {
      error.textContent = ''
      error.classList.add('hidden')
    }
  }
}

document
  .querySelector<HTMLButtonElement>('#adminLoginButton')
  ?.addEventListener('click', () => showLoginModal(true))

document
  .querySelector<HTMLButtonElement>('#loginCancel')
  ?.addEventListener('click', () => showLoginModal(false))

document
  .querySelector<HTMLButtonElement>('#adminLogoutButton')
  ?.addEventListener('click', () => {
    setAdminMode(false)
  })

document.querySelector<HTMLFormElement>('#loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault()
  const selectedRole =
    document.querySelector<HTMLInputElement>('input[name="loginRole"]:checked')?.value || 'client'
  const username = document.querySelector<HTMLInputElement>('#loginUsername')?.value.trim() || ''
  const password = document.querySelector<HTMLInputElement>('#loginPassword')?.value || ''
  const captcha = Number(document.querySelector<HTMLInputElement>('#captchaAnswer')?.value || '')
  const error = document.querySelector<HTMLDivElement>('#loginError')

  if (captcha !== captchaAnswer) {
    if (error) {
      error.textContent = 'Капча введена неверно.'
      error.classList.remove('hidden')
    }
    generateCaptcha()
    return
  }

  const isAdminValid = username === ADMIN_USER && password === ADMIN_PASS
  const isClientValid = username === CLIENT_USER && password === CLIENT_PASS
  const isValid = selectedRole === 'admin' ? isAdminValid : isClientValid

  if (!isValid) {
    if (error) {
      error.textContent =
        selectedRole === 'admin'
          ? 'Неверный логин или пароль администратора.'
          : 'Неверный логин или пароль клиента.'
      error.classList.remove('hidden')
    }
    generateCaptcha()
    return
  }

  showLoginModal(false)
  setAdminMode(selectedRole === 'admin')
})

document.querySelector<HTMLButtonElement>('#saveHeroButton')?.addEventListener('click', () => {
  const titleInput = document.querySelector<HTMLInputElement>('#heroTitleInput')
  const subtitleInput = document.querySelector<HTMLTextAreaElement>('#heroSubtitleInput')
  if (!titleInput || !subtitleInput) return

  const state: HeroState = {
    title: titleInput.value || 'Современный автосалон с онлайн‑каталогом',
    subtitle:
      subtitleInput.value ||
      'Подберите автомобиль по бренду, цене и году выпуска. Вся информация об остатках и обновлении цен доступна в режиме реального времени.'
  }

  localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(state))
  applyHeroState(state)
})

document.querySelector<HTMLButtonElement>('#resetHeroButton')?.addEventListener('click', () => {
  localStorage.removeItem(HERO_STORAGE_KEY)
  applyHeroState(null)
})

document.querySelectorAll<HTMLButtonElement>('.about-tab').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.aboutTab
    const isNews = target === 'news'
    const newsSection = document.querySelector<HTMLElement>('#about-news')
    const procurementSection = document.querySelector<HTMLElement>('#about-procurement')

    newsSection?.classList.toggle('about-section--hidden', !isNews)
    procurementSection?.classList.toggle('about-section--hidden', isNews)

    document.querySelectorAll<HTMLButtonElement>('.about-tab').forEach((tabBtn) => {
      tabBtn.classList.toggle('btn-primary', tabBtn === button)
      tabBtn.classList.toggle('btn-secondary', tabBtn !== button)
    })
  })
})

function bindFeedbackForm(formId: string, feedbackId: string, text: string) {
  const form = document.querySelector<HTMLFormElement>(formId)
  const feedback = document.querySelector<HTMLParagraphElement>(feedbackId)
  if (!form || !feedback) return

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const fullName = String(formData.get('fullName') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const requestType = formId === '#testDriveForm' ? 'test-drive' : 'service'

    try {
      const response = await fetch('http://localhost:3001/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestType, fullName, phone, email })
      })

      if (!response.ok) {
        throw new Error('Save failed')
      }

      form.reset()
      feedback.textContent = text
      feedback.classList.remove('hidden')
    } catch {
      feedback.textContent =
        'Не удалось сохранить заявку. Убедитесь, что backend запущен на http://localhost:3001.'
      feedback.classList.remove('hidden')
    }
  })
}

bindFeedbackForm('#testDriveForm', '#testDriveFeedback', 'Спасибо! Заявка на тест-драйв отправлена.')
bindFeedbackForm('#serviceForm', '#serviceFeedback', 'Спасибо! Заявка на сервис отправлена.')

// Инициализация состояния главного блока при загрузке
applyHeroState(loadHeroFromStorage())

// --- Простая навигация между страницами ---

type PageId = 'home' | 'cars' | 'about' | 'contacts' | 'services' | 'staff' | 'notifications'

function setPage(id: PageId) {
  const sections: Record<PageId, string> = {
    home: '#page-home',
    cars: '#page-cars',
    services: '#page-services',
    staff: '#page-staff',
    about: '#page-about',
    notifications: '#page-notifications',
    contacts: '#page-contacts'
  }

  Object.entries(sections).forEach(([key, selector]) => {
    const el = document.querySelector<HTMLElement>(selector)
    if (!el) return
    el.classList.toggle('hidden', key !== id)
  })

  document.querySelectorAll<HTMLButtonElement>('.nav-link').forEach((btn) => {
    const page = btn.dataset.page as PageId | undefined
    btn.classList.toggle('nav-link--active', page === id)
  })

  if (id === 'cars') {
    renderCars()
  }
}

document.querySelectorAll<HTMLButtonElement>('.nav-link').forEach((btn) => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.page as PageId | undefined
    if (page) setPage(page)
  })
})

document.querySelectorAll<HTMLElement>('[data-page-jump]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault()
    const target = el.getAttribute('data-page-jump') as PageId | null
    if (target) setPage(target)
  })
})

// стартовая страница
setPage('home')
