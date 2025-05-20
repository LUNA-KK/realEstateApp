// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization") ?? "";

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "0";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/house-board/list?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  const result = await response.json();
  return NextResponse.json(result);
}
