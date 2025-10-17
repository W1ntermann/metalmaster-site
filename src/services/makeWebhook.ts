/**
 * Сервіс для інтеграції з платформою Make (колишня Integromat)
 */

export interface MakeWebhookData {
  name: string;
  phone: string;
  question?: string;
  timestamp: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  page_url?: string;
}

export interface MakeWebhookResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class MakeWebhookService {
  private webhookUrl: string;

  constructor() {
    // URL вашого Make webhook - замініть на ваш реальний URL
    this.webhookUrl = 'https://hook.eu2.make.com/pqcy9d5is7ocwm8xrtk5u2rykivg4fne';
  }

  /**
   * Відправляє дані у Make webhook
   */
  async sendToMake(data: MakeWebhookData): Promise<MakeWebhookResponse> {
    try {
      if (!this.webhookUrl || this.webhookUrl === 'YOUR_MAKE_WEBHOOK_URL_HERE') {
        console.warn('Make webhook URL не налаштований');
        return {
          success: false,
          error: 'Make webhook URL не налаштований'
        };
      }

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Make зазвичай повертає JSON відповідь
      let responseData;
      try {
        responseData = await response.json();
      } catch {
        // Якщо відповідь не JSON, вважаємо успішною якщо статус OK
        responseData = { success: true };
      }

      return {
        success: true,
        message: responseData.message || 'Успішно відправлено в Make'
      };

    } catch (error) {
      console.error('Помилка відправки в Make:', error);
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
