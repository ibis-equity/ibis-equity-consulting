import { Component, OnInit, OnDestroy } from '@angular/core';

const LANDING_KEY = 'landing:hide';

@Component({
  selector: 'app-root',
  template: `
    <app-landing *ngIf="showLanding" (closed)="onLandingClosed()"></app-landing>

    <div *ngIf="!showLanding">
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="toggle()" aria-label="Toggle navigation"><mat-icon>menu</mat-icon></button>
        <span style="margin-left:12px">Ibis Equity Consulting, LLC</span>
        <span class="spacer"></span>
        <a mat-button routerLink="/dashboard">Dashboard</a>
      </mat-toolbar>
      <div class="container">
        <router-outlet></router-outlet>
      </div>
      <mat-toolbar color="primary" class="footer" role="contentinfo">
        <span>© Ibis Equity Consulting, LLC</span>
        <span class="spacer"></span>
        <a mat-button href="mailto:info@ibisec.com">Contact</a>
      </mat-toolbar>
    </div>
  `,
  styles: [`.spacer { flex: 1 1 auto; }`]
})
export class AppComponent implements OnInit, OnDestroy {
  showLanding = true;
  private landingTimerId: number | undefined;

  constructor() {
    try {
      const v = localStorage.getItem(LANDING_KEY);
      if (v === '1') this.showLanding = false;
    } catch {}
  }

  ngOnInit(): void {
    if (this.showLanding) {
      // auto-hide landing after 30 seconds (30000 ms)
      this.clearLandingTimer();
      this.landingTimerId = window.setTimeout(() => this.onLandingClosed(), 30000);
    }
  }

  ngOnDestroy(): void {
    this.clearLandingTimer();
  }

  onLandingClosed() {
    this.showLanding = false;
    this.clearLandingTimer();
  }

  toggle() { /* placeholder for sidenav on larger UI */ }

  private clearLandingTimer() {
    if (this.landingTimerId !== undefined) {
      clearTimeout(this.landingTimerId);
      this.landingTimerId = undefined;
    }
  }
}
