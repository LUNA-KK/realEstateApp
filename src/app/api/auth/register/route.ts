// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const dataBlob = formData.get("data") as Blob;
  const userJson = JSON.parse(await dataBlob.text());
  const file = formData.get("userimg");

  // 외부 API 에도 FormData 로 포워딩
  const forward = new FormData();
  forward.append(
    "data",
    new Blob([JSON.stringify(userJson)], { type: "application/json" })
  );
  if (file instanceof File) {
    forward.append("userimg", file);
  }

  const response = await fetch("http://218.150.182.76/api/member/join", {
    method: "POST",
    body: forward,
  });

  const result = await response.json();

  return NextResponse.json(result);
}
