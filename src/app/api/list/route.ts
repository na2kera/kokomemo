import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "./prisma";

async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("接続に失敗しました");
  }
}

// export const GET = async (req: Request, res: NextResponse) => {
//   try {
//     await main();
//     const posts = await prisma.data.findMany();
//     return NextResponse.json({ message: "Success", posts }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ message: "Error", err }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

export async function POST(req: Request, res: NextResponse) {
  try {
    const { user, detail, roomKey, latitude, longitude } = await req.json();
    await main();
    const post = await prisma.data.create({
      data: { user, detail, roomKey, latitude, longitude },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
