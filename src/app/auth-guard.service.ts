import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NotificationService } from './notifications/notificationsSharedService.service';
import {ErrorNotification} from './notifications/notificationModelError.model';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  notification: any;

  constructor(private authService: AuthService,
              private router: Router,
              private notificationService: NotificationService) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Hello from auth-guard::canActivate');

    let url: string = state.url;

    return this.checkLogin(url);
  }


  canLoad(route: Route): boolean {
    console.log('Hello from auth-guard::canLoad');

    let url = `/${route.path}`;

    return this.checkLogin(url);
  }


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Hello from auth-guard::canActivateChild');

    return this.canActivate(route, state);
  }


  private checkLogin(url: string): boolean {
    if (this.authService.isUserAuthenticated()) {
      return true;

    }
    this.notification = new ErrorNotification();
    this.notification.setMessage('Η πρόσβαση επιτρέπεται μόνο σε συνδεδεμένους χρήστες! Παρακαλούμε Συνδεθείτε για να συνεχίσετε');
    this.notificationService.updateNotificationData(this.notification);

    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['/auth'], { queryParams: { returnUrl: url }});
    return false;

  }

}
