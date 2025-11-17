# TODO: Implement Review Addition Feature for Logged-in Customers

## Overview
Allow customers to add reviews to products when they are logged in. Reviews include rating (1-5 stars) and comment.

## Steps to Complete
- [x] Import useAuth hook in ProductDetails.tsx
- [x] Add state for managing reviews (initialized from product.reviews)
- [x] Add state for new review form (rating and comment)
- [x] Modify reviews display to use state instead of static data
- [x] Add review form UI for logged-in users (star rating selector, comment textarea, submit button)
- [x] Implement submit logic to add new review to state and reset form
- [x] Ensure form is only visible when user is logged in
- [x] Test the feature by logging in and adding a review
