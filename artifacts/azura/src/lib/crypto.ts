/**
 * Simple encryption utility for API keys
 * Uses XOR cipher with a secret salt - not cryptographically secure
 * but prevents casual inspection of the key in Firebase
 */

const SECRET_SALT = "Azura2024Cafe";

// Markers to identify encrypted vs plain text keys
const ENCRYPTED_PREFIX = "___ENC___";

export function encryptKey(key: string): string {
  if (!key) return "";
  let result = "";
  for (let i = 0; i < key.length; i++) {
    const charCode = key.charCodeAt(i) ^ SECRET_SALT.charCodeAt(i % SECRET_SALT.length);
    result += String.fromCharCode(charCode);
  }
  return ENCRYPTED_PREFIX + btoa(result);
}

export function decryptKey(encrypted: string): string {
  if (!encrypted) return "";
  
  // Check if it's actually encrypted
  if (!encrypted.startsWith(ENCRYPTED_PREFIX)) {
    // Not encrypted, return as-is
    return encrypted;
  }
  
  try {
    const base64Part = encrypted.slice(ENCRYPTED_PREFIX.length);
    const decoded = atob(base64Part);
    let result = "";
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ SECRET_SALT.charCodeAt(i % SECRET_SALT.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch {
    return "";
  }
}

// Check if key looks valid (basic validation)
export function isValidApiKey(key: string): boolean {
  if (!key) return false;
  // Groq keys start with gsk_
  // Gemini keys: AIza... or AQ...
  return key.length >= 30 && (key.startsWith("gsk_") || key.startsWith("AIza") || key.startsWith("AQ."));
}

// ── AI Chat ─────────────────────────────────────────────────

interface AIProvider {
  name: string;
  endpoint: string;
  model?: string;
  requiresKey: boolean;
  supportsCors?: boolean;
}

// Available AI Providers
const AI_PROVIDERS: Record<string, AIProvider> = {
  groq: {
    name: "Groq",
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.1-8b-instant",
    requiresKey: true,
    supportsCors: true,
  },
  bazaarlink: {
    name: "BazarLink",
    endpoint: "https://bazaarlink.ai/api/v1/chat/completions",
    model: "openai",
    requiresKey: false,
    supportsCors: true,
  },
  cerbras: {
    name: "Cerbras",
    endpoint: "https://api.cerbras.ai/v1/chat/completions",
    model: "openai",
    requiresKey: true,
    supportsCors: true,
  },
  openai: {
    name: "OpenAI Compatible",
    endpoint: "",
    requiresKey: true,
    supportsCors: true,
  },
  pollinations: {
    name: "Pollinations",
    endpoint: "https://text.pollinations.ai/openai/chat/completions",
    model: "openai",
    requiresKey: false,
    supportsCors: true,
  },
};

// Call any OpenAI-compatible API with CORS handling
async function callOpenAICompatible(
  endpoint: string,
  model: string,
  messages: Array<{ role: string; content: string }>,
  apiKey?: string,
  maxTokens: number = 500
): Promise<string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  
  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: maxTokens,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "Unknown error");
    throw new Error(`API Error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

// Call BazarLink (no auth required, CORS-friendly)
async function chatWithBazarLink(
  message: string,
  history: Array<{ role: string; parts: Array<{ text: string }> }>,
  systemPrompt: string
): Promise<string> {
  const limitedHistory = history.slice(-5);
  const limitedSystem = systemPrompt.slice(0, 2000);
  
  const messages = [
    { role: "system", content: limitedSystem },
    ...limitedHistory.map((h) => ({
      role: h.role === 'model' ? 'assistant' : 'user',
      content: h.parts[0]?.text || "",
    })),
    { role: "user", content: message }
  ];

  return callOpenAICompatible(
    "https://bazaarlink.ai/api/v1/chat/completions",
    "openai",
    messages,
    undefined,
    400
  );
}

// Call Cerbras API
async function chatWithCerbras(
  apiKey: string,
  message: string,
  history: Array<{ role: string; parts: Array<{ text: string }> }>,
  systemPrompt: string
): Promise<string> {
  const limitedHistory = history.slice(-5);
  const limitedSystem = systemPrompt.slice(0, 2000);
  
  const messages = [
    { role: "system", content: limitedSystem },
    ...limitedHistory.map((h) => ({
      role: h.role === 'model' ? 'assistant' : 'user',
      content: h.parts[0]?.text || "",
    })),
    { role: "user", content: message }
  ];

  return callOpenAICompatible(
    "https://api.cerbras.ai/v1/chat/completions",
    "openai",
    messages,
    apiKey,
    400
  );
}

// Call Pollinations (free, no key)
async function chatWithPollinations(
  message: string,
  history: Array<{ role: string; parts: Array<{ text: string }> }>,
  systemPrompt: string
): Promise<string> {
  const limitedHistory = history.slice(-3);
  const limitedSystem = systemPrompt.slice(0, 1500);
  
  const messages = [
    { role: "system", content: limitedSystem },
    ...limitedHistory.map((h) => ({
      role: h.role === 'model' ? 'assistant' : 'user',
      content: h.parts[0]?.text || "",
    })),
    { role: "user", content: message }
  ];

  // Try POST first
  try {
    return await callOpenAICompatible(
      "https://text.pollinations.ai/openai/chat/completions",
      "openai",
      messages,
      undefined,
      300
    );
  } catch (postErr) {
    console.warn("Pollinations POST failed, trying GET fallback:", postErr);
  }

  // GET fallback for Pollinations (more resilient)
  try {
    const historyText = limitedHistory.map((h) => 
      `${h.role === 'model' ? 'Assistant' : 'User'}: ${h.parts[0]?.text || ""}`
    ).join("\n");
    const fullPrompt = historyText ? `${historyText}\nUser: ${message}` : message;
    
    const shortPrompt = fullPrompt.slice(0, 800);
    const shortSystem = limitedSystem.slice(0, 1000);
    
    const getUrl = `https://text.pollinations.ai/${encodeURIComponent(shortPrompt)}?system=${encodeURIComponent(shortSystem)}&model=openai&seed=${Date.now()}`;
    
    const res = await fetch(getUrl);
    if (res.ok) {
      const text = await res.text();
      if (text && text.length < 4000 && !text.includes("<!DOCTYPE")) {
        return text;
      }
    }
  } catch (getErr) {
    console.warn("Pollinations GET fallback failed:", getErr);
  }

  throw new Error("All AI services failed. Please try again later.");
}

