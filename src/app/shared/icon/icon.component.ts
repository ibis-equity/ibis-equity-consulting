import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  template: `
    <ng-container [ngSwitch]="name">
      <svg *ngSwitchCase="'ml'" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6c0-1.5 1.5-3 3-3s3 1.5 3 3-1.5 3-3 3S2 7.5 2 6z" fill="rgba(255,255,255,0.85)"/><path d="M9 3c0-1.1 1-2 2-2s2 .9 2 2-1 2-2 2-2-.9-2-2z" fill="rgba(255,255,255,0.6)"/></svg>
      <svg *ngSwitchCase="'cloud'" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7a3 3 0 010-6 4 4 0 017 0A2.5 2.5 0 0113 6.5 2.5 2.5 0 0110.5 9H4a1 1 0 01-1-2z" fill="rgba(255,255,255,0.85)"/></svg>
      <svg *ngSwitchCase="'spark'" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="3" fill="rgba(255,255,255,0.9)"/><path d="M10 2l2 6-2 2" stroke="rgba(255,255,255,0.6)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <svg *ngSwitchCase="'prompt'" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="10" height="8" rx="1" fill="rgba(255,255,255,0.85)"/><path d="M4 5h6" stroke="rgba(0,0,0,0.2)" stroke-width="0.8" stroke-linecap="round"/></svg>
      <svg *ngSwitchCase="'agents'" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6h3l2-3v6l2-3h3" stroke="rgba(255,255,255,0.85)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
      <svg *ngSwitchCase="'analytics'" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="2" width="2" height="8" rx="0.5" fill="rgba(255,255,255,0.9)"/><rect x="5" y="4" width="2" height="6" rx="0.5" fill="rgba(255,255,255,0.75)"/><rect x="9" y="1" width="2" height="9" rx="0.5" fill="rgba(255,255,255,0.6)"/></svg>
      <svg *ngSwitchDefault width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="4" r="3" fill="rgba(255,255,255,0.6)" /></svg>
    </ng-container>
  `,
  styles: [":host{display:inline-flex;align-items:center;justify-content:center;padding:0 6px}" ]
})
export class IconComponent {
  @Input() name: string | undefined;
}
