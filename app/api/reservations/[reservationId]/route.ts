import { NextResponse } from "next/server";

import getCurrentUser from "@/app/Actions/GetCurrentUser";
import prisma from "@/app/libs/prismaDB";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId != "string") {
    throw new Error("Invalid reservation ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      //   who the enable to delete is the creator of reservation or the creator of listing when reservation is on (who created the list)
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
