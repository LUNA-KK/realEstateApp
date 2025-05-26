import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization") ?? "";

  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/wishlist/${id}/toggle`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
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

  return NextResponse.json(1);
}
