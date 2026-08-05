import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { type, rating, text } = data;

    const feedbackEntry = `\n## Feedback Entry - ${new Date().toISOString()}\n- **Type:** ${type}\n- **Rating:** ${rating} Stars\n- **Details:** ${text}\n`;

    // Determine the correct root directory based on the current working directory
    const isFrontendDir = process.cwd().endsWith('frontend');
    const rootPath = isFrontendDir ? path.resolve(process.cwd(), '..') : process.cwd();
    const feedbackFilePath = path.join(rootPath, 'FEEDBACK.md');

    try {
      await fs.appendFile(feedbackFilePath, feedbackEntry, 'utf8');
    } catch (fsErr: unknown) {
      // Fallback for serverless environments (like Vercel) where the filesystem is read-only
      const errorMessage = fsErr instanceof Error ? fsErr.message : String(fsErr);
      console.warn(`[Feedback API] Could not write to file (${errorMessage}). Logging instead:`);
      console.log(feedbackEntry);
    }

    return NextResponse.json({ success: true, message: "Feedback saved!" });
  } catch (error: unknown) {
    console.error('Feedback write error:', error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
