import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DealService } from '../deal.service';
import { Router, RouterModule } from '@angular/router';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { NotificationService } from '../../shared/notification.service';
import { catchError, EMPTY, throwError } from 'rxjs';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  form!: FormGroup;

  constructor(
    public dealService: DealService,
    private router: Router,
    private notification: NotificationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      slug: new FormControl('', [Validators.required]),
      name: new FormControl('', Validators.required),
      video: new FormControl('', Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i)),
      hotels: new FormArray([])
    });
    this.addHotel();
  }

  get f() {
    return this.form.controls;
  }

  get hotels(): FormArray {
    return this.form.get('hotels') as FormArray;
  }

  newHotel(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      rate: new FormControl('', [Validators.required, Validators.min(0)]),
      amenities: new FormControl(''),
      dealSlug: new FormControl('')
    });
  }

  addHotel(): void {
    this.hotels.push(this.newHotel());
  }

  removeHotel(index: number): void {
    this.hotels.removeAt(index);
  }

  submit(): void {
    const slug = this.form.get('slug')?.value;

    this.hotels.controls.forEach(control => {
      const hotelGroup = control as FormGroup;
      hotelGroup.patchValue({ dealSlug: slug });
    });

    console.log('Form Submitted:', this.form.value);

    this.dealService.add(this.form.value)
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
        this.notification.showSuccess('Deal created successfully');
        this.router.navigateByUrl('deal/index');
      }      
    });
  }
}
