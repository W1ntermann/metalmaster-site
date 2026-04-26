import { useState, useCallback, memo, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Battery, Wifi, Bluetooth, Shield, Zap, PlugZap,
  TrendingUp, Award, Clock, CheckCircle,
  Phone, Mail, MapPin, ChevronRight
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import BackButton from "@/components/BackButton";
import { type SEOData } from "@/utils/seo";
import powerStation1 from "@/assets/accum-1.jpg";
import powerStation2 from "@/assets/accum-2.jpg";
import powerStation3 from "@/assets/accum-3.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Types
interface Spec {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
  highlight?: boolean;
}

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface ImageType {
  src: string;
  alt: string;
  caption?: string;
}

// Constants
const IMAGES: readonly ImageType[] = [
  { src: powerStation1, alt: "Портативна електростанція — головний вигляд", caption: "Компактний дизайн" },
  { src: powerStation2, alt: "Електростанція в використанні на природі", caption: "Польові умови" },
  { src: powerStation3, alt: "Деталі портів та панелі керування", caption: "Інтуїтивне керування" },
] as const;

const IMAGE_FACTS = [
  "LiFePO4 батарея з ресурсом 3000+ циклів",
  "Реальна автономність для виїзних робіт і резервного живлення",
  "Швидкий доступ до розеток, USB та панелі керування",
] as const;

const SPECS: readonly Spec[] = [
  { icon: Battery, value: "1000", label: "Вт·год", description: "Ємність батареї", highlight: true },
  { icon: Zap, value: "1000", label: "Вт номінал", description: "Стабільна потужність" },
  { icon: Zap, value: "2000", label: "Вт пік", description: "Пускові навантаження" },
  { icon: PlugZap, value: "2×", label: "AC 220В", description: "Чистий синус" },
] as const;

const FEATURES: readonly Feature[] = [
  { icon: Wifi, title: "Smart керування", description: "Моніторинг через Wi-Fi з будь-якої точки" },
  { icon: Bluetooth, title: "Bluetooth підключення", description: "Швидке налаштування через смартфон" },
  { icon: Shield, title: "LiFePO4 технологія", description: "3000+ циклів заряджання" },
  { icon: TrendingUp, title: "Висока ефективність", description: "ККД до 94%" },
  { icon: Award, title: "Сертифікована якість", description: "CE, RoHS, FCC" },
  { icon: Clock, title: "Швидка зарядка", description: "0–80% за 1.5 год" },
] as const;

interface TableRow {
  label: string;
  value: string;
  highlight?: boolean;
}

const TABLE_ROWS: readonly TableRow[] = [
  { label: "Тип АКБ", value: "LiFePO₄ (Літій-залізо-фосфатний)", highlight: true },
  { label: "Ємність", value: "1000 Вт·год" },
  { label: "Номінальна потужність", value: "1000 Вт" },
  { label: "Пікова потужність", value: "2000 Вт" },
  { label: "Керування", value: "Wi-Fi, Bluetooth, APP" },
  { label: "AC розетки", value: "2 × 220В (чистий синус)" },
  { label: "USB порти", value: "4 × USB-A, 1 × USB-C PD" },
  { label: "DC виходи", value: "2 × 12В/10А" },
  { label: "Цикли заряджання", value: "3000+ (до 80% ємності)" },
  { label: "Час заряджання", value: "1.5 год (0-80%), 2 год (100%)" },
  { label: "Робоча температура", value: "-20°C до 60°C" },
  { label: "Гарантія", value: "24 місяці, офіційний сервіс", highlight: true },
];

// Animation
const fadeUp: Variants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.08 } },
};

