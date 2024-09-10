import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
const fileManager = new GoogleAIFileManager(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY
);
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) {
  try {
    // Parse the incoming request to get the image data
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

   const buffer = Buffer.from(await file.arrayBuffer());
    const fileData = new Uint8Array(buffer);
     const tempFilePath = path.join(process.cwd(), 'tmp', file.name);
    if (!fs.existsSync(path.join(process.cwd(), 'tmp'))) {
      fs.mkdirSync(path.join(process.cwd(), 'tmp'));
    }
    fs.writeFileSync(tempFilePath, buffer);
    const uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType: file.type,
      displayName: file.name,
    });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      "Extract the focus statistics and focus record from this image and return the data in JSON format. The JSON should contain two parts:1. 'focusStatistics' with today's Pomos, today's focus time, total Pomos, and total focus duration.2. 'focusRecord' with time, activity, and duration for each focus session.Return the result using minimal tokens",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    // Return the AI's response as a string
    return NextResponse.json({ result: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
