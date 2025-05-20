// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const dataBlob = formData.get("data") as Blob;
  const userJson = JSON.parse(await dataBlob.text());
  const file = formData.get("pimg");

  const token = req.headers.get("authorization") ?? "";

  // 외부 API 에도 FormData 로 포워딩
  const forward = new FormData();
  forward.append(
    "data",
    new Blob([JSON.stringify(userJson)], { type: "application/json" })
  );
  if (file instanceof File) {
    forward.append("pimg", file);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/house-board/create`,
    {
      method: "POST",
      body: forward,
      headers: {
        Authorization: token,
      },
    }
  );

  const result = await response.json();

  return NextResponse.json(result);
}
