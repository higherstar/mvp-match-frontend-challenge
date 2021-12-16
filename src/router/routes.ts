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
  SellerProductsPage,
  SellerNewProductPage,
  SellerProductEditPage,
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
  }
];

export const buyerRoutes = [
  {
    path: "/",
    name: "Home",
    component: BuyerHomePage
  },
  {
    path: "/products",
    name: "Products",
    children: [
      {
        path: "/products",
        component: BuyerProductsPage,
      },
      {
        path: "/products/:id",
        component: BuyerProductPage
      }
    ]
  },
  {
    path: "/shopping-cart",
    name: "Shopping cart",
    component: BuyerShoppingCartPage
  },
  {
    path: "/deposit",
    name: "Deposit",
    component: BuyerDepositPage,
  }
];

export const sellerRoutes = [
  {
    path: "/",
    name: "Products",
    icon: "shopping_cart",
    children: [
      {
        path: "/",
        component: SellerProductsPage,
      },
      {
        path: "/products/:id",
        component: SellerProductEditPage
      },
      {
        path: "/products/create",
        component: SellerNewProductPage
      }
    ]
  },
];
