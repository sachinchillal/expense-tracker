import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TagComponent } from './components/tag/tag.component';
import { TagsComponent } from './components/tags/tags.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { WorkspacesComponent } from './components/workspaces/workspaces.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'page', component: WorkspaceComponent, title: 'Expense Page' },
  { path: 'page/:id', component: WorkspaceComponent, title: 'Edit Expense Page' },
  { path: 'pages', component: WorkspacesComponent, title: 'Expense Book' },
  { path: 'tag', component: TagComponent, title: 'Tag' },
  { path: 'tag/:id', component: TagComponent, title: 'Edit Tag' },
  { path: 'tags', component: TagsComponent, title: 'Tags' },
];
