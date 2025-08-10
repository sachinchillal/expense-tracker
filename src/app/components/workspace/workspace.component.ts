import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { INIT_WORKSPACE, Workspace } from '../../services/app.interfaces';
import { ToastService } from '../../services/toast.service';
import { TOAST_TYPE } from '../../services/ui.interfaces';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements OnInit {
  id = '';
  name = '';
  description = '';

  constructor(private appService: AppService, private apiService: ApiService, private toastService: ToastService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the ID from the route parameters
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.id) {
      const workspace = this.appService.workspaces.find(workspace => workspace.id === this.id);
      if (workspace) {
        this.name = workspace.name;
        this.description = workspace.description;
      }
    }
  }

  createRecord() {
    this.name = this.name.trim();
    this.description = this.description.trim();
    if (!this.name || !this.description) {
      this.toastService.showToastAutoError('Error', 'Name and description are required.');
      return;
    }
    const newWorkspace: Workspace = {
      ...INIT_WORKSPACE,
      name: this.name,
      description: this.description,
    };
    if (this.id) {
      this.apiService.updateWorkspace(this.id, newWorkspace).subscribe({
        next: (res) => {
          this.toastService.showToastAuto('Success', 'Page updated successfully.', TOAST_TYPE.SUCCESS);
        },
        error: (err) => {
          this.toastService.showToastAuto('Error', 'Failed to update Page.', TOAST_TYPE.ERROR);
        }
      });
    } else {
      this.apiService.createWorkspace(newWorkspace).subscribe({
        next: (res) => {
          this.toastService.showToastAuto('Success', 'Page created successfully.', TOAST_TYPE.SUCCESS);
          this.name = '';
          this.description = '';
        },
        error: (err) => {
          this.toastService.showToastAuto('Error', 'Failed to create Page.', TOAST_TYPE.ERROR);
        }
      });
    }
  }

}
