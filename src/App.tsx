import { useEffect, useState } from "react";
import "./index.css";

// UI translations
const UI = {
  title: { en: "Life in Balance", tr: "Dengede Yaşam" },
  intro: {
    en: "Discover safe, everyday wellness tips for a balanced life. Educational only, not medical advice.",
    tr: "Dengeli bir yaşam için güvenli, günlük sağlık ipuçlarını keşfedin. Yalnızca eğitsel, tıbbi tavsiye değildir."
  },
  topicsTitle: { en: "Wellness Topics", tr: "Sağlık Konuları" },
  tipsTitle: { en: "Daily Wellness Tip", tr: "Günün Sağlık İpucu" },
  safety: {
    en: "Educational purposes only. This site does not provide medical advice. Always consult a doctor for serious conditions.",
    tr: "Yalnızca eğitsel amaçlıdır. Bu site tıbbi tavsiye vermez. Ciddi durumlar için daima bir doktora danışın."
  }
};

// Sample topics (you can expand these)
const TOPICS = [
  {
    id: 1,
    category: "General",
    problem_en: "Sore throat relief",
    problem_tr: "Boğaz ağrısı rahatlatma",
    advice_en: "Drink warm tea with honey and lemon to soothe irritation.",
    advice_tr: "Tahrişi hafifletmek için bal ve limonlu ılık çay için.",
    doctor_en: "If pain persists for more than 3 days or is severe, see a doctor.",
    doctor_tr: "Ağrı 3 günden uzun sürerse veya şiddetliyse doktora başvurun."
  },
  {
    id: 2,
    category: "Pregnancy",
    problem_en: "Mild morning nausea",
    problem_tr: "Hafif sabah bulantısı",
    advice_en: "Eat small, frequent snacks and avoid strong odors.",
    advice_tr: "Küçük, sık atıştırmalıklar yiyin ve güçlü kokulardan kaçının.",
    doctor_en: "Consult your doctor if nausea is severe or persistent.",
    doctor_tr: "Bulantı şiddetliyse veya uzun sürüyorsa doktorunuza danışın."
  }
];

// Daily tip type
type DailyTip = {
  date: string;
  topic_en: string; tip_en: string;
  topic_tr: string; tip_tr: string;
  disclaimer_en: string; disclaimer_tr: string;
};

export default function App() {
  const [lang, setLang] = useState<"en" | "tr">("en");
  const [daily, setDaily] = useState<DailyTip | null>(null);

  useEffect(() => {
    fetch("/daily.json", { cache: "no-store" })
      .then(r => r.json())
      .then(setDaily)
      .catch(() => setDaily(null));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">{UI.title[lang]}</h1>
          <div>
            <button
              className={`px-2 py-1 text-sm ${lang === "en" ? "font-bold" : ""}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={`px-2 py-1 text-sm ${lang === "tr" ? "font-bold" : ""}`}
              onClick={() => setLang("tr")}
            >
              TR
            </button>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-lg text-slate-700">{UI.intro[lang]}</p>
      </section>

      {/* Daily Tip Section */}
      <section id="tips" className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">
          {UI.tipsTitle[lang]}
        </h2>

        {daily ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                {lang === "en" ? daily.topic_en : daily.topic_tr}
              </h3>
              <span className="text-xs text-slate-500">{daily.date}</span>
            </div>
            <p className="mt-1 text-sm text-slate-700">
              {lang === "en" ? daily.tip_en : daily.tip_tr}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              {lang === "en" ? daily.disclaimer_en : daily.disclaimer_tr}
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-600">Loading today’s tip…</p>
        )}
      </section>

      {/* Wellness Topics */}
      <section id="topics" className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">
          {UI.topicsTitle[lang]}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {TOPICS.map((t) => (
            <div key={t.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                {lang === "en" ? t.problem_en : t.problem_tr}
              </h3>
              <p className="mt-1 text-sm text-slate-700">
                {lang === "en" ? t.advice_en : t.advice_tr}
              </p>
              <p className="mt-2 text-xs text-slate-500">
                {lang === "en" ? t.doctor_en : t.doctor_tr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Footer */}
      <footer className="mt-8 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-slate-600">
          {UI.safety[lang]}
        </div>
      </footer>
    </div>
  );
}
