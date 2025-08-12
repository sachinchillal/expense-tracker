import { Injectable } from '@angular/core';
import { dExpense, dTag, dWorkspace } from './app.interfaces';
import { ApiService } from './api.service';
import { ToastService } from './toast.service';
import { TagColorsList, TOAST_TYPE } from './ui.interfaces';

const LOCAL_STORAGE_KEY = 'expense_tracker';
interface LocalStorageData {
  tags: dTag[];
  workspaces: dWorkspace[];
  expenses: {
    [key: string]: dExpense[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isLoading: boolean = false;

  readonly tags: dTag[] = [];
  readonly workspaces: dWorkspace[] = [];
  readonly expenses: { [key: string]: dExpense[] } = {};

  constructor(private apiService: ApiService, private toastService: ToastService) {
    this.initStore();
  }
  public initStore() {
    const d = this.getLocalStorage();
    if (d.tags && d.tags.length > 0) {
      this.assignTags(d.tags);
    } else {
      this.fetchTags();
    }
    if (d.workspaces && d.workspaces.length > 0) {
      this.assignWorkspaces(d.workspaces);
    } else {
      this.fetchWorkspaces();
    }
    if (d.expenses && Object.keys(d.expenses).length > 0) {
      this.assignExpenses(d.expenses);
    }
  }

  // Tags
  private assignTags(tags: dTag[]): void {
    this.tags.length = 0; // Clear existing tags
    this.tags.push(...tags);
  }
  public fetchTags() {
    this.isLoading = true;
    this.apiService.getTags().subscribe({
      next: (res: any) => {
        this.saveTags(res.data);
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error)
        this.toastService.showToastAuto('Error fetching tags', error.message, TOAST_TYPE.ERROR);
        this.isLoading = false;
      }
    });
  }
  public saveTags(tags: dTag[]): void {
    // sort based on createdAt
    tags.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    tags.forEach((tag, index) => {
      tag.isExist = false;
      tag.color = TagColorsList[index % TagColorsList.length];
    });
    this.assignTags(tags);
    const d = this.getLocalStorage();
    d.tags = this.tags;
    this.saveToLocalStorage(d);
  }

  // Workspaces
  private assignWorkspaces(workspaces: dWorkspace[]): void {
    this.workspaces.length = 0; // Clear existing workspaces
    this.workspaces.push(...workspaces);
  }
  public fetchWorkspaces() {
    this.isLoading = true;
    this.apiService.getWorkspaces().subscribe({
      next: (res: any) => {
        this.saveWorkspaces(res.data);
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error)
        this.toastService.showToastAuto('Error fetching workspaces', error.message, TOAST_TYPE.ERROR);
        this.isLoading = false;
      }
    });
  }
  public saveWorkspaces(workspaces: dWorkspace[]): void {
    this.assignWorkspaces(workspaces);
    const d = this.getLocalStorage();
    d.workspaces = this.workspaces;
    this.saveToLocalStorage(d);
  }
  // Expenses
  private assignExpenses(expenses: { [key: string]: dExpense[] }): void {
    Object.keys(expenses).forEach(key => {
      this.expenses[key] = expenses[key];
    });
  }

  // Storage Management

  public getLocalStorage(): LocalStorageData {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : { tags: [], workspaces: [], expenses: {} };
  }
  public saveToLocalStorage(d: LocalStorageData): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(d));
  }
}
