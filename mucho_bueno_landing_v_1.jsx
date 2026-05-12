import React, { useMemo, useState } from "react";

// Mucho Bueno Landing · V2 Visual corregida
// Esta versión evita SVG/data-uri pesados para que la vista previa cargue bien.
// Las imágenes son placeholders visuales hechos con CSS; después se sustituyen por fotos reales.

const LOGO = "/logo.png";

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
  { emoji: "🐟", title: "Marlín Azul Capturado", text: "Categoría principal en báscula. Mínimo 99 pulgadas y ranking por mayor peso." },
  { emoji: "🎣", title: "Catch & Release", text: "Marlín Azul, Marlín Blanco y Pez Vela. Puntuación por especie y bono por tag." },
  { emoji: "🌊", title: "Especies Varias", text: "Atún, Dorado y Wahoo en una sola tabla. Gana el ejemplar más pesado." },
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
  return <div className={`inline-block ${noBorder ? "" : "rounded-[1.4rem] border-4 border-white bg-white shadow-2xl"} ${compact ? "p-2" : "p-3"}`}>
    <img src={LOGO} alt="Tampico Mucho Bueno" className={`${compact ? "h-12 w-12" : "h-24 w-24"} object-contain`} />
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
  return <button onClick={onClick} className={`${primary ? "bg-cyan-300 text-blue-950 hover:bg-cyan-200" : "bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20"} rounded-2xl px-6 py-4 text-base font-black shadow-lg transition`}>{children}</button>;
}

function SectionHeader({ kicker, title, text, center = false, dark = false }) {
  return <div className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
    <p className={`text-xs font-black uppercase tracking-[0.22em] ${dark ? "text-cyan-200" : "text-cyan-800"}`}>{kicker}</p>
    <h2 className={`mt-2 text-3xl font-black tracking-tight sm:text-5xl ${dark ? "text-white" : "text-blue-950"}`}>{title}</h2>
    {text && <p className={`mt-4 text-base font-semibold leading-8 ${dark ? "text-cyan-50" : "text-slate-700"}`}>{text}</p>}
  </div>;
}

