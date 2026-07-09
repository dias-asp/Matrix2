# План: перенос сайта на Angular (`Matrix2/`)

Перенос статического сайта колориста Matrix (оригинал — `../Matrix1`) на Angular
для масштабируемости. **Дизайн должен остаться точь-в-точь как в оригинале.**

## Зафиксированные решения

- **Angular** — последняя версия, standalone-компоненты, TypeScript, сборщик по умолчанию.
- **Данные каталога** → типизированная модель `Product[]` / `Service[]` в TS
  (вместо вывода метаданных из строк путей к картинкам, как в оригинале).
- **Навигация** → Angular Router с реальными URL (`/`, `/price`, `/catalog`),
  фильтры как query-параметры.
- **Стили** → существующий `styles.css` копируется в глобальные стили без изменений
  (пиксель-в-пиксель).
- **Рендеринг/деплой** → статичный SPA, GitHub Pages + `CNAME`.
- **Кириллические пути** (`фото продукции/`, `фото работы/`) → **транслитерировать**
  (`products/`, `works/`) при переносе; пути прописываются в TS-данных.
- **Закомментированные товары** оригинала (Unbreak My Blonde, Keep Me Vivid, Dark Envy и др.)
  → перенести в модель с флагом **`hidden: true`**.

## Этап 0. Инициализация проекта
- [ ] `npx @angular/cli new` в `Matrix2/` (standalone, routing, CSS, без SSR).
- [ ] `angular.json`: подключить глобальный `styles.css`, папку `assets/`.
- [ ] Согласовать `.gitignore`, первый коммит.

## Этап 1. Перенос статических ассетов
- [ ] Скопировать в `src/assets/` с **транслитерацией** имён папок:
      `фото продукции/` → `products/`, `фото работы/` → `works/`.
- [ ] Перенести `assets/images/*.svg`, `matrix-logo.png`, `чб.JPEG`,
      `финал фото проба.JPEG`, `main.jpg`.
- [ ] `CNAME` в `src/` (чтобы попадал в билд).

## Этап 2. Глобальные стили
- [ ] `styles.css` → `src/styles.css` **без изменений**.
- [ ] `<link>` на шрифт Montserrat (Google Fonts) в `index.html`.
- [ ] Классы `main-page-active` / `products-page-active` на `<body>` — через сервис/`Renderer2`.

## Этап 3. Модель данных (ядро масштабируемости)
- [ ] Типы: `Gamma`, `ProductCategory` (shampoo/conditioner/mask/leave-in/oil/spray),
      `HairType`, `Product { id, gamma, category, hairTypes[], title, description,
      volume, price, image, hidden? }`,
      `ProductLine { gamma, title, briefDescription, lineImage, description, products[], hidden? }`,
      `Service { category, name, description?, price }`.
- [ ] Разово перенести данные из `../Matrix1/index.html` (~15 активных линий + скрытые,
      3 категории услуг) в `data/products.data.ts`, `data/services.data.ts`.
- [ ] Заменить хрупкие правила `isProductForHairType` и др. явными полями `hairTypes[]`
      (значения взять из текущей логики фильтров в `../Matrix1/assets/js/script.js`).
- [ ] Скрытые товары — с флагом `hidden: true`.

## Этап 4. Компоненты
- [ ] **Layout**: `HeaderMenuComponent` (гамбургер + меню: подменю Гамма / Тип продукта /
      Тип волос / Styling, соцсети, WhatsApp-текст).
- [ ] **Роуты-страницы**:
  - `HomeComponent` (`/`) — баннер, лого, author-banner, 6 карусельных секций, кнопки Price/Каталог.
  - `PriceComponent` (`/price`) — 3 категории услуг из `Service[]`.
  - `CatalogComponent` (`/catalog`) — список `ProductLine`, раскрывающиеся секции,
    breadcrumb, фильтры по query-параметрам (`?gamma=`, `?category=`, `?hairType=`).
- [ ] **Переиспользуемые**: `CarouselComponent`, `ProductLineComponent`,
      `ProductItemComponent`, `ServiceRowComponent`.

## Этап 5. Логика (порт из `script.js`)
- [ ] **Карусель** → `CarouselComponent` (touch-свайп, indicators, `transform: translateX`).
- [ ] **Фильтрация** → `ProductFilterService`: чистые функции над `Product[]`,
      взаимоисключающие фильтры, breadcrumb; состояние через query-параметры роутера.
- [ ] **Меню/подменю** → состояние в компоненте, закрытие по клику вне.

## Этап 6. Сверка «точь-в-точь»
- [ ] `ng serve`, сравнить с оригиналом: главная, Price, каталог, каждый фильтр,
      карусели, мобильная ширина (в оригинале одна `@media`).
- [ ] Проверить пути к изображениям после транслитерации.

## Этап 7. Билд и деплой
- [ ] `ng build`, проверить `dist/`.
- [ ] GitHub Pages: `base-href`, `CNAME`, 404-фолбэк для SPA-роутинга.

## Проверка на каждом этапе
Сборка `ng build` без ошибок + визуальная сверка с оригиналом.
Автотесты не создаём (в оригинале их нет), если не будет отдельной просьбы.

## Справка по оригиналу (`../Matrix1`)
- Объём: 6 каруселей, 3 категории услуг, ~15 активных линий продукции,
  138 изображений (~20 МБ), одна `@media`.
- Ключевая особенность оригинала: у товаров нет явных метаданных — гамма/категория/тип волос
  выводятся сопоставлением подстрок в путях к картинкам. В Angular заменяем на явную модель.
