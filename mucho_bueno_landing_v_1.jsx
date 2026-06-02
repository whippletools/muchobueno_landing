import React, { useMemo, useState } from "react";
import {
  Trophy,
  Anchor,
  Calendar,
  MapPin,
  Waves,
  Fish,
  MessageCircle,
  Camera,
  Smartphone,
  Share2,
  Clock,
  User,
  ChevronRight,
  History as HistoryIcon,
  Video,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

// Mucho Bueno Landing · V4 Pro UI/UX (Actualizada con Diseño Premium)
// Paleta: Trust Teal + Professional Blue
// Tipografía: Barlow Condensed (Headings) / Barlow (Body)

const LOGO = "/logo.png";
const IMAGES = {
  hero: "/fotos/IMG_2976.JPG",
  history: "/fotos/IMG_2977.JPG",
  winner1: "/fotos/IMG_2978.JPG",
  winner2: "/fotos/IMG_2979.JPG",
  winner3: "/fotos/IMG_2980.JPG",
  gallery1: "/fotos/IMG_2981.JPG",
  placeholder_yacht: "/fotos/IMG_2977.JPG", // Reusing for variety
  placeholder_tampico: "/fotos/IMG_2980.JPG", // Reusing for variety
};

const LIVE_SCORING_URL = "/live";
const CONTACT_WHATSAPP = "https://wa.me/528331234567?text=Hola%2C%20quiero%20informaci%C3%B3n%20para%20participar%20en%20Mucho%20Bueno%202026";
const SPONSOR_WHATSAPP = "https://wa.me/528331234567?text=Hola%2C%20quiero%20informaci%C3%B3n%20para%20patrocinar%20Mucho%20Bueno%202026";
const INSTAGRAM_URL = "https://www.instagram.com/tampicomuchobueno/";

const BRAND = {
  name: "Tampico Mucho Bueno",
  edition: "XIII Torneo Internacional de Marlín",
  dates: "04 al 07 de junio 2026",
  venue: "Club de Yates Tampico",
  city: "Tampico, Tamaulipas",
};

const sponsors = [
  { name: "BRAXEL", tier: "principal" },
  { name: "MAJA", tier: "principal" },
  { name: "JASA Gasolineras", tier: "oficial" },
  { name: "Beat Factory", tier: "oficial" },
  { name: "Bustrain Global", tier: "oficial" },
  { name: "Bahía Maja", tier: "oficial" },
  { name: "Shimano", tier: "aliado" },
  { name: "Club de Yates Tampico", tier: "aliado" },
  { name: "Marina Tampico", tier: "aliado" },
  { name: "Costa Norte", tier: "aliado" },
];

const categories = [
  { icon: <Fish className="w-8 h-8" />, title: "Marlín Azul Capturado", text: "Categoría principal en báscula. Mínimo 99 pulgadas y ranking por mayor peso." },
  { icon: <Anchor className="w-8 h-8" />, title: "Catch & Release", text: "Marlín Azul, Marlín Blanco y Pez Vela. Puntuación por especie y bono por tag." },
  { icon: <Waves className="w-8 h-8" />, title: "Especies Varias", text: "Atún, Dorado y Wahoo en una sola tabla. Gana el ejemplar más pesado." },
];

const historyStats = [
  { icon: <Anchor className="text-cyan-400" />, value: "13ª", label: "edición 2026" },
  { icon: <Waves className="text-cyan-400" />, value: "Golfo", label: "pesca deportiva regional" },
  { icon: <User className="text-cyan-400" />, value: "20+", label: "patrocinadores y aliados" },
  { icon: <Trophy className="text-cyan-400" />, value: "3", label: "categorías oficiales" },
];

const pastWinners = [
  {
    year: "2025",
    team: "Equipo campeón por confirmar",
    category: "Marlín Azul Capturado",
    prize: "Bolsa General + Pollas",
    metric: "Peso oficial por confirmar",
    image: IMAGES.winner1,
  },
  {
    year: "2024",
    team: "Ganador Catch & Release",
    category: "Catch & Release",
    prize: "Premio C&R",
    metric: "Puntos por confirmar",
    image: IMAGES.winner2,
  },
  {
    year: "2023",
    team: "Ganador Especies Varias",
    category: "Atún · Dorado · Wahoo",
    prize: "Premio categoría",
    metric: "Peso por confirmar",
    image: IMAGES.winner3,
  },
];

function trackEvent(name) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name });
  if (window.gtag) window.gtag("event", name);
}

