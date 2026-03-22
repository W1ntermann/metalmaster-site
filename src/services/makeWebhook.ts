/**
 * Сервіс для інтеграції з платформою Make (колишня Integromat)
 */

export interface MakeWebhookData {
  name: string;
  phone: string;
  email?: string;
  question?: string;
  service_type?: string; // 🔥 ДОДАНО
  timestamp: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  page_url?: string;
  // Нові поля для файлів
  file?: File;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  file_content?: string;
}

export interface MakeWebhookResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class MakeWebhookService {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = 'https://hook.eu2.make.com/pqcy9d5is7ocwm8xrtk5u2rykivg4fne';
  }

  /**
   * Конвертує файл у base64 для відправки
   */
  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Відправляє дані у Make webhook
   */
  async sendToMake(data: MakeWebhookData): Promise<MakeWebhookResponse> {
    try {
      console.log('🔧 Make Webhook: початок відправки', {
        name: data.name,
        phone: data.phone,
        service_type: data.service_type,
        hasFile: !!data.file
      });

      if (!this.webhookUrl || this.webhookUrl === 'YOUR_MAKE_WEBHOOK_URL_HERE') {
        console.warn('Make webhook URL не налаштований');
        return {
          success: false,
          error: 'Make webhook URL не налаштований'
        };
      }

      // Підготовка даних для відправки
      let body: any = {
        name: data.name,
        phone: data.phone,
        email: data.email || '',
        question: data.question || '',
        service_type: data.service_type || '', // 🔥 ДОДАНО
        timestamp: data.timestamp,
        source: data.source || '',
        utm_source: data.utm_source || '',
        utm_medium: data.utm_medium || '',
        utm_campaign: data.utm_campaign || '',
        page_url: data.page_url || ''
      };

      // Якщо є файл, додаємо його дані
      if (data.file) {
        try {
          console.log('📎 Конвертація файлу:', data.file.name);
          const base64Content = await this.fileToBase64(data.file);
          body.file = {
            name: data.file.name,
            size: data.file.size,
            type: data.file.type,
            content: base64Content
          };
          console.log('✅ Файл сконвертовано успішно');
        } catch (fileError) {
          console.error('Помилка конвертації файлу:', fileError);
          return {
            success: false,
            error: 'Помилка обробки файлу'
          };
        }
      }

      console.log('📤 Відправка в Make:', JSON.stringify(body, null, 2));

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('📥 Статус відповіді Make:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let responseData;
      try {
        responseData = await response.json();
        console.log('✅ Відповідь Make:', responseData);
      } catch {
        responseData = { success: true };
        console.log('✅ Make відповів (не JSON)');
      }

      return {
        success: true,
        message: responseData.message || 'Успішно відправлено в Make'
      };

    } catch (error) {
      console.error('❌ Помилка відправки в Make:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Невідома помилка'
      };
    }
  }

  /**
   * Перевіряє чи налаштований webhook URL
   */
  isConfigured(): boolean {
    return !!(this.webhookUrl && this.webhookUrl !== 'YOUR_MAKE_WEBHOOK_URL_HERE');
  }

  /**
   * Оновлює URL webhook (для динамічного налаштування)
   */
  setWebhookUrl(url: string): void {
    this.webhookUrl = url;
  }

  /**
   * Повертає поточний URL webhook (для відладки)
   */
  getWebhookUrl(): string {
    return this.webhookUrl;
  }
}

// Експортуємо singleton інстанс
export const makeWebhookService = new MakeWebhookService();

// Також експортуємо клас для можливості створення кількох інстансів
export default MakeWebhookService;