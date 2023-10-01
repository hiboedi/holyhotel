import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import FavoritesClient from "./FavoritesCient";

import getCurrentUser from "../Actions/GetCurrentUser";
import getFavoriteListing from "../Actions/GetFavoriteListings";

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListing();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite list!."
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
