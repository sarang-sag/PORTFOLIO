import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, IconComponent],
  template: `
    <section id="about" class="section-padding about-section">
      <div class="container">
        <app-section-header
          badge="ABOUT ME"
          title="Engineering Scalable & High-Impact Software Solutions"
          subtitle="A summary of my background, technical philosophy, and enterprise application experience.">
        </app-section-header>

        <div class="about-grid">
          <!-- Text Story Columns -->
          <div class="about-text-column">
            <div class="bio-card glass-card">
              <p class="highlight-paragraph">
                I am a <strong>Project Delivery Engineer (PDE) & Full Stack Developer with over four years</strong> of professional experience building, deploying, and maintaining high-concurrency production applications. I specialize in turning complex client requirements into robust, scalable, and maintainable software architectures.
              </p>
              
              <p class="bio-paragraph">
                My career is centered around developing business-critical enterprise applications such as <strong>ERP Systems, CRM Platforms, Maritime Booking Portals, Stock & Invoicing Modules</strong>, and compliance-driven <strong>Government Applications</strong>.
              </p>

              <p class="bio-paragraph">
                I work fluidly across the complete software development lifecycle (SDLC) — from engineering high-throughput Django REST Framework backend APIs and optimizing complex PostgreSQL queries, to implementing responsive Angular frontend interfaces and managing Linux AWS EC2/S3 cloud deployments.
              </p>

              <div class="key-strengths">
                <div class="strength-item">
                  <div class="strength-icon cyan">
                    <app-icon name="check" [size]="16"></app-icon>
                  </div>
                  <span>Production Bug Fixing & Query Tuning</span>
                </div>

                <div class="strength-item">
                  <div class="strength-icon emerald">
                    <app-icon name="check" [size]="16"></app-icon>
                  </div>
                  <span>Secure Payment Gateways (Razorpay, PayU)</span>
                </div>

                <div class="strength-item">
                  <div class="strength-icon purple">
                    <app-icon name="check" [size]="16"></app-icon>
                  </div>
                  <span>Agile Team Collaboration & Clean Code</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Statistics Grid -->
          <div class="about-stats-column">
            <div class="stats-grid">
              @for (stat of stats; track stat.label) {
                <div class="stat-card glass-card" [class.highlight]="stat.highlight">
                  <div class="stat-icon-wrapper" [ngClass]="stat.colorClass">
                    <app-icon [name]="stat.icon" [size]="24"></app-icon>
                  </div>
                  <div class="stat-value">{{ stat.value }}</div>
                  <div class="stat-label">{{ stat.label }}</div>
                  <div class="stat-description">{{ stat.description }}</div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      background: var(--bg-primary);
      position: relative;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 2.5rem;
      align-items: start;

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }

    .bio-card {
      padding: 2.5rem;
      border-radius: 20px;

      @media (max-width: 768px) {
        padding: 1.75rem;
      }
    }

    .highlight-paragraph {
      font-size: 1.15rem;
      color: var(--text-primary);
      line-height: 1.7;
      margin-bottom: 1.25rem;

      strong {
        color: var(--accent-cyan);
        font-weight: 600;
      }
    }

    .bio-paragraph {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.75;
      margin-bottom: 1.25rem;

      strong {
        color: var(--text-primary);
      }
    }

    .key-strengths {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);
    }

    .strength-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--text-primary);

      .strength-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        &.cyan {
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
        }

        &.emerald {
          background: rgba(16, 185, 129, 0.15);
          color: var(--accent-emerald);
        }

        &.purple {
          background: rgba(129, 140, 248, 0.15);
          color: var(--accent-purple);
        }
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }

    .stat-card {
      padding: 1.75rem;
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;

      &.highlight {
        border-color: var(--border-glow);
      }
    }

    .stat-icon-wrapper {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.25rem;

      &.cyan {
        background: rgba(0, 242, 254, 0.1);
        color: var(--accent-cyan);
      }

      &.emerald {
        background: rgba(16, 185, 129, 0.1);
        color: var(--accent-emerald);
      }

      &.purple {
        background: rgba(129, 140, 248, 0.1);
        color: var(--accent-purple);
      }

      &.amber {
        background: rgba(245, 158, 11, 0.1);
        color: var(--accent-amber);
      }
    }

    .stat-value {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .stat-description {
      font-size: 0.85rem;
      color: var(--text-muted);
    }
  `]
})
export class AboutComponent {
  public readonly stats = [
    {
      value: '4+ Years',
      label: 'Experience',
      description: 'Professional software engineering',
      icon: 'briefcase',
      colorClass: 'cyan',
      highlight: true
    },
    {
      value: 'Full Stack',
      label: 'Development',
      description: 'Python DRF + Angular',
      icon: 'layers',
      colorClass: 'emerald',
      highlight: false
    },
    {
      value: 'Enterprise',
      label: 'Applications',
      description: 'ERPs, CRMs & Booking Portals',
      icon: 'server',
      colorClass: 'purple',
      highlight: false
    },
    {
      value: 'Production',
      label: 'Systems',
      description: 'AWS EC2, S3 & PostgreSQL',
      icon: 'cloud',
      colorClass: 'amber',
      highlight: true
    }
  ];
}
