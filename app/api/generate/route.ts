import { GoogleGenerativeAI } from "@google/generative-ai";
import { ElevenLabsClient } from "elevenlabs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { childName, age, theme } = await req.json();

    // 1. Configuración de Gemini 3
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    
    // Usamos Gemini 3 Flash que es el que tienes en tu panel
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

    const prompt = `Escribe un cuento infantil para un niño de ${age} años llamado ${childName}. El tema es ${theme}. Sé breve (150 palabras) y mágico.`;

    // SEGÚN TU DOCUMENTACIÓN: Para Gemini 3 la temperatura DEBE ser 1.0
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 1.0, 
      },
    });

    const storyText = result.response.text();
    console.log("Cuento generado:", storyText);

    // 2. Configuración de ElevenLabs
    const elevenlabs = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY,
    });

    const audioStream = await elevenlabs.generate({
  // Voice ID de "Bill" (Narrador cinematográfico muy bueno en español)
  voice: "pqHfZKP75CvOlQylNhV4", 
  text: storyText,
  model_id: "eleven_turbo_v2_5", // El modelo v2 es clave para el acento
  voice_settings: {
    stability: 0.45,       // Menos estabilidad = más emoción y variedad de tono
    similarity_boost: 0.8, // Mayor similitud para mantener el acento claro
    style: 0.0,            // Mantenerlo neutro para narración
    use_speaker_boost: true
  }
});

    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    return new NextResponse(audioBuffer, {
      headers: { "Content-Type": "audio/mpeg" },
    });

  } catch (error) {
    console.error("Error detallado:", error);
    return NextResponse.json({ error: "Fallo en la creación" }, { status: 500 });
  }
}