import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private http = inject(HttpClient);
  private primaryUrl = '/api/send-email';
  private fallbackUrl = 'http://localhost:3000/api/send-email';

  public sendEmail(payload: ContactPayload): Observable<EmailResponse> {
    // Try relative URL first (when using ng serve proxy), then fallback to direct localhost:3000
    return this.http.post<EmailResponse>(this.primaryUrl, payload).pipe(
      catchError((err) => {
        console.warn('Proxy request failed, retrying directly to http://localhost:3000/api/send-email', err);
        return this.http.post<EmailResponse>(this.fallbackUrl, payload);
      })
    );
  }
}
