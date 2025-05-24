// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization") ?? "";
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code"); // "code"라는 이름의 쿼리 파라미터 값을 가져옴

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/addrCode/list?code=${code}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    }
  );

  if (!response.ok) {
    // 응답이 성공적이지 않으면 (2xx 상태 코드가 아니면)
    // 에러 메시지를 텍스트로 읽어봅니다.
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
    // JSON 파싱 중 에러 발생 시 (예: 빈 응답)
    console.error("Failed to parse JSON from external API:", e);
    return NextResponse.json(
      { error: "Failed to parse JSON response from external API" },
      { status: 500 }
    );
  }
}
