import React, { useEffect, useMemo, useRef, useState } from "react";

// Mucho Bueno Landing · V3 Completa (Actualizada desde v2 con logo de v1)
// Sitio público/institucional separado del sistema Live Scoring.
// Enfoque: landing visual para validación con cliente, con historia del torneo,
// ganadores anteriores, patrocinadores, galería y CTA principal al Live Scoring.

const LOGO = "/logo.png";

const LIVE_SCORING_URL = import.meta.env.VITE_LIVE_SCORING_URL || "https://web.tampicomuchobueno.com";
const JUDGE_ACCESS_URL = import.meta.env.VITE_JUDGE_ACCESS_URL || "https://cms.tampicomuchobueno.com";
const CONTACT_WHATSAPP = "https://wa.me/528331234567?text=Hola%2C%20quiero%20informaci%C3%B3n%20para%20participar%20en%20Mucho%20Bueno%202026";
const SPONSOR_WHATSAPP = "https://wa.me/528331234567?text=Hola%2C%20quiero%20informaci%C3%B3n%20para%20patrocinar%20Mucho%20Bueno%202026";
const INSTAGRAM_URL = "https://www.instagram.com/tampicomuchobueno/";

const BRAND = {
  name: "La Caza del Marlín Azul",
  edition: "XIII Torneo Mucho Bueno",
  tagline: "Donde los grandes peces y los grandes pescadores se encuentran",
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
  { emoji: "⚖️", title: "Marlín Azul Capturado", text: "El trofeo definitivo. Mínimo 99 pulgadas. El peso más alto gana. El rey del torneo." },
  { emoji: "🎣", title: "Catch & Release", text: "El arte del Marlín Azul, Blanco y Pez Vela. Puntos por especie + bono por tag. Suelta y gana." },
  { emoji: "🐟", title: "Especies Varias", text: "Dorado, Atún y Wahoo. Un solo campeón. La captura más pesada se lleva todo." },
];

const historyStats = [
  { emoji: "🛥️", value: "13ª", label: "edición 2026" },
  { emoji: "🌊", value: "Golfo", label: "pesca deportiva regional" },
  { emoji: "🤝", value: "20+", label: "patrocinadores y aliados" },
  { emoji: "🏆", value: "3", label: "categorías oficiales" },
];

const pastWinners = [
  {
    year: "2025",
    team: "Campeón por confirmar",
    category: "Marlín Azul Capturado",
    prize: "Bolsa General + Pollas",
    metric: "El trofeo más buscado",
    imageType: "marlin",
  },
  {
    year: "2024",
    team: "Maestro del Release",
    category: "Catch & Release",
    prize: "Premio C&R",
    metric: "Puntos por capturas",
    imageType: "yacht",
  },
  {
    year: "2023",
    team: "Cazador Múltiple",
    category: "Especies Varias",
    prize: "Premio Especies",
    metric: "Peso total acumulado",
    imageType: "tampico",
  },
];