function Card({ children, className = "" }) {
  return <div className={`rounded-[1.7rem] border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

function ArtPanel({ type = "marlin", title, subtitle, large = false }) {
  const emoji = type === "marlin" ? "🐟" : type === "yacht" ? "🚤" : type === "tampico" ? "🌇" : "▶️";
  const label = type === "marlin" ? "Marlín offshore" : type === "yacht" ? "Yate pescando" : type === "tampico" ? "Tampico / atardecer" : "Video oficial";
  const bg = type === "marlin"
    ? "from-blue-950 via-cyan-800 to-cyan-300"
    : type === "yacht"
    ? "from-slate-950 via-blue-900 to-sky-300"
    : type === "tampico"
    ? "from-orange-300 via-cyan-700 to-blue-950"
    : "from-blue-950 via-sky-800 to-cyan-400";

  return <div className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br ${bg} p-5 text-white shadow-xl ${large ? "min-h-[25rem]" : "min-h-[12rem]"}`}>
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
    <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/20 blur-2xl" />
    <div className="absolute -bottom-14 left-0 h-36 w-[120%] rounded-[50%] bg-white/15" />
    <div className="relative flex h-full flex-col justify-between">
      <Chip variant="white">{label}</Chip>
      <div>
        <div className="text-7xl sm:text-8xl">{emoji}</div>
        <h3 className={`${large ? "text-4xl" : "text-2xl"} mt-3 font-black leading-tight`}>{title}</h3>
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

export default function MuchoBuenoLandingVisualV2() {
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
      <LivePreview />
      <About />
      <Program />
      <Categories />
      <Sponsors sponsorGroups={sponsorGroups} />
      <Media />
      <Contact contactType={contactType} setContactType={setContactType} />
      <Footer />
    </main>
  </div>;
}

function Header() {
  const links = [["Torneo", "#torneo"], ["Categorías", "#categorias"], ["Patrocinadores", "#patrocinadores"], ["Galería", "#galeria"], ["Contacto", "#contacto"]];
  return <header className="sticky top-0 z-40 border-b border-cyan-100 bg-white/95 shadow-sm backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3"><LogoBadge compact /><div className="hidden sm:block"><p className="text-sm font-black leading-none text-blue-950">{BRAND.name}</p><p className="text-xs font-bold text-cyan-800">{BRAND.edition}</p></div></div>
      <nav className="hidden items-center gap-5 lg:flex">{links.map(([label, href]) => <a key={label} href={href} className="text-sm font-black text-blue-950 hover:text-cyan-700">{label}</a>)}</nav>
      <button onClick={() => goTo(LIVE_SCORING_URL, "click_live_scoring_header")} className="rounded-2xl bg-blue-950 px-4 py-3 text-sm font-black text-white shadow hover:bg-blue-900">📱 Live Scoring</button>
    </div>
  </header>;
}

function Hero() {
  return <section className="relative overflow-hidden bg-blue-950 text-white">
    <div className="absolute inset-0 opacity-45"><div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-cyan-400 blur-3xl" /><div className="absolute right-0 top-0 h-[30rem] w-[30rem] rounded-full bg-sky-500 blur-3xl" /><div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-teal-300 blur-3xl" /></div>
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "30px 30px" }} />
    <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:py-24">
      <div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center"><LogoBadge /><div><Chip variant="dark">🐟 Sitio oficial del torneo</Chip><h1 className="mt-4 text-5xl font-black leading-none tracking-tight sm:text-7xl">{BRAND.name}</h1><p className="mt-3 text-xl font-black text-cyan-100">{BRAND.edition}</p><p className="mt-1 text-base font-bold text-cyan-50">📍 {BRAND.venue} · {BRAND.city}</p></div></div>
        <p className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-cyan-50">Más que un torneo de pesca: una experiencia deportiva, familiar y social que reúne a embarcaciones, capitanes, patrocinadores y comunidad náutica de la región.</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><CTAButton primary onClick={() => goTo(LIVE_SCORING_URL, "click_live_scoring_hero")}>📱 Ver Live Scoring en Vivo</CTAButton><CTAButton onClick={() => goTo(CONTACT_WHATSAPP, "click_participar_hero")}>🚤 Participar</CTAButton><CTAButton onClick={() => goTo(SPONSOR_WHATSAPP, "click_patrocinar_hero")}>🤝 Patrocinar</CTAButton></div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3"><HeroStat emoji="📅" label="Fechas" value={BRAND.dates} /><HeroStat emoji="🏆" label="Categorías" value="3 principales" /><HeroStat emoji="📡" label="Resultados" value="En vivo" /></div>
      </div>
      <div className="grid gap-3"><ArtPanel large type="marlin" title="Marlin, mar y energía de torneo." subtitle="Placeholder visual para reemplazar con foto o video real del torneo." /><div className="grid gap-3 sm:grid-cols-2"><ArtPanel type="yacht" title="Yate pescando" subtitle="Offshore / embarcaciones." /><ArtPanel type="tampico" title="Tampico visual" subtitle="Atardecer y sede regional." /></div></div>
    </div>
  </section>;
}

function HeroStat({ emoji, label, value }) {
  return <div className="rounded-3xl bg-white/15 p-4 ring-1 ring-white/20"><p className="text-2xl">{emoji}</p><p className="mt-2 text-xs font-black uppercase tracking-widest text-cyan-100">{label}</p><p className="mt-1 text-lg font-black text-white">{value}</p></div>;
}

function LivePreview() {
  return <section className="mx-auto -mt-10 max-w-7xl px-4 sm:px-6"><Card className="relative z-10 overflow-hidden border-cyan-100"><div className="grid gap-0 lg:grid-cols-[1fr_.8fr]"><div className="p-7 sm:p-9"><Chip>📱 Plataforma pública</Chip><h2 className="mt-4 text-4xl font-black tracking-tight text-blue-950">Sigue el torneo en vivo desde cualquier lugar.</h2><p className="mt-4 max-w-2xl text-base font-semibold leading-8 text-slate-700">Consulta capturas recientes, líderes por categoría, equipos, estatus preliminares y resultados oficiales. La liga será pública para que participantes, familias, patrocinadores y aficionados puedan seguir el torneo en tiempo real.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><button onClick={() => goTo(LIVE_SCORING_URL, "click_live_scoring_preview")} className="rounded-2xl bg-blue-950 px-6 py-4 font-black text-white shadow-lg hover:bg-blue-900">📱 Entrar al Live Scoring</button><button onClick={() => trackEvent("click_share_link") } className="rounded-2xl bg-cyan-100 px-6 py-4 font-black text-blue-950 hover:bg-cyan-200">📤 Compartir liga</button></div></div><div className="bg-blue-950 p-7 text-white sm:p-9"><p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Preview Live</p><div className="mt-5 grid gap-3"><PreviewRow icon="🐟" title="Marlín Azul Capturado" value="Tabla General" /><PreviewRow icon="🎣" title="Catch & Release" value="Puntos + tag" /><PreviewRow icon="🌊" title="Especies Varias" value="Atún · Dorado · Wahoo" /><PreviewRow icon="💰" title="Pollas y Bolsa" value="Montos visibles" /></div></div></div></Card></section>;
}
function PreviewRow({ icon, title, value }) { return <div className="flex items-center justify-between rounded-2xl bg-white/15 p-4"><div className="flex items-center gap-3"><span className="text-3xl">{icon}</span><p className="font-black">{title}</p></div><p className="text-sm font-black text-cyan-200">{value}</p></div>; }

