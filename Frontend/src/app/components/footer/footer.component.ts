import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <footer class="footer-section">
      <div class="container footer-container">
        <div class="footer-left">
          <a class="footer-logo" (click)="scrollToTop()">
            <span class="logo-code">&lt;</span>
            <span class="logo-name">Sarang</span>
            <span class="logo-dot">.V</span>
            <span class="logo-code"> /&gt;</span>
          </a>
          <p class="footer-role">Project Delivery Engineer (PDE) | Full Stack Developer</p>
        </div>

        <div class="footer-center">
          <p class="copyright-text">
            &copy; {{ currentYear }} <strong>Sarang V</strong>. All rights reserved. Engineered with Angular & SCSS.
          </p>
        </div>

        <div class="footer-right">
          <div class="footer-socials">
            <a href="https://www.linkedin.com/in/sarang-v/" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="LinkedIn">
              <app-icon name="linkedin" [size]="18"></app-icon>
            </a>
            <a href="https://github.com/sarang-sag?tab=repositories" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="GitHub">
              <app-icon name="github" [size]="18"></app-icon>
            </a>
            <a href="mailto:sarangsag86@gmail.com" class="social-btn" aria-label="Email">
              <app-icon name="mail" [size]="18"></app-icon>
            </a>
            <a href="Sarang_V_Resume.pdf.pdf" download="Sarang_V_Resume.pdf" target="_blank" class="social-btn" aria-label="Download Resume" title="Download Resume (PDF)">
              <app-icon name="download" [size]="18"></app-icon>
            </a>
          </div>

          <button class="back-to-top-btn" (click)="scrollToTop()" aria-label="Back to Top">
            <app-icon name="arrow-up" [size]="18"></app-icon>
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-section {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
      padding: 2.5rem 0;
    }

    .footer-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      flex-wrap: wrap;

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
      }
    }

    .footer-left {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;

      @media (max-width: 768px) {
        align-items: center;
      }
    }

    .footer-logo {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.25rem;
      color: var(--text-primary);
      cursor: pointer;
      text-decoration: none;

      .logo-code, .logo-dot {
        color: var(--accent-cyan);
      }
    }

    .footer-role {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .copyright-text {
      font-size: 0.875rem;
      color: var(--text-muted);

      strong {
        color: var(--text-primary);
      }
    }

    .footer-right {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .footer-socials {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .social-btn {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-secondary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s ease;

      &:hover {
        border-color: var(--accent-cyan);
        color: var(--accent-cyan);
        transform: translateY(-2px);
      }
    }

    .back-to-top-btn {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: var(--gradient-primary);
      color: #0f172a;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s ease;

      &:hover {
        box-shadow: var(--shadow-glow-cyan);
        transform: translateY(-3px);
      }
    }
  `]
})
export class FooterComponent {
  private scrollSpy = inject(ScrollSpyService);
  public currentYear = new Date().getFullYear();

  public scrollToTop(): void {
    this.scrollSpy.scrollToSection('home');
  }
}
