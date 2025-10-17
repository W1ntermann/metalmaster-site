# 🚀 Make.com Integration - Швидкий старт

Ваш сайт тепер підтримує інтеграцію з платформою Make.com для автоматизації обробки заявок!

## ⚡ Швидке налаштування

### 1. Отримайте Webhook URL з Make.com

1. Увійдіть в [make.com](https://make.com)
2. Створіть новий сценарій
3. Додайте модуль "Webhooks" → "Custom webhook"
4. Скопіюйте URL (наприклад: `https://hook.eu1.make.com/abc123def456`)

### 2. Налаштуйте в проекті

Створіть файл `.env` в корені проекту:

```env
VITE_MAKE_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-url-here
```

### 3. Перезапустіть сервер

```bash
npm run dev
```

## ✅ Що вже працює

- ✅ Форма контакту відправляє дані в Make + Google Sheets
- ✅ Автоматична обробка помилок
- ✅ Fallback через Google Sheets
- ✅ Відстеження джерел заявок (UTM мітки)
- ✅ React хуки для легкої інтеграції

## 📊 Структура даних

Ваш Make webhook отримує:

```json
{
  "name": "Ім'я клієнта",
  "phone": "+380931234567", 
  "question": "Питання клієнта",
  "timestamp": "17.10.2025, 14:30",
  "source": "contact-form",
  "utm_source": "google",
  "utm_medium": "cpc", 
  "utm_campaign": "campaign-name",
  "page_url": "https://yoursite.com/contact"
}
```

## 🎯 Приклади використання в Make

### Базовий сценарій:
```
Webhook → Gmail (лист менеджеру) → Google Sheets (збереження)
```

### Розширений сценарій:
```
Webhook → Router → [
  ├── Gmail (лист менеджеру)
  ├── Telegram (повідомлення в чат)
  ├── CRM (створення ліда)
  └── SMS (СМС клієнту)
]
```

## 🛠 Додавання Make у власні компоненти

### Використання хука:

```tsx
import { useMakeWebhook } from '@/hooks/useMakeWebhook';

const MyComponent = () => {
  const { sendData, isLoading, isConfigured } = useMakeWebhook();
  
  const handleSubmit = async () => {
    await sendData({
      name: "Клієнт",
      phone: "+380931234567",
      question: "Питання",
      timestamp: new Date().toLocaleString('uk-UA'),
      source: "my-component"
    });
  };
  
  if (!isConfigured) {
    return <div>Make webhook не налаштований</div>;
  }
  
  return (
    <button onClick={handleSubmit} disabled={isLoading}>
      {isLoading ? "Відправка..." : "Відправити"}
    </button>
  );
};
```

### Пряме використання сервісу:

```tsx
import { makeWebhookService } from '@/services/makeWebhook';

const result = await makeWebhookService.sendToMake({
  name: "Клієнт",
  phone: "+380931234567",
  // ... інші поля
});

console.log('Успіх:', result.success);
```

## 🔧 Відладка

### Перевірка налаштувань:
```javascript
// У консолі браузера:
console.log('Make configured:', makeWebhookService.isConfigured());
console.log('Webhook URL:', makeWebhookService.getWebhookUrl());
```

### Тестування:
1. Заповніть форму на `/contact`
2. Перевірте Network tab у DevTools
3. Подивіться логи в Make.com

## 📁 Додані файли

- `src/services/makeWebhook.ts` - основний сервіс
- `src/hooks/useMakeWebhook.ts` - React хук
- `src/components/QuickContactButton.tsx` - приклад компонента
- `MAKE_WEBHOOK_SETUP.md` - детальна документація

## 🚨 Важливо

1. **Безпека**: Ніколи не коммітьте .env файли з реальними URL
2. **Fallback**: Google Sheets працює навіть якщо Make недоступний
3. **Тестування**: Завжди тестуйте на dev середовищі спочатку

## 📞 Підтримка

Якщо потрібна допомога:
1. Перевірте `MAKE_WEBHOOK_SETUP.md` для детальних інструкцій
2. Подивіться логи в консолі браузера
3. Перевірте статус сценарію в Make.com
