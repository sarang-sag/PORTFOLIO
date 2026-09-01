import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, TechBadgeComponent, IconComponent],
  template: `
    <section id="experience" class="section-padding experience-section">
      <div class="container">
        <app-section-header
          badge="CAREER MILESTONES"
          title="Professional Experience"
          subtitle="Proven track record in Project Delivery Engineering (PDE) and full-stack software development.">
        </app-section-header>

        <div class="timeline-wrapper">
          <!-- Timeline Line -->
          <div class="timeline-line"></div>

          <!-- Loop through all 3 experiences -->
          @for (exp of experiences; track exp.id; let isFirst = $first) {
            <div class="timeline-item">
              <!-- Timeline Node Marker -->
              <div class="timeline-marker" [class.current]="exp.isCurrent">
                <div class="marker-dot"></div>
              </div>

              <!-- Experience Card -->
              <div class="experience-card glass-card" [class.featured-current]="exp.isCurrent">
                <!-- Header -->
                <div class="exp-header">
                  <div class="exp-role-group">
                    <div class="role-title-row">
                      <h3 class="exp-role">{{ exp.role }}</h3>
                      @if (exp.isCurrent) {
                        <span class="current-badge">Present Role</span>
                      }
                    </div>
                    <div class="exp-company-group">
                      <span class="exp-company">{{ exp.company }}</span>
                    </div>
                  </div>

                  <div class="exp-meta">
                    <div class="meta-item">
                      <app-icon name="briefcase" [size]="15"></app-icon>
                      <span>{{ exp.period }}</span>
                    </div>
                    <div class="meta-item">
                      <app-icon name="cloud" [size]="15"></app-icon>
                      <span>{{ exp.location }}</span>
                    </div>
                  </div>
                </div>

                <!-- Key Metrics Pills -->
                <div class="metrics-row">
                  @for (metric of exp.metrics; track metric.label) {
                    <div class="metric-pill">
                      <span class="metric-val">{{ metric.value }}</span>
                      <span class="metric-lbl">{{ metric.label }}</span>
                    </div>
                  }
                </div>

                <!-- Responsibilities Checklist -->
                <div class="responsibilities-block">
                  <h4 class="block-title">
                    <app-icon name="check" [size]="16"></app-icon>
                    <span>Key Achievements & Impact</span>
                  </h4>

                  <ul class="resp-list">
                    @for (resp of exp.responsibilities; track resp) {
                      <li class="resp-item">
                        <span class="check-icon">
                          <app-icon name="check" [size]="14"></app-icon>
                        </span>
                        <span>{{ resp }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Technology Stack -->
                <div class="tech-stack-block">
                  <div class="tech-badges-grid">
                    @for (tech of exp.technologies; track tech) {
                      <app-tech-badge [name]="tech" [variant]="exp.isCurrent ? 'cyan' : 'default'"></app-tech-badge>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience-section {
      background: var(--bg-secondary);
      position: relative;
    }

    .timeline-wrapper {
      position: relative;
      max-width: 980px;
      margin: 0 auto;
      padding-left: 2.5rem;

      @media (max-width: 768px) {
        padding-left: 1.5rem;
      }
    }

    .timeline-line {
      position: absolute;
      top: 20px;
      bottom: 20px;
      left: 14px;
      width: 3px;
      background: linear-gradient(180deg, var(--accent-cyan) 0%, var(--accent-purple) 60%, rgba(56, 189, 248, 0.1) 100%);

      @media (max-width: 768px) {
        left: 7px;
      }
    }

    .timeline-item {
      position: relative;
      margin-bottom: 2.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .timeline-marker {
      position: absolute;
      left: -2.5rem;
      top: 2rem;
      transform: translateX(-50%);

      @media (max-width: 768px) {
        left: -1.5rem;
      }

      .marker-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--bg-primary);
        border: 3px solid var(--text-muted);
        box-shadow: var(--shadow-sm);
        transition: all 0.3s ease;
      }

      &.current .marker-dot {
        border-color: var(--accent-cyan);
        box-shadow: 0 0 14px var(--accent-cyan);
        background: var(--accent-cyan);
      }
    }

    .experience-card {
      padding: 2.25rem;
      border-radius: 20px;
      transition: all 0.3s ease;

      &.featured-current {
        border-color: var(--border-glow);
        background: var(--bg-card);
      }

      @media (max-width: 768px) {
        padding: 1.5rem;
      }
    }

    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.25rem;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .role-title-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .exp-role {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--text-primary);

      @media (max-width: 768px) {
        font-size: 1.3rem;
      }
    }

    .current-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      padding: 0.25rem 0.7rem;
      border-radius: 9999px;
      background: rgba(0, 242, 254, 0.12);
      color: var(--accent-cyan);
      border: 1px solid rgba(0, 242, 254, 0.3);
      font-weight: 600;
    }

    .exp-company-group {
      margin-top: 0.25rem;

      .exp-company {
        font-size: 1.05rem;
        font-weight: 600;
        color: var(--accent-cyan);
      }
    }

    .exp-meta {
      display: flex;
      align-items: center;
      gap: 1.25rem;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
        color: var(--text-muted);
      }
    }

    .metrics-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.85rem;
      padding: 1rem 1.25rem;
      border-radius: 12px;
      background: rgba(15, 23, 42, 0.4);
      border: 1px solid var(--border-color);
      margin-bottom: 1.5rem;

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .metric-pill {
      display: flex;
      flex-direction: column;
      text-align: center;

      .metric-val {
        font-family: 'Outfit', sans-serif;
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--accent-cyan);
      }

      .metric-lbl {
        font-size: 0.75rem;
        color: var(--text-muted);
      }
    }

    .responsibilities-block {
      margin-bottom: 1.5rem;
    }

    .block-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;

      svg {
        color: var(--accent-cyan);
      }
    }

    .resp-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
    }

    .resp-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.6;

      .check-icon {
        margin-top: 3px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: rgba(0, 242, 254, 0.1);
        color: var(--accent-cyan);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
    }

    .tech-stack-block {
      padding-top: 1.25rem;
      border-top: 1px solid var(--border-color);
    }

    .tech-badges-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  `]
})
export class ExperienceComponent {
  private dataService = inject(PortfolioDataService);
  public experiences = this.dataService.experiencesData;
}
