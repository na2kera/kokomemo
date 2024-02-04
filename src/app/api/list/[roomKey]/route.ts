import { NextResponse } from "next/server";
import { main, prisma } from "../route";

export const GET = async (req: Request, res: NextResponse) => {
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
};
