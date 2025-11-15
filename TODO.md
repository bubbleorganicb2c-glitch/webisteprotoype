# TODO List for Replacing Cart and Favourites Drawers with Separate Pages

- [x] Create src/pages/CartPage.tsx with full page layout, matching Home background and styles, including cart content adapted from CartDrawer
- [x] Create src/pages/FavouritesPage.tsx with full page layout, matching Home background and styles, including favourites content adapted from FavouritesDrawer
- [x] Update src/App.tsx to add routes for /cart and /favourites
- [x] Update src/components/Navigation.tsx to change cart and favourites buttons to Link components navigating to /cart and /favourites
- [x] Update src/pages/Home.tsx to remove CartDrawer and FavouritesDrawer components
- [x] Test navigation to new pages and verify content, background, and font consistency
