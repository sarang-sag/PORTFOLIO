import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, IconComponent],
  template: `
    <section id="expertise" class="section-padding expertise-section">
      <div class="container">
        <app-section-header
          badge="CORE EXPERTISE"
          title="What I Do"
          subtitle="Full stack software engineering capabilities across backend, frontend, database, and cloud infrastructure.">
        </app-section-header>

        <div class="expertise-grid">
          @for (service of services; track service.id) {
            <div class="expertise-card glass-card">
              <div class="card-top">
                <div class="service-icon-wrapper">
                  <app-icon [name]="service.iconName" [size]="24"></app-icon>
                </div>
                <span class="service-badge">{{ service.badge }}</span>
              </div>

              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-desc">{{ service.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .expertise-section {
      background: var(--bg-primary);
      position: relative;
    }

    .expertise-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.75rem;

      @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    .expertise-card {
      padding: 2rem;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .service-icon-wrapper {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(0, 242, 254, 0.1);
      color: var(--accent-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .expertise-card:hover .service-icon-wrapper {
      background: var(--gradient-primary);
      color: #0f172a;
      transform: scale(1.08);
    }

    .service-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.775rem;
      padding: 0.3rem 0.75rem;
      border-radius: 6px;
      background: rgba(129, 140, 248, 0.1);
      color: var(--accent-purple);
      border: 1px solid rgba(129, 140, 248, 0.2);
    }

    .service-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .service-desc {
      font-size: 0.975rem;
      color: var(--text-secondary);
      line-height: 1.65;
    }
  `]
})
export class ExpertiseComponent {
  private dataService = inject(PortfolioDataService);
  public services = this.dataService.expertiseServices;
}