function goTo(url, eventName) {
  trackEvent(eventName);
  if (typeof window !== "undefined") window.location.href = url;
}

function LogoBadge({ compact = false, noBorder = false }) {
  return (
    <div className={`inline-block transition-transform duration-300 hover:scale-105 ${noBorder ? "" : "rounded-[1.4rem] border-4 border-white bg-white shadow-2xl"} ${compact ? "p-2" : "p-3"}`}>
      <img src={LOGO} alt="Tampico Mucho Bueno" className={`${compact ? "h-12 w-12" : "h-24 w-24"} object-contain`} />
    </div>
  );
}

function Chip({ children, variant = "light" }) {
  const styles = {
    light: "border-teal-200 bg-teal-50 text-teal-950",
    dark: "border-white/25 bg-white/15 text-white",
    white: "border-white bg-white text-teal-950",
    gold: "border-amber-300 bg-amber-100 text-amber-950",
    primary: "border-teal-500 bg-teal-500 text-white",
  };
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-tight shadow-sm ${styles[variant]}`}>{children}</span>;
}

function CTAButton({ children, onClick, primary = false, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 rounded-2xl px-6 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer font-heading uppercase tracking-tight
        ${primary ? "bg-teal-600 text-white hover:bg-teal-500 shadow-teal-900/20" : "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20"}`}
    >
      {children}
      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </button>
  );
}