function About() {
  return <section id="torneo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><SectionHeader kicker="🌊 Más que un torneo de pesca" title="Una tradición náutica de Tampico." text="Mucho Bueno reúne cada año a pescadores, familias, embarcaciones y patrocinadores en una experiencia que combina competencia deportiva, convivencia y comunidad. La nueva plataforma pública permitirá que el torneo se siga en vivo y que su alcance regional pueda medirse mejor." /><div className="grid grid-cols-2 gap-3"><ArtPanel large type="yacht" title="Embarcaciones" subtitle="Espacio para foto real." /><ArtPanel type="marlin" title="Capturas" subtitle="Ambiente de torneo." /><ArtPanel type="tampico" title="Premiación" subtitle="Cierre del evento." /></div></div></section>;
}

function Program() {
  const items = [["🍽️", "Cena de acercamiento", "Cierre de inscripciones, pollas y presentación oficial."], ["🎣", "Días de pesca", "Actividad oficial durante las fechas del torneo."], ["⚖️", "Báscula y validación", "Capturas, videos y resultados sujetos a juez/comité."], ["🏆", "Premiación", "Entrega de resultados finales y reconocimiento a ganadores."]];
  return <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeader center kicker="📅 Programa 2026" title={BRAND.dates} text="Una estructura clara para participantes, patrocinadores e invitados." /><div className="mt-10 grid gap-4 md:grid-cols-4">{items.map(([emoji, title, text]) => <Card key={title} className="p-5"><p className="text-4xl">{emoji}</p><h3 className="mt-4 text-xl font-black text-blue-950">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{text}</p></Card>)}</div></div></section>;
}

function Categories() {
  return <section id="categorias" className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><SectionHeader center kicker="🏆 Categorías" title="Tres formas de competir. Una sola experiencia." text="La landing resume las categorías; el reglamento completo puede descargarse o consultarse en una página independiente." /><div className="mt-10 grid gap-5 md:grid-cols-3">{categories.map((cat) => <Card key={cat.title} className="p-7"><p className="text-5xl">{cat.emoji}</p><h3 className="mt-5 text-2xl font-black text-blue-950">{cat.title}</h3><p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{cat.text}</p></Card>)}</div></section>;
}

function Sponsors({ sponsorGroups }) {
  return <section id="patrocinadores" className="bg-[#eaf8fb] py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><SectionHeader kicker="🤝 Patrocinadores" title="Marcas que hacen posible Mucho Bueno." text="Una sección altamente visual para logos, ordenada por jerarquía comercial y fácil de actualizar." /><button onClick={() => goTo(SPONSOR_WHATSAPP, "click_patrocinar_sponsors")} className="rounded-2xl bg-blue-950 px-6 py-4 font-black text-white shadow-lg hover:bg-blue-900">🤝 Quiero patrocinar</button></div><div className="mt-10 space-y-8"><SponsorGroup title="Patrocinadores principales" items={sponsorGroups.principales} large /><SponsorGroup title="Patrocinadores oficiales" items={sponsorGroups.oficiales} /><SponsorGroup title="Aliados" items={sponsorGroups.aliados} compact /></div></div></section>;
}

function Media() {
  return <section id="galeria" className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><SectionHeader kicker="🎥 Galería" title="Revive la experiencia Mucho Bueno." text="La página debe vender con fotos y video: salida de embarcaciones, acción en el mar, Club de Yates, cena, patrocinadores y premiación." /><div className="mt-6"><ArtPanel large type="video" title="Reel / highlights" subtitle="Placeholder para video hero del torneo, tomas de drone y momentos clave." /></div></div><div className="grid grid-cols-2 gap-3 md:grid-cols-3"><ArtPanel large type="marlin" title="Salida" subtitle="Amanecer" /><ArtPanel type="yacht" title="Offshore" subtitle="Acción" /><ArtPanel type="tampico" title="Tampico" subtitle="Destino" /><ArtPanel type="video" title="Cena" subtitle="Comunidad" /><ArtPanel type="marlin" title="Báscula" subtitle="Competencia" /><ArtPanel type="yacht" title="Premiación" subtitle="Ganadores" /></div></div></section>;
}

