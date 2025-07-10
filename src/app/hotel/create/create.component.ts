import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { NotificationService } from '../../shared/notification.service';
import { catchError, EMPTY } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateHotelComponent {

  form!: FormGroup;
  slug!: string;

  constructor(
    public hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private errorHandler: ErrorHandlerService
  ) { }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {

    this.slug = this.route.snapshot.params['slug'];

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      rate: new FormControl('', [Validators.min(1.0), Validators.max(5.0)]),
      amenities: new FormControl(''),
      dealSlug: new FormControl(this.slug)
    })
  }

  submit(): void {
    this.hotelService.add(this.form.value)
      .pipe(
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
        next: () => {
          this.notification.showSuccess('Hotel created successfully');
          this.router.navigateByUrl('/deal/' + this.slug + '/view');
        }
      });
  }
}
