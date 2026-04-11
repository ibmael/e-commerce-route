import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
    title: 'Login to Your Account | Route Store',
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./features/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent,
      ),
    title: 'Reset Your Password | Route Store',
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register').then((m) => m.Register),
    title: 'Create a New Account | Route Store',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Home - Discover Products | Route Store',
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop').then((m) => m.Shop),
    title: 'Shop Products Online | Route Store',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart').then((m) => m.Cart),
    title: 'Your Shopping Cart | Route Store',
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./features/wishlist/wishlist').then((m) => m.Wishlist),
    title: 'Your Wishlist | Route Store',
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout').then((m) => m.Checkout),
    title: 'Secure Checkout | Route Store',
  },
  {
    path: 'brands',
    loadComponent: () => import('./features/brands/brands').then((m) => m.Brands),
    title: 'Browse Brands | Route Store',
  },

  {
    path: 'categories',
    loadComponent: () => import('./features/categories/categories').then((m) => m.Categories),
    title: 'Explore Categories | Route Store',
  },
  {
    path: 'product-details/:id/:slug',
    loadComponent: () =>
      import('./features/product-details/product-details').then((m) => m.ProductDetails),
    title: 'Product Details & Information | Route Store',
  },
  {
    path: 'all-orders',
    loadComponent: () => import('./features/all-orders/all-orders').then((m) => m.AllOrders),
    title: 'Your Orders History | Route Store',
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
    title: 'Your Profile Settings | Route Store',
  },
  {
    path: 'not-found',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
    title: 'Page Not Found | Route Store',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
