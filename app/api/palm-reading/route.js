import { GoogleGenerativeAI } from '@google/generative-ai';

// Helper function to convert file to Generative Part
async function fileToGenerativePart(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType: file.type,
    },
  };
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return new Response(JSON.stringify({ error: 'No image file uploaded.' }), { status: 400 });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imageParts = [
      await fileToGenerativePart(imageFile),
    ];

    const prompt = "この手の画像を見て、手相占い師として運勢を占ってください。生命線、感情線、知能線、運命線を中心に、詳細な鑑定結果を教えてください。";

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ result: text }), { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: '手相占いに失敗しました。APIキーが正しく設定されているか、または画像が鮮明か確認してください。' }), { status: 500 });
  }
}