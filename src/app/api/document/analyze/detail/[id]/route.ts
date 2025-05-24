import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const token = req.headers.get("authorization") ?? "";
  const { id } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/analysis/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
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
