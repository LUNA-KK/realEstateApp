import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization") ?? "";

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await response.json();

  return NextResponse.json(data);
}
