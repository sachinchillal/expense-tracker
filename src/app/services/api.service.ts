import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Expense, Tag, Workspace } from './app.interfaces';

const API = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  // App API Requests
  getTags() {
    return this.httpClient.get(API + 'tag');
  }
  createTag(tag: Tag) {
    return this.httpClient.post(API + 'tag', tag);
  }
  updateTag(id: string, tag: Tag) {
    return this.httpClient.put(API + 'tag/' + id, tag);
  }
  getWorkspaces() {
    return this.httpClient.get(API + 'workspace');
  }
  createWorkspace(workspace: Workspace) {
    return this.httpClient.post(API + 'workspace', workspace);
  }
  updateWorkspace(id: string, workspace: Workspace) {
    return this.httpClient.put(API + 'workspace/' + id, workspace);
  }

  getExpenses(workspaceId: string) {
    return this.httpClient.get(API + 'expense/' + workspaceId);
  }
  createExpense(workspaceId: string, expense: Expense) {
    return this.httpClient.post(API + 'expense/' + workspaceId, expense);
  }
  updateExpense(workspaceId: string, id: string, expense: Expense) {
    return this.httpClient.put(API + 'expense/' + workspaceId + '/' + id, expense);
  }
}
