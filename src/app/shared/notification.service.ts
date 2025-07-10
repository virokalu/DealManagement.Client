import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showSuccess(message: string): void {
    alert(`✅ SUCCESS: ${message}`);
  }

  showError(errors: string[] | string): void {
    const msg = Array.isArray(errors) ? errors.join('\n') : errors;
    alert(`❌ ERROR:\n${msg}`);
  }
}
