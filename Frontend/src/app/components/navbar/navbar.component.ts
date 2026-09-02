import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <header class="navbar-header" [class.scrolled]="isScrolled()">
      <div class="container navbar-container">
        <!-- Logo -->
        <a class="nav-logo" (click)="navigateTo('home')">
          <span class="logo-code">&lt;</span>
          <span class="logo-name">Sarang</span>
          <span class="logo-dot">.V</span>
          <span class="logo-code"> /&gt;</span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="desktop-nav">
          <ul class="nav-list">
            @for (link of navLinks; track link.id) {
              <li>
                <a 
                  class="nav-link" 
                  [class.active]="scrollSpy.activeSection() === link.id"
                  (click)="navigateTo(link.id)">
                  <span class="nav-num">0{{ $index + 1 }}.</span>
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <!-- Right Action Controls -->
        <div class="nav-actions">
          <!-- Resume Button -->
          <a class="btn btn-outline resume-btn" (click)="openResume()">
            <app-icon name="file-text" [size]="16"></app-icon>
            <span>Resume</span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button 
            class="mobile-toggle" 
            (click)="toggleMobileMenu()"
            [attr.aria-label]="mobileMenuOpen() ? 'Close menu' : 'Open menu'">
            @if (mobileMenuOpen()) {
              <app-icon name="x" [size]="24"></app-icon>
            } @else {
              <app-icon name="menu" [size]="24"></app-icon>
            }
          </button>
        </div>
      </div>

      <!-- Mobile Side Drawer -->
      <div class="mobile-drawer" [class.open]="mobileMenuOpen()">
        <div class="mobile-backdrop" (click)="closeMobileMenu()"></div>
        <div class="mobile-drawer-content">
          <div class="drawer-header">
            <span class="logo-name">Sarang V</span>
            <button class="action-btn" (click)="closeMobileMenu()">
              <app-icon name="x" [size]="20"></app-icon>
            </button>
          </div>

          <nav class="mobile-nav-list">
            @for (link of navLinks; track link.id) {
              <a 
                class="mobile-nav-link" 
                [class.active]="scrollSpy.activeSection() === link.id"
                (click)="navigateToMobile(link.id)">
                <span class="nav-num">0{{ $index + 1 }}.</span>
                <span class="nav-label">{{ link.label }}</span>
              </a>
            }
          </nav>

          <div class="drawer-footer">
            <a class="btn btn-primary full-width" (click)="openResumeMobile()">
              <app-icon name="file-text" [size]="18"></app-icon>
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: 80px;
      display: flex;
      align-items: center;
      background: var(--bg-nav);
      backdrop-filter: var(--glass-backdrop);
      -webkit-backdrop-filter: var(--glass-backdrop);
      border-bottom: 1px solid var(--border-color);
      transition: all 0.3s ease;

      &.scrolled {
        height: 70px;
        box-shadow: var(--shadow-sm);
      }
    }

    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-logo {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.35rem;
      color: var(--text-primary);
      cursor: pointer;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.2rem;
      user-select: none;

      .logo-code {
        color: var(--accent-cyan);
        font-family: 'JetBrains Mono', monospace;
      }

      .logo-dot {
        color: var(--accent-cyan);
      }

      &:hover .logo-name {
        color: var(--accent-cyan);
      }
    }

    .desktop-nav {
      @media (max-width: 868px) {
        display: none;
      }
    }

    .nav-list {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
    }

    .nav-link {
      font-family: 'Outfit', sans-serif;
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      text-decoration: none;
      transition: all 0.25s ease;
      display: flex;
      align-items: center;
      gap: 0.3rem;

      .nav-num {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        color: var(--accent-cyan);
        opacity: 0.8;
      }

      &:hover, &.active {
        color: var(--accent-cyan);
      }

      &.active {
        font-weight: 600;
      }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .action-btn {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-primary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.25s ease;

      &:hover {
        border-color: var(--accent-cyan);
        color: var(--accent-cyan);
        transform: translateY(-2px);
      }
    }

    .resume-btn {
      padding: 0.55rem 1.25rem;
      font-size: 0.875rem;

      @media (max-width: 868px) {
        display: none;
      }
    }

    .mobile-toggle {
      display: none;
      background: transparent;
      border: none;
      color: var(--text-primary);
      cursor: pointer;
      padding: 0.5rem;

      @media (max-width: 868px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    /* Mobile Drawer */
    .mobile-drawer {
      position: fixed;
      inset: 0;
      z-index: 1001;
      visibility: hidden;
      pointer-events: none;
      transition: visibility 0.3s ease;

      &.open {
        visibility: visible;
        pointer-events: auto;

        .mobile-backdrop {
          opacity: 1;
        }

        .mobile-drawer-content {
          transform: translateX(0);
        }
      }
    }

    .mobile-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .mobile-drawer-content {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 300px;
      max-width: 85vw;
      background: var(--bg-secondary);
      border-left: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      padding: 1.5rem;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--shadow-md);
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);

      .logo-name {
        font-family: 'Outfit', sans-serif;
        font-weight: 700;
        font-size: 1.2rem;
      }
    }

    .mobile-nav-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin: 2rem 0;
    }

    .mobile-nav-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.85rem 1rem;
      border-radius: 10px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 1.05rem;
      font-weight: 500;
      transition: all 0.2s ease;

      .nav-num {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
        color: var(--accent-cyan);
      }

      &:hover, &.active {
        background: rgba(0, 242, 254, 0.08);
        color: var(--accent-cyan);
      }
    }

    .drawer-footer {
      margin-top: auto;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);

      .full-width {
        width: 100%;
      }
    }
  `]
})
export class NavbarComponent {
  public themeService = inject(ThemeService);
  public scrollSpy = inject(ScrollSpyService);

  public isScrolled = signal<boolean>(false);
  public mobileMenuOpen = signal<boolean>(false);

  public readonly navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'expertise', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 30);
      });
    }
  }

  public navigateTo(sectionId: string): void {
    this.scrollSpy.scrollToSection(sectionId);
  }

  public navigateToMobile(sectionId: string): void {
    this.closeMobileMenu();
    this.scrollSpy.scrollToSection(sectionId);
  }

  public toggleMobileMenu(): void {
    this.mobileMenuOpen.update(val => !val);
  }

  public closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  public openResume(): void {
    alert('Sarang V Resume: Full Stack Developer with 4+ years experience in Python, Django REST Framework, Angular, and PostgreSQL.');
  }

  public openResumeMobile(): void {
    this.closeMobileMenu();
    this.openResume();
  }
}
