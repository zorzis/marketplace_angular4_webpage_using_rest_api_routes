import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `    
    <notifications-module></notifications-module>
    
    <router-outlet></router-outlet>
  `
})

export class AppComponent implements OnInit{
  constructor(private router: Router,) {}

  // shroll to top on every navigation ends
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

}





