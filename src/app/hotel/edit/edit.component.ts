import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { NotificationService } from '../../shared/notification.service';
import { catchError, EMPTY } from 'rxjs';
import { Hotel } from '../hotel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditHotelComponent {
  id!: number;
  form!: FormGroup;
  slug!: string;

  constructor(
    public hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.hotelService.get(this.id).pipe(
      catchError(
        error => {
          console.log(error);
          var errors = this.errorHandler.extractErrors(error);
          this.notification.showError(errors)
          this.router.navigateByUrl('/deal/' + this.slug + '/view');
          return EMPTY;
        }
      )
    ).subscribe({
      next: (data: Hotel) => {
        this.form.patchValue({
          dealSlug: data.dealSlug,
          name: data.name,
          rate: data.rate,
          amenities: data.amenities
        });
        this.slug = data.dealSlug;
      }
    });

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      rate: new FormControl('', [Validators.min(1.0), Validators.max(5.0)]),
      amenities: new FormControl(''),
      dealSlug: new FormControl()
    })
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.hotelService.update(this.id, this.form.value).pipe(
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
        next: (res: any) => {
          this.notification.showSuccess('Hotel updated successfully');
          this.router.navigateByUrl('/deal/' + this.slug + '/view');
        }
      });
  }

}
