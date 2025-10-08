import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Award, TrendingUp } from "lucide-react";

const Clients = () => {
  // Placeholder клієнти - замінити на реальні логотипи
  const clients = [
    {
      id: 1,
      name: "ТОВ 'Металбуд'",
      logo: "/api/placeholder/120/60", // Placeholder для логотипу
      industry: "Будівництво",
      description: "Металеві конструкції для промислових об'єктів"
    },
    {
      id: 2,
      name: "Одеський порт",
      logo: "/api/placeholder/120/60",
      industry: "Логістика",
      description: "Портове обладнання та інфраструктура"
    },
    {
      id: 3,
      name: "АТ 'Завод ім. Січового'",
      logo: "/api/placeholder/120/60",
      industry: "Машинобудування",
      description: "Деталі для сільгосптехніки"
    },
    {
      id: 4,
      name: "ПрАТ 'Одесагаз'",
      logo: "/api/placeholder/120/60",
      industry: "Енергетика",
      description: "Газорозподільне обладнання"
    },
    {
      id: 5,
      name: "ТОВ 'Архітектурні рішення'",
      logo: "/api/placeholder/120/60",
      industry: "Архітектура",
      description: "Декоративні металеві елементи"
    },
    {
      id: 6,
      name: "Одеська міська рада",
      logo: "/api/placeholder/120/60",
      industry: "Державний сектор",
      description: "Міське благоустрою та інфраструктура"
    },
    {
      id: 7,
      name: "ТОВ 'Меблі Люкс'",
      logo: "/api/placeholder/120/60",
      industry: "Меблі",
      description: "Металеві меблеві конструкції"
    },
    {
      id: 8,
      name: "ПрАТ 'Агротехніка'",
      logo: "/api/placeholder/120/60",
      industry: "Сільське господарство",
      description: "Запчастини для сільгосптехніки"
    }
  ];

  const stats = [
    {
      icon: Users,
      value: "200+",
      label: "Задоволених клієнтів",
      description: "За останні 3 роки"
    },
    {
      icon: Building2,
      value: "50+",
      label: "Великих проектів",
      description: "Промислового масштабу"
    },
    {
      icon: Award,
      value: "98%",
      label: "Позитивних відгуків",
      description: "Від наших клієнтів"
    },
    {
      icon: TrendingUp,
      value: "15+",
      label: "Років досвіду",
      description: "На ринку металообробки"
    }
  ];

  return (
    <section id="clients" className="py-20 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Наші <span className="bg-gradient-laser bg-clip-text text-transparent">клієнти</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Нам довіряють провідні компанії Одеси та України. Від малого бізнесу до великих 
            промислових підприємств - ми забезпечуємо якість на найвищому рівні
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center bg-card border-border shadow-card hover:shadow-glow transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-laser-pulse">
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </Card>
            );
          })}
        </div>

        {/* Client Logos Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Компанії, які нам довіряють
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {clients.map((client) => (
              <Card key={client.id} className="p-6 bg-card border-border shadow-card hover:shadow-metal transition-all duration-300 group">
                <div className="text-center">
                  {/* Client Logo Placeholder */}
                  <div className="relative h-16 mb-4 flex items-center justify-center">
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                      onError={(e) => {
                        // Fallback якщо логотип не завантажився
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-16 bg-gradient-metal rounded-lg flex items-center justify-center">
                            <div class="text-center">
                              <div class="text-xs font-bold text-foreground mb-1">${client.name}</div>
                              <div class="text-xs text-muted-foreground">${client.industry}</div>
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </div>
                  
                  {/* Client Info */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {client.industry}
                    </Badge>
                    <h4 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
                      {client.name}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {client.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-metal border-border shadow-metal max-w-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Хочете стати нашим клієнтом?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Приєднуйтесь до сотень задоволених клієнтів, які довіряють нам свої проекти
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Badge variant="outline" className="text-primary border-primary">
                    Індивідуальний підхід
                  </Badge>
                  <Badge variant="outline" className="text-primary border-primary">
                    Гарантія якості
                  </Badge>
                  <Badge variant="outline" className="text-primary border-primary">
                    Швидкі терміни
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Clients;
