import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskFormComponent } from './components/task-form/task-form';

export const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'task', component: TaskFormComponent },
  { path: 'task/:id', component: TaskFormComponent },
  { path: '**', redirectTo: '' }
];
