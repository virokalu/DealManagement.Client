import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DealService } from '../deal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  form!: FormGroup;

  constructor(public dealService: DealService, private router: Router){}

  ngOnInit(): void {
    this.form = new FormGroup({
      slug: new FormControl('', [Validators.required]),
      name: new FormControl('', Validators.required),
      video: new FormControl('', Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i))
    })
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.dealService.add(this.form.value.subscribe((res:any)=>{
      console.log('Deal Created Successfully');
      this.router.navigateByUrl('deal/index');
    }))
  }

}
