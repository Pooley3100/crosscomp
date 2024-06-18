import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Test" }, { status: 200 });
}

export async function POST(request) {
    const myJson = await request.json()
    console.log(myJson)
    return NextResponse.json({ message: "Test" }, { status: 200 });
}