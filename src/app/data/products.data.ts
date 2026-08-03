import { Gamma, Product, ProductLine } from '../models/product.model';
import { deriveCategory, deriveHairTypes } from './derive';

/**
 * Каталог продукции. Гамма задаётся явно у каждой линейки, а тип продукта
 * и типы волос вычисляются функциями deriveCategory / deriveHairTypes при загрузке.
 * Скрытые (закомментированные в оригинале) линейки и товары помечены hidden: true.
 */

/** Сырой товар до вычисления category / hairTypes. */
interface RawProduct {
  image: string;
  title: string;
  description?: string;
  volume: string;
  price: string;
  hidden?: boolean;
  alsoInGammas?: Gamma[];
}

/** Сырая линейка. */
interface RawLine {
  gamma: Gamma;
  title: string;
  briefDescription: string;
  description: string;
  lineImage: string;
  hidden?: boolean;
  products: RawProduct[];
}

const RAW_LINES: RawLine[] = [
  {
    gamma: 'unbreak-my-blonde',
    title: 'Unbreak My Blonde',
    briefDescription: 'Для восстановления и укрепления поврежденных волос после осветления.',
    description:
      'Matrix Total Results Unbreak My Blonde - профессиональный уход для осветлённых, сухих и жёстких волос. Формула с лимонной кислотой укрепляет, питает и защищает от повреждений. Без сульфатов, подходит для тонких и чувствительных волос.',
    lineImage: 'products/main of line/main unbreak.jpg',
    hidden: true,
    products: [
      { image: 'products/unbreak-my-blonde/sham300.jpg', title: 'Шампунь Unbreak My Blonde', description: 'очищает и восстанавливает осветленные волосы', volume: '300 мл', price: '5 000 ₸' },
      { image: 'products/unbreak-my-blonde/cond300.jpg', title: 'Кондиционер Unbreak My Blonde', description: 'Питает и восстанавливает осветленные волосы', volume: '300 мл', price: '5 500 ₸' },
      { image: 'products/unbreak-my-blonde/sham1000.jpg', title: 'Шампунь Unbreak My Blonde', description: 'Oчищает и восстанавливает осветленные волосы', volume: '1000 мл', price: '11 000 ₸' },
      { image: 'products/unbreak-my-blonde/cond1000.jpg', title: 'Кондиционер Unbreak My Blonde', description: 'Питает и восстанавливает осветленные волосы', volume: '1000 мл', price: '12 500 ₸' },
      { image: 'products/unbreak-my-blonde/mask.jpg', title: 'Маска Unbreak My Blonde', description: 'Интенсивно восстанавливает и питает осветленные волосы', volume: '150 мл', price: '8 500 ₸' },
    ],
  },
  {
    gamma: 'color-obsessed',
    title: 'Color Obsessed',
    briefDescription: 'Для сохранения насыщенности цвета окрашенных волос и защиты от потускнения до следующего окрашивания.',
    description:
      'Линия Color Obsessed помогает дольше сохранить насыщенность оттенка после окрашивания. Содержит комплекс керамидов и антиоксидантов, которые укрепляют структуру волос, предотвращают вымывание цвета и защищают от негативного воздействия окружающей среды.',
    lineImage: 'products/main of line/main color obsessed.jpg',
    products: [
      { image: 'products/color-obsessed/sham300.jpg', title: 'Шампунь Color Obsessed', description: 'Очищает и защищает окрашенные волосы', volume: '300 мл', price: '5 300 ₸' },
      { image: 'products/color-obsessed/cond300.jpg', title: 'Кондиционер Color Obsessed', description: 'Увлажняет и защищает окрашенные волосы', volume: '300 мл', price: '5 950 ₸' },
      { image: 'products/color-obsessed/sham1000.jpg', title: 'Шампунь Color Obsessed', description: 'Очищает и защищает окрашенные волосы', volume: '1000 мл', price: '11 900 ₸' },
      { image: 'products/color-obsessed/sham1000.jpg', title: 'Кондиционер Color Obsessed', description: 'Увлажняет и защищает окрашенные волосы', volume: '1000 мл', price: '14 100 ₸' },
    ],
  },
  {
    gamma: 'glow-mania',
    title: 'Glow Mania',
    briefDescription: 'Для окрашенных и тусклых волос. Гамма Glow Mania придает сияние и блеск.',
    description:
      'Гамма подходит для тусклых и окрашенных волос, поврежденная поверхность которых перестает отражать свет. Благодаря продуманному составу все продукты линии работают над восстановлением бриллиантового блеска волос и защитой их цвета в двух направлениях: изнутри и снаружи.',
    lineImage: 'products/main of line/main glow mania.jpg',
    products: [
      { image: 'products/glow-mania/sham300.jpg', title: 'Шампунь Glow Mania', description: 'Очищает и придает блеск волосам', volume: '300 мл', price: '5 700 ₸' },
      { image: 'products/glow-mania/cond300.jpg', title: 'Кондиционер Glow Mania', description: 'Питает и придает блеск тусклым волосам', volume: '300 мл', price: '6800 ₸' },
      { image: 'products/glow-mania/sham1000.jpg', title: 'Шампунь Glow Mania', description: 'очищает и придает блеск волосам', volume: '1000 мл', price: '12 300 ₸' },
      { image: 'products/glow-mania/cond1000.jpg', title: 'Кондиционер Glow Mania', description: 'Питает и придает блеск волосам', volume: '1000 мл', price: '13 600 ₸' },
      { image: 'products/glow-mania/mask.jpg', title: 'Маска Glow Mania', volume: '500 мл', price: '12 900 ₸' },
      { image: 'products/glow-mania/spray.jpg', title: 'Спрей Glow Mania', description: 'Мгновенно придает блеск и сияние', volume: '150 мл', price: '9 200 ₸' },
    ],
  },
  {
    gamma: 'keep-me-vivid',
    title: 'Keep Me Vivid',
    briefDescription: 'Для сохранения легко вымывающихся ярких и пастельных оттенков серия Keep Me Vivid без сульфатов.',
    description:
      'Ухаживающая косметика для волос Matrix Keep me Vivid разработана для сохранения интенсивности оттенка до 21 дня после окрашивания. Средства гаммы не содержат сульфатов, поэтому красящие пигменты не вымываются с поверхности волос.',
    lineImage: 'products/main of line/main keep me vivid.jpg',
    hidden: true,
    products: [
      { image: 'products/keep-me-vivid/sham300.jpg', title: 'Шампунь Keep Me Vivid', description: 'очищает и сохраняет яркость цвета', volume: '300 мл', price: '4 700 ₸' },
      { image: 'products/keep-me-vivid/cond300.jpg', title: 'Кондиционер Keep Me Vivid', description: 'Питает и защищает яркость окрашенных волос', volume: '300 мл', price: '5 400 ₸' },
      { image: 'products/keep-me-vivid/sham1000.jpg', title: 'Шампунь Keep Me Vivid', description: 'Очищает и сохраняет яркость цвета', volume: '1000 мл', price: '11 500 ₸' },
      { image: 'products/keep-me-vivid/cond1000.jpg', title: 'Кондиционер Keep Me Vivid', description: 'Питает и защищает яркость окрашенных волос', volume: '1000 мл', price: '12 600 ₸' },
    ],
  },
  {
    gamma: 'brass-off',
    title: 'Brass Off',
    briefDescription: 'Для нейтрализации желтого и поддержания чистоты оттенка холодного блонда.',
    description:
      'Профессиональная линия средств Brass Off  представляет собой систему ухода «холодный блонд» с синим пигментом, которая обеспечивает нейтрализацию нежелательного желтого подтона и длительную стойкость результата салонного окрашивания.',
    lineImage: 'products/main of line/main brass off.jpg',
    products: [
      { image: 'products/brass-off/sham300.jpg', title: 'Шампунь Brass Off', description: 'Нейтрализует желтизну на осветленных волосах', volume: '300 мл', price: '5 400 ₸' },
      { image: 'products/brass-off/cond300.jpg', title: 'Кондиционер Brass Off', description: 'Питает и нейтрализует желтизну', volume: '300 мл', price: '6 300 ₸' },
      { image: 'products/brass-off/sham1000.jpg', title: 'Шампунь Brass Off', description: 'Нейтрализует желтизну на осветленных волосах', volume: '1000 мл', price: '11 900 ₸' },
      { image: 'products/brass-off/cond1000.jpg', title: 'Кондиционер Brass Off', description: 'Питает и нейтрализует желтизну', volume: '1000 мл', price: '14 100 ₸' },
      { image: 'products/brass-off/mask.jpg', title: 'Маска Brass Off', description: 'Интенсивно питает и нейтрализует желтизну', volume: '200 мл', price: '10 500 ₸' },
    ],
  },
  {
    gamma: 'so-silver',
    title: 'So Silver',
    briefDescription: 'Для ухода и поддержания холодного оттенка светлых, блондированных, мелированных и седых волос.',
    description:
      'Профессиональная линия средств для ухода за светлыми, седыми и обесцвеченными волосами. Формула с фиолетовым пигментом нейтрализует нежелательную желтизну и теплый медный подтон, усиливает холодное сияние и придает волосам серебристый блеск.',
    lineImage: 'products/main of line/main so silver.jpg',
    products: [
      { image: 'products/so-silver/sham300.jpg', title: 'Шампунь So Silver', description: 'Нейтрализует желтизну и усиливает холодное сияние', volume: '300 мл', price: '5 400 ₸' },
      { image: 'products/so-silver/cond300.jpg', title: 'Кондиционер So Silver', description: 'Питает и усиливает холодное сияние светлых волос', volume: '300 мл', price: '6 200 ₸' },
      { image: 'products/so-silver/sham1000.jpg', title: 'Шампунь So Silver', description: 'Нейтрализует желтизну и усиливает холодное сияние', volume: '1000 мл', price: '11 000 ₸' },
      { image: 'products/so-silver/cond1000.jpg', title: 'Кондиционер So Silver', description: 'Питает и усиливает холодное сияние светлых волос', volume: '1000 мл', price: '13 600 ₸' },
      { image: 'products/so-silver/mask.jpg', title: 'Маска So Silver', description: 'Интенсивно питает и усиливает холодное сияние', volume: '200 мл', price: '9 600 ₸' },
    ],
  },
  {
    gamma: 'high-amplify',
    title: 'High Amplify',
    briefDescription: 'Линия для придания волосам объема от корней, укрепляет структуру тонких волос, придавая заметную пышность и густоту.',
    description:
      'Линия High Amplify для увеличения объема и густоты волос. Продукты обладают деликатными формулами без силиконов, благодаря чему не утяжеляют пряди. Протеины восполняют дефицит белка в волокнах, повышая плотность каждого волоса.',
    lineImage: 'products/main of line/main high amplify.jpg',
    products: [
      { image: 'products/high-amplify/sham300.jpg', title: 'Шампунь High Amplify', description: 'Придает объем и упругость тонким волосам', volume: '300 мл', price: '5 300 ₸' },
      { image: 'products/high-amplify/cond300.jpg', title: 'Кондиционер High Amplify', description: 'Питает и придает объем без утяжеления', volume: '300 мл', price: '6 500 ₸' },
      { image: 'products/high-amplify/sham1000.jpg', title: 'Шампунь High Amplify', description: 'Придает объем и упругость тонким волосам', volume: '1000 мл', price: '11 900 ₸' },
      { image: 'products/high-amplify/cond1000.jpg', title: 'Кондиционер High Amplify', description: 'Питает и придает объем без утяжеления', volume: '1000 мл', price: '13 600 ₸' },
      { image: 'products/high-amplify/dry.jpg', title: 'Сухой шампунь High Amplify', description: 'Освежает волосы и придает объем без мытья', volume: '250 мл', price: '6 800 ₸', hidden: true, alsoInGammas: ['styling'] },
      { image: 'products/high-amplify/spray.jpg', title: 'Спрей High Amplify', description: 'Мгновенно придает объем у корней', volume: '250 мл', price: '9 400 ₸', alsoInGammas: ['styling'] },
      { image: 'products/high-amplify/water.jpg', title: 'Ламеллярная вода High Amplify', description: 'Мгновенно восстанавливает и придает объем', volume: '200 мл', price: '7 200 ₸', hidden: true },
    ],
  },
  {
    gamma: 'dark-envy',
    title: 'Dark Envy',
    briefDescription: 'Для темных окрашенных волос. Формула с антиоксидантами защищает цвет и придает глубокий блеск темным волосам.',
    description:
      'Dark Envy - профессиональная линия средств для ухода за темными окрашенными волосами. Формула с антиоксидантами и красным пигменом защищает цвет от выцветания, нейтрализует зеленый оттенок и придает глубокий блеск.',
    lineImage: 'products/main of line/main dark envy.jpg',
    hidden: true,
    products: [
      { image: 'products/dark-envy/sham300.jpg', title: 'Шампунь Dark Envy', description: 'Защищает цвет и придает глубокий блеск', volume: '300 мл', price: '5 500 ₸' },
      { image: 'products/dark-envy/cond300.jpg', title: 'Кондиционер Dark Envy', description: 'Питает и усиливает глубину цвета', volume: '300 мл', price: '6 100 ₸' },
    ],
  },
  {
    gamma: 'mega-sleek',
    title: 'Mega Sleek',
    briefDescription: 'Для придания гладкости непослушным волосам. Формула с маслом ши контролирует пушистость и разглаживает волосы.',
    description:
      'Mega Sleek - профессиональная линия для разглаживания непослушных и вьющихся волос. Питательное масло ши восстанавливает структуру и сглаживает кутикулу, благодаря чему повышается эластичность волоса и сокращается пористость.',
    lineImage: 'products/main of line/main mega sleek.jpg',
    products: [
      { image: 'products/mega-sleek/sham300.jpg', title: 'Шампунь Mega Sleek', description: 'Разглаживает и контролирует пушистость', volume: '300 мл', price: '5 500 ₸' },
      { image: 'products/mega-sleek/cond300.jpg', title: 'Кондиционер Mega Sleek', description: 'Питает и разглаживает непослушные волосы', volume: '300 мл', price: '6 400 ₸' },
      { image: 'products/mega-sleek/sham1000.jpg', title: 'Шампунь Mega Sleek', description: 'Разглаживает и контролирует пушистость', volume: '1000 мл', price: '11 600 ₸' },
      { image: 'products/mega-sleek/cond1000.jpg', title: 'Кондиционер Mega Sleek', description: 'Питает и разглаживает непослушные волосы', volume: '1000 мл', price: '13 500 ₸' },
      { image: 'products/mega-sleek/spray.jpg', title: 'Спрей Mega Sleek', description: 'Защищает от влажности и контролирует пушистость', volume: '200 мл', price: '9 100 ₸' },
    ],
  },
  {
    gamma: 'instacure',
    title: 'Instacure',
    briefDescription: 'Линия Instacure для укрепления ломких волос, способствует восстановлению гладкости и блеска.',
    description:
      'Профессиональная линия средств для восстановления силы волос. До 60% меньше ломкости, гладкие, блестящие локоны - результат использования системы из шампуня, кондиционера и несмываемого спрея-ухода Instacure.',
    lineImage: 'products/main of line/main instacure.jpg',
    products: [
      { image: 'products/instacure/sham300.jpg', title: 'Шампунь Instacure', description: 'Очищает и восстанавливает ломкие волосы', volume: '300 мл', price: '5 700 ₸' },
      { image: 'products/instacure/cond300.jpg', title: 'Кондиционер Instacure', description: 'Питает и восстанавливает ломкие волосы', volume: '300 мл', price: '6 900 ₸' },
      { image: 'products/instacure/sham1000.jpg', title: 'Шампунь Instacure', description: 'Очищает и восстанавливает ломкие волосы', volume: '1000 мл', price: '11 500 ₸' },
      { image: 'products/instacure/cond1000.jpg', title: 'Кондиционер Instacure', description: 'Питает и восстанавливает ломкие волосы', volume: '1000 мл', price: '13 400 ₸' },
      { image: 'products/instacure/spray.jpg', title: 'Спрей Instacure', description: 'Мгновенно восстанавливает и защищает волосы', volume: '200 мл', price: '9 100 ₸' },
      { image: 'products/instacure/spray 500.jpg', title: 'Спрей Instacure', description: 'Для восстановления пористых волос', volume: '500 мл', price: '14 500 ₸' },
    ],
  },
  {
    gamma: 'instacure-bond',
    title: 'Instacure Build-a-Bond',
    briefDescription: 'Линия для глубокого восстановления и защиты поврежденных волос.',
    description:
      'Гамма Instacure Build-A-Bond для восстановления поврежденных и очень поврежденных в результате окрашивания или воздействия термоинструментов волос. Формула с бонд-технологией восстанавливает поврежденные связи внутри волоса, укрепляет их и защищает от дальнейших повреждений.',
    lineImage: 'products/main of line/main instacure build-a-bond.jpg',
    products: [
      { image: 'products/instacure-bond/sham300.jpg', title: 'Шампунь Instacure Build-a-Bond', description: 'Очищает и восстанавливает структуру волос', volume: '300 мл', price: '5 700 ₸' },
      { image: 'products/instacure-bond/cond300.jpg', title: 'Кондиционер Instacure Build-a-Bond', description: 'Питает и восстанавливает поврежденные связи в волосах', volume: '300 мл', price: '6 900 ₸' },
      { image: 'products/instacure-bond/sham1000.jpg', title: 'Шампунь Instacure Build-a-Bond', description: 'Очищает и восстанавливает структуру волос', volume: '1000 мл', price: '12 600 ₸' },
      { image: 'products/instacure-bond/cond1000.jpg', title: 'Кондиционер Instacure Build-a-Bond', description: 'Питает и восстанавливает поврежденные связи в волосах', volume: '1000 мл', price: '14 900 ₸' },
      { image: 'products/instacure-bond/mask.jpg', title: 'Маска Instacure Build-a-Bond', description: 'Интенсивно восстанавливает и укрепляет структуру волос', volume: '250 мл', price: '7 500 ₸' },
      { image: 'products/instacure-bond/balm.jpg', title: 'Бонд-бальзам Instacure Build-a-Bond', description: 'Восстанавливает поврежденные связи и защищает структуру волос', volume: '75 мл', price: '10 100 ₸' },
      { image: 'products/instacure-bond/oil.jpg', title: 'Укрепляющее масло Instacure Build-a-Bond', description: 'Укрепляет и восстанавливает сильно поврежденные волосы', volume: '50 мл', price: '9 500 ₸'},
    ],
  },
  {
    gamma: 'food-for-soft',
    title: 'Food For Soft',
    briefDescription: 'Для ухода за сухими волосами всех типов. Авокадо и гиалуроновая кислота в составе придают длительное увлажнение и превосходное питание.',
    description:
      'Гамма Food For Soft для интенсивного питания и смягчения волос. Формула с маслом авокадо и гиалуроновой кислотой питает волосы, смягчает волосы в 7 раз по сравнению с изначальным состоянием.',
    lineImage: 'products/main of line/main food for soft.jpg',
    products: [
      { image: 'products/food-for-soft/sham300.jpg', title: 'Шампунь Food For Soft', description: 'Очищает и питает волосы', volume: '300 мл', price: '5 600 ₸' },
      { image: 'products/food-for-soft/cond300.jpg', title: 'Кондиционер Food For Soft', description: 'Питает и смягчает волосы', volume: '300 мл', price: '6 900 ₸' },
      { image: 'products/food-for-soft/sham1000.jpg', title: 'Шампунь Food For Soft', description: 'Очищает и питает волосы', volume: '1000 мл', price: '12 900 ₸' },
      { image: 'products/food-for-soft/cond1000.jpg', title: 'Кондиционер Food For Soft', description: 'Питает и смягчает волосы', volume: '1000 мл', price: '14 700 ₸' },
      { image: 'products/food-for-soft/mask.jpg', title: 'Маска Food For Soft', description: 'Интенсивно питает и восстанавливает волосы', volume: '500 мл', price: '16 500 ₸' },
      { image: 'products/food-for-soft/oil.jpg', title: 'Масло-сыворотка Food For Soft', description: 'Интенсивно питает и придает блеск', volume: '50 мл', price: '9 500 ₸' },
    ],
  },
  {
    gamma: 'curl',
    title: 'A Curl Can Dream',
    briefDescription: 'Уход для кудрей всех типов. Линия помогает сформировать легкие волны или идеальные кудри с четким завитком.',
    description:
      'Гамма A Curl Can Dream подходит для тонких, сухих, непослушных волос: волнообразных локонов, мягких и жестких кудрей, крутых «спиралек», афро и химической завивки. Экстракт меда Манука в составе насыщает влагой и восстанавливает локоны, а глицерин удерживает влагу и препятствует расслаиванию кутикулы, что создает блестящие и упругие кудри.',
    lineImage: 'products/main of line/main a curl can dream.jpg',
    products: [
      { image: 'products/curl/sham300.jpg', title: 'Шампунь A Curl Can Dream', description: 'Очищает и питает кудрявые волосы', volume: '300 мл', price: '5 600 ₸' },
      { image: 'products/curl/cond300.jpg', title: 'Кондиционер A Curl Can Dream', description: 'Питает и подчеркивает кудри', volume: '300 мл', price: '6 900 ₸' },
      { image: 'products/curl/sham1000.jpg', title: 'Шампунь A Curl Can Dream', description: 'Очищает и питает кудрявые волосы', volume: '1000 мл', price: '12 500 ₸' },
      { image: 'products/curl/cond1000.jpg', title: 'Кондиционер A Curl Can Dream', description: 'Питает и подчеркивает кудри', volume: '1000 мл', price: '14 700 ₸' },
      { image: 'products/curl/mask280.jpg', title: 'Маска A Curl Can Dream', description: 'Интенсивно питает и восстанавливает кудрявые волосы', volume: '280 мл', price: '6 800 ₸' },
      { image: 'products/curl/mask1000.jpg', title: 'Маска A Curl Can Dream', description: 'Интенсивно питает и восстанавливает кудрявые волосы', volume: '1000 мл', price: '15 500 ₸' },
      { image: 'products/curl/clear300.jpg', title: 'Увлажняющий шампунь A Curl Can Dream', description: 'Интенсивно увлажняет и питает кудрявые волосы', volume: '300 мл', price: '6 100 ₸' },
      { image: 'products/curl/clear1000.jpg', title: 'Увлажняющий шампунь A Curl Can Dream', description: 'Интенсивно увлажняет и питает кудрявые волосы', volume: '1000 мл', price: '13 500 ₸' },
      { image: 'products/curl/spray.jpg', title: 'Спрей A Curl Can Dream', description: 'Увлажняет и активирует кудри', volume: '250 мл', price: '9 200 ₸' },
      { image: 'products/curl/oil.jpg', title: 'Масло A Curl Can Dream', description: 'Питает, увлажняет и придает блеск кудрям', volume: '130 мл', price: '9 800 ₸' },
      { image: 'products/curl/gel.jpg', title: 'Гель A Curl Can Dream', description: 'Фиксирует и подчеркивает кудри', volume: '200 мл', price: '9 500 ₸' },
      { image: 'products/curl/cream.jpg', title: 'Крем A Curl Can Dream', description: 'Питает, увлажняет и моделирует кудри', volume: '500 мл', price: '8 500 ₸', hidden: true },
    ],
  },
  {
    gamma: 'oil-wonders',
    title: 'Oil Wonders',
    briefDescription: 'Коллекция натуральных масел для ухода за волосами: мгновенно увлажняют, питают, придают эластичность без эффекта утяжеления и липкости.',
    description:
      'Профессиональная коллекция натуральных масел для  для ухода и восстановления волос в салоне и дома, созданные по древним рецептурам из Индии, Амазонии и Египта.  В основе формул – ценные натуральные масла редких растений: индийской амлы, экзотического амазонского фрукта мурумуру и египетского гибискуса.',
    lineImage: 'products/main of line/main oil wonders.jpg',
    hidden: true,
    products: [
      { image: 'products/oil-wonders/strength.jpg', title: 'Масло Indian Amla', description: 'Укрепляющее масло для ослабленных волос', volume: '150 мл', price: '7 500 ₸' },
      { image: 'products/oil-wonders/color.jpg', title: 'Масло Egyptian Hibiscus', description: 'Защитное масло для окрашенных волос', volume: '150 мл', price: '7 500 ₸' },
      { image: 'products/oil-wonders/control.jpg', title: 'Масло Amazonian Murumuru', description: 'Разглаживающее масло для непослушных волос', volume: '150 мл', price: '7 500 ₸' },
    ],
  },
  {
    gamma: 'miracle-creator',
    title: 'Miracle Creator',
    briefDescription: 'Многофункциональные средства для ухода за волосами. Обеспечивают комплексный уход и защиту.',
    description:
      'Профессиональная многофункциональная косметика для комплексного ухода за волосами. Обеспечивает питание, защиту от термического воздействия и УФ-лучей, придает блеск и облегчает расчесывание.',
    lineImage: 'products/main of line/main miracle creator.jpg',
    products: [
      { image: 'products/miracle-creator/spray.jpg', title: 'Спрей Miracle Creator', description: 'Многофункциональный спрей 20-в-1', volume: '190 мл', price: '9 200 ₸' },
      { image: 'products/miracle-creator/mask.jpg', title: 'Маска Miracle Creator', description: 'Многофункциональная маска для всех типов волос', volume: '500 мл', price: '14 300 ₸' },
    ],
  },
  {
    gamma: 'total-treat',
    title: 'Total Treat',
    briefDescription: 'Интенсивное восстановление волос. Глубоко питает и восстанавливает поврежденные волосы.',
    description:
      'Линия Total Treat для глубокого восстановления поврежденных волос. Формула с протеинами и керамидами  восстанавливает сухие, поврежденные волосы. Мгновенно придает эластичность и блеск.',
    lineImage: 'products/main of line/main total treat.jpg',
    products: [
      { image: 'products/total-treat/mask.jpg', title: 'Маска Total Treat', description: 'Интенсивно восстанавливает поврежденные волосы', volume: '500 мл', price: '15 100 ₸' },
    ],
  },
  {
    gamma: 'vavoom',
    title: 'Vavoom Spray',
    briefDescription: 'Профессиональные лаки для стайлинга Vavoom Matrix обеспечивают быструю фиксацию прически, не утяжеляют и не склеивают пряди, совершенно невидимы на волосах.',
    description:
      'Средства гаммы Vavoom Matrix обладают хорошей фиксацией и помогают создавать прически любой сложности: пышные укладки, стильные начесы, романтичные локоны. Даже на тонких волосах позволяют добиться стойкого объема и ощущения воздушности.',
    lineImage: 'products/main of line/main vavoom.jpg',
    products: [
      { image: 'products/vavoom/elastic.jpg', title: 'Лак-спрей Vavoom Freezing Spray', description: 'Лак экстра сильной фиксации', volume: '400 мл', price: '7 000 ₸' },
      { image: 'products/vavoom/strong.jpg', title: 'Лак-спрей Vavoom Freezing Spray', description: 'Лак сильной фиксации', volume: '400 мл', price: '7 000 ₸' },
      { image: 'products/vavoom/triple.jpg', title: 'Лак-спрей Vavoom Triple Freeze', description: 'Лак подвижной фиксации', volume: '400 мл', price: '7 000 ₸' },
    ],
  },
  {
    gamma: 'styling',
    title: 'Styling',
    briefDescription: 'Средства для укладки волос. Обеспечивают фиксацию, объем и текстуру.',
    description:
      'Styling средства для укладки волос. Обеспечивают различную степень фиксации, объем, текстуру и защиту от термического воздействия.',
    lineImage: 'products/main of line/main styling.jpg',
    products: [
      { image: 'products/styling/controller.jpg', title: 'Гель Controller', description: 'Гель для моделирования укладки сильной фиксации', volume: '200 мл', price: '7 800 ₸' },
      { image: 'products/styling/overachiever.jpg', title: 'Крем-Паста-Воск Over Achiever', description: 'Многофункциональный воск для текстурирования волос', volume: '50 мл', price: '7 800 ₸' },
      { image: 'products/styling/waxspray.jpg', title: 'Спрей-воск Builder Wax Spray', description: 'Для гибких укладок и акцентных прядей', volume: '250 мл', price: '7 800 ₸' },
      { image: 'products/styling/fixer.jpg', title: 'Лак-спрей Fixer', description: 'Для пластичной фиксации', volume: '400 мл', price: '7 600 ₸' },
      { image: 'products/styling/setter.jpg', title: 'Мусс Matrix Setter', description: 'Для фиксации и блеска', volume: '300 мл', price: '10 200 ₸' },
      { image: 'products/styling/riser.jpg', title: 'Текстурирующая пудра Height Riser', description: 'Для прикорневого объёма', volume: '10 г', price: '7 200 ₸' },
    ],
  },
];

function buildProduct(gamma: Gamma, raw: RawProduct): Product {
  return {
    gamma,
    title: raw.title,
    description: raw.description,
    volume: raw.volume,
    price: raw.price,
    image: raw.image,
    category: deriveCategory(raw.title, raw.description ?? '', raw.image),
    hairTypes: deriveHairTypes(gamma, raw.image, raw.title),
    alsoInGammas: raw.alsoInGammas,
    hidden: raw.hidden,
  };
}

export const PRODUCT_LINES: ProductLine[] = RAW_LINES.map((line) => ({
  gamma: line.gamma,
  title: line.title,
  briefDescription: line.briefDescription,
  description: line.description,
  lineImage: line.lineImage,
  hidden: line.hidden,
  products: line.products.map((raw) => buildProduct(line.gamma, raw)),
}));