function Contact({ contactType, setContactType }) {
  return <section id="contacto" className="bg-[#eaf8fb] py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6"><SectionHeader center kicker="📬 Contacto" title="Participa o patrocina Mucho Bueno." text="Formulario visual para centralizar solicitudes de participantes, patrocinadores y medios. En V1 puede mandar a WhatsApp o correo; en fase posterior puede guardar leads en base de datos." /><Card className="mx-auto mt-10 max-w-4xl overflow-hidden"><div className="grid lg:grid-cols-[.8fr_1.2fr]"><div className="bg-blue-950 p-7 text-white"><LogoBadge compact /><h3 className="mt-5 text-3xl font-black">Contacto oficial</h3><p className="mt-3 text-sm font-semibold leading-7 text-cyan-50">Selecciona el motivo y deja tus datos. El comité podrá responder por WhatsApp o correo.</p><div className="mt-6 space-y-2"><ContactType active={contactType === "participar"} onClick={() => setContactType("participar")}>🚤 Quiero participar</ContactType><ContactType active={contactType === "patrocinar"} onClick={() => setContactType("patrocinar")}>🤝 Quiero patrocinar</ContactType><ContactType active={contactType === "general"} onClick={() => setContactType("general")}>💬 Información general</ContactType></div></div><div className="p-7"><div className="grid gap-4 sm:grid-cols-2"><Input label="Nombre" placeholder="Tu nombre" /><Input label="Teléfono / WhatsApp" placeholder="833..." /><Input label="Correo" placeholder="correo@empresa.com" /><Input label={contactType === "patrocinar" ? "Empresa / marca" : "Embarcación"} placeholder={contactType === "patrocinar" ? "Nombre de empresa" : "Nombre de embarcación"} /><label className="sm:col-span-2"><span className="text-sm font-black text-blue-950">Mensaje</span><textarea className="mt-2 h-32 w-full rounded-2xl border border-cyan-200 p-4 font-semibold outline-none focus:ring-4 focus:ring-cyan-100" placeholder="Cuéntanos cómo podemos ayudarte..." /></label></div><div className="mt-5 flex flex-col gap-3 sm:flex-row"><button onClick={() => goTo(contactType === "patrocinar" ? SPONSOR_WHATSAPP : CONTACT_WHATSAPP, `click_contact_${contactType}`)} className="rounded-2xl bg-blue-950 px-6 py-4 font-black text-white shadow-lg hover:bg-blue-900">Enviar por WhatsApp</button><button onClick={() => trackEvent("submit_contact_form_demo")} className="rounded-2xl bg-cyan-100 px-6 py-4 font-black text-blue-950 hover:bg-cyan-200">Guardar solicitud</button></div><p className="mt-3 text-xs font-semibold text-slate-500">Nota: en esta demo los botones pueden conectarse a WhatsApp, correo o backend según la implementación final.</p></div></div></Card></div></section>;
}
function ContactType({ children, active, onClick }) { return <button onClick={onClick} className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-black transition ${active ? "bg-cyan-300 text-blue-950" : "bg-white/10 text-white hover:bg-white/20"}`}>{children}</button>; }
function Input({ label, placeholder }) { return <label><span className="text-sm font-black text-blue-950">{label}</span><input className="mt-2 w-full rounded-2xl border border-cyan-200 p-4 font-semibold outline-none focus:ring-4 focus:ring-cyan-100" placeholder={placeholder} /></label>; }

function Footer() {
  return <footer className="bg-blue-950 text-white"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1fr_1fr]"><div className="flex items-center gap-4"><LogoBadge compact /><div><h3 className="text-xl font-black">{BRAND.name}</h3><p className="mt-1 text-sm font-semibold text-cyan-100">{BRAND.edition}</p><p className="mt-1 text-sm font-semibold text-cyan-100">{BRAND.dates}</p></div></div><div><h4 className="font-black">Links</h4><div className="mt-3 flex flex-wrap gap-2"><button onClick={() => goTo(LIVE_SCORING_URL, "click_live_scoring_footer")} className="rounded-xl bg-white px-3 py-2 text-xs font-black text-blue-950">📱 Live Scoring</button><a href={INSTAGRAM_URL} className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white">Instagram</a><a href="#contacto" className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white">Contacto</a></div></div><div><h4 className="font-black">Acceso privado</h4><p className="mt-2 text-sm font-semibold text-cyan-100">El público consulta resultados sin contraseña. Juez y comité acceden al panel administrativo desde una ruta privada.</p><a href="/admin" className="mt-3 inline-flex rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white">⚖️ Acceso juez / comité</a></div></div></footer>;
}
