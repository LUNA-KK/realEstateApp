import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const token = req.headers.get("authorization") ?? "";
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/house-board/${id}`,
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