const allWinners = [
  { year: "2025", image: "/2025 Maya-Maya.jpg.jpeg" },
  { year: "2024", image: "/2024 Quimera.jpg.jpeg" },
  { year: "2023", image: "/2023 Sherrie Lynn.jpg.jpeg" },
  { year: "2022", image: "/2022 Smooth.jpg.jpeg" },
  { year: "2021", image: "/2021 Dinamita.jpg.jpeg" },
  { year: "2019", image: "/2019 Tremenda.jpg.jpeg" },
  { year: "2017", image: "/2017 Don Balta.jpg.jpeg" },
  { year: "2016", image: "/2016 Shitán.jpg.jpeg" },
  { year: "2015", image: "/2015 Sherrie Lynn.jpg.jpeg" },
  { year: "2014", image: "/2014 7 Mares.jpg.jpeg" },
  { year: "2013", image: "/2013 Veneno.jpg.jpeg" },
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

function LogoBadge({ compact = false, noBorder = false, className = "" }) {
  return <div className={`inline-block flex-shrink-0 ${noBorder ? "" : "rounded-[1.4rem] border-4 border-white bg-white shadow-[0_25px_80px_-15px_rgba(0,0,0,0.5)]"} ${compact ? "p-2" : "p-3"} ${className}`}>
    <img src={LOGO} alt="Tampico Mucho Bueno" className={`${compact ? "h-[82px] w-[82px]" : "h-[150px] w-[150px]"} object-contain drop-shadow-xl`} />
  </div>;
}

function Chip({ children, variant = "light" }) {
  const styles = {
    light: "border-cyan-200 bg-cyan-50 text-cyan-950",
    dark: "border-white/25 bg-white/15 text-white",
    white: "border-white bg-white text-blue-950",
    gold: "border-amber-300 bg-amber-100 text-amber-950",
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black shadow-sm ${styles[variant]}`}>{children}</span>;
}

function CTAButton({ children, onClick, primary = false }) {
  return <button onClick={onClick} className={`${primary ? "bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 hover:from-amber-300 hover:to-amber-400 shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)]" : "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20"} rounded-2xl px-6 py-4 text-base font-black shadow-lg transition transform hover:-translate-y-1`}>{children}</button>;
}

function SectionHeader({ kicker, title, text, center = false, dark = false }) {
  return <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
    <p className={`text-xs font-black uppercase tracking-[0.22em] ${dark ? "text-cyan-200" : "text-cyan-800"}`}>{kicker}</p>
    <h2 className={`mt-2 text-3xl font-black tracking-tight sm:text-5xl uppercase ${dark ? "text-white" : "text-blue-950"}`}>{title}</h2>
    {text && <p className={`mt-4 text-base font-semibold leading-8 ${dark ? "text-cyan-50" : "text-slate-700"}`}>{text}</p>}
  </div>;
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[1.7rem] border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function ArtPanel({ type = "marlin", title, subtitle, large = false, image }) {
  const emoji = type === "marlin" ? "🐟" : type === "yacht" ? "🚤" : type === "tampico" ? "🌇" : "▶️";
  const label = type === "marlin" ? "Marlín offshore" : type === "yacht" ? "Yate pescando" : type === "tampico" ? "Tampico / atardecer" : "Video oficial";
  const bg = type === "marlin"
    ? "from-blue-950 via-cyan-800 to-cyan-300"
    : type === "yacht"
      ? "from-slate-950 via-blue-900 to-sky-300"
      : type === "tampico"
        ? "from-orange-300 via-cyan-700 to-blue-950"
        : "from-blue-950 via-sky-800 to-cyan-400";

  if (image) {
    const isVideo = image.endsWith(".mp4");
    return <div className={`relative overflow-hidden rounded-[2rem] shadow-2xl ${large ? "h-[16rem] sm:h-[30rem]" : "h-[16rem]"}`}>
      {isVideo
        ? <video src={image} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        : <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
      }
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/20 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-5">
        <div>
          {title && <h3 className={`${large ? "text-2xl sm:text-4xl" : "text-2xl"} font-black leading-tight text-white`}>{title}</h3>}
          {subtitle && <p className="mt-2 max-w-md text-sm font-bold leading-6 text-cyan-50">{subtitle}</p>}
        </div>
      </div>
    </div>;
  }

  return <div className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${bg} p-5 text-white shadow-xl ${large ? "min-h-[12rem] sm:min-h-[25rem]" : "min-h-[12rem]"}`}>
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
    <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/20 blur-2xl" />
    <div className="absolute -bottom-14 left-0 h-36 w-[120%] rounded-[50%] bg-white/15" />
    <div className="relative flex h-full flex-col justify-between">
      <Chip variant="white">{label}</Chip>
      <div>
        <div className="text-7xl sm:text-8xl">{emoji}</div>
        <h3 className={`${large ? "text-2xl sm:text-4xl" : "text-2xl"} mt-3 font-black leading-tight`}>{title}</h3>
        <p className="mt-2 max-w-md text-sm font-bold leading-6 text-cyan-50">{subtitle}</p>
      </div>
    </div>
  </div>;
}

function SponsorGroup({ title, items, large, compact }) {
  return <div>
    <h3 className="mb-3 text-sm font-black uppercase tracking-[0.22em] text-cyan-800">{title}</h3>
    <div className={`grid gap-3 ${large ? "md:grid-cols-2" : compact ? "grid-cols-2 md:grid-cols-4" : "md:grid-cols-4"}`}>
      {items.map((s) => <div key={s.name} className={`flex items-center justify-center rounded-3xl bg-white text-center font-black text-blue-950 shadow-lg ${large ? "min-h-32 px-8 text-4xl" : compact ? "min-h-20 px-4 text-base" : "min-h-24 px-5 text-xl"}`}>{s.name}</div>)}
    </div>
  </div>;
}

export default function MuchoBuenoLandingV3() {
  const [contactType, setContactType] = useState("participar");
  const sponsorGroups = useMemo(() => ({
    principales: sponsors.filter((s) => s.tier === "principal"),
    oficiales: sponsors.filter((s) => s.tier === "oficial"),
    aliados: sponsors.filter((s) => s.tier === "aliado"),
  }), []);

  return <div className="min-h-screen bg-[#eaf8fb] text-slate-950">
    <Header />
    <Hero />
    <main>
      <History />
      <Program />
      <Categories />
      <PastWinners />
      <Sponsors sponsorGroups={sponsorGroups} />
      <Media />
      <Contact contactType={contactType} setContactType={setContactType} />
      <Footer />
    </main>
  </div>;
}

function Header() {
  const links = [["Historia", "#historia"], ["Categorías", "#categorias"], ["Ganadores", "#ganadores"], ["Patrocinadores", "#patrocinadores"], ["Galería", "#galeria"]];
  return <header className="sticky top-0 z-40 border-b border-cyan-100 bg-white/95 shadow-sm backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3"><LogoBadge compact /><div className="hidden sm:block"><p className="text-sm font-black leading-none text-blue-950">{BRAND.name}</p><p className="text-xs font-bold text-cyan-800">{BRAND.edition}</p></div></div>
      <nav className="hidden items-center gap-5 xl:flex">{links.map(([label, href]) => <a key={label} href={href} className="text-sm font-black text-blue-950 hover:text-cyan-700">{label}</a>)}</nav>
      <button onClick={() => goTo(LIVE_SCORING_URL, "click_live_scoring_header")} className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-900 px-4 py-3 text-sm font-black text-white shadow hover:from-blue-900 hover:to-blue-800">📱 Live Scoring</button>
    </div>
  </header>;
}

function Hero() {
  return <section className="relative overflow-hidden bg-gradient-to-br from-[#0B2A4A] via-[#1E4D6B] to-[#2E8B57] text-white">
    <div className="absolute inset-0 opacity-45"><div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-cyan-400 blur-3xl" /><div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-sky-500 blur-3xl" /><div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-teal-300 blur-3xl" /></div>
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "30px 30px" }} />
    <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:py-24">
      <div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center"><div className="hidden sm:block flex-shrink-0"><LogoBadge /></div><div><h1 className="mt-4 text-4xl font-black leading-none tracking-tight sm:text-5xl uppercase">{BRAND.edition}</h1><p className="mt-3 text-xl font-black text-cyan-100">{BRAND.name}</p><p className="mt-1 text-base font-bold text-cyan-50">⚓ {BRAND.venue} · {BRAND.city}</p></div></div>
        <p className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-cyan-50">{BRAND.tagline}. Una experiencia deportiva donde la emoción del strike, la adrenalina del offshore y la tradición de los grandes pescadores se encuentran cada año.</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><CTAButton primary onClick={() => goTo(LIVE_SCORING_URL, "click_live_scoring_hero")}>📡 📱 Live Scoring</CTAButton></div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3"><HeroStat emoji="📅" label="Fechas" value={BRAND.dates} /><HeroStat emoji="🏆" label="Categorías" value="3 principales" /><HeroStat emoji="📡" label="Resultados" value="En vivo" /></div>
      </div>
      <div className="grid gap-4"><ArtPanel large type="marlin" title="La caza del Marlín Azul" subtitle="El trofeo definitivo te espera en aguas del Golfo." image="/marlin_azul.jpg" /><div className="grid gap-4 sm:grid-cols-2"><ArtPanel type="yacht" title="Embarcaciones en acción" subtitle="Zarpada desde el Club de Yates Tampico." image="/photo5.jpg" /><ArtPanel type="tampico" title="La mejor caza" subtitle="Donde los grandes peces se encuentran." image="/photo6.jpg" /></div></div>
    </div>
  </section>;
}

