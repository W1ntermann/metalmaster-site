import howToOrderImage from "@/assets/image-for-site.png";

const HowToOrder = () => {
  return (
    <section id="how-to-order" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Як <span className="bg-gradient-laser bg-clip-text text-transparent">замовити</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-metal">
            <img 
              src={howToOrderImage} 
              alt="Як замовити послуги металообробки - покрокова інструкція"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;
