import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization") ?? "";
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get("url");

  const response = await fetch(`${process.env.NEXT_PUBLIC_PATH}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const imageBuffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.startsWith("image/")) {
    console.error(`Invalid content-type for image`);
    return NextResponse.json(
      { error: "The fetched resource is not a valid image." },
      { status: 500 }
    );
  }

  return new NextResponse(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
    },
  });
}