// Main AI Chat function with provider selection
export async function chatWithAI(
  apiKey: string,
  message: string,
  history: Array<{ role: string; parts: Array<{ text: string }> }>,
  systemPrompt: string
): Promise<string> {
  // Load settings to determine provider
  let aiProvider = "groq";
  let openaiEndpoint = "";

  try {
    const { db, ref, get } = await import("./firebase");
    const snap = await get(ref(db, "api-settings"));
    if (snap.exists()) {
      const data = snap.val();
      aiProvider = data.aiProvider || "groq";
      openaiEndpoint = data.openaiEndpoint || "";
    }
  } catch (e) {
    console.warn("Could not load AI settings, using default", e);
  }

  // Provider selection
  try {
    switch (aiProvider) {
      case "bazaarlink":
        return await chatWithBazarLink(message, history, systemPrompt);
      
      case "cerbras":
        if (!apiKey) throw new Error("Cerbras requires an API key");
        return await chatWithCerbras(apiKey, message, history, systemPrompt);
      
      case "openai":
        if (!openaiEndpoint || !apiKey) throw new Error("OpenAI requires endpoint and key");
        return await callOpenAICompatible(
          openaiEndpoint.replace(/\/$/, "") + "/chat/completions",
          "gpt-4-turbo",
          [
            { role: "system", content: systemPrompt.slice(0, 2000) },
            ...history.slice(-5).map((h) => ({
              role: h.role === 'model' ? 'assistant' : 'user',
              content: h.parts[0]?.text || "",
            })),
            { role: "user", content: message }
          ],
          apiKey,
          500
        );
      
      case "pollinations":
        return await chatWithPollinations(message, history, systemPrompt);
      
      case "groq":
      default:
        // Groq with fallback to Pollinations
        if (!apiKey) {
          console.warn("No Groq API key, falling back to Pollinations");
          return await chatWithPollinations(message, history, systemPrompt);
        }
        
        const groqMessages = [
          { role: "system", content: systemPrompt.slice(0, 2500) },
          ...history.slice(-5).map((h) => ({
            role: h.role === 'model' ? 'assistant' : 'user',
            content: h.parts[0]?.text || "",
          })),
          { role: "user", content: message }
        ];
        
        return await callOpenAICompatible(
          "https://api.groq.com/openai/v1/chat/completions",
          "llama-3.1-8b-instant",
          groqMessages,
          apiKey,
          500
        );
    }
  } catch (err: any) {
    console.error(`AI Provider ${aiProvider} failed:`, err);
    
    // Fallback chain: Groq -> Pollinations
    if (aiProvider === "groq" || aiProvider === "openai" || aiProvider === "cerbras") {
      try {
        return await chatWithPollinations(message, history, systemPrompt);
      } catch (fallbackErr) {
        console.error("Fallback to Pollinations also failed:", fallbackErr);
      }
    }
    
    throw new Error(`AI service unavailable: ${err.message}`);
  }
}

// ── TTS via Web Speech API (browser built-in, zero CORS, no API key) ──
/**
 * Speaks text using the browser's built-in SpeechSynthesis engine.
 * Arabic → ar-EG locale.  English → en-US locale.
 * Falls back silently if the browser does not support speechSynthesis.
 */
export function speakText(text: string, lang: string = "en"): Promise<void> {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) { resolve(); return; }
    window.speechSynthesis.cancel();

    const clean = text
      .replace(/[*_`#\[\]]/g, "")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 300);

    if (!clean) { resolve(); return; }

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang    = lang === "ar" ? "ar-EG" : "en-US";
    utterance.rate    = lang === "ar" ? 0.88 : 1.0;
    utterance.pitch   = 1.0;
    utterance.volume  = 1.0;
    utterance.onend   = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

/** @deprecated Use speakText() directly */
export async function textToSpeech(_text: string, _lang: string = "en"): Promise<string> {
  return "";
}

/** @deprecated Use speakText() directly */
export function playAudioFromUrl(_url: string): Promise<void> {
  return Promise.resolve();
}