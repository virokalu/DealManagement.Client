import { Routes } from '@angular/router';

import { IndexComponent } from './deal/index/index.component';
import { ViewComponent } from './deal/view/view.component';
import { CreateComponent } from './deal/create/create.component';
import { EditComponent } from './deal/edit/edit.component';

export const routes: Routes = [
    { path: 'deal', redirectTo: 'deal/index'},
    { path: 'deal/index', component: IndexComponent },
    { path: 'deal/:slug/view', component: ViewComponent },
    { path: 'deal/create', component: CreateComponent },
    { path: 'deal/:slug/edit', component: EditComponent } 
];
