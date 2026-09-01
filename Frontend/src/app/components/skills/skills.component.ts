import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent, IconComponent],
  template: `
    <section id="skills" class="section-padding skills-section">
      <div class="container">
        <app-section-header
          badge="TECHNICAL MASTERY"
          title="Skills & Technologies"
          subtitle="Core technology stack and tools utilized across production software engineering.">
        </app-section-header>

        <div class="skills-grid">
          @for (category of categories; track category.title) {
            <div class="skill-category-card glass-card">
              <div class="category-header">
                <div class="category-icon">
                  <app-icon [name]="category.iconName" [size]="22"></app-icon>
                </div>
                <h3 class="category-title">{{ category.title }}</h3>
              </div>

              <div class="skills-flex">
                @for (skill of category.skills; track skill.name) {
                  <div class="skill-chip" [class.featured]="skill.featured">
                    <span class="skill-dot" [class.active]="skill.featured"></span>
                    <span class="skill-name">{{ skill.name }}</span>
                    @if (skill.featured) {
                      <span class="core-tag">Core</span>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-section {
      background: var(--bg-primary);
      position: relative;
    }

    .skills-grid {
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

    .skill-category-card {
      padding: 1.85rem;
      border-radius: 18px;
      display: flex;
      flex-direction: column;
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }

    .category-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: rgba(0, 242, 254, 0.1);
      color: var(--accent-cyan);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .category-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .skills-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
    }

    .skill-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.45rem 0.85rem;
      border-radius: 10px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      color: var(--text-secondary);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.25s ease;

      .skill-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--text-muted);

        &.active {
          background: var(--accent-cyan);
          box-shadow: 0 0 6px var(--accent-cyan);
        }
      }

      .core-tag {
        font-size: 0.7rem;
        padding: 0.1rem 0.4rem;
        border-radius: 4px;
        background: rgba(0, 242, 254, 0.12);
        color: var(--accent-cyan);
        text-transform: uppercase;
      }

      &.featured {
        border-color: rgba(0, 242, 254, 0.25);
        color: var(--text-primary);
        background: rgba(15, 23, 42, 0.6);
      }

      &:hover {
        border-color: var(--accent-cyan);
        color: var(--accent-cyan);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 242, 254, 0.1);
      }
    }
  `]
})
export class SkillsComponent {
  private dataService = inject(PortfolioDataService);
  public categories = this.dataService.skillCategories;
}
