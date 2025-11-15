# TODO List for Replacing Cart and Favourites Drawers with Separate Pages

- [x] Create src/pages/CartPage.tsx with full page layout, cart items display, total calculation, remove/clear functions
- [x] Create src/pages/FavouritesPage.tsx with full page layout, product grid, remove and add-to-cart buttons
- [x] Update src/App.tsx to add routes for /cart and /favourites
- [x] Update src/components/Navigation.tsx to change cart and favourites buttons to Link components navigating to /cart and /favourites
- [x] Update src/pages/Home.tsx to remove CartDrawer and FavouritesDrawer components
- [x] Add scroll-to-top functionality to CartPage and FavouritesPage
- [ ] Create category pages: SpicesPage.tsx, CerealsPage.tsx, MasalasPage.tsx, NutsPage.tsx, RicePage.tsx, SeedsPage.tsx, MilletsPage.tsx, FloursPage.tsx, PulsesPage.tsx, SpecialProductsPage.tsx
- [ ] Update src/App.tsx to add routes for all category pages
- [ ] Update src/components/Navigation.tsx to change category links from hash links to page routes
