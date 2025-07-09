import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  extractErrors(error: any): string[] {
    const messages: string[] = [];

    if (Array.isArray(error?.error)) {
      return error.error;
    }

    if (error?.error?.errors) {
      for (const field in error.error.errors) {
        messages.push(...error.error.errors[field]);
      }
      return messages;
    }

    if (error?.error?.title) {
      messages.push(error.error.title);
    }

    return messages.length ? messages : ['An unknown error occurred.'];
  }
}
