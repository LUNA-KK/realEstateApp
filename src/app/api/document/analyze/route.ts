import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization") ?? "";
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const body = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/house-board/${id}/analyze`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("External API Error Response Text:", errorText);
    return NextResponse.json(
      { error: "External API request failed", details: errorText },
      { status: response.status }
    );
  }

  try {
    const result = await response.json();
    return NextResponse.json(result);
  } catch (e) {
    console.error("Failed to parse JSON from external API:", e);
    return NextResponse.json(
      { error: "Failed to parse JSON response from external API" },
      { status: 500 }
    );
  }
}
