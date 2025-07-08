import { Routes } from '@angular/router';
import { IndexComponent } from './deal/index/index.component';
import { ViewComponent } from './deal/view/view.component';
import { CreateComponent } from './deal/create/create.component';
import { EditComponent } from './deal/edit/edit.component';

export const routes: Routes = [
    { path: 'post', redirectTo: 'post/index', pathMatch: 'full'},
    { path: 'post/index', component: IndexComponent },
    { path: 'post/:postId/view', component: ViewComponent },
    { path: 'post/create', component: CreateComponent },
    { path: 'post/:postId/edit', component: EditComponent } 
];
