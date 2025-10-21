# Налаштування відстеження конверсій

## Що було зроблено

1. **Створено окрему сторінку контакту** (`/contact`) замість попапа
2. **Створено сторінку подяки** (`/thanks`) для відстеження конверсій
3. **Додано параметри відстеження джерела** - кожна кнопка передає параметр `source` у URL
4. **Підготовлено код для Google Analytics** в `index.html`
5. **Додано відправку подій конверсії** на сторінку подяки
6. **Налаштовано перенаправлення** з форми контакту на сторінку подяки після успішної відправки

## Джерела трафіку

Кожна кнопка на сайті тепер веде на `/contact` з унікальним параметром джерела:

- `?source=header-desktop` - кнопка в хедері (десктоп)
- `?source=header-mobile` - кнопка в хедері (мобільна версія)
- `?source=hero` - кнопка на головному банері
- `?source=about` - кнопка в секції "Про нас"
- `?source=contact-section` - кнопка в секції контактів
- `?source=auto-scroll` - автоматичне перенаправлення при скролі
- `?source=auto-timer` - автоматичне перенаправлення за таймером

## Налаштування Google Analytics

### 1. Отримайте Google Analytics Measurement ID

1. Перейдіть на [Google Analytics](https://analytics.google.com/)
2. Створіть новий property або використайте існуючий
3. Знайдіть Measurement ID (формат: `G-XXXXXXXXXX`)

### 2. Додайте ID в код

В файлі `index.html` замініть `GA_MEASUREMENT_ID` на ваш реальний ID:

```javascript
// Замініть GA_MEASUREMENT_ID на ваш ID (наприклад: G-ABC123XYZ)
gtag('config', 'GA_MEASUREMENT_ID');
```

### 3. Налаштуйте цілі (Goals) в Google Analytics

1. В Google Analytics перейдіть до Admin → Goals
2. Створіть нову ціль:
   - Type: Custom
   - Goal description: "Успішна відправка форми"
   - Goal details:
     - Type: Destination
     - Destination: `/thanks`
     - Value: можете призначити грошову вартість конверсії

**Важливо:** Тепер конверсії відстежуються на сторінці `/thanks`, а не `/contact`

### 4. Налаштуйте події конверсії

Форма автоматично відправляє подію при успішній відправці:

```javascript
gtag('event', 'conversion', {
  'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
  'value': 1.0,
  'currency': 'UAH'
});
```

Для налаштування:
1. Отримайте Conversion ID та Label з Google Ads
2. Замініть `AW-CONVERSION_ID/CONVERSION_LABEL` на ваші значення

## Google Tag Manager (опціонально)

Якщо використовуєте GTM:

1. Розкоментуйте код GTM в `index.html`
2. Замініть `GTM-XXXX` на ваш Container ID
3. Налаштуйте тригери в GTM:
   - Page View trigger для `/contact`
   - Form Submit trigger для відстеження відправки форми

## UTM параметри

Форма також підтримує стандартні UTM параметри:
- `utm_source` - джерело трафіку
- `utm_medium` - тип трафіку
- `utm_campaign` - назва кампанії

Приклад: `/contact?utm_source=google&utm_medium=cpc&utm_campaign=laser-cutting`

## Дані що відправляються в Google Sheets

Кожна заявка містить:
- Ім'я та телефон користувача
- Питання (якщо вказано)
- Час відправки
- Джерело (`source`)
- UTM параметри
- Повний URL сторінки

## Перевірка роботи

1. Встановіть [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
2. Відкрийте DevTools → Console
3. Перейдіть на `/contact` різними способами
4. Перевірте що події відправляються

## Facebook Pixel (додатково)

Для додавання Facebook Pixel:

1. Додайте код в `index.html`:
```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

2. В `ContactForm.tsx` додайте відстеження події:
```javascript
// Після успішної відправки форми
if (typeof window !== 'undefined' && window.fbq) {
  window.fbq('track', 'Lead');
}
```

## Сторінка подяки (/thanks)

### Функціональність
- **Автоматичне відстеження конверсій** для Google Analytics, Facebook Pixel, Yandex.Metrica
- **Збереження UTM параметрів** з форми контакту
- **Інформація про наступні кроки** для користувача
- **Контактна інформація** для прямого зв'язку
- **Кнопки навігації** для повернення або переходу на головну

### Відстеження подій
Сторінка автоматично відправляє:
1. `conversion` - подія конверсії для Google Ads
2. `page_view` - перегляд сторінки подяки
3. `form_submit_success` - успішна відправка форми
4. `Lead` - подія для Facebook Pixel (якщо налаштований)
5. `CONTACT_FORM_SUCCESS` - ціль для Yandex.Metrica (якщо налаштована)

### Параметри URL
Сторінка отримує всі параметри з форми контакту:
- `source` - джерело переходу
- `utm_source`, `utm_medium`, `utm_campaign` - UTM параметри

## Підтримка

При виникненні питань:
1. Перевірте консоль браузера на помилки
2. Використайте Google Tag Assistant для діагностики
3. Перевірте Real-Time звіти в Google Analytics
4. Перевірте що користувачі потрапляють на `/thanks` після відправки форми
