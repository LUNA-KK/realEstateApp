import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json(); // JSON 파싱

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/member/join`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  console.log(response);

  const result = await response.json();

  return NextResponse.json(result);
}
