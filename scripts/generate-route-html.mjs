import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const siteUrl = 'https://www.armind.com.ua';

const routes = [
  {
    path: 'laser-cutting',
    title: 'Лазерна різка металу в Одесі - Армада Індастрі | Точність до 0.1мм',
    description: 'Професійна лазерна різка металу до 25мм в Одесі. Високоточна обробка, швидкі терміни виконання від 24 годин. Сталь, нержавіюча сталь, алюміній. Безкоштовна консультація.',
    keywords: 'лазерна різка Одеса, різка металу лазером, лазерна різка сталі, різка нержавіючої сталі, різка алюмінію, металообробка Одеса',
    ogTitle: 'Лазерна різка металу - Армада Індастрі',
    ogDescription: 'Високоточна лазерна різка металу до 25мм. Сталь, нержавіюча сталь, алюміній.',
    ogImage: `${siteUrl}/og-laser-cutting.png`,
    heading: 'Лазерна різка металу',
    intro: 'Послуга лазерної різки металу в Одесі з високою точністю, швидкими термінами та сучасним обладнанням.'
  },
  {
    path: 'precise-bending',
    title: 'Професійне згинання металу в Одесі - Армада Індастрі | Точність до 0.1мм',
    description: 'Професійне згинання листового металу в Одесі. Сталь, нержавіюча сталь, алюміній. Точність до 0.1мм, різні радіуси згину. Швидкі терміни виконання, професійне обладнання.',
    keywords: 'згинання металу Одеса, гідравлічне згинання, листогібка, згинання сталі, згинання нержавійки, згинання алюмінію, металообробка Одеса',
    ogTitle: 'Згинання металу - Армада Індастрі',
    ogDescription: 'Професійне згинання листового металу. Сталь, нержавіюча сталь, алюміній. Точність до 0.1мм.',
    ogImage: `${siteUrl}/og-bending.png`,
    heading: 'Згинання металу',
    intro: 'Професійне CNC-згинання листового металу в Одесі для серійних та індивідуальних замовлень.'
  },
  {
    path: 'metal-welding',
    title: 'Зварювання металу в Одесі - Армада Індастрі | Аргонове, напівавтоматичне',
    description: 'Професійне зварювання металу в Одесі: аргонове (TIG) та напівавтоматичне (MIG/MAG). Сталь, нержавіюча сталь, алюміній. Тонкий шов, мінімальні деформації, висока точність.',
    keywords: 'зварювання металу Одеса, аргонове зварювання, TIG зварювання, MIG зварювання, напівавтоматичне зварювання, зварювання нержавійки',
    ogTitle: 'Зварювання металу - Армада Індастрі',
    ogDescription: 'Аргонове та напівавтоматичне зварювання сталі, нержавійки, алюмінію. Тонкий шов, мінімальні деформації.',
    ogImage: `${siteUrl}/og-welding.png`,
    heading: 'Зварювання металу',
    intro: 'Аргонове та напівавтоматичне зварювання в Одесі для сталі, нержавійки та алюмінію.'
  },
  {
    path: 'powder-coating',
    title: 'Порошкове фарбування металу в Одесі - Армада Індастрі | 200+ кольорів RAL',
    description: 'Порошкове фарбування металу в Одесі. 200+ кольорів RAL, екологічні матеріали, стійке покриття. Термін виконання від 3 днів. Підготовка поверхні включена.',
    keywords: 'порошкове фарбування Одеса, фарбування металу, RAL фарбування, покриття металу, захист від корозії, декоративне покриття',
    ogTitle: 'Порошкове фарбування металу - Армада Індастрі',
    ogDescription: '200+ кольорів RAL, екологічні матеріали, стійке покриття. Термін від 3 днів.',
    ogImage: `${siteUrl}/og-powder-coating.png`,
    heading: 'Порошкове фарбування металу',
    intro: 'Послуги порошкового фарбування металу в Одесі з широкою палітрою RAL та довговічним покриттям.'
  },
  {
    path: 'complex-manufacturing',
    title: 'Комплексне виготовлення металевих конструкцій в Одесі - Армада Індастрі',
    description: 'Повний цикл виробництва металевих конструкцій в Одесі: проектування, різка, згинання, зварювання, фарбування. Сталь, нержавіюча сталь, алюміній. Від одиничних виробів до серійного виробництва.',
    keywords: 'комплексне виготовлення металевих конструкцій Одеса, металеві конструкції, виробництво металевих виробів, металообробка Одеса',
    ogTitle: 'Комплексне виготовлення металевих конструкцій - Армада Індастрі',
    ogDescription: 'Повний цикл виробництва металевих конструкцій. Проектування, різка, згинання, зварювання, фарбування.',
    ogImage: `${siteUrl}/og-complex.png`,
    heading: 'Комплексне виготовлення металевих конструкцій',
    intro: 'Повний цикл виробництва металевих конструкцій в Одесі: від проектування до фінальної обробки.'
  },
  {
    path: 'contact',
    title: 'Контакти - Армада Індастрі | Одеса, вул. Миколи Боровського, 28',
    description: 'Зв\'яжіться з Армада Індастрі в Одесі: +380 (93) 423-61-39, armindind@gmail.com, вул. Миколи Боровського, 28. Безкоштовна консультація з лазерної різки та обробки металу.',
    keywords: 'контакти Армада Індастрі, лазерна різка контакти Одеса, обробка металу телефон, металообробка адреса',
    ogTitle: 'Контакти - Армада Індастрі',
    ogDescription: 'Зв\'яжіться з нами для обговорення вашого проекту. Безкоштовна консультація.',
    ogImage: `${siteUrl}/og-contact.png`,
    heading: 'Контакти Армада Індастрі',
    intro: 'Контакти, адреса та телефон Армада Індастрі в Одесі для консультації та розрахунку вартості робіт.'
  },
  {
    path: 'thanks',
    title: 'Дякуємо за звернення - Армада Індастрі',
    description: 'Дякуємо за вашу заявку! Наш менеджер зв\'яжеться з вами найближчим часом.',
    keywords: 'дякуємо, заявка відправлена, спасибо, заявка отправлена',
    ogTitle: 'Дякуємо за звернення - Армада Індастрі',
    ogDescription: 'Ваша заявка прийнята. Наш менеджер зв\'яжеться з вами найближчим часом.',
    ogImage: `${siteUrl}/og-image.png`,
    heading: 'Дякуємо за звернення',
    intro: 'Вашу заявку прийнято. Ми зв\'яжемося з вами найближчим часом.'
  }
];