function SectionHeader({ kicker, title, text, center = false, dark = false }) {
  return (
    <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <p className={`text-sm font-extrabold uppercase tracking-[0.25em] font-heading ${dark ? "text-teal-300" : "text-teal-700"}`}>{kicker}</p>
      <h2 className={`mt-2 text-4xl font-black tracking-tight sm:text-6xl font-heading leading-[0.95] ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {text && <p className={`mt-6 text-lg font-medium leading-relaxed ${dark ? "text-teal-50/80" : "text-slate-600"}`}>{text}</p>}
    </div>
  );
}

function Card({ children, className = "", interactive = false }) {
  return (
    <div className={`rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 ${interactive ? "cursor-pointer hover:shadow-xl hover:-translate-y-1" : ""} ${className}`}>
      {children}
    </div>
  );
}

function ArtPanel({ type = "marlin", title, subtitle, large = false, image }) {
  const Icon = type === "marlin" ? Fish : type === "yacht" ? Anchor : type === "tampico" ? MapPin : Video;
  const label = type === "marlin" ? "Marlín offshore" : type === "yacht" ? "Yate pescando" : type === "tampico" ? "Sede oficial" : "Video oficial";

  return (
    <div className={`group relative overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:shadow-teal-900/20 ${large ? "min-h-[30rem]" : "min-h-[18rem]"} 
      ${!image ? "bg-gradient-to-br from-teal-600 via-teal-800 to-slate-900" : "bg-slate-900"}`}>

      {image ? (
        <div className="absolute inset-0">
          <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:24px_24px]" />
      )}

      <div className="relative flex h-full flex-col justify-between p-8">
        <div>
          <Chip variant="white">
            <Icon className="w-3 h-3" />
            {label}
          </Chip>
        </div>

        {!image && (
          <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
            <Icon className="w-32 h-32 text-white" />
          </div>
        )}

        <div className="relative z-10">
          <h3 className={`${large ? "text-5xl" : "text-3xl"} font-black leading-none font-heading uppercase tracking-tighter italic text-white`}>{title}</h3>
          <p className="mt-2 text-sm font-bold uppercase tracking-widest text-teal-300">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function SponsorGroup({ title, items, large, compact }) {
  return (
    <div>
      <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-teal-800 font-heading">{title}</h3>
      <div className={`grid gap-4 ${large ? "md:grid-cols-2" : compact ? "grid-cols-2 md:grid-cols-4" : "md:grid-cols-4"}`}>
        {items.map((s) => (
          <div key={s.name} className={`flex items-center justify-center rounded-[2rem] bg-white text-center font-black text-slate-900 shadow-md transition-all hover:shadow-lg hover:-translate-y-1 cursor-default font-heading tracking-tight ${large ? "min-h-32 px-8 text-4xl" : compact ? "min-h-20 px-4 text-base" : "min-h-24 px-5 text-xl"}`}>
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MuchoBuenoLandingV4() {
  const [contactType, setContactType] = useState("participar");
  const sponsorGroups = useMemo(() => ({
    principales: sponsors.filter((s) => s.tier === "principal"),
    oficiales: sponsors.filter((s) => s.tier === "oficial"),
    aliados: sponsors.filter((s) => s.tier === "aliado"),
  }), []);

  return (
    <div className="min-h-screen bg-[#F0FDFA] text-slate-900 font-body selection:bg-teal-200 selection:text-teal-900">
      <Header />
      <Hero />
      <main className="space-y-24 pt-24 sm:pt-32 sm:space-y-32">
        <History />
        <Program />
        <Categories />
        <PastWinners />
        <Sponsors sponsorGroups={sponsorGroups} />
        <Media />
        <Contact contactType={contactType} setContactType={setContactType} />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const links = [
    { label: "Historia", href: "#historia" },
    { label: "Categorías", href: "#categorias" },
    { label: "Ganadores", href: "#ganadores" },
    { label: "Patrocinadores", href: "#patrocinadores" },
    { label: "Galería", href: "#galeria" },
    { label: "Contacto", href: "#contacto" }
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur-xl border-b border-teal-100/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-4">
          <LogoBadge compact />
          <div className="hidden sm:block">
            <p className="text-lg font-black leading-none text-slate-900 font-heading uppercase tracking-tighter">{BRAND.name}</p>
            <p className="text-xs font-bold text-teal-700 uppercase tracking-widest">{BRAND.edition}</p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 xl:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-extrabold text-slate-700 hover:text-teal-600 transition-colors uppercase tracking-widest font-heading">
              {link.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => goTo(LIVE_SCORING_URL, "click_live_scoring_header")}
          className="flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white shadow-xl hover:bg-teal-800 transition-all active:scale-95 font-heading uppercase tracking-widest"
        >
          <Smartphone className="w-4 h-4 text-teal-400" />
          Live Scoring
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img src={IMAGES.hero} alt="Tournament Background" className="h-full w-full object-cover opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-teal-500 blur-[120px]" />
        <div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-blue-600 blur-[150px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 py-24 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div>
              <Chip variant="dark">
                <ShieldCheck className="w-3 h-3 text-teal-400" />
                Sitio oficial del torneo
              </Chip>
              <h1 className="mt-6 text-6xl font-black leading-[0.85] tracking-tighter sm:text-8xl font-heading uppercase italic">
                {BRAND.name.split(' ').map((word, i) => (
                  <span key={i} className={i === 2 ? "text-teal-400" : ""}>{word} </span>
                ))}
              </h1>
              <div className="mt-6 flex flex-wrap gap-4 items-center">
                <p className="text-2xl font-black text-teal-100 font-heading uppercase">{BRAND.edition}</p>
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                <p className="text-lg font-bold text-teal-50/70 flex items-center gap-2 tracking-tight">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  {BRAND.venue} · {BRAND.city}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-xl font-medium leading-relaxed text-teal-50/80">
            Más que un torneo de pesca: una experiencia deportiva, familiar y social que reúne a la comunidad náutica en el sur de Tamaulipas.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <CTAButton primary onClick={() => goTo(LIVE_SCORING_URL, "click_live_scoring_hero")} icon={Smartphone}>
              Ver Live Scoring en Vivo
            </CTAButton>
            <CTAButton onClick={() => goTo(CONTACT_WHATSAPP, "click_participar_hero")} icon={Anchor}>
              Participar
            </CTAButton>
            <CTAButton onClick={() => goTo(SPONSOR_WHATSAPP, "click_patrocinar_hero")} icon={Share2}>
              Patrocinar
            </CTAButton>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <HeroStat icon={<Calendar className="text-teal-400" />} label="Fechas" value={BRAND.dates} />
            <HeroStat icon={<Trophy className="text-teal-400" />} label="Categorías" value="3 Principales" />
            <HeroStat icon={<Smartphone className="text-teal-400" />} label="Resultados" value="En Vivo" />
          </div>
        </div>

        <div className="grid gap-4">
          <ArtPanel large image={IMAGES.hero} type="marlin" title="El Gran Marlín" subtitle="El rey del offshore espera a los mejores capitanes." />
          <div className="grid gap-4 sm:grid-cols-2">
            <ArtPanel image={IMAGES.placeholder_yacht} type="yacht" title="Flota MB" subtitle="Más de 50 embarcaciones." />
            <ArtPanel image={IMAGES.placeholder_tampico} type="tampico" title="La Sede" subtitle="Club de Yates Tampico." />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ icon, label, value }) {
  return (
    <div className="rounded-[2rem] bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-white/10 group">
      <div className="mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-6">{icon}</div>
      <p className="text-xs font-extrabold uppercase tracking-widest text-teal-300/70 font-heading">{label}</p>
      <p className="mt-1 text-xl font-black text-white font-heading uppercase tracking-tight">{value}</p>
    </div>
  );
}

function History() {
  return (
    <section id="historia" className="mx-auto max-w-7xl px-4 sm:px-6 overflow-hidden">
      <div className="grid gap-16 lg:grid-cols-[1fr_.9fr] lg:items-center">
        <div>
          <SectionHeader
            kicker="Nuestra Historia"
            title="Un legado de pesca y tradición."
            text="Mucho Bueno nace de la pasión por la pesca deportiva y la convivencia náutica en Tampico. Con cada edición, hemos consolidado una comunidad de capitanes y familias que viven la competencia con honor y camaradería."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {historyStats.map((s) => (
              <div key={s.label} className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl transition-all hover:shadow-teal-900/20 group">
                <div className="mb-4 transform transition-transform group-hover:scale-110">{s.icon}</div>
                <p className="text-5xl font-black text-teal-400 font-heading italic">{s.value}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-teal-50/50 font-heading">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-[2.5rem] bg-teal-50 border border-teal-100 p-8 flex items-start gap-4">
            <HistoryIcon className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
            <p className="text-lg font-bold leading-relaxed text-teal-900 italic font-heading">
              "Para la versión final, esta sección se enriquecerá con el año de fundación, récords históricos y testimonios de quienes han hecho de este torneo una leyenda regional."
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-teal-100 rounded-[3rem] -rotate-3" />
          <img src={IMAGES.history} alt="Tournament History" className="relative h-full w-full rounded-[2.5rem] object-cover shadow-2xl" />
        </div>
      </div>
    </section>
  );
}

function Program() {
  const items = [
    { icon: <Clock className="w-10 h-10 text-teal-500" />, title: "Inscripciones", text: "Cena de acercamiento, pollas y presentación oficial del torneo." },
    { icon: <Anchor className="w-10 h-10 text-teal-500" />, title: "Días de Pesca", text: "Actividad oficial offshore siguiendo las reglas de la IGFA." },
    { icon: <ShieldCheck className="w-10 h-10 text-teal-500" />, title: "Validación", text: "Báscula y jueceo con tecnología de video y seguimiento GPS." },
    { icon: <Trophy className="w-10 h-10 text-teal-500" />, title: "Premiación", text: "Reconocimiento a ganadores y cierre de la edición 2026." }
  ];
  return (
    <section className="bg-slate-900 py-32 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 blur-[100px] -mr-48" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
        <SectionHeader
          center dark
          kicker="Agenda 2026"
          title={BRAND.dates}
          text="Cronograma oficial para capitanes, tripulación y socios comerciales."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {items.map((item) => (
            <Card key={item.title} className="p-8 bg-white/5 border-white/10 backdrop-blur hover:bg-white/10 transition-colors group">
              <div className="mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3">{item.icon}</div>
              <h3 className="text-2xl font-black text-white font-heading uppercase tracking-tight">{item.title}</h3>
              <p className="mt-4 text-base font-medium leading-relaxed text-teal-50/60">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 sm:px-6">
      <SectionHeader
        center
        kicker="Competencia"
        title="Categorías Oficiales"
        text="Resumen de las modalidades de pesca. El reglamento completo está disponible para descarga inmediata."
      />
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {categories.map((cat, i) => (
          <Card key={cat.title} interactive className="p-10 flex flex-col items-center text-center group">
            <div className={`p-5 rounded-[2rem] bg-teal-50 text-teal-600 mb-8 transition-colors group-hover:bg-teal-600 group-hover:text-white`}>
              {cat.icon}
            </div>
            <h3 className="text-3xl font-black text-slate-900 font-heading uppercase tracking-tighter italic">{cat.title}</h3>
            <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">{cat.text}</p>
            <div className="mt-8 pt-8 border-t border-slate-100 w-full flex justify-center">
              <button className="flex items-center gap-2 text-sm font-black text-teal-700 uppercase tracking-widest font-heading hover:text-teal-900">
                Reglamento <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function PastWinners() {
  return (
    <section id="ganadores" className="bg-slate-950 py-32 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:40px_40px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            dark
            kicker="Hall of Fame"
            title="Ganadores Anteriores"
            text="Un tributo a los campeones que han dejado su marca en el torneo. La historia se escribe en el mar."
          />
          <CTAButton primary onClick={() => goTo(LIVE_SCORING_URL, "click_historico_live")} icon={Smartphone}>
            Resultados 2026
          </CTAButton>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {pastWinners.map((w) => <WinnerCard key={w.year} winner={w} />)}
        </div>
      </div>
    </section>
  );
}

function WinnerCard({ winner }) {
  return (
    <div className="overflow-hidden rounded-[2.5rem] bg-white text-slate-900 shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img src={winner.image} alt={winner.team} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 left-4">
          <div className="bg-teal-500 text-white font-black px-4 py-2 rounded-xl text-xl font-heading italic shadow-lg">
            {winner.year}
          </div>
        </div>
      </div>
      <div className="p-8">
        <Chip variant="gold">
          <Trophy className="w-3 h-3" />
          {winner.category}
        </Chip>
        <h3 className="mt-6 text-3xl font-black text-slate-900 font-heading uppercase tracking-tighter leading-none italic">{winner.team}</h3>
        <p className="mt-2 text-sm font-bold text-slate-500 uppercase tracking-widest">{winner.metric}</p>
        <div className="mt-6 rounded-2xl bg-teal-50 p-5 border border-teal-100/50">
          <p className="text-xs font-black uppercase tracking-widest text-teal-800 font-heading">Gran Premio</p>
          <p className="mt-1 text-xl font-black text-slate-900 font-heading">{winner.prize}</p>
        </div>
      </div>
    </div>
  );
}

function Sponsors({ sponsorGroups }) {
  return (
    <section id="patrocinadores" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-16">
          <SectionHeader
            kicker="Partners"
            title="Marcas Aliadas"
            text="Empresas líderes que impulsan el desarrollo del torneo y la comunidad náutica."
          />
          <CTAButton primary onClick={() => goTo(SPONSOR_WHATSAPP, "click_patrocinar_sponsors")} icon={ExternalLink}>
            Ser Patrocinador
          </CTAButton>
        </div>
        <div className="space-y-16">
          <SponsorGroup title="Patrocinadores Principales" items={sponsorGroups.principales} large />
          <SponsorGroup title="Patrocinadores Oficiales" items={sponsorGroups.oficiales} />
          <SponsorGroup title="Aliados" items={sponsorGroups.aliados} compact />
        </div>
      </div>
    </section>
  );
}

function Media() {
  return (
    <section id="galeria" className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div>
          <SectionHeader
            kicker="Multimedia"
            title="Experiencia Mucho Bueno"
            text="Capturando la esencia del torneo: desde la adrenalina del pesaje hasta la convivencia en el Club de Yates."
          />
          <div className="mt-10">
            <ArtPanel large type="video" image={IMAGES.gallery1} title="Reel Oficial" subtitle="Highlights 2026" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <ArtPanel type="yacht" title="Salida" subtitle="Amanecer" />
          <ArtPanel type="marlin" title="Offshore" subtitle="Acción Directa" />
          <ArtPanel type="tampico" title="Destino" subtitle="Sede Oficial" />
          <ArtPanel type="video" title="Cena" subtitle="Comunidad" />
          <ArtPanel type="marlin" title="Báscula" subtitle="Competencia" />
          <ArtPanel type="yacht" title="Ganadores" subtitle="Premiación" />
        </div>
      </div>
    </section>
  );
}

function Contact({ contactType, setContactType }) {
  return (
    <section id="contacto" className="bg-slate-950 pt-32 pb-24 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:40px_40px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
        <SectionHeader
          center dark
          kicker="Comité MB"
          title="Contacto Oficial"
          text="¿Tienes dudas sobre las inscripciones o patrocinios? Nuestro equipo está listo para apoyarte."
        />
        <Card className="mx-auto mt-20 max-w-5xl overflow-hidden border-white/10 bg-white text-slate-900 shadow-[0_0_50px_-12px_rgba(20,184,166,0.3)]">
          <div className="grid lg:grid-cols-[1fr_1.4fr]">
            <div className="bg-slate-900 p-10 flex flex-col justify-between text-white">
              <div>
                <LogoBadge compact />
                <h3 className="mt-8 text-4xl font-black font-heading uppercase italic tracking-tighter text-white">Únete al <span className="text-teal-400">Torneo</span></h3>
                <p className="mt-4 text-lg font-medium text-teal-50/60 leading-relaxed">Selecciona el motivo de tu consulta y te responderemos a la brevedad.</p>
                <div className="mt-10 space-y-3">
                  <ContactType active={contactType === "participar"} onClick={() => setContactType("participar")} dark>
                    <Anchor className="w-4 h-4" /> Quiero participar
                  </ContactType>
                  <ContactType active={contactType === "patrocinar"} onClick={() => setContactType("patrocinar")} dark>
                    <Share2 className="w-4 h-4" /> Quiero patrocinar
                  </ContactType>
                  <ContactType active={contactType === "general"} onClick={() => setContactType("general")} dark>
                    <MessageCircle className="w-4 h-4" /> Información general
                  </ContactType>
                </div>
              </div>
              <div className="mt-10 pt-10 border-t border-white/5 flex gap-4">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-teal-500 transition-colors">
                  <Camera className="w-6 h-6" />
                </a>
                <a href={CONTACT_WHATSAPP} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white/5 hover:bg-teal-500 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="p-10 bg-white text-slate-900">
              <div className="grid gap-6 sm:grid-cols-2">
                <Input label="Nombre completo" placeholder="Ej. Juan Pérez" />
                <Input label="WhatsApp / Teléfono" placeholder="833 000 0000" />
                <Input label="Correo electrónico" placeholder="juan@ejemplo.com" />
                <Input label={contactType === "patrocinar" ? "Empresa / Marca" : "Embarcación"} placeholder={contactType === "patrocinar" ? "Nombre de tu marca" : "Nombre de tu barco"} />
                <label className="sm:col-span-2">
                  <span className="text-sm font-black uppercase tracking-widest text-slate-400 font-heading">Mensaje adicional</span>
                  <textarea className="mt-2 h-40 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 p-4 font-bold text-slate-900 outline-none focus:border-teal-500 focus:bg-white transition-all placeholder:text-slate-300" placeholder="¿Cómo podemos ayudarte?" />
                </label>
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => goTo(contactType === "patrocinar" ? SPONSOR_WHATSAPP : CONTACT_WHATSAPP, `click_contact_${contactType}`)}
                  className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-8 py-5 text-lg font-black text-white shadow-xl hover:bg-teal-600 transition-all font-heading uppercase tracking-widest active:scale-95"
                >
                  <MessageCircle className="w-6 h-6" /> Enviar WhatsApp
                </button>
                <button
                  onClick={() => trackEvent("submit_contact_form_demo")}
                  className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-teal-50 px-8 py-5 text-lg font-black text-teal-900 border-2 border-teal-100 hover:bg-teal-100 transition-all font-heading uppercase tracking-widest active:scale-95"
                >
                  Registrar Solicitud
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function ContactType({ children, active, onClick, dark = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full rounded-[1.5rem] px-6 py-4 text-left text-sm font-extrabold transition-all uppercase tracking-widest font-heading
        ${active
          ? "bg-teal-500 text-white shadow-lg shadow-teal-900/40"
          : dark
            ? "bg-white/5 text-teal-100/60 hover:bg-white/10"
            : "bg-teal-50 text-slate-600 hover:bg-teal-100"}`}
    >
      {children}
    </button>
  );
}