function HeroStat({ emoji, label, value }) {
  return <div className="rounded-3xl bg-white/15 p-4 ring-1 ring-white/20"><p className="text-2xl">{emoji}</p><p className="mt-2 text-xs font-black uppercase tracking-widest text-cyan-100">{label}</p><p className="mt-1 text-lg font-black text-white">{value}</p></div>;
}

function History() {
  return <section id="historia" className="bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center"><div><SectionHeader kicker="📖 Historia" title="Un torneo con identidad, comunidad y mar." text="Tampico Mucho Bueno nace alrededor de la pesca deportiva, la convivencia náutica y la tradición familiar del sur de Tamaulipas. Con cada edición, el torneo ha consolidado una comunidad de embarcaciones, capitanes, patrocinadores y familias que viven la competencia dentro y fuera del agua." /></div><div className="grid gap-3 sm:grid-cols-2">{historyStats.map((s) => <div key={s.label} className="rounded-[2rem] bg-blue-950 p-6 text-white shadow-lg"><p className="text-4xl">{s.emoji}</p><p className="mt-4 text-4xl font-black text-cyan-300">{s.value}</p><p className="mt-1 text-sm font-black uppercase tracking-widest text-cyan-100">{s.label}</p></div>)}</div></div></div></section>;
}

function Program() {
  const items = [["⚓", "Preparativos", "Reunión de capitanes, cierre de inscripciones y asignación de zonas."], ["🎣", "Días de caza", "Embarcaciones en aguas del Golfo. Strike, pelea y captura."], ["⚖️", "Validación oficial", "Peso en báscula, documentación y decisión del comité técnico."], ["🏆", "Ceremonia de trofeos", "Reconocimiento a los grandes pescadores y entrega de premios."]];
  return <section className="bg-[#eaf8fb] py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeader center kicker="📅 Programa 2026" title={BRAND.dates} text="Cronograma náutico para la flota participante." /><div className="mt-10 grid gap-4 md:grid-cols-4">{items.map(([emoji, title, text]) => <Card key={title} className="p-5"><p className="text-4xl">{emoji}</p><h3 className="mt-4 text-xl font-black text-blue-950">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{text}</p></Card>)}</div></div></section>;
}