const replaceTagContent = (html, regex, value) => {
  if (!regex.test(html)) {
    throw new Error(`Pattern not found: ${regex}`);
  }

  return html.replace(regex, value);
};

const buildBreadcrumbJson = ({ ogTitle, canonicalUrl }) => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Головна", "item": `${siteUrl}/` },
    { "@type": "ListItem", "position": 2, "name": ogTitle, "item": canonicalUrl }
  ]
});

const buildNoscript = ({ heading, intro, canonicalUrl }) => `
    <noscript>
      <main>
        <h1>${heading}</h1>
        <p>${intro}</p>
        <nav><a href="${siteUrl}/">Головна</a> → <a href="${canonicalUrl}">${heading}</a></nav>
      </main>
    </noscript>`;

const template = await readFile(indexPath, 'utf8');

for (const route of routes) {
  const canonicalUrl = `${siteUrl}/${route.path}`;
  let html = template;

  html = replaceTagContent(html, /<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);
  html = replaceTagContent(html, /<meta name="description" content="[\s\S]*?"\s*\/>/, `<meta name="description" content="${route.description}" />`);
  html = replaceTagContent(html, /<meta name="keywords" content="[\s\S]*?"\s*\/>/, `<meta name="keywords" content="${route.keywords}" />`);
  if (route.robots) {
    html = replaceTagContent(html, /<meta name="robots" content="[\s\S]*?"\s*\/>/, `<meta name="robots" content="${route.robots}" />`);
  }
  html = replaceTagContent(html, /<link rel="canonical" href="[\s\S]*?"\s*\/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = replaceTagContent(html, /<meta property="og:title" content="[\s\S]*?"\s*\/>/, `<meta property="og:title" content="${route.ogTitle}" />`);
  html = replaceTagContent(html, /<meta property="og:description" content="[\s\S]*?"\s*\/>/, `<meta property="og:description" content="${route.ogDescription}" />`);
  html = replaceTagContent(html, /<meta property="og:url" content="[\s\S]*?"\s*\/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = replaceTagContent(html, /<meta property="og:image" content="[\s\S]*?"\s*\/>/, `<meta property="og:image" content="${route.ogImage}" />`);
  html = replaceTagContent(html, /<meta property="og:image:alt" content="[\s\S]*?"\s*\/>/, `<meta property="og:image:alt" content="${route.ogTitle}" />`);
  html = replaceTagContent(html, /<meta name="twitter:title" content="[\s\S]*?"\s*\/>/, `<meta name="twitter:title" content="${route.ogTitle}" />`);
  html = replaceTagContent(html, /<meta name="twitter:description" content="[\s\S]*?"\s*\/>/, `<meta name="twitter:description" content="${route.ogDescription}" />`);
  html = replaceTagContent(html, /<meta name="twitter:url" content="[\s\S]*?"\s*\/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`);
  html = replaceTagContent(html, /<meta name="twitter:image" content="[\s\S]*?"\s*\/>/, `<meta name="twitter:image" content="${route.ogImage}" />`);
  html = replaceTagContent(html, /<meta name="twitter:image:alt" content="[\s\S]*?"\s*\/>/, `<meta name="twitter:image:alt" content="${route.ogTitle}" />`);
  // Inject breadcrumb structured data before </head>
  html = html.replace('</head>', `  <script type="application/ld+json">${buildBreadcrumbJson({ ogTitle: route.ogTitle, canonicalUrl })}</script>\n  </head>`);
  html = replaceTagContent(html, /<body>/, `<body>${buildNoscript({ heading: route.heading, intro: route.intro, canonicalUrl })}`);

  const routeDir = path.join(distDir, route.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), html, 'utf8');
}

console.log(`Generated static HTML for ${routes.length} routes`);