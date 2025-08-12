import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Expense, INIT_EXPENSE } from '../../services/app.interfaces';
import { ToastService } from '../../services/toast.service';
import { TOAST_TYPE } from '../../services/ui.interfaces';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {
  // For Expense Form
  workspaceId = ''; // to append expense

  id = '';
  name = '';
  description = '';

  amount = '';
  returns = '';
  total = '';

  hasValidity = false;

  validFrom = new Date().toISOString().split('T')[0];
  validTo = new Date().toISOString().split('T')[0];

  tags = [];

  constructor(public appService: AppService, private apiService: ApiService, private toastService: ToastService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    this.validTo = d.toISOString().split('T')[0];
    // Get the ID from the route parameters
    this.workspaceId = this.activatedRoute.snapshot.paramMap.get('workspaceId') || '';
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if (this.id) {
      const es = this.appService.expenses[this.workspaceId];
      if (es) {
        const e = es.find(expense => expense.id === this.id);
        if (e) {
          this.name = e.name;
          this.description = e.description;
          this.amount = e.amount.toString();
          this.returns = e.returns.toString();
          this.total = e.total.toString();
          this.hasValidity = e.hasValidity;
          this.validFrom = new Date(e.validFrom).toISOString().split('T')[0];
          this.validTo = new Date(e.validTo).toISOString().split('T')[0];
          this.appService.tags.forEach(tag => {
            tag.isSelected = e.tags.includes(tag.id);
          });
        }
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
    const newExpense: Expense = {
      ...INIT_EXPENSE,
      name: this.name,
      description: this.description,
      amount: parseInt(this.amount) || 0,
      tags: this.appService.tags.filter(tag => tag.isSelected).map(tag => tag.id),

      hasValidity: this.hasValidity,
      validFrom: +new Date(this.validFrom),
      validTo: +new Date(this.validTo)
    };
    this.appService.isLoading = true;
    if (this.id) {
      this.apiService.updateExpense(this.workspaceId, this.id, newExpense).subscribe({
        next: (res) => {
          this.toastService.showToastAuto('Success', 'Expense updated successfully.', TOAST_TYPE.SUCCESS);
          this.appService.isLoading = false;
        },
        error: (err) => {
          this.toastService.showToastAuto('Error', 'Failed to update Expense.', TOAST_TYPE.ERROR);
          this.appService.isLoading = false;
        }
      });
    } else {
      this.apiService.createExpense(this.workspaceId, newExpense).subscribe({
        next: (res) => {
          this.toastService.showToastAuto('Success', 'Expense created successfully.', TOAST_TYPE.SUCCESS);
          // this.name = '';
          // this.description = '';
          this.appService.isLoading = false;
        },
        error: (err) => {
          this.toastService.showToastAuto('Error', 'Failed to create Expense.', TOAST_TYPE.ERROR);
          this.appService.isLoading = false;
        }
      });
    }
  }

}
