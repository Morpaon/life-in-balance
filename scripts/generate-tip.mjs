import fs from "node:fs";
import path from "node:path";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const OUT = path.join(process.cwd(), "public", "daily.json");

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const prompt = `
You are a careful wellness editor. Produce ONE low-risk, non-medical home suggestion
for a general audience. Output EN and TR. Keep it short (2-4 sentences each).
Do NOT mention medicines, supplements, dosages, or risky practices.
Always include a brief disclaimer.

Allowed areas: hydration, sleep hygiene, light movement, posture breaks, fresh air,
warm tea with lemon/honey, humidifier/steam, saline rinse, soothing routines,
daylight exposure, simple stretches.

Return ONLY valid JSON with keys:
date, topic_en, tip_en, topic_tr, tip_tr, disclaimer_en, disclaimer_tr.
`;

async function run() {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You write safe, low-risk wellness tips. Not medical advice." },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("OpenAI error:", text);
    process.exit(1);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) { console.error("No content"); process.exit(1); }

  const obj = JSON.parse(content);
  obj.date = today;

  fs.writeFileSync(OUT, JSON.stringify(obj, null, 2));
  console.log("Wrote", OUT);
}

run().catch(err => { console.error(err); process.exit(1); });