function Categories() {
  return <section id="categorias" className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><SectionHeader center kicker="🏆 Categorías" title="Tres modalidades. Un solo objetivo: la gran captura." text="Elige tu estilo de pesca. El reglamento completo disponible para consulta." /><div className="mt-10 grid gap-5 md:grid-cols-3">{categories.map((cat) => <Card key={cat.title} className="p-7"><p className="text-5xl">{cat.emoji}</p><h3 className="mt-5 text-2xl font-black text-blue-950">{cat.title}</h3><p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{cat.text}</p></Card>)}</div></section>;
}

function PastWinners() {
  return <section id="ganadores" className="bg-gradient-to-br from-[#0B2A4A] via-[#1E4D6B] to-[#2E8B57] py-16 text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><SectionHeader dark kicker="🏆 Leyendas del mar" title="La historia se escribe en cada captura." text="Grandes pescadores, capturas memorables y momentos que quedan para siempre en la tradición del torneo." /><button onClick={() => goTo(LIVE_SCORING_URL, "click_historico_live")} className="rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-4 font-black text-blue-950 shadow-lg hover:from-amber-300 hover:to-amber-400">📱 Ver resultados 2026</button></div><div className="mt-10"><WinnersCarousel /></div></div></section>;
}

function WinnersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const containerRef = useRef(null);
  const totalSlides = allWinners.length;

  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) setSlidesPerView(3);
      else if (width >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const maxIndex = Math.max(0, totalSlides - slidesPerView);
  const safeIndex = Math.min(currentIndex, maxIndex);

  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${safeIndex * (100 / slidesPerView)}%)` }}
        >
          {allWinners.map((w) => (
            <div
              key={w.year}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white text-blue-950 shadow-xl">
                <div className="flex flex-shrink-0 items-center justify-center p-5">
                  <h3 className="text-center text-xl font-black sm:text-2xl">Campeón {w.year}</h3>
                </div>
                <img
                  src={w.image}
                  alt={`Campeón ${w.year}`}
                  className="h-64 w-full flex-grow object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {safeIndex > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 rounded-full bg-white p-2 sm:p-3 shadow-lg ring-1 ring-slate-200 transition hover:scale-105"
          aria-label="Anterior"
        >
          <svg className="h-5 w-5 text-blue-950 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {safeIndex < maxIndex && (
        <button
          onClick={goNext}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-2 sm:translate-x-4 rounded-full bg-white p-2 sm:p-3 shadow-lg ring-1 ring-slate-200 transition hover:scale-105"
          aria-label="Siguiente"
        >
          <svg className="h-5 w-5 text-blue-950 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

function Sponsors({ sponsorGroups }) {
  return <section id="patrocinadores" className="bg-[#eaf8fb] py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><SectionHeader kicker="⚓ Flota Patrocinadora" title="Marcas que navegan con nosotros." text="Las mejores marcas del sector náutico y deportivo respaldan la caza del Marlín Azul." />{/* <button onClick={() => goTo(SPONSOR_WHATSAPP, "click_patrocinar_sponsors")} className="rounded-2xl bg-gradient-to-r from-blue-950 to-blue-900 px-6 py-4 font-black text-white shadow-lg hover:from-blue-900 hover:to-blue-800">🤝 Quiero patrocinar</button> */}</div><div className="mt-10"><SponsorCollage /></div></div></section>;
}

function SponsorCollage() {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
      <div className="p-6 sm:p-10 flex flex-col items-center gap-0">
        <img
          src="/img41.jpg"
          alt="Patrocinadores Mucho Bueno"
          className="h-auto w-full object-contain"
          loading="lazy"
          decoding="async"
        />
        <img 
          src="/Logo Whipple.png" 
          alt="Whipple Tech Partner" 
          className="h-24 md:h-32 object-contain opacity-90 hover:opacity-100 transition-opacity" 
        />
      </div>
    </div>
  );
}

function Media() {
  return (
    <section id="galeria" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div>
          <SectionHeader kicker="🎥 Galería" title="Revive la experiencia Mucho Bueno." />
          <div className="mt-6">
            <ArtPanel
              large
              type="video"
              title="Reel / highlights"
              image="/486297086_1050791213743903_3405545384149997235_n.jpg"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <ArtPanel
            large
            type="marlin"
            title="Salida"
            subtitle="Amanecer en el Club"
            image="/486135015_1050791273743897_636085159929147075_n.jpg"
          />
          <ArtPanel
            large
            type="yacht"
            title="Offshore"
            subtitle="Aguas profundas"
            image="/485782120_1051280327028325_8707539482327961321_n.jpg"
          />
          <ArtPanel
            large
            type="tampico"
            title="La caza"
            subtitle="Donde todo sucede"
            image="/486023368_1051122760377415_4523311441776305076_n.jpg"
          />
          <ArtPanel
            type="video"
            title="Convivencia"
            subtitle="Espíritu de equipo"
            image="/493259567_1080790000744024_2062272475066051891_n.jpg"
          />
          <ArtPanel
            type="marlin"
            title="Validación"
            subtitle="El momento de la verdad"
            image="/494751584_1080789800744044_7987653697827813474_n.jpg"
          />
          <ArtPanel
            type="yacht"
            title="Trofeos"
            subtitle="Los grandes ganadores"
            image="/482352856_1040807981408893_4155154715329188717_n.jpg"
          />
        </div>
      </div>
    </section>
  );
}

function Contact({ contactType, setContactType }) {
  return (
    <section id="contacto" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          center
          kicker="📬 Contacto"
          title="Canales Oficiales del Torneo"
          text="Mantente en contacto con el comité organizador a través de nuestras redes sociales oficiales."
        />
        <Card className="mx-auto mt-10 max-w-4xl overflow-hidden">
          <div className="grid lg:grid-cols-[.8fr_1.2fr]">
            <div className="bg-gradient-to-br from-[#0B2A4A] to-[#1E4D6B] p-7 text-white flex flex-col justify-between">
              <div>
                <LogoBadge compact />
                <h3 className="mt-5 text-3xl font-black text-white">CANALES OFICIALES</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-cyan-50">
                  Para dudas, aclaraciones o soporte, síguenos en nuestras plataformas de redes sociales oficiales.
                </p>
              </div>
            </div>
            <div className="p-7 flex flex-col justify-center items-center gap-6 bg-slate-50 min-h-[300px]">
              <h4 className="text-xl font-black text-blue-950 text-center">Nuestras Comunidades</h4>
              <div className="flex flex-col gap-4 w-full max-w-md">
                <a
                  href="https://www.facebook.com/tampicomuchobueno"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 rounded-2xl bg-[#1877F2] text-white px-6 py-4 font-black shadow-md hover:opacity-90 transition transform hover:-translate-y-0.5 text-center"
                >
                  <svg className="h-5 w-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                  Facebook Oficial
                </a>
                <a
                  href="https://www.instagram.com/tampicomuchobueno/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white px-6 py-4 font-black shadow-md hover:opacity-90 transition transform hover:-translate-y-0.5 text-center"
                >
                  <svg className="h-5 w-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  Instagram Oficial
                </a>
                <a
                  href={LIVE_SCORING_URL}
                  className="flex items-center justify-center gap-3 rounded-2xl bg-blue-950 text-white px-6 py-4 font-black shadow-md hover:bg-blue-900 transition transform hover:-translate-y-0.5 text-center"
                >
                  📱 Plataforma Live Scoring
                </a>
              </div>
              {/* Deactivated contact form to prevent personal WhatsApp spam
              <div className="hidden">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Capitán / Responsable" placeholder="Tu nombre" />
                  <Input label="Radio / WhatsApp" placeholder="833..." />
                  <Input label="Correo" placeholder="correo@empresa.com" />
                  <Input label={contactType === "patrocinar" ? "Empresa / marca" : "Embarcación"} placeholder={contactType === "patrocinar" ? "Nombre de empresa" : "Nombre de embarcación"} />
                  <label className="sm:col-span-2">
                    <span className="text-sm font-black text-blue-950">Mensaje</span>
                    <textarea className="mt-2 h-32 w-full rounded-2xl border border-cyan-200 p-4 font-semibold outline-none focus:ring-4 focus:ring-cyan-100" placeholder="Cuéntanos tus dudas..." />
                  </label>
                </div>
                <button onClick={() => goTo(contactType === "patrocinar" ? SPONSOR_WHATSAPP : CONTACT_WHATSAPP, `click_contact_${contactType}`)}>Enviar por WhatsApp</button>
              </div>
              */}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
function ContactType({ children, active, onClick }) { return <button onClick={onClick} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black transition ${active ? "bg-cyan-300 text-blue-950" : "bg-white/10 text-white hover:bg-white/20"}`}>{children}</button>; }
function Input({ label, placeholder }) { return <label><span className="text-sm font-black text-blue-950">{label}</span><input className="mt-2 w-full rounded-2xl border border-cyan-200 p-4 font-semibold outline-none focus:ring-4 focus:ring-cyan-100" placeholder={placeholder} /></label>; }

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0B2A4A] to-[#1E4D6B] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1fr_1fr]">
        <div className="flex items-center gap-4">
          <LogoBadge compact />
          <div>
            <h3 className="text-xl font-black">{BRAND.name}</h3>
            <p className="mt-1 text-sm font-semibold text-cyan-100">{BRAND.edition}</p>
            <p className="mt-1 text-sm font-semibold text-cyan-100">{BRAND.dates}</p>
          </div>
        </div>
        <div>
          <h4 className="font-black">Navegación</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => goTo(LIVE_SCORING_URL, "click_live_scoring_footer")} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-blue-950">📡 📱 Live Scoring</button>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white hover:bg-white/20">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>Instagram</a>
            <a href="https://www.facebook.com/tampicomuchobueno" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white hover:bg-white/20">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>Facebook</a>
          </div>
        </div>
        <div>
          <h4 className="font-black">Comité técnico</h4>
          <p className="mt-2 text-sm font-semibold text-cyan-100">El público consulta resultados sin contraseña. Jueces y comité organizador acceden al panel administrativo.</p>
          <a href={JUDGE_ACCESS_URL} className="mt-3 inline-flex rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-2 text-xs font-black text-blue-950 hover:from-amber-300 hover:to-amber-400">⚖️ Acceso jueces</a>
        </div>
      </div>
      <div className="border-t border-white/10 py-3 mt-4">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <a href="https://whipple.mx/" target="_blank" rel="noreferrer" className="block hover:scale-[1.02] transition-transform duration-200">
              <img 
                src="/Logo Whipple_v2.png" 
                alt="Whipple Tech Partner" 
                className="h-8 md:h-10 object-contain opacity-90 hover:opacity-100 transition-opacity rounded-xl" 
              />
            </a>
          </div>
          <p className="text-xs text-white/50 font-semibold text-center md:text-right mt-2 md:mt-0">
            &copy; 2026 {BRAND.name}. Todos los derechos reservados. <span className="hidden md:inline">|</span> <br className="md:hidden" />
            Powered by <a href="https://whipple.mx" target="_blank" rel="noreferrer" className="text-cyan-300 hover:text-white transition-colors font-bold">Whipple</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
