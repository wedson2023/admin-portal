import { Router } from '@angular/router';
import { HttpService } from './../../http.service';
import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(
    private http: HttpService,
    private router: Router
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  logout(){
    this.http.getApiGet('logout').subscribe((response:any) => {
      this.router.navigate(['']); 
    })
  }
}
