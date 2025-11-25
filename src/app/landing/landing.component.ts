import { Component, OnInit, OnDestroy, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  template: `
    <div class="landing" role="dialog" aria-label="Landing animation" tabindex="0">
      <div class="content" (click)="onClickContent($event)">
        <header class="landing-header" [class.entered]="entered" aria-labelledby="landing-title">
          <h1 id="landing-title" class="brand-dynamic">Ibis Equity</h1>
          <h2 class="landing-sub">Consulting LLC</h2>
          <h3 class="landing-tag">Equity at the Core, Innovation at Scale</h3>
        </header>
        <img class="landing-gif" [class.entered]="entered" src="/assets/ibis-equity-gif.gif" alt="Landing animation" />

        <!-- capabilities replaced with single paragraph -->
        <section class="capabilities-wrap" aria-label="Capabilities">
          <p class="capabilities-paragraph">
            We build modular, equity-driven AI frameworks and cloud-native infrastructures that harmonize human values with technological advancement.
          </p>
        </section>

        <!-- Visually hidden ARIA live region to announce landing content for screen readers -->
        <div aria-live="polite" class="sr-only" *ngIf="entered">Landing: Ibis Equity Consulting — Artificial Intelligence Engineering. Capabilities include Machine Learning, Cloud Architecture, Generative AI, Prompt Engineering, AI Agents and AI-Powered Analytics.</div>

        <div class="controls">
          <label><input type="checkbox" [(ngModel)]="dontShowAgain" /> Don't show again</label>
          <button class="skip" (click)="close()">Skip</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .landing {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #000;
      z-index: 9999;
      cursor: pointer;
    }
  .landing img { max-width: 90%; height: auto; border-radius: 8px; }
  .landing-header { text-align: center; color: #fff; margin-bottom: 12px; line-height: 1; }

  /* Dynamic large brand */
  .brand-dynamic {
    margin: 0;
    font-size: 3.2rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    display: inline-block;
    background: linear-gradient(90deg, #9be15d 0%, #00c6ff 50%, #7b61ff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transform-origin: center;
    animation: brandFloat 880ms cubic-bezier(.22,.9,.32,1) both;
    transition: transform 260ms ease, filter 260ms ease;
  }

  .brand-dynamic:hover {
    transform: scale(1.04) rotate(-0.6deg);
    filter: drop-shadow(0 6px 18px rgba(0,0,0,0.45));
  }

  @keyframes brandFloat {
    0%   { opacity: 0; transform: translateY(-8px) scale(0.98) }
    65%  { transform: translateY(0) scale(1.06); opacity: 1 }
    100% { transform: translateY(0) scale(1) }
  }

  .landing-sub { margin: 6px 0 0; font-size: 1.05rem; opacity: 0.95 }
  .landing-tag { margin: 4px 0 0; font-size: 0.95rem; opacity: 0.85 }

  /* Responsive brand sizes */
  @media (max-width: 1100px) {
    .brand-dynamic { font-size: 2.8rem }
  }
  @media (max-width: 800px) {
    .brand-dynamic { font-size: 2.4rem }
  }
  @media (max-width: 480px) {
    .brand-dynamic { font-size: 1.9rem }
  }

  /* Constrain GIF so it never overflows the viewport height and stays centered.
     Make the content area scrollable so the header remains visible on small viewports/fullscreen. */
  .landing-gif {
    width: auto;
    max-width: 85%;
    max-height: 65vh; /* increased size */
    height: auto;
    border-radius: 8px;
    display: block;
    margin: 0 auto;
    object-fit: contain;
    opacity: 0;
    transform: translateY(4px) scale(0.99);
    transition: opacity 520ms ease-out, transform 620ms cubic-bezier(.22,.9,.32,1);
  }

  /* Header pop-in with overshoot (longer duration) */
  @keyframes popIn {
    0% { opacity: 0; transform: translateY(-10px) scale(0.96) }
    70% { transform: translateY(0) scale(1.06); opacity: 1 }
    100% { transform: translateY(0) scale(1) }
  }

  /* GIF entrance (slower reveal, delayed) */
  @keyframes gifIn {
    0% { opacity: 0; transform: translateY(12px) scale(0.96) }
    100% { opacity: 1; transform: translateY(0) scale(1) }
  }

  /* show header immediately (no animation) */
  .landing-header { opacity: 1 }

  .landing-gif.entered { animation: gifIn 760ms cubic-bezier(.22,.9,.32,1) both; animation-delay: 360ms }

  /* Breakpoints - smaller viewports reduce GIF height further (55 / 42 / 36) */
  @media (max-width: 1100px) {
    .landing-gif { max-height: 60vh }
  }
  @media (max-width: 800px) {
    /* slightly larger and centered on tablets/smaller screens */
    .landing-gif { max-height: 52vh; max-width: 96%; margin-left:auto; margin-right:auto }
  }
  @media (max-width: 480px) {
    /* make GIF larger and fully centered on small phones */
    .landing-gif { max-height: 50vh; max-width: 100%; margin-left:auto; margin-right:auto }
  }

  /* Replace capabilities list styling with paragraph styling */
  .capabilities-wrap { text-align: center; margin-top: 14px; color: #fff }
  .capabilities-paragraph {
    max-width: 900px;
    margin: 12px auto 0;
    color: rgba(255,255,255,0.95);
    font-size: 1rem;
    line-height: 1.5;
    text-align: center;
  }

  /* Accessibility: respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    .landing-header.entered, .landing-gif.entered, .capabilities .cap { animation: none !important; transition: none !important; opacity: 1; transform: none }
  }

  /* Visually hidden util */
  .sr-only { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0 }
  .content { position: relative; display:flex; flex-direction:column; align-items:center; max-height: calc(100vh - 48px); overflow:auto; padding: 16px; box-sizing: border-box }
    .controls { position: absolute; right: 8px; bottom: 8px; color: #fff; display:flex; gap:8px; align-items:center}
    .controls label { font-size: 0.9rem }
    .controls .skip { background: rgba(255,255,255,0.1); color:#fff; border: none; padding:6px 10px; border-radius:4px }
  `]
})
export class LandingComponent implements OnInit, OnDestroy {
  @Output() closed = new EventEmitter<void>();

  private timeoutId?: any;

  dontShowAgain = false;
  entered = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    // Trigger entrance animations shortly after init
    setTimeout(() => this.entered = true, 50);
    // ensure auto-close timer still present (20s)
    this.clearTimer();
    this.timeoutId = setTimeout(() => this.close(), 20000);
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  close(): void {
    try {
      if (this.dontShowAgain) {
        localStorage.setItem('landing:hide', '1');
      }
    } catch {}

    this.clearTimer?.();
    this.entered = false;

    // notify parent and navigate to root (MainPageComponent)
    this.closed.emit();
    this.router.navigate(['/']).catch(() => {/* ignore navigation errors */});
  }

  private clearTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  // helper to hide without navigating (if used elsewhere)
  private hideLocal() {
    // ...existing logic that hides the landing in-place...
    // e.g. emit event or set a local visible flag
  }

  onClickContent(e: Event) {
    // Prevent clicks inside content from bubbling to outer landing (so Skip/button controls behave)
    e.stopPropagation();
  }

  @HostListener('document:keydown.escape', [])
  handleEscape() {
    this.close();
  }
}
