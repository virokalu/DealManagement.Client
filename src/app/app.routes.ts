import { Routes } from '@angular/router';

import { IndexComponent } from './deal/index/index.component';
import { ViewComponent } from './deal/view/view.component';
import { CreateComponent } from './deal/create/create.component';
import { EditComponent } from './deal/edit/edit.component';
import { EditHotelComponent } from './hotel/edit/edit.component';
import { CreateHotelComponent } from './hotel/create/create.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'deal/index', component: IndexComponent },
    { path: 'deal/:slug/view', component: ViewComponent },
    { path: 'deal/create', component: CreateComponent },
    { path: 'deal/:slug/edit', component: EditComponent },
    { path: 'hotel/create', component: CreateHotelComponent },
    { path: 'hotel/edit', component: EditHotelComponent },
    { path: '**', redirectTo: '' }
];
