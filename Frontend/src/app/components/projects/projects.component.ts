import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Project } from '../../core/models/portfolio.model';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { TechBadgeComponent } from '../../shared/components/tech-badge/tech-badge.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, TechBadgeComponent, IconComponent],
  template: `
    <section id="projects" class="section-padding projects-section">
      <div class="container">
        <app-section-header
          badge="FEATURED WORK"
          title="Production Projects & Platforms"
          subtitle="Real-world enterprise systems engineered for scalability, financial accuracy, and operation reliability.">
        </app-section-header>

        <!-- Category Filter Tabs -->
        <div class="filter-tabs">
          @for (cat of categories; track cat) {
            <button 
              class="tab-btn" 
              [class.active]="selectedCategory() === cat"
              (click)="setCategory(cat)">
              {{ cat }}
            </button>
          }
        </div>

        <!-- Project Cards Grid -->
        <div class="projects-grid">
          @for (project of filteredProjects(); track project.id) {
            <div class="project-card glass-card">
              <!-- Card Header -->
              <div class="card-top">
                <div class="project-icon-box">
                  <app-icon [name]="project.iconName" [size]="24"></app-icon>
                </div>
                <span class="category-badge">{{ project.category }}</span>
              </div>

              <!-- Title & Subtitle -->
              <h3 class="project-title">{{ project.title }}</h3>
              <div class="project-subtitle">{{ project.subtitle }}</div>
              <p class="project-desc">{{ project.description }}</p>

              <!-- Key Features List -->
              <div class="features-block">
                <div class="features-label">Key Features</div>
                <ul class="feature-list">
                  @for (feature of project.features.slice(0, 4); track feature) {
                    <li>
                      <span class="feat-dot"></span>
                      <span>{{ feature }}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- My Contribution Box -->
              <div class="contribution-box">
                <div class="contrib-header">
                  <app-icon name="code" [size]="15"></app-icon>
                  <span>My Contribution:</span>
                </div>
                <p class="contrib-text">{{ project.myContribution }}</p>
              </div>

              <!-- Tech Stack Badges -->
              <div class="card-footer">
                <div class="tech-row">
                  @for (tech of project.technologies; track tech) {
                    <app-tech-badge [name]="tech" variant="default"></app-tech-badge>
                  }
                </div>

                <button class="btn-detail" (click)="openModal(project)">
                  <span>View Details</span>
                  <app-icon name="external-link" [size]="14"></app-icon>
                </button>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Detail Modal -->
      @if (activeModalProject(); as p) {
        <div class="modal-backdrop" (click)="closeModal()">
          <div class="modal-content glass-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <div class="modal-title-group">
                <div class="project-icon-box">
                  <app-icon [name]="p.iconName" [size]="24"></app-icon>
                </div>
                <div>
                  <h3 class="modal-title">{{ p.title }}</h3>
                  <span class="category-badge">{{ p.category }} Platform</span>
                </div>
              </div>
              <button class="modal-close" (click)="closeModal()">
                <app-icon name="x" [size]="20"></app-icon>
              </button>
            </div>

            <div class="modal-body">
              <p class="modal-desc">{{ p.description }}</p>

              <div class="modal-section">
                <h4>All Core Features</h4>
                <ul class="modal-feature-list">
                  @for (feat of p.features; track feat) {
                    <li>
                      <app-icon name="check" [size]="16"></app-icon>
                      <span>{{ feat }}</span>
                    </li>
                  }
                </ul>
              </div>

              <div class="modal-section">
                <h4>Full Stack Engineering Contribution</h4>
                <p class="contrib-text-full">{{ p.myContribution }}</p>
              </div>

              <div class="modal-section">
                <h4>Technologies Used</h4>
                <div class="tech-row">
                  @for (tech of p.technologies; track tech) {
                    <app-tech-badge [name]="tech" variant="cyan"></app-tech-badge>
                  }
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn btn-outline" (click)="closeModal()">Close Window</button>
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .projects-section {
      background: var(--bg-secondary);
      position: relative;
    }

    .filter-tabs {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: 0.6rem 1.4rem;
      border-radius: 9999px;
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-secondary);
      font-family: 'Outfit', sans-serif;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.25s ease;

      &:hover {
        border-color: var(--accent-cyan);
        color: var(--accent-cyan);
      }

      &.active {
        background: var(--gradient-primary);
        color: #0f172a;
        font-weight: 600;
        border-color: transparent;
        box-shadow: var(--shadow-glow-cyan);
      }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
      }
    }

    .project-card {
      padding: 2.25rem;
      border-radius: 20px;
      display: flex;
      flex-direction: column;

      @media (max-width: 768px) {
        padding: 1.5rem;
      }
    }

    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    }

    .project-icon-box {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: rgba(0, 242, 254, 0.1);
      color: var(--accent-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .category-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      padding: 0.35rem 0.8rem;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.1);
      color: var(--accent-emerald);
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    .project-title {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .project-subtitle {
      font-size: 0.95rem;
      color: var(--accent-cyan);
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .project-desc {
      font-size: 0.975rem;
      color: var(--text-secondary);
      line-height: 1.65;
      margin-bottom: 1.5rem;
    }

    .features-block {
      margin-bottom: 1.5rem;
      padding: 1.25rem;
      border-radius: 14px;
      background: rgba(15, 23, 42, 0.4);
      border: 1px solid var(--border-color);

      .features-label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        text-transform: uppercase;
        color: var(--text-muted);
        margin-bottom: 0.75rem;
      }
    }

    .feature-list {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }

      li {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 0.875rem;
        color: var(--text-primary);

        .feat-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-cyan);
          flex-shrink: 0;
        }
      }
    }

    .contribution-box {
      margin-bottom: 1.75rem;
      padding: 1rem 1.25rem;
      border-radius: 12px;
      background: rgba(0, 242, 254, 0.04);
      border-left: 3px solid var(--accent-cyan);

      .contrib-header {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.825rem;
        color: var(--accent-cyan);
        margin-bottom: 0.35rem;
      }

      .contrib-text {
        font-size: 0.875rem;
        color: var(--text-secondary);
        line-height: 1.55;
      }
    }

    .card-footer {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-top: 1.25rem;
      border-top: 1px solid var(--border-color);
      flex-wrap: wrap;
    }

    .tech-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .btn-detail {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: transparent;
      border: none;
      color: var(--accent-cyan);
      font-family: 'Outfit', sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        text-decoration: underline;
        transform: translateX(2px);
      }
    }

    /* Modal Styling */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1050;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .modal-content {
      width: 100%;
      max-width: 680px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 2.25rem;
      border-radius: 24px;
      background: var(--bg-card-solid);
    }

    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--border-color);
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .modal-title {
      font-size: 1.75rem;
      color: var(--text-primary);
      margin-bottom: 0.2rem;
    }

    .modal-close {
      background: transparent;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.2s ease;

      &:hover {
        color: var(--text-primary);
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .modal-body {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .modal-desc {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.7;
    }

    .modal-section {
      h4 {
        font-size: 1.1rem;
        color: var(--text-primary);
        margin-bottom: 0.75rem;
      }
    }

    .modal-feature-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;

      li {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        color: var(--text-primary);
        font-size: 0.95rem;

        svg {
          color: var(--accent-emerald);
          flex-shrink: 0;
        }
      }
    }

    .contrib-text-full {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.7;
      padding: 1rem;
      border-radius: 12px;
      background: rgba(0, 242, 254, 0.05);
      border: 1px solid rgba(0, 242, 254, 0.15);
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }
  `]
})
export class ProjectsComponent {
  private dataService = inject(PortfolioDataService);
  
  public readonly categories = ['All', 'Enterprise', 'Full Stack', 'Government'];
  public selectedCategory = signal<string>('All');
  public activeModalProject = signal<Project | null>(null);

  public filteredProjects = signal<Project[]>(this.dataService.projects);

  public setCategory(cat: string): void {
    this.selectedCategory.set(cat);
    if (cat === 'All') {
      this.filteredProjects.set(this.dataService.projects);
    } else {
      this.filteredProjects.set(
        this.dataService.projects.filter(p => p.category === cat)
      );
    }
  }

  public openModal(project: Project): void {
    this.activeModalProject.set(project);
  }

  public closeModal(): void {
    this.activeModalProject.set(null);
  }
}
