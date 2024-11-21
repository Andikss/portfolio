/**
 * File: src/app/api/generate-article/route.ts
 * Initial endpoint that starts the article generation process
 * This handles both GET (cron job) and POST (manual) requests
 */

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (request.headers.get("Authorization") !== `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Start the generation pipeline
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/article-generation/generate-topic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return NextResponse.json({ message: "Article generation started..." });
  } catch (error) {
    console.error("Error starting article generation:", error);
    return NextResponse.json({ error: "Failed to start generation" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Start the generation pipeline with provided topic/image
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/article-generation/generate-topic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error('Failed to start generation process');

    return NextResponse.json({ message: "Article generation started..." });
  } catch (error) {
    console.error("Error starting article generation:", error);
    return NextResponse.json({ error: "Failed to start generation" }, { status: 500 });
  }
}