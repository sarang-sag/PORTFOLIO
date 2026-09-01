import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-header" [class.text-center]="centered">
      @if (badge) {
        <div class="section-badge">
          <span class="badge-dot"></span>
          <span>{{ badge }}</span>
        </div>
      }
      <h2 class="section-title">{{ title }}</h2>
      @if (subtitle) {
        <p class="section-subtitle">{{ subtitle }}</p>
      }
    </div>
  `,
  styles: [`
    .section-header {
      margin-bottom: 3.5rem;
      max-width: 720px;

      &.text-center {
        margin-left: auto;
        margin-right: auto;
      }
    }

    .section-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.9rem;
      border-radius: 9999px;
      background: rgba(0, 242, 254, 0.08);
      border: 1px solid rgba(0, 242, 254, 0.2);
      color: var(--accent-cyan);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.825rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 1rem;

      .badge-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--accent-cyan);
        box-shadow: 0 0 8px var(--accent-cyan);
      }
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: -0.02em;
      margin-bottom: 0.75rem;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .section-subtitle {
      font-size: 1.125rem;
      color: var(--text-secondary);
      line-height: 1.6;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  `]
})
export class SectionHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() badge: string = '';
  @Input() centered: boolean = false;
}
