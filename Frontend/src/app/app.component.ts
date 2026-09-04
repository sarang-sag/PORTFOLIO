import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExpertiseComponent } from './components/expertise/expertise.component';
import { ApproachComponent } from './components/approach/approach.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    ExpertiseComponent,
    ApproachComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title = 'Sarang V — Senior Full Stack Developer';
  public isLoading = signal<boolean>(true);
  public isFadingOut = signal<boolean>(false);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const hideLoader = () => {
        this.isFadingOut.set(true);
        setTimeout(() => {
          this.isLoading.set(false);
        }, 500);
      };

      if (document.readyState === 'complete') {
        setTimeout(hideLoader, 300);
      } else {
        window.addEventListener('load', () => {
          setTimeout(hideLoader, 200);
        });
        // Safety timeout
        setTimeout(hideLoader, 1000);
      }
    } else {
      this.isLoading.set(false);
    }
  }
}
