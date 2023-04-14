import { Route } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuardService } from '@ang-apps-monorepo/users';

export const ordersRoutes: Route[] = [
  { path: 'cart', component: CartPageComponent },
  {
    path: 'checkout',
    canActivate: [AuthGuardService],
    component: CheckoutPageComponent,
  },
  { path: 'success', component: ThankYouComponent },
];