function Input({ label, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm font-black uppercase tracking-widest text-slate-400 font-heading">{label}</span>
      <input
        className="mt-2 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 p-4 font-bold text-slate-900 outline-none focus:border-teal-500 focus:bg-white transition-all placeholder:text-slate-300"
        placeholder={placeholder}
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-6">
              <LogoBadge compact />
              <div>
                <h3 className="text-3xl font-black font-heading uppercase italic tracking-tighter">{BRAND.name}</h3>
                <p className="mt-1 text-teal-400 font-bold uppercase tracking-widest text-xs">{BRAND.edition} · {BRAND.dates}</p>
              </div>
            </div>
            <p className="mt-8 max-w-md text-teal-50/40 font-medium leading-relaxed">
              El torneo de pesca más prestigioso de la región, impulsando el deporte y la convivencia náutica con tecnología de vanguardia y tradición inigualable.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-black font-heading uppercase tracking-widest mb-8">Navegación</h4>
            <div className="grid grid-cols-2 gap-4">
              <a href="#historia" className="text-teal-50/60 hover:text-teal-400 font-bold uppercase tracking-widest text-xs transition-colors">Historia</a>
              <a href="#categorias" className="text-teal-50/60 hover:text-teal-400 font-bold uppercase tracking-widest text-xs transition-colors">Categorías</a>
              <a href="#patrocinadores" className="text-teal-50/60 hover:text-teal-400 font-bold uppercase tracking-widest text-xs transition-colors">Patrocinadores</a>
              <a href="#contacto" className="text-teal-50/60 hover:text-teal-400 font-bold uppercase tracking-widest text-xs transition-colors">Contacto</a>
            </div>
            <div className="mt-8 flex gap-4">
              <a href={INSTAGRAM_URL} className="p-3 rounded-xl bg-white/5 hover:bg-teal-500 transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <button className="p-3 rounded-xl bg-white/5 hover:bg-teal-500 transition-colors">
                <Smartphone className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-black font-heading uppercase tracking-widest mb-8">Sistema Oficial</h4>
            <p className="text-sm font-medium text-teal-50/40 leading-relaxed">
              Jueces y comité organizador pueden acceder al panel de administración aquí.
            </p>
            <a href="/admin" className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white/5 px-6 py-3 text-sm font-black hover:bg-white/10 transition-all font-heading uppercase tracking-widest border border-white/10">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Acceso Admin
            </a>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 font-heading">
            © 2026 {BRAND.name} · Design by Whipple · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
