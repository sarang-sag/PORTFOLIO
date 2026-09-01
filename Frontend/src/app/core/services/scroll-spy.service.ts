import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService {
  private platformId = inject(PLATFORM_ID);
  public activeSection = signal<string>('home');

  private sectionIds: string[] = ['home', 'about', 'experience', 'skills', 'projects', 'expertise', 'approach', 'contact'];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    }
  }

  private onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const scrollPosition = window.scrollY + 200;

    for (const sectionId of this.sectionIds) {
      const element = document.getElementById(sectionId);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection.set(sectionId);
          break;
        }
      }
    }
  }

  public scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      this.activeSection.set(sectionId);
    }
  }
}
