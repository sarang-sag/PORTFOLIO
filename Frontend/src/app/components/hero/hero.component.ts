import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollSpyService } from '../../core/services/scroll-spy.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="home" class="hero-section">
      <!-- Background Canvas Micro-Animation -->
      <canvas #heroCanvas class="hero-canvas"></canvas>
      
      <!-- Subtle Decorative Glow Orbs -->
      <div class="glow-orb orb-cyan"></div>
      <div class="glow-orb orb-purple"></div>

      <div class="container hero-container">
        <div class="hero-content">
          <!-- Status Tag -->
          <div class="status-badge animate-fade-in">
            <span class="status-dot"></span>
            <span>Project Delivery Engineer (PDE) & Full Stack Developer</span>
          </div>

          <!-- Main Heading -->
          <h1 class="hero-title">
            Hi, I'm <span class="text-gradient-cyan">Sarang.</span>
          </h1>

          <!-- Subheading -->
          <h2 class="hero-subtitle">
            Project Delivery Engineer & Full Stack Developer specializing in <span class="highlight-python">Python</span> & <span class="highlight-angular">Angular</span>.
          </h2>

          <!-- Description -->
          <p class="hero-description">
            Over 4+ years of professional engineering experience leading end-to-end product lifecycles, supervising cloud deployments, and architecting scalable backend APIs & enterprise applications.
          </p>

          <!-- Action CTA Buttons -->
          <div class="hero-cta-group">
            <button class="btn btn-primary" (click)="scrollToProjects()">
              <span>View My Work</span>
              <app-icon name="arrow-right" [size]="18"></app-icon>
            </button>

            <a class="btn btn-outline" href="Sarang_V_Resume.pdf.pdf" download="Sarang_V_Resume.pdf" target="_blank">
              <app-icon name="download" [size]="18"></app-icon>
              <span>Download Resume</span>
            </a>
          </div>

          <!-- Social Links Bar -->
          <div class="hero-socials">
            <span class="social-label">Connect with me:</span>
            <div class="social-icons">
              <a href="https://www.linkedin.com/in/sarang-v/" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="LinkedIn Profile">
                <app-icon name="linkedin" [size]="18"></app-icon>
              </a>
              <a href="https://github.com/sarang-sag?tab=repositories" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="GitHub Profile">
                <app-icon name="github" [size]="18"></app-icon>
              </a>
              <a href="mailto:sarangsag86@gmail.com" class="social-btn" aria-label="Send Email">
                <app-icon name="mail" [size]="18"></app-icon>
              </a>
            </div>
          </div>
        </div>

        <!-- Right Side Visual Developer Card -->
        <div class="hero-visual">
          <div class="code-terminal-card glass-card">
            <div class="terminal-header">
              <div class="terminal-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="terminal-title">sarang_pde.py</span>
            </div>
            <div class="terminal-body">
              <div class="code-line"><span class="keyword">class</span> <span class="class-name">ProjectDeliveryEngineer</span>:</div>
              <div class="code-line indent-1"><span class="keyword">def</span> <span class="function">__init__</span>(self):</div>
              <div class="code-line indent-2">self.name = <span class="string">"Sarang V"</span></div>
              <div class="code-line indent-2">self.role = <span class="string">"Project Delivery Engineer (PDE)"</span></div>
              <div class="code-line indent-2">self.experience = <span class="string">"4+ Years"</span></div>
              <div class="code-line indent-2">self.stack = [<span class="string">"Python"</span>, <span class="string">"Django DRF"</span>, <span class="string">"Angular"</span>, <span class="string">"PostgreSQL"</span>]</div>
              <div class="code-line indent-2">self.cloud = [<span class="string">"AWS EC2"</span>, <span class="string">"S3"</span>, <span class="string">"NGINX"</span>, <span class="string">"Linux"</span>]</div>
              <div class="code-line indent-1"><span class="keyword">def</span> <span class="function">supervise_delivery</span>(self):</div>
              <div class="code-line indent-2"><span class="keyword">return</span> <span class="string">"End-to-End Product Lifecycle & Sprint Quality"</span></div>
            </div>
            <div class="terminal-footer">
              <span class="terminal-prompt">$</span> python3 pde_delivery.py --deploy-production
              <span class="cursor-blink">_</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 100px;
      padding-bottom: 60px;
      overflow: hidden;

      @media (max-width: 992px) {
        min-height: auto;
        padding-top: 120px;
      }
    }

    .hero-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.5;
    }

    .glow-orb {
      position: absolute;
      width: 450px;
      height: 450px;
      border-radius: 50%;
      filter: blur(120px);
      pointer-events: none;
      z-index: 1;
      opacity: 0.25;

      &.orb-cyan {
        top: 10%;
        left: -10%;
        background: var(--accent-cyan);
      }

      &.orb-purple {
        bottom: 10%;
        right: -10%;
        background: var(--accent-purple);
      }
    }

    .hero-container {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 3.5rem;
      align-items: center;

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.4rem 1rem;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.25);
      color: var(--accent-emerald);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      font-weight: 500;
      margin-bottom: 1.5rem;

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--accent-emerald);
        box-shadow: 0 0 10px var(--accent-emerald);
        animation: pulseDot 2s infinite;
      }
    }

    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
    }

    .hero-title {
      font-size: 3.75rem;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 1rem;

      @media (max-width: 768px) {
        font-size: 2.75rem;
      }

      @media (max-width: 480px) {
        font-size: 2.25rem;
      }
    }

    .hero-subtitle {
      font-size: 1.65rem;
      font-weight: 600;
      color: var(--text-secondary);
      line-height: 1.35;
      margin-bottom: 1.25rem;

      .highlight-python {
        color: #38bdf8;
      }

      .highlight-angular {
        color: #f43f5e;
      }

      @media (max-width: 768px) {
        font-size: 1.3rem;
      }
    }

    .hero-description {
      font-size: 1.125rem;
      color: var(--text-secondary);
      line-height: 1.7;
      max-width: 620px;
      margin-bottom: 2.25rem;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    .hero-cta-group {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
    }

    .hero-socials {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-color);

      .social-label {
        font-size: 0.875rem;
        color: var(--text-muted);
        font-family: 'JetBrains Mono', monospace;
      }

      .social-icons {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
    }

    .social-btn {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-primary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s ease;

      &:hover {
        border-color: var(--accent-cyan);
        color: var(--accent-cyan);
        transform: translateY(-3px);
        box-shadow: 0 4px 15px rgba(0, 242, 254, 0.15);
      }
    }

    /* Terminal Card */
    .hero-visual {
      display: flex;
      justify-content: center;
    }

    .code-terminal-card {
      width: 100%;
      max-width: 480px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: var(--shadow-md);
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .terminal-header {
      padding: 0.85rem 1.25rem;
      background: rgba(30, 41, 59, 0.6);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);

      .terminal-dots {
        display: flex;
        gap: 0.5rem;

        .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          display: inline-block;

          &.red { background-color: #ef4444; }
          &.yellow { background-color: #f59e0b; }
          &.green { background-color: #10b981; }
        }
      }

      .terminal-title {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        color: #94a3b8;
      }
    }

    .terminal-body {
      padding: 1.5rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.825rem;
      line-height: 1.7;
      color: #e2e8f0;

      .keyword { color: #f43f5e; }
      .class-name { color: #38bdf8; }
      .function { color: #a855f7; }
      .string { color: #34d399; }
      
      .indent-1 { padding-left: 1.25rem; }
      .indent-2 { padding-left: 2.5rem; }
    }

    .terminal-footer {
      padding: 0.75rem 1.5rem;
      background: rgba(15, 23, 42, 0.95);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.8rem;
      color: #38bdf8;

      .terminal-prompt {
        color: #10b981;
        font-weight: 700;
        margin-right: 0.4rem;
      }

      .cursor-blink {
        animation: blink 1s infinite;
      }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private scrollSpy = inject(ScrollSpyService);
  private platformId = inject(PLATFORM_ID);

  private animationFrameId: number | null = null;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.canvasRef) {
      this.initBackgroundCanvas();
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  public scrollToProjects(): void {
    this.scrollSpy.scrollToSection('projects');
  }

  private initBackgroundCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    window.addEventListener('resize', () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = Math.min(Math.floor(width / 35), 45);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }
}
