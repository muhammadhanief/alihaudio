import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const textToSpeech = require("@google-cloud/text-to-speech");

const LOG_FILE = path.join(process.cwd(), "tts_error.log");

function logError(message: string, error: any) {
  const timestamp = new Date().toISOString();
  const errorMsg = error instanceof Error ? error.stack : JSON.stringify(error);
  const logContent = `[${timestamp}] ${message}: ${errorMsg}\n`;
  fs.appendFileSync(LOG_FILE, logContent);
}

export async function POST(req: NextRequest) {
  try {
    const { text, lang = "id-ID", gender = "FEMALE", usePremium = false } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Jika user ingin premium dan ada environment variable untuk Google Cloud
    const base64Json = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
    const rawJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

    if (usePremium && (base64Json || rawJson)) {
      try {
        let credentials;
        if (base64Json) {
          credentials = JSON.parse(Buffer.from(base64Json, 'base64').toString('utf8'));
        } else {
          credentials = JSON.parse(rawJson!.trim());
        }

        console.log("DEBUG: Using provider ->", base64Json ? "Base64" : "Raw JSON");

        // Pastikan newline pada private_key ditangani dengan benar
        if (credentials.private_key) {
          credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
        }

        const client = new textToSpeech.TextToSpeechClient({ credentials });

        // Pemilihan suara spesifik agar gender benar-benar berubah
        let voiceName = undefined;
        if (lang === "id-ID") {
          voiceName = gender === "MALE" ? "id-ID-Wavenet-B" : "id-ID-Wavenet-A";
        }

        const request = {
          input: { text },
          voice: {
            languageCode: lang,
            ssmlGender: gender,
            name: voiceName
          },
          audioConfig: { audioEncoding: "MP3" },
        };

        const [response] = await client.synthesizeSpeech(request);
        const base64Audio = response.audioContent.toString("base64");
        return NextResponse.json({ audio: base64Audio, type: "audio/mpeg", provider: "google-cloud" });
      } catch (premiumError: any) {
        console.error("Premium TTS Error:", premiumError.message);
        logError("Premium TTS Failed", premiumError);
        // Fallback to free if premium fails
      }
    }

    // Google Translate Gratis (Max ~200 chars per request)
    // For simplicity, we just take the first 200 chars if free mode is used
    // or return error if it fails.
    const freeText = text.substring(0, 200);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      freeText
    )}&tl=${lang.split('-')[0]}&client=tw-ob`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      logError("Free TTS Failed", errorText);
      throw new Error(`Failed to fetch from Google TTS: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString("base64");

    return NextResponse.json({
      audio: base64Audio,
      type: "audio/mpeg",
      provider: "google-free",
      note: text.length > 200 ? "Teks dipotong menjadi 200 karakter pada mode gratis." : undefined
    });
  } catch (error: any) {
    logError("General TTS Error", error);
    return NextResponse.json(
      { error: error.message || "Gagal menghasilkan audio. Periksa log server atau API Key Anda." },
      { status: 500 }
    );
  }
}
