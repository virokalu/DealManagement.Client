import { Component, OnInit } from '@angular/core';
import { Deal } from '../deal';
import { DealService } from '../deal.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { NotificationService } from '../../shared/notification.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  deals: Deal[] = [];

  constructor(
    public dealService: DealService,
    private notification: NotificationService,
    private errorHandler: ErrorHandlerService
  ) { }


  ngOnInit(): void {
    this.dealService.getDeals().pipe(
      catchError(
        error => {
          console.log(error);
          var errors = this.errorHandler.extractErrors(error);
          this.notification.showError(errors)
          return EMPTY;
        }
      )
    )
      .subscribe({
        next: (data) => this.deals = data,
        error: (err) => console.error('Error loading deals:', err)
      })
  }

  deleteDeal(slug: string) {
    this.dealService.delete(slug).pipe(
      catchError(
        error => {
          console.log(error);
          var errors = this.errorHandler.extractErrors(error);
          this.notification.showError(errors)
          return EMPTY;
        }
      )
    )
      .subscribe(res => {
        this.deals = this.deals.filter(item => item.slug !== slug);
        this.notification.showSuccess('Deal deleted successfully!');
        console.log('Deal deleted successfully!');
      })
  }
}
