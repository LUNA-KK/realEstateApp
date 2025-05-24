// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch("http://218.150.182.76/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

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
    // 이 경우에도 응답 텍스트를 확인하는 것이 유용할 수 있습니다.
    // const responseTextForDebug = await response.text(); // response.json()이 실패하면 response.text()도 다시 호출해야 할 수 있음 (주의: body는 한 번만 읽을 수 있음)
    // console.error("External API Response Text (on JSON parse error):", responseTextForDebug);
    return NextResponse.json(
      { error: "Failed to parse JSON response from external API" },
      { status: 500 } // 또는 적절한 에러 코드
    );
  }
}
