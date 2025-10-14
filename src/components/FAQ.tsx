import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqData = [
    {
      question: "Які послуги ви надаєте?",
      answer: "Ми спеціалізуємося на лазерній різці металу, порошковому фарбуванні, згинанні металу та лазерному зварюванні. Наше обладнання дозволяє обробляти метали різної товщини та складності."
    },
    {
      question: "Яка мінімальна партія для замовлення?",
      answer: "Ми працюємо як з одиночними замовленнями, так і з великими партіями. Мінімальна партія залежить від типу послуги: для лазерної різки - від 1 деталі, для порошкового фарбування - від 1 м²."
    },
    {
      question: "Скільки часу займає виконання замовлення?",
      answer: "Термін виконання залежить від складності та обсягу замовлення. Прості деталі - 1-3 дні, складні конструкції - до 2 тижнів. Завжди намагаємося виконати замовлення в найкоротші терміни."
    },
    {
      question: "Які матеріали ви обробляєте?",
      answer: "Обробляємо конструкційну сталь, нержавіючу сталь, алюміній та його сплави, мідь, латунь. Для кожного матеріалу використовуємо оптимальні режими обробки."
    },
    {
      question: "Чи надаєте ви послуги доставки?",
      answer: "Так, ми організовуємо доставку готових виробів по всій Україні. Вартість доставки розраховується індивідуально залежно від ваги та габаритів."
    },
    {
      question: "Як розрахувати вартість замовлення?",
      answer: "Для точного розрахунку необхідно надати технічне завдання, креслення або зразок. Можете зв'язатися з нами для безкоштовної консультації та розрахунку вартості."
    },
    {
      question: "Чи працюєте ви з юридичними особами?",
      answer: "Так, ми працюємо як з фізичними, так і з юридичними особами. Надаємо всі необхідні документи для звітності та ведемо облік замовлень."
    },
    {
      question: "Які гарантії якості ви надаєте?",
      answer: "Надаємо гарантію на всі види робіт від 6 місяців до 2 років залежно від типу послуги. Використовуємо тільки якісні матеріали та сучасне обладнання."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="py-20"
      style={{
        background: 'linear-gradient(to bottom, #fef6e8, #fee9c7)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Часті <span style={{ color: '#fea12e' }}>питання</span>
          </h2>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            Відповіді на найпоширеніші питання про наші послуги та процес роботи
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <Card 
                key={index} 
                className="overflow-hidden bg-white border-orange-200 shadow-sm hover:shadow-md transition-all duration-300"
                style={{
                  borderColor: '#fea12e'
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-orange-50 transition-colors"
                  style={{
                    backgroundColor: openFAQ === index ? '#fef6e8' : 'transparent'
                  }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0" style={{ color: '#fea12e' }} />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t pt-4" style={{ borderColor: '#fea12e' }}>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;