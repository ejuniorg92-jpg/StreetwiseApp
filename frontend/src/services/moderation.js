import OpenAI from 'openai';
const key = process.env.OPENAI_API_KEY || '';
const client = key ? new OpenAI({ apiKey: key }) : null;

const BAD = [
  /(?<!\w)kill(?!\w)/i,
  /\bsuicide|self[-\s]?harm\b/i,
  /\b(hard\s?drugs?|cook meth|fentanyl)\b/i,
];

export async function moderateText(text) {
  const reasons = BAD.filter((r) => r.test(text)).map((r) => r.toString());
  let flagged = reasons.length > 0;

  if (client) {
    try {
      const r = await client.moderations.create({
        model: 'omni-moderation-latest',
        input: text,
      });
      if (r?.results?.[0]?.flagged) {
        flagged = true;
        reasons.push('openai:flagged');
      }
    } catch {}
  }
  return { flagged, reasons };
}



