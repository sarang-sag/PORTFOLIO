import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-approach',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, IconComponent],
  template: `
    <section id="approach" class="section-padding approach-section">
      <div class="container">
        <app-section-header
          badge="WORKFLOW & METHODOLOGY"
          title="Development Approach"
          subtitle="A structured 5-step engineering methodology for turning business needs into reliable production software.">
        </app-section-header>

        <div class="steps-flow-grid">
          @for (step of steps; track step.step) {
            <div class="step-card glass-card">
              <div class="step-top">
                <span class="step-number">{{ step.step }}</span>
                <div class="step-connector"></div>
              </div>

              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.description }}</p>

              <div class="step-details-list">
                @for (detail of step.details; track detail) {
                  <span class="step-tag">
                    <app-icon name="check" [size]="12"></app-icon>
                    {{ detail }}
                  </span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .approach-section {
      background: var(--bg-secondary);
      position: relative;
    }

    .steps-flow-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1.25rem;

      @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 480px) {
        grid-template-columns: 1fr;
      }
    }

    .step-card {
      padding: 1.85rem 1.5rem;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      position: relative;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        border-color: var(--border-glow);
        transform: translateY(-6px);
      }
    }

    .step-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }

    .step-number {
      font-family: 'JetBrains Mono', monospace;
      font-size: 2.25rem;
      font-weight: 800;
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
    }

    .step-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
      line-height: 1.3;
    }

    .step-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .step-details-list {
      margin-top: auto;
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }

    .step-tag {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.725rem;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background: rgba(0, 242, 254, 0.08);
      color: var(--accent-cyan);

      svg {
        color: var(--accent-cyan);
      }
    }
  `]
})
export class ApproachComponent {
  private dataService = inject(PortfolioDataService);
  public steps = this.dataService.approachSteps;
}
