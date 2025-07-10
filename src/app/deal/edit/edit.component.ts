import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Deal } from '../deal';
import { DealService } from '../deal.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { NotificationService } from '../../shared/notification.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  slug!: string;
  form!: FormGroup;

  constructor(
    public dealService: DealService,
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
        this.form.patchValue({
          slug: data.slug,
          name: data.name,
          video: data.video
        });
      }
    });

    this.form = new FormGroup({
      slug: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      video: new FormControl('', Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i))
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.dealService.update(this.slug, this.form.value).pipe(
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
          this.notification.showSuccess('Deal updated successfully');
          this.router.navigateByUrl('/deal/' + this.slug + '/view');
        }
      });
  }


}
