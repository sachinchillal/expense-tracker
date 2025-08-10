import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { INIT_TAG, Tag } from '../../services/app.interfaces';
import { ToastService } from '../../services/toast.service';
import { TOAST_TYPE } from '../../services/ui.interfaces';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent implements OnInit {
  id = '';
  name = '';
  description = '';

  constructor(private appService: AppService, private apiService: ApiService, private toastService: ToastService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the ID from the route parameters
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.id) {
      const tag = this.appService.tags.find(tag => tag.id === this.id);
      if (tag) {
        this.name = tag.name;
        this.description = tag.description;
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
    const newTag: Tag = {
      ...INIT_TAG,
      name: this.name,
      description: this.description,
    };
    if (this.id) {
      this.apiService.updateTag(this.id, newTag).subscribe({
        next: (res) => {
          this.toastService.showToastAuto('Success', 'Tag updated successfully.', TOAST_TYPE.SUCCESS);
        },
        error: (err) => {
          this.toastService.showToastAuto('Error', 'Failed to update tag.', TOAST_TYPE.ERROR);
        }
      });
    } else {
      this.apiService.createTag(newTag).subscribe({
        next: (res) => {
          this.toastService.showToastAuto('Success', 'Tag created successfully.', TOAST_TYPE.SUCCESS);
          this.name = '';
          this.description = '';
        },
        error: (err) => {
          this.toastService.showToastAuto('Error', 'Failed to create tag.', TOAST_TYPE.ERROR);
        }
      });
    }
  }

}
