import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TagComponent } from './components/tag/tag.component';
import { TagsComponent } from './components/tags/tags.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { WorkspacesComponent } from './components/workspaces/workspaces.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { ExpensesComponent } from './components/expenses/expenses.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },

  { path: 'expense/:workspaceId', component: ExpenseComponent, title: 'Add Expense' },
  { path: 'expense/:workspaceId/:id', component: ExpenseComponent, title: 'Edit Expense' },
  { path: 'expenses/:id', component: ExpensesComponent, title: 'Expenses List' },

  { path: 'page', component: WorkspaceComponent, title: 'Expense Page' },
  { path: 'page/:id', component: WorkspaceComponent, title: 'Edit Expense Page' },
  { path: 'pages', component: WorkspacesComponent, title: 'Expense Book' },
  { path: 'tag', component: TagComponent, title: 'Tag' },
  { path: 'tag/:id', component: TagComponent, title: 'Edit Tag' },
  { path: 'tags', component: TagsComponent, title: 'Tags' },
];
