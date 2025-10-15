# 📊 Інтеграція з Google Sheets - Швидкий старт

## ✅ Що вже зроблено

Форма ContactPopup тепер автоматично відправляє дані у Google Таблицю:
- ✨ Ім'я клієнта
- 📞 Номер телефону
- 💬 Питання
- 🕐 Дата та час
- 📄 Сторінка з якої відправлено

## 🚀 Швидке налаштування (5 хвилин)

### 1. Створіть Google Таблицю

```
Відкрийте: https://sheets.google.com
Створіть нову таблицю: "Заявки Армінд"
Перший рядок (заголовки):
  A1: Дата та час
  B1: Ім'я
  C1: Телефон
  D1: Питання
  E1: Сторінка
```

### 2. Створіть Apps Script

```
У таблиці: Розширення → Apps Script
Вставте код з файлу GOOGLE_SHEETS_SETUP.md
Натисніть: Deploy → New deployment → Web app
Налаштування:
  - Execute as: Me
  - Who has access: Anyone
Скопіюйте URL (він виглядає так):
  https://script.google.com/macros/s/AKfycbxXXXXXXXXXX/exec
```

### 3. Вставте URL у код

```typescript
// Файл: src/components/ContactPopup.tsx
// Рядок 11:

const GOOGLE_SCRIPT_URL = "ВАШ_URL_СЮДИ";
```

### 4. Готово! 🎉

```bash
npm run build
npm run dev
```

Тепер усі заявки з popup-форми автоматично потраплятимуть у вашу Google Таблицю!

## 📧 Бонус: Email-сповіщення

Щоб отримувати email при кожній новій заявці, додайте у Apps Script код з розділу "Автоматичні сповіщення" у файлі GOOGLE_SHEETS_SETUP.md

---

💡 **Детальні інструкції**: Дивіться файл `GOOGLE_SHEETS_SETUP.md`

