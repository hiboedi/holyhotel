import prisma from "@/app/libs/prismaDB";

interface IParams {
  listingId?: string;
}

export default async function getListingsById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        // to get proper image and the user own for the listing
        user: true,
      },
    });

    if (!listing) {
      return null;
    }
    // return and sanitize listing and user because Date type to avoid the warning
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
