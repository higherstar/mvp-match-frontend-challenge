// Pages
import {
  // Auth pages
  SignInPage,
  SignUpPage,
  // Buyer pages
  BuyerHomePage,
  BuyerProductsPage,
    BuyerProductPage,
  BuyerShoppingCartPage,
  BuyerDepositPage,
  // Seller pages
  SellerProductsPage
} from "../pages";

// Auth routes
export const authRoutes = [
  {
    path: "/auth/sign-in",
    component: SignInPage
  },
  {
    path: "/auth/sign-up",
    component: SignUpPage
  },
  // {
  //   path: "/auth/reset-password",
  //   component: ResetPassword
  // },
  // {
  //   path: "/auth/404",
  //   component: Page404
  // },
  // {
  //   path: "/auth/500",
  //   component: Page500
  // }
];

export const buyerRoutes = [
  {
    path: "/",
    component: BuyerHomePage
  },
  {
    path: "/products",
    showToNav: true,
    name: "Products",
    component: BuyerProductsPage
  },
  {
    path: "/products/:id",
    component: BuyerProductPage
  },
  {
    path: "/shopping-cart",
    name: "Shopping cart",
    showToNav: true,
    component: BuyerShoppingCartPage
  },
  {
    path: "/deposit",
    name: "Deposit",
    showToNav: true,
    component: BuyerDepositPage,
  }
];

export const sellerRoutes = [
  {
    path: "/",
    name: "Products",
    icon: "shopping_cart",
    component: SellerProductsPage
  }
];