// --- ImageGallery ---
const ImageGallery = memo(({ images, activeImage, onImageChange }: {
  images: readonly ImageType[];
  activeImage: number;
  onImageChange: (i: number) => void;
}) => (
  <div className="flex flex-col gap-3 h-full">
    {/* Main image */}
    <div className="relative overflow-hidden rounded-2xl bg-card flex-1 min-h-0" style={{ aspectRatio: "4/3" }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={activeImage}
          src={images[activeImage].src}
          alt={images[activeImage].alt}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          loading="eager"
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

      {/* Top badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/90">Для виїзних робіт</span>
      </div>

      {/* Bottom caption */}
      <div className="absolute bottom-4 left-4 right-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl bg-black/50 backdrop-blur-md border border-white/10 px-4 py-3"
          >
            <p className="text-sm font-semibold text-white">{images[activeImage].caption}</p>
            <p className="mt-0.5 text-xs text-white/70 leading-relaxed">{IMAGE_FACTS[activeImage]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

    {/* Thumbnails */}
    <div className="grid grid-cols-3 gap-3">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onImageChange(i)}
          className={`relative overflow-hidden rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-background ${
            i === activeImage
              ? "border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.35)]"
              : "border-border opacity-60 hover:opacity-100 hover:border-orange-500/50"
          }`}
          aria-label={`Переглянути: ${img.alt}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
          {i === activeImage && (
            <div className="absolute inset-0 bg-orange-500/10" />
          )}
        </button>
      ))}
    </div>
  </div>
));
ImageGallery.displayName = "ImageGallery";

// --- SpecCard ---
const SpecCard = memo(({ spec }: { spec: Spec }) => (
  <motion.div
    variants={fadeUp}
    className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
      spec.highlight
        ? "border-orange-500/40 bg-orange-500/5"
        : "border-border bg-card hover:border-border/80"
    }`}
  >
    <spec.icon className={`h-8 w-8 mb-4 ${spec.highlight ? "text-orange-500" : "text-muted-foreground"}`} />
    <p className={`text-4xl font-black leading-none tracking-tight ${spec.highlight ? "text-orange-500" : "text-foreground"}`}>
      {spec.value}
    </p>
    <p className="mt-1 text-sm font-semibold text-foreground/80">{spec.label}</p>
    <p className="mt-1 text-xs text-muted-foreground">{spec.description}</p>
  </motion.div>
));
SpecCard.displayName = "SpecCard";

// --- FeatureCard ---
const FeatureCard = memo(({ feature }: { feature: Feature }) => (
  <motion.div
    variants={fadeUp}
    className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/5"
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
      <feature.icon className="h-5 w-5 text-orange-500" />
    </div>
    <div>
      <h3 className="font-semibold text-foreground">{feature.title}</h3>
      <p className="mt-0.5 text-sm text-muted-foreground">{feature.description}</p>
    </div>
  </motion.div>
));
FeatureCard.displayName = "FeatureCard";

// --- SEO (noindex — сторінка не індексується) ---
const forCustomersSEO: SEOData = {
  title: 'Портативна електростанція для замовників - Армада Індастрі',
  description: 'Портативна електростанція для будівництва, виїзних робіт та резервного живлення. LiFePO4, 1000 Вт·год, пікова потужність 2000 Вт.',
  canonical: 'https://www.armind.com.ua/for-customers',
  robots: 'noindex, nofollow',
};

// --- Main Component ---
const ForCustomers = () => {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleImageChange = useCallback((i: number) => setActiveImage(i), []);

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/contact", "_blank");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead seoData={forCustomersSEO} />
      <Header />
      <BackButton targetId="services" />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative px-6 pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
        {/* Subtle grid bg */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16 xl:gap-20">

            {/* Left: Text */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="flex flex-col"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeUp} className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/8 px-4 py-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">Для замовників</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} className="text-5xl font-black leading-[1.05] tracking-tight lg:text-6xl xl:text-7xl">
                <span className="text-orange-500">Портативна</span>
                <br />
                <span className="text-foreground">електро&shy;станція</span>
              </motion.h1>

              {/* Desc */}
              <motion.p variants={fadeUp} className="mt-6 text-base leading-7 text-muted-foreground max-w-md">
                Надійне автономне живлення для будівництва, виїзних робіт та резервного енергозабезпечення. Офіційний сервіс та підтримка в Україні.
              </motion.p>

              {/* Inline stats strip */}
              <motion.div variants={fadeUp} className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { n: "1000", u: "Вт·год" },
                  { n: "3000+", u: "циклів" },
                  { n: "24", u: "міс. гарантія" },
                ].map(({ n, u }) => (
                  <div key={u} className="rounded-xl border border-border bg-card px-4 py-3 text-center">
                    <p className="text-2xl font-black text-orange-500">{n}</p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{u}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
                <motion.a
                  href="/contact"
                  onClick={handleContactClick}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_32px_rgba(249,115,22,0.4)] transition-all hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-background"
                >
                  Замовити прорахунок
                  <ChevronRight className="h-4 w-4" />
                </motion.a>
                <a
                  href="tel:+380673527350"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-bold text-foreground transition-all hover:bg-accent"
                >
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  +380 67 352 7350
                </a>
              </motion.div>

              {/* Trust line */}
              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-4">
                {["CE сертифікат", "RoHS", "Офіційний сервіс UA"].map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    {t}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Gallery */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <ImageGallery
                images={IMAGES}
                activeImage={activeImage}
                onImageChange={handleImageChange}
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── SPECS ──────────────────────────────────────────────── */}
      <section className="px-6 py-20 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-end justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-2">Характеристики</p>
              <h2 className="text-3xl font-black lg:text-4xl">Технічні параметри</h2>
            </div>
            <p className="hidden sm:block text-sm text-muted-foreground max-w-xs text-right">Потужність та надійність у кожному компоненті</p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {SPECS.map((spec, i) => <SpecCard key={i} spec={spec} />)}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES + TABLE ──────────────────────────────────── */}
      <section className="px-6 py-20 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2">

            {/* Features */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-2">Переваги</p>
                <h2 className="text-3xl font-black">Ключові переваги</h2>
              </motion.div>
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={stagger}
                className="space-y-3"
              >
                {FEATURES.map((f, i) => <FeatureCard key={i} feature={f} />)}
              </motion.div>
            </div>

            {/* Table */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-2">Специфікація</p>
                <h2 className="text-3xl font-black">Повна специфікація</h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <table className="w-full">
                  <tbody>
                    {TABLE_ROWS.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-t border-border first:border-t-0 ${row.highlight ? "bg-orange-500/6" : ""}`}
                      >
                        <td className="px-5 py-3.5 text-sm text-muted-foreground w-[45%]">{row.label}</td>
                        <td className={`px-5 py-3.5 text-sm font-semibold ${row.highlight ? "text-orange-400" : "text-foreground"}`}>
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────── */}
      <section className="px-6 py-20 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/8 via-transparent to-transparent p-10 md:p-14 text-center"
          >
            {/* Glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-orange-500/12 blur-[80px]" />

            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">Зв'яжіться з нами</p>
            <h2 className="relative text-4xl font-black md:text-5xl">
              Готові до <span className="text-orange-500">співпраці</span>?
            </h2>
            <p className="relative mt-4 mx-auto max-w-md text-muted-foreground">
              Розрахунок вартості, умови поставки та консультація — просто напишіть або зателефонуйте.
            </p>

            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href="/contact"
                onClick={handleContactClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 font-bold text-white shadow-[0_8px_32px_rgba(249,115,22,0.4)] transition-all hover:bg-orange-400"
              >
                Замовити прорахунок
                <Mail className="h-4 w-4" />
              </motion.a>
              <a
                href="tel:+380673527350"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-3.5 font-bold text-foreground transition-all hover:bg-accent"
              >
                <Phone className="h-4 w-4" />
                +380 67 352 7350
              </a>
            </div>

            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <a href="mailto:armindind@gmail.com" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                <Mail className="h-4 w-4" />
                armindind@gmail.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Одеса, Україна
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Пн–Пт: 9:00–18:00
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForCustomers;