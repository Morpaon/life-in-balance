import React, { useEffect, useMemo, useState } from "react";

type Lang = "en" | "tr";
type Localized = { en: string; tr: string };

type Topic = {
  id: string;
  category: Localized;
  problem: Localized;
  advice: Localized;
  doctor: Localized;
  tags: { en: string[]; tr: string[] };
};

const UI = {
  siteTitle: { en: "Life in Balance", tr: "Dengede Yaşam" },
  navTopics: { en: "Wellness Topics", tr: "İyilik Hâli Konuları" },
  navTips: { en: "Daily Tips", tr: "Günlük İpuçları" },
  navSafety: { en: "Safety", tr: "Güvenlik" },
  heroTagline: {
    en: "Practical, low-risk home suggestions for common questions.",
    tr: "Yaygın sorular için pratik ve düşük riskli ev önerileri.",
  },
  heroDesc: {
    en: "Bilingual (EN/TR). Not medical advice. We always recommend consulting a healthcare professional.",
    tr: "Çift dilli (TR/EN). Tıbbi tavsiye değildir. Her zaman sağlık profesyoneline danışmanızı öneririz.",
  },
  browse: { en: "Browse Topics", tr: "Konulara Göz At" },
  searchPlaceholder: { en: "Search topics…", tr: "Konularda ara…" },
  all: { en: "All", tr: "Tümü" },
  category: { en: "Category", tr: "Kategori" },
  problem: { en: "Problem", tr: "Problem" },
  advice: { en: "Safe Advice", tr: "Güvenli Öneri" },
  doctor: { en: "Doctor Recommendation", tr: "Doktor Önerisi" },
  learnMore: { en: "Open", tr: "Aç" },
  close: { en: "Close", tr: "Kapat" },
  tipsTitle: { en: "Daily, gentle tips", tr: "Günlük, nazik ipuçları" },
  safetyTitle: {
    en: "Safety & disclaimers",
    tr: "Güvenlik ve uyarılar",
  },
  safetyBullets: [
    {
      en: "This site is educational only and not a substitute for professional medical advice.",
      tr: "Bu site yalnızca eğitseldir; profesyonel tıbbi tavsiyenin yerine geçmez.",
    },
    {
      en: "If you have symptoms that persist, worsen, or concern you, consult a qualified clinician.",
      tr: "Belirtileriniz sürerse, kötüleşirse veya endişe verirse yetkin bir uzmana başvurun.",
    },
    {
      en: "Home suggestions are designed to be low-risk, but individual situations vary.",
      tr: "Ev önerileri düşük riskli olacak şekilde tasarlanmıştır; ancak bireysel durumlar farklılık gösterebilir.",
    },
  ] as Localized[],
  footer: {
    en: "Educational content only. No diagnosis or treatment provided.",
    tr: "Yalnızca eğitsel içerik. Tanı veya tedavi sunulmaz.",
  },
};

const TOPICS: Topic[] = [
  {
    id: "sore-throat",
    category: { en: "Everyday", tr: "Günlük" },
    problem: {
      en: "Sore throat relief (mild)",
      tr: "Boğaz ağrısı rahatlatma (hafif)",
    },
    advice: {
      en: "Warm tea with honey and lemon; sip slowly. Stay hydrated. Use a humidifier or steam from a warm shower. Rest your voice.",
      tr: "Bal ve limonlu ılık çay; yavaşça yudumlayın. Bol su için. Nemlendirici kullanın veya ılık duş buharından yararlanın. Sesinizi dinlendirin.",
    },
    doctor: {
      en: "See a doctor for severe pain, high fever, rash, trouble breathing/swallowing, or if symptoms last more than a few days.",
      tr: "Şiddetli ağrı, yüksek ateş, döküntü, nefes alma/yutma güçlüğü veya belirtiler birkaç günden uzun sürerse doktora başvurun.",
    },
    tags: {
      en: ["throat", "tea", "honey", "lemon"],
      tr: ["boğaz", "çay", "bal", "limon"],
    },
  },
  {
    id: "cold-flu-comfort",
    category: { en: "Seasonal", tr: "Mevsimsel" },
    problem: {
      en: "Common cold comfort",
      tr: "Soğuk algınlığında rahatlama",
    },
    advice: {
      en: "Fluids (water, broths), rest, and warm drinks. Saline nasal rinse can help congestion. Keep the room comfortably humid.",
      tr: "Sıvılar (su, çorbalar), dinlenme ve ılık içecekler. Tuzlu suyla burun yıkama tıkanıklığa yardımcı olabilir. Odayı konforlu nemde tutun.",
    },
    doctor: {
      en: "Seek medical care for high/persistent fever, chest pain, breathing difficulty, or in infants/older adults with worsening symptoms.",
      tr: "Yüksek/süregelen ateş, göğüs ağrısı, nefes darlığı veya kötüleşen belirtileri olan bebek/yaşlılar için tıbbi yardım alın.",
    },
    tags: {
      en: ["cold", "fluids", "rest", "humidity"],
      tr: ["soğuk algınlığı", "sıvı", "dinlenme", "nem"],
    },
  },
  {
    id: "men-hydration-energy",
    category: { en: "Men’s Health", tr: "Erkek Sağlığı" },
    problem: {
      en: "Low energy days",
      tr: "Düşük enerji günleri",
    },
    advice: {
      en: "Hydrate regularly, get daylight exposure, and take short walks. Aim for consistent sleep and balanced meals.",
      tr: "Düzenli su için, gün ışığı alın ve kısa yürüyüşler yapın. Düzenli uyku ve dengeli öğünleri hedefleyin.",
    },
    doctor: {
      en: "If persistent fatigue affects daily life, discuss with a clinician to rule out medical causes.",
      tr: "Süregelen yorgunluk günlük yaşamı etkiliyorsa tıbbî nedenleri elemek için bir uzmana danışın.",
    },
    tags: {
      en: ["energy", "hydration", "sleep"],
      tr: ["enerji", "hidrasyon", "uyku"],
    },
  },
  {
    id: "pregnancy-morning-sickness",
    category: { en: "Pregnancy", tr: "Gebelik" },
    problem: {
      en: "Morning sickness comfort",
      tr: "Sabah bulantısında rahatlama",
    },
    advice: {
      en: "Small, frequent snacks; dry crackers on waking; ginger tea or ginger candies; sip fluids through the day; rest.",
      tr: "Küçük ve sık atıştırmalar; uyanınca kuru kraker; zencefil çayı veya zencefilli şeker; gün boyu yudum yudum sıvı; dinlenme.",
    },
    doctor: {
      en: "If you can’t keep fluids down, lose weight, or feel faint, contact your prenatal care provider promptly.",
      tr: "Sıvı tutamıyor, kilo kaybediyor veya baygınlık hissediyorsanız doğum öncesi bakım sağlayıcınıza hemen başvurun.",
    },
    tags: {
      en: ["pregnancy", "ginger", "snacks"],
      tr: ["gebelik", "zencefil", "atıştırma"],
    },
  },
  {
    id: "headache-mild",
    category: { en: "Everyday", tr: "Günlük" },
    problem: {
      en: "Mild headache days",
      tr: "Hafif baş ağrısı",
    },
    advice: {
      en: "Hydrate, dim harsh light, take screen breaks, try gentle neck/shoulder stretches, and get fresh air.",
      tr: "Su için, keskin ışığı azaltın, ekran molaları verin, nazik boyun/omuz esnetmeleri yapın ve açık havaya çıkın.",
    },
    doctor: {
      en: "For severe, sudden, or unusual headaches, or if they persist, see a clinician.",
      tr: "Şiddetli, ani veya alışılmadık baş ağrılarında ya da devam ederse bir uzmana başvurun.",
    },
    tags: {
      en: ["headache", "hydration", "light"],
      tr: ["baş ağrısı", "hidrasyon", "ışık"],
    },
  },
  {
    id: "sleep-better",
    category: { en: "Lifestyle", tr: "Yaşam Tarzı" },
    problem: {
      en: "Sleep routine support",
      tr: "Uyku rutini desteği",
    },
    advice: {
      en: "Set a regular schedule, keep the room cool/dark/quiet, limit late caffeine, and try a calming pre-bed ritual (reading, warm shower).",
      tr: "Düzenli bir plan yapın, odayı serin/karanlık/sessiz tutun, geç saatlerde kafeini sınırlayın ve yatmadan önce sakinleştirici bir ritüel deneyin (okuma, ılık duş).",
    },
    doctor: {
      en: "If insomnia persists or you suspect sleep apnea, consult a clinician.",
      tr: "Uykusuzluk sürerse veya uyku apnesinden şüpheleniyorsanız bir uzmana danışın.",
    },
    tags: {
      en: ["sleep", "routine", "caffeine"],
      tr: ["uyku", "rutin", "kafein"],
    },
  },
];

function TopicCard({
  topic,
  onOpen,
  lang,
}: {
  topic: Topic;
  onOpen: (t: Topic) => void;
  lang: Lang;
}) {
  return (
    <button
      className="text-left rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      onClick={() => onOpen(topic)}
      aria-label={topic.problem[lang]}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          {topic.problem[lang]}
        </h3>
        <span className="text-sm text-slate-400">{UI.learnMore[lang]}</span>
      </div>
      <p className="text-xs text-slate-500">{UI.category[lang]}: {topic.category[lang]}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {topic.tags[lang].map((t) => (
          <span
            key={t}
            className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium text-slate-700 border-slate-200 bg-white"
          >
            {t}
          </span>
        ))}
      </div>
    </button>
  );
}

function Modal({
  open,
  topic,
  onClose,
  lang,
}: {
  open: boolean;
  topic: Topic | null;
  onClose: () => void;
  lang: Lang;
}) {
  if (!open || !topic) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" onClick={onClose} />
      <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-2 flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-slate-900">{topic.problem[lang]}</h3>
          <button
            className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
            onClick={onClose}
            aria-label={UI.close[lang]}
          >
            {UI.close[lang]}
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="mb-1 text-sm font-semibold text-slate-700">{UI.problem[lang]}</h4>
            <p className="text-sm text-slate-700">{topic.problem[lang]}</p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-semibold text-slate-700">{UI.advice[lang]}</h4>
            <p className="text-sm text-slate-700">{topic.advice[lang]}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <h4 className="mb-1 text-sm font-semibold text-amber-800">{UI.doctor[lang]}</h4>
            <p className="text-sm text-amber-900">{topic.doctor[lang]}</p>
          </div>
          <p className="text-xs text-slate-500">
            {UI.safetyBullets[0][lang]}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [openTopic, setOpenTopic] = useState<Topic | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "tr") setLang(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const categories = useMemo(() => {
    const s = new Set<string>();
    TOPICS.forEach((t) => s.add(t.category[lang]));
    return ["All", ...Array.from(s).sort()];
  }, [lang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOPICS.filter((t) => {
      const inCat =
        !categoryFilter ||
        categoryFilter === "All" ||
        t.category[lang] === categoryFilter;
      const inText =
        !q ||
        t.problem[lang].toLowerCase().includes(q) ||
        t.advice[lang].toLowerCase().includes(q) ||
        t.tags[lang].some((x) => x.toLowerCase().includes(q));
      return inCat && inText;
    });
  }, [query, categoryFilter, lang]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-white">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-teal-600 text-white">🌿</span>
            <span className="text-lg font-semibold text-slate-900">
              {UI.siteTitle[lang]}
            </span>
          </div>
          <nav className="hidden items-center gap-4 text-sm text-slate-700 sm:flex">
            <a href="#topics" className="hover:text-teal-700">{UI.navTopics[lang]}</a>
            <a href="#tips" className="hover:text-teal-700">{UI.navTips[lang]}</a>
            <a href="#safety" className="hover:text-teal-700">{UI.navSafety[lang]}</a>
            <button
              onClick={() => setLang(lang === "en" ? "tr" : "en")}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              aria-label="Language toggle"
            >
              {lang === "en" ? "TR" : "EN"}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              {UI.heroTagline[lang]}
            </h1>
            <p className="mt-3 text-slate-700">{UI.heroDesc[lang]}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#topics"
                className="rounded-xl bg-teal-600 px-5 py-2.5 text-white shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {UI.browse[lang]}
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">
                {UI.navTopics[lang]}
              </span>
              <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-700">
                {UI.navTips[lang]}
              </span>
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-violet-700">
                {UI.navSafety[lang]}
              </span>
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex gap-2">
                <span>🫖</span>
                <p>
                  {lang === "en"
                    ? "Start with gentle, low-risk steps and listen to your body."
                    : "Nazik ve düşük riskli adımlarla başlayın; bedeninizi dinleyin."}
                </p>
              </div>
              <div className="flex gap-2">
                <span>📓</span>
                <p>
                  {lang === "en"
                    ? "Keep simple notes on what helped and what didn’t."
                    : "Nelerin yardımcı olduğunu ve olmadığını basitçe not alın."}
                </p>
              </div>
              <div className="flex gap-2">
                <span>⚠️</span>
                <p>
                  {UI.safetyBullets[0][lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">
            {UI.navTopics[lang]}
          </h2>
          <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-end">
            <input
              aria-label={UI.searchPlaceholder[lang]}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm outline-none ring-teal-500 focus:ring md:w-72"
              placeholder={UI.searchPlaceholder[lang]}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600">{UI.category[lang]}:</label>
              <select
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm"
                value={categoryFilter ?? "All"}
                onChange={(e) =>
                  setCategoryFilter(e.target.value == "All" ? null : e.target.value)
                }
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TopicCard key={t.id} topic={t} onOpen={setOpenTopic} lang={lang} />
          ))}
        </div>
      </section>

      {/* Tips (simple static) */}
      <section id="tips" className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">
          {UI.tipsTitle[lang]}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">
              {lang === "en" ? "Hydration habit" : "Hidrasyon alışkanlığı"}
            </h3>
            <p className="mt-1 text-sm text-slate-700">
              {lang === "en"
                ? "Carry a bottle and drink regularly; clear urine is a helpful sign."
                : "Yanınızda şişe taşıyın ve düzenli için; berrak idrar faydalı bir işarettir."}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">
              {lang === "en" ? "Light movement" : "Hafif hareket"}
            </h3>
            <p className="mt-1 text-sm text-slate-700">
              {lang === "en"
                ? "Short walks or gentle stretches can boost mood and comfort."
                : "Kısa yürüyüşler veya nazik esnetmeler ruh hâlini ve konforu artırabilir."}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">
              {lang === "en" ? "Screen breaks" : "Ekran molaları"}
            </h3>
            <p className="mt-1 text-sm text-slate-700">
              {lang === "en"
                ? "Use the 20-20-20 rule to rest your eyes during long screen time."
                : "Uzun ekran kullanımında gözleri dinlendirmek için 20-20-20 kuralını uygulayın."}
            </p>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-2xl font-semibold text-amber-900">
            {UI.safetyTitle[lang]}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-amber-900">
            {UI.safetyBullets.map((b) => (
              <li key={b.en}>{b[lang]}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-6 md:flex-row md:items-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {UI.siteTitle[lang]}. {UI.footer[lang]}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <a href="#safety" className="hover:text-teal-700">
              {UI.navSafety[lang]}
            </a>
            <a href="#topics" className="hover:text-teal-700">
              {UI.navTopics[lang]}
            </a>
            <a href="#tips" className="hover:text-teal-700">
              {UI.navTips[lang]}
            </a>
            <button
              onClick={() => setLang(lang === "en" ? "tr" : "en")}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              {lang === "en" ? "TR" : "EN"}
            </button>
          </div>
        </div>
      </footer>

      <Modal open={!!openTopic} topic={openTopic} onClose={() => setOpenTopic(null)} lang={lang} />
    </div>
  );
}
