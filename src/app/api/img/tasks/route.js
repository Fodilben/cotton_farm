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
    const userErr = formData.get('userErr');
    const prompt = formData.get('prompt');

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Prepare the base prompt
    let aiPrompt =
      "Extract the task details from this image and return the data as a plain string containing a valid JSON object. The JSON should have two parts: 1. 'todayTasks' with a list of tasks that have 'name', 'category', and 'status'. 2. 'habitTasks' with a list of habits that have 'name' and 'status'. 3. 'completedTasks' with a list of completed tasks that have 'name', 'category', and 'status'. Return the result using minimal tokens, with no additional formatting";
    // Add user prompt if provided
    if (prompt) {
      aiPrompt += ` Additional remark: ${prompt}`;
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
      aiPrompt,
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
