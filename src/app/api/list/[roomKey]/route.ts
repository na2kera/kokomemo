import { NextResponse } from "next/server";
import prisma from "../prisma";

async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("接続に失敗しました");
  }
}

export async function GET(req: Request, res: NextResponse) {
  try {
    const roomKey: string = req.url.split("/list/")[1];
    await main();
    const locationData = await prisma.data.findMany({
      where: { roomKey: roomKey },
    });
    return NextResponse.json(
      { message: "Success", locationData },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
