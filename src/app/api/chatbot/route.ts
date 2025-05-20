// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization") ?? "";

  const body = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/Realty/chat`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body.value),
    }
  );

  const result = await response.json();
  return NextResponse.json(result);
}
