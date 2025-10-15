# Налаштування Google Sheets для форми зворотного зв'язку

## Крок 1: Створення Google Таблиці

1. Відкрийте [Google Sheets](https://sheets.google.com)
2. Створіть нову таблицю з назвою "Заявки з сайту Армінд"
3. У першому рядку створіть заголовки колонок:
   - A1: `Дата та час`
   - B1: `Ім'я`
   - C1: `Телефон`
   - D1: `Питання`
   - E1: `Сторінка`

## Крок 2: Створення Google Apps Script

1. У вашій таблиці відкрийте меню **Розширення** → **Apps Script**
2. Видаліть весь код за замовчуванням
3. Вставте наступний код:

```javascript
function doPost(e) {
  try {
    // Отримуємо дані з запиту
    const data = JSON.parse(e.postData.contents);
    
    // Відкриваємо активну таблицю
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Додаємо новий рядок з даними
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.phone,
      data.question,
      data.source
    ]);
    
    // Повертаємо успішну відповідь
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Логуємо помилку
    Logger.log('Error: ' + error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'This is a POST endpoint' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Крок 3: Деплой Web App

1. Натисніть кнопку **Deploy** (Розгорнути) → **New deployment** (Нове розгортання)
2. Натисніть на іконку шестерні біля "Select type" і виберіть **Web app**
3. Заповніть поля:
   - **Description**: `API для форми зворотного зв'язку`
   - **Execute as**: `Me (ваша пошта)`
   - **Who has access**: `Anyone` (Будь-хто)
4. Натисніть **Deploy** (Розгорнути)
5. **ВАЖЛИВО**: Скопіюйте **Web app URL** - він виглядає так:
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXX/exec
   ```

## Крок 4: Вставка URL у код

1. Відкрийте файл `src/components/ContactPopup.tsx`
2. Знайдіть рядок:
   ```typescript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";
   ```
3. Замініть `YOUR_GOOGLE_SCRIPT_URL_HERE` на ваш скопійований URL:
   ```typescript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXX/exec";
   ```
4. Збережіть файл

## Крок 5: Тестування

1. Збудуйте проект: `npm run build`
2. Запустіть локально: `npm run dev`
3. Заповніть форму на сайті
4. Перевірте чи з'явився новий рядок у вашій Google Таблиці

## Додаткові можливості

### Автоматичні сповіщення на email

Додайте цей код у ваш Apps Script для отримання email-сповіщень:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.phone,
      data.question,
      data.source
    ]);
    
    // Відправка email-сповіщення
    const emailSubject = '🔔 Нова заявка з сайту Армінд';
    const emailBody = `
      Нова заявка з сайту!
      
      Дата та час: ${data.timestamp}
      Ім'я: ${data.name}
      Телефон: ${data.phone}
      Питання: ${data.question}
      Сторінка: ${data.source}
      
      Перейдіть до таблиці: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}
    `;
    
    // ЗАМІНІТЬ на вашу email-адресу
    MailApp.sendEmail('armindind@gmail.com', emailSubject, emailBody);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Форматування таблиці

Для кращого вигляду можна додати:
- Жирний шрифт для заголовків
- Автоматичну ширину колонок
- Заморожування першого рядка
- Фільтри

## Примітки

- Запити з `mode: 'no-cors'` не повертають відповідь, тому ми не можемо перевірити статус
- Якщо потрібна перевірка статусу, налаштуйте CORS у Apps Script
- Дані зберігаються миттєво після відправки
- Безпека: URL Web App можна зробити приватним, але тоді потрібна авторизація

## Troubleshooting

**Проблема**: Дані не потрапляють у таблицю
- Перевірте чи правильно вставили URL
- Перевірте чи встановили доступ "Anyone" при deploy
- Подивіться логи в Apps Script: View → Logs

**Проблема**: Помилка авторизації
- Повторіть deploy з правильними налаштуваннями доступу
- Переконайтесь що вибрали "Execute as: Me"

**Проблема**: Email не приходить
- Перевірте чи правильно вказана email-адреса
- Gmail може блокувати автоматичні листи - перевірте спам

