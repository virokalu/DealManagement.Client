import { Component, OnInit } from '@angular/core';
import { Deal } from '../deal';
import { DealService } from '../deal.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{
  deals:Deal[] = [];

  constructor(public dealService: DealService){ }

  
  ngOnInit(): void {
    this.dealService.getDeals().subscribe({
      next: (data) => this.deals = data,
      error: (err) => console.error('Error loading deals:', err)
    })
  }

  deleteDeal(slug: string){
    this.dealService.delete(slug).subscribe(res=>{
      this.deals = this.deals.filter(item => item.slug !== slug);
      console.log('Deal deleted successfully!');
    })
  }
}
