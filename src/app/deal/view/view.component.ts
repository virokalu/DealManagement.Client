import { Component } from '@angular/core';
import { Deal } from '../deal';
import { DealService } from '../deal.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { NotificationService } from '../../shared/notification.service';
import { catchError, EMPTY } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../hotel/hotel.service';

@Component({
  selector: 'app-view',
  imports: [RouterModule, CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  slug!: string;
  deal!: Deal;

  constructor(
    public dealService: DealService,
    public hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params['slug'];
    this.dealService.get(this.slug).pipe(
      catchError(
        error => {
          console.log(error);
          var errors = this.errorHandler.extractErrors(error);
          this.notification.showError(errors)
          this.router.navigateByUrl('deal/index');
          return EMPTY;
        }
      )
    ).subscribe({
      next: (data: Deal) => {
        this.deal = data;
      }
    });
  }

  deleteHotel(id: number) {
    this.hotelService.delete(id).pipe(
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
        this.deal.hotels = this.deal.hotels.filter(item => item.id !== id)
        this.notification.showSuccess('Hotel deleted successfully!');
        console.log('Deal deleted successfully!');
      })
  }
}
