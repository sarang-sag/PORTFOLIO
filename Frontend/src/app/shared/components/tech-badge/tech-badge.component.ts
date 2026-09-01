import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-tech-badge',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <span class="tech-badge" [ngClass]="'variant-' + variant">
      @if (iconName) {
        <app-icon [name]="iconName" [size]="14"></app-icon>
      }
      <span>{{ name }}</span>
    </span>
  `,
  styles: [`
    .tech-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.85rem;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.825rem;
      font-weight: 500;
      transition: all 0.25s ease;
      cursor: default;

      &.variant-cyan {
        background: rgba(0, 242, 254, 0.08);
        color: var(--accent-cyan);
        border: 1px solid rgba(0, 242, 254, 0.2);

        &:hover {
          background: rgba(0, 242, 254, 0.16);
          border-color: var(--accent-cyan);
          transform: translateY(-2px);
        }
      }

      &.variant-emerald {
        background: rgba(16, 185, 129, 0.08);
        color: var(--accent-emerald);
        border: 1px solid rgba(16, 185, 129, 0.2);

        &:hover {
          background: rgba(16, 185, 129, 0.16);
          border-color: var(--accent-emerald);
          transform: translateY(-2px);
        }
      }

      &.variant-purple {
        background: rgba(129, 140, 248, 0.08);
        color: var(--accent-purple);
        border: 1px solid rgba(129, 140, 248, 0.2);

        &:hover {
          background: rgba(129, 140, 248, 0.16);
          border-color: var(--accent-purple);
          transform: translateY(-2px);
        }
      }

      &.variant-default {
        background: var(--bg-card);
        color: var(--text-secondary);
        border: 1px solid var(--border-color);

        &:hover {
          background: var(--bg-card-hover);
          color: var(--text-primary);
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }
      }
    }
  `]
})
export class TechBadgeComponent {
  @Input() name: string = '';
  @Input() iconName: string = '';
  @Input() variant: 'cyan' | 'emerald' | 'purple' | 'default' = 'default';
}
