// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import { db } from './firebase';
import { db } from './app.js';

const list = (v) =>
  (v || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
const THRESH = Number(process.env.ALERT_HIGH_THRESHOLD || 3); // L>=THRESH -> HIGH route

export function buildAlert({ id, uid, level, text, lat, lng, createdAt }) {
  const sev = Math.min(Math.max(level ?? 2, 1), 5);
  const emoji = ['', '', '', '', ''][sev - 1];
  const title = `${emoji} PANIC L${sev}  ${uid?.slice(0, 6) || 'user'}`;
  const whenISO = createdAt
    ? new Date(createdAt).toISOString()
    : new Date().toISOString();
  const mapUrl =
    lat != null && lng != null
      ? `https://maps.google.com/?q=${lat},${lng}`
      : null;

  const lines = [
    `*${title}*`,
    text ? ` ${text.slice(0, 200)}` : null,
    mapUrl ? ` Location: ${mapUrl}` : null,
    ` Event: ${id}`,
    ` Time: ${whenISO}`,
  ].filter(Boolean);

  return {
    markdown: lines.join('\n'),
    plain: lines.join('\n').replace(/\*/g, ''),
    mapUrl,
    title,
    level: sev,
    lat,
    lng,
  };
}

/* Telegram */
async function sendTelegramTo(chatIds, message) {
  const token = process.env.TELEGRAM_BOT_TOKEN || '';
  if (!token || chatIds.length === 0)
    return { ok: false, reason: 'telegram-not-configured' };
  const urlBase = `https://api.telegram.org/bot${token}/sendMessage`;
  const results = [];
  for (const chat_id of chatIds) {
    const res = await fetch(urlBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id,
        text: message.plain,
        parse_mode: 'Markdown',
      }),
    });
    results.push({
      chat_id,
      ok: res.ok,
      body: await res.text().catch(() => '?'),
    });
  }
  return { ok: results.every((r) => r.ok), results };
}

export async function sendTelegram(message) {
  const base = list(process.env.TELEGRAM_CHAT_IDS);
  const low = list(process.env.TELEGRAM_CHAT_IDS_LOW);
  const high = list(process.env.TELEGRAM_CHAT_IDS_HIGH);
  const routes = new Set();
  base.forEach((x) => routes.add(x));
  (message.level >= THRESH ? high : low).forEach((x) => routes.add(x));
  return await sendTelegramTo([...routes], message);
}

/* Google Chat (cardsV2) */
function buildChatCard(message) {
  const brand = process.env.BRAND_ICON_URL || '';
  const widgets = [
    { textParagraph: { text: message.markdown.replace(/\*/g, '') } },
  ];
  if (message.mapUrl) {
    widgets.push({
      buttonList: {
        buttons: [
          { text: 'Open Map', onClick: { openLink: { url: message.mapUrl } } },
        ],
      },
    });
  }
  return {
    cardsV2: [
      {
        cardId: 'streetwise-panic',
        card: {
          header: {
            title: message.title.replace(/\*/g, ''),
            subtitle: `Severity L${message.level}`,
            imageUrl: brand || undefined,
            imageType: brand ? 'CIRCLE' : undefined,
          },
          sections: [
            {
              header: `Severity ${message.level}`,
              collapsible: false,
              widgets,
            },
          ],
          fixedFooter: message.mapUrl
            ? {
                primaryButton: {
                  text: 'Open Map',
                  onClick: { openLink: { url: message.mapUrl } },
                },
              }
            : undefined,
        },
      },
    ],
  };
}

async function sendGoogleChatTo(hooks, message) {
  if (hooks.length === 0)
    return { ok: false, reason: 'googlechat-not-configured' };
  const cardPayload = buildChatCard(message);
  const textPayload = { text: message.plain };
  const results = [];
  for (const url of hooks) {
    let res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(cardPayload),
    });
    if (!res.ok) {
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(textPayload),
      });
    }
    results.push({
      url: url.slice(0, 40) + '',
      ok: res.ok,
      body: await res.text().catch(() => '?'),
    });
  }
  return { ok: results.every((r) => r.ok), results };
}

export async function sendGoogleChat(message) {
  const base = list(process.env.GOOGLE_CHAT_WEBHOOKS);
  const low = list(process.env.GOOGLE_CHAT_WEBHOOKS_LOW);
  const high = list(process.env.GOOGLE_CHAT_WEBHOOKS_HIGH);
  const hooks = new Set();
  base.forEach((x) => hooks.add(x));
  (message.level >= THRESH ? high : low).forEach((x) => hooks.add(x));
  return await sendGoogleChatTo([...hooks], message);
}

/* Fanout + annotate */
export async function fanoutAlert(msg) {
  const outs = [];
  outs.push(
    await sendTelegram(msg).catch((e) => ({ ok: false, error: String(e) }))
  );
  outs.push(
    await sendGoogleChat(msg).catch((e) => ({ ok: false, error: String(e) }))
  );
  return outs;
}

export async function annotateQueue(id, patch) {
  await db().collection('panicQueue').doc(id).set(patch, { merge: true });
}






