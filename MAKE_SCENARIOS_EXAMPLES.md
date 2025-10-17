# 🎯 Приклади Make.com сценаріїв

Цей документ містить готові шаблони сценаріїв для платформи Make.com, які ви можете використовувати з вашою формою контакту.

## 📋 Базові сценарії

### 1. Простий сценарій: Email + Google Sheets

```
Webhook → Router → [
  ├── Gmail: Send Email
  └── Google Sheets: Add Row
]
```

**Налаштування Gmail модуля:**
- To: ваш email менеджера
- Subject: `Нова заявка з сайту від {{name}}`
- Body: 
```
Нова заявка з сайту!

Ім'я: {{name}}
Телефон: {{phone}}
Питання: {{question}}
Час: {{timestamp}}
Джерело: {{source}}
Сторінка: {{page_url}}

UTM мітки:
- Джерело: {{utm_source}}
- Медіум: {{utm_medium}}
- Кампанія: {{utm_campaign}}
```

**Налаштування Google Sheets:**
- Spreadsheet: оберіть вашу таблицю
- Sheet: "Заявки"
- Columns: A=timestamp, B=name, C=phone, D=question, E=source, F=utm_source, G=utm_medium, H=utm_campaign, I=page_url

### 2. Telegram сповіщення

```
Webhook → Telegram: Send Message
```

**Налаштування Telegram:**
- Chat ID: ваш чат або група
- Message:
```
🔔 *Нова заявка з сайту*

👤 *Клієнт:* {{name}}
📞 *Телефон:* {{phone}}
❓ *Питання:* {{question}}
⏰ *Час:* {{timestamp}}
📍 *Джерело:* {{source}}

{{#if utm_source}}
📊 *UTM:* {{utm_source}} / {{utm_medium}} / {{utm_campaign}}
{{/if}}

🔗 [Сторінка]({{page_url}})
```

### 3. CRM інтеграція (Bitrix24)

```
Webhook → Bitrix24: Create Lead
```

**Налаштування Bitrix24:**
- Title: `Заявка з сайту - {{name}}`
- Name: `{{name}}`
- Phone: `{{phone}}`
- Comments: `{{question}}`
- Source ID: встановіть відповідний ID джерела
- UTM Source: `{{utm_source}}`
- UTM Medium: `{{utm_medium}}`
- UTM Campaign: `{{utm_campaign}}`

## 🚀 Розширені сценарії

### 4. Повна автоматизація з фільтрацією

```
Webhook → Router → [
  ├── Filter (якщо phone містить "+380") → [
  │   ├── Telegram: Urgent notification
  │   └── SMS: Send welcome SMS
  │   ]
  ├── Gmail: Send to manager
  ├── Google Sheets: Log entry
  └── Bitrix24: Create lead
]
```

**Фільтр для українських номерів:**
- Condition: `{{phone}}` contains `+380`

**SMS модуль (наприклад, Twilio):**
- To: `{{phone}}`
- Message: `Дякуємо за звернення! Наш менеджер зв'яжеться з вами протягом 15 хвилин.`

### 5. Аналітика та сегментація

```
Webhook → Router → [
  ├── Filter (UTM_SOURCE = "google") → Google Ads Conversion
  ├── Filter (UTM_SOURCE = "facebook") → Facebook Conversion  
  ├── Filter (SOURCE = "auto-timer") → Slack: Hot lead alert
  └── Google Analytics: Custom Event
]
```

**Google Ads Conversion:**
- Conversion Action: ваш ID конверсії
- Conversion Value: 100 (або ваша оцінка ліда)

**Facebook Conversion:**
- Event Type: "Lead"
- Custom Data: phone, name

### 6. Автоматичний follow-up

```
Webhook → [
  ├── Immediate Response → [
  │   ├── Email: Instant reply
  │   └── SMS: Confirmation
  │   ]
  └── Delay (15 minutes) → [
      ├── Check CRM status
      └── If not contacted → Slack: Reminder
      ]
]
```

**Email автовідповідь:**
- To: `{{email}}` (якщо додасте поле email у форму)
- Subject: `Дякуємо за звернення!`
- Body: готовий шаблон з інформацією про компанію

## 🎨 Кастомізація за джерелами

### Різні дії для різних джерел:

```
Webhook → Router → [
  ├── Filter (source = "contact-form") → Standard flow
  ├── Filter (source = "popup-redirect") → High priority flow
  ├── Filter (source = "quick-contact-button") → Immediate call flow
  └── Filter (source = "auto-scroll") → Retargeting flow
]
```

## 📊 Інтеграція з аналітикою

### Google Analytics 4:

```
Webhook → Google Analytics: Custom Event
```

**Налаштування:**
- Event Name: "form_submit"
- Parameters:
  - source: `{{source}}`
  - utm_source: `{{utm_source}}`
  - utm_medium: `{{utm_medium}}`
  - utm_campaign: `{{utm_campaign}}`

### Додавання в Google Sheets з аналітикою:

```
Webhook → Google Sheets: Advanced Add Row
```

**Додаткові колонки для аналітики:**
- Date: `{{formatDate(timestamp, "YYYY-MM-DD")}}`
- Hour: `{{formatDate(timestamp, "HH")}}`
- Day of Week: `{{formatDate(timestamp, "dddd")}}`
- Lead Score: формула на основі джерела та UTM

## 🔄 Обробка помилок

### Сценарій з retry механізмом:

```
Webhook → Try → [
  Success → Normal flow
  Error → [
    ├── Delay (30 seconds)
    ├── Try Again (max 3 times)
    └── If still fails → [
        ├── Log to Error Sheet
        └── Alert admin via Slack
        ]
  ]
]
```

## 💡 Корисні поради

### 1. Фільтри для якості лідів:
```javascript
// Фільтр валідного телефону
{{phone}} matches pattern "^\+380\d{9}$"

// Фільтр довжини імені
{{length(name)}} > 2

// Фільтр спам-слів
NOT {{contains(question; "spam,test,тест")}}
```

### 2. Форматування даних:
```javascript
// Очистка телефону
{{replace(replace(phone; " "; ""); "-"; "")}}

// Капіталізація імені  
{{capitalize(name)}}

// Форматування дати
{{formatDate(timestamp; "DD.MM.YYYY о HH:mm")}}
```

### 3. Умовна логіка:
```javascript
// Пріоритет за джерелом
{{if(source = "quick-contact-button"; "Високий"; "Звичайний")}}

// Час роботи
{{if(formatDate(now; "HH") >= 9 AND formatDate(now; "HH") < 18; "Робочий час"; "Поза робочим часом")}}
```

## 🚀 Готові шаблони для імпорту

### Template 1: Базовий Business Flow
```json
{
  "scenario": "basic_business",
  "modules": [
    {"type": "webhook", "name": "Прийом заявки"},
    {"type": "gmail", "name": "Сповіщення менеджеру"},  
    {"type": "google_sheets", "name": "Збереження в таблицю"},
    {"type": "telegram", "name": "Повідомлення в чат"}
  ]
}
```

### Template 2: E-commerce + Retargeting
```json
{
  "scenario": "ecommerce_advanced", 
  "modules": [
    {"type": "webhook", "name": "Прийом заявки"},
    {"type": "router", "filters": ["utm_source", "source_type"]},
    {"type": "google_ads", "name": "Конверсія Google Ads"},
    {"type": "facebook", "name": "Конверсія Facebook"},
    {"type": "crm", "name": "Створення ліда"},
    {"type": "email_automation", "name": "Запуск email послідовності"}
  ]
}
```

Виберіть відповідний шаблон та адаптуйте під свої потреби!
