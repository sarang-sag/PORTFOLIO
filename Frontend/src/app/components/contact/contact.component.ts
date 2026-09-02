import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { EmailService } from '../../core/services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionHeaderComponent, IconComponent],
  template: `
    <section id="contact" class="section-padding contact-section">
      <div class="container">
        <app-section-header
          badge="GET IN TOUCH"
          title="Let's Build Something Great Together."
          subtitle="I'm open to discussing new enterprise opportunities, challenging projects, and software development roles.">
        </app-section-header>

        <div class="contact-grid">
          <!-- Direct Contact Information Panel -->
          <div class="contact-info-card glass-card">
            <h3 class="info-title">Contact Information</h3>
            <p class="info-desc">
              Have a project in mind or want to discuss a full stack development role? Feel free to reach out directly through any of these channels.
            </p>

            <div class="contact-methods">
              <a href="mailto:sarangsag86@gmail.com" class="method-item">
                <div class="method-icon cyan">
                  <app-icon name="mail" [size]="20"></app-icon>
                </div>
                <div class="method-details">
                  <span class="method-label">Email Me</span>
                  <span class="method-value">sarangsag86&#64;gmail.com</span>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/sarang-v/" target="_blank" rel="noopener noreferrer" class="method-item">
                <div class="method-icon blue">
                  <app-icon name="linkedin" [size]="20"></app-icon>
                </div>
                <div class="method-details">
                  <span class="method-label">LinkedIn</span>
                  <span class="method-value">Connect on LinkedIn</span>
                </div>
              </a>

              <a href="https://github.com/sarang-sag" target="_blank" rel="noopener noreferrer" class="method-item">
                <div class="method-icon purple">
                  <app-icon name="github" [size]="20"></app-icon>
                </div>
                <div class="method-details">
                  <span class="method-label">GitHub</span>
                  <span class="method-value">Explore Code Repositories</span>
                </div>
              </a>
            </div>

            <div class="location-badge">
              <app-icon name="cloud" [size]="16"></app-icon>
              <span>Available for Remote & On-Site Engineering</span>
            </div>
          </div>

          <!-- Interactive Contact Form -->
          <div class="contact-form-card glass-card">
            @if (submittedSuccess()) {
              <div class="success-message-box animate-fade-in">
                <div class="success-icon">
                  <app-icon name="check" [size]="32"></app-icon>
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out! A confirmation & thank-you email has been dispatched to your inbox. Sarang V will get back to you as soon as possible.</p>
                <button class="btn btn-outline" (click)="resetForm()">Send Another Message</button>
              </div>
            } @else {
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
                @if (errorMessage()) {
                  <div class="error-banner">
                    <app-icon name="x" [size]="18"></app-icon>
                    <span>{{ errorMessage() }}</span>
                  </div>
                }

                <div class="form-row">
                  <!-- Name Field -->
                  <div class="form-group">
                    <label for="name" class="form-label">Your Name <span class="required">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      formControlName="name" 
                      class="form-input" 
                      [class.is-invalid]="isFieldInvalid('name')"
                      placeholder="John Doe">
                    @if (isFieldInvalid('name')) {
                      <div class="error-msg">Please enter your name.</div>
                    }
                  </div>

                  <!-- Email Field -->
                  <div class="form-group">
                    <label for="email" class="form-label">Your Email <span class="required">*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      formControlName="email" 
                      class="form-input" 
                      [class.is-invalid]="isFieldInvalid('email')"
                      placeholder="john@example.com">
                    @if (isFieldInvalid('email')) {
                      <div class="error-msg">Please enter a valid email address.</div>
                    }
                  </div>
                </div>

                <!-- Subject Field -->
                <div class="form-group">
                  <label for="subject" class="form-label">Subject <span class="required">*</span></label>
                  <input 
                    type="text" 
                    id="subject" 
                    formControlName="subject" 
                    class="form-input" 
                    [class.is-invalid]="isFieldInvalid('subject')"
                    placeholder="Project Inquiry / Job Opportunity">
                  @if (isFieldInvalid('subject')) {
                    <div class="error-msg">Please enter a subject line.</div>
                  }
                </div>

                <!-- Message Field -->
                <div class="form-group">
                  <label for="message" class="form-label">Message <span class="required">*</span></label>
                  <textarea 
                    id="message" 
                    formControlName="message" 
                    rows="5" 
                    class="form-input textarea" 
                    [class.is-invalid]="isFieldInvalid('message')"
                    placeholder="Tell me about your project or team needs..."></textarea>
                  @if (isFieldInvalid('message')) {
                    <div class="error-msg">Please enter a message (at least 10 characters).</div>
                  }
                </div>

                <button type="submit" class="btn btn-primary full-width" [disabled]="isSubmitting()">
                  @if (isSubmitting()) {
                    <span>Sending Message...</span>
                  } @else {
                    <app-icon name="send" [size]="18"></app-icon>
                    <span>Send Message</span>
                  }
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      background: var(--bg-primary);
      position: relative;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 2.5rem;
      align-items: start;

      @media (max-width: 992px) {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
    }

    .contact-info-card {
      padding: 2.5rem;
      border-radius: 20px;

      @media (max-width: 768px) {
        padding: 1.75rem;
      }
    }

    .info-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }

    .info-desc {
      font-size: 1rem;
      color: var(--text-secondary);
      line-height: 1.65;
      margin-bottom: 2rem;
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-bottom: 2rem;
    }

    .method-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 14px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      text-decoration: none;
      transition: all 0.25s ease;

      &:hover {
        border-color: var(--accent-cyan);
        transform: translateY(-2px);
      }

      .method-icon {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        &.cyan { background: rgba(0, 242, 254, 0.1); color: var(--accent-cyan); }
        &.blue { background: rgba(56, 189, 248, 0.1); color: #38bdf8; }
        &.purple { background: rgba(129, 140, 248, 0.1); color: var(--accent-purple); }
      }

      .method-details {
        display: flex;
        flex-direction: column;

        .method-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: 'JetBrains Mono', monospace;
        }

        .method-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
      }
    }

    .location-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 10px;
      background: rgba(16, 185, 129, 0.08);
      color: var(--accent-emerald);
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    /* Form Styling */
    .contact-form-card {
      padding: 2.5rem;
      border-radius: 20px;

      @media (max-width: 768px) {
        padding: 1.75rem;
      }
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .error-banner {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.85rem 1.1rem;
      border-radius: 10px;
      background: rgba(244, 63, 94, 0.1);
      border: 1px solid rgba(244, 63, 94, 0.3);
      color: #f43f5e;
      font-size: 0.9rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .form-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-primary);

      .required {
        color: #f43f5e;
      }
    }

    .form-input {
      width: 100%;
      padding: 0.85rem 1.1rem;
      border-radius: 10px;
      background: var(--bg-input);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
      font-family: 'Inter', sans-serif;
      font-size: 0.95rem;
      outline: none;
      transition: all 0.2s ease;

      &:focus {
        border-color: var(--accent-cyan);
        box-shadow: 0 0 10px rgba(0, 242, 254, 0.15);
      }

      &.is-invalid {
        border-color: #f43f5e;
      }

      &.textarea {
        resize: vertical;
      }
    }

    .error-msg {
      font-size: 0.8rem;
      color: #f43f5e;
    }

    .full-width {
      width: 100%;
      margin-top: 0.5rem;
    }

    .success-message-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 3rem 1.5rem;

      .success-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(16, 185, 129, 0.15);
        color: var(--accent-emerald);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
      }

      h3 {
        font-size: 1.5rem;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
      }
    }
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private emailService = inject(EmailService);

  public isSubmitting = signal<boolean>(false);
  public submittedSuccess = signal<boolean>(false);
  public errorMessage = signal<string | null>(null);

  public contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  public isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  public onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.emailService.sendEmail(this.contactForm.value).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.submittedSuccess.set(true);
        } else {
          this.errorMessage.set(res.error || 'Failed to send message. Please try again.');
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Could not send message to the backend server. Please verify the server is running or try again later.');
        console.error('Email submission error:', err);
      }
    });
  }

  public resetForm(): void {
    this.contactForm.reset();
    this.submittedSuccess.set(false);
    this.errorMessage.set(null);
  }
}

