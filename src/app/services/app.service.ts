import { Injectable } from '@angular/core';
import { dTag, dWorkspace } from './app.interfaces';
import { ApiService } from './api.service';
import { ToastService } from './toast.service';
import { TOAST_TYPE } from './ui.interfaces';

const LOCAL_STORAGE_KEY = 'expense_tracker';
interface LocalStorageData {
  tags: dTag[];
  workspaces: dWorkspace[];
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isLoading: boolean = false;

  readonly tags: dTag[] = [];
  readonly workspaces: dWorkspace[] = [];

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
  }

  // Tags
  private assignTags(tags: dTag[]): void {
    this.tags.length = 0; // Clear existing tags
    this.tags.push(...tags);
  }
  public fetchTags() {
    this.isLoading = true;
    this.apiService.getTags().subscribe({
      next: (tags: any) => {
        this.saveTags(tags.data);
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
      next: (workspaces: any) => {
        this.saveWorkspaces(workspaces.data);
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

  // Storage Management

  private getLocalStorage(): LocalStorageData {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : { tags: [], workspaces: [] };
  }
  private saveToLocalStorage(d: LocalStorageData): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(d));
  }
}
