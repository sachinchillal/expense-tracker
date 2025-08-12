import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { dExpense, dTag } from '../../services/app.interfaces';
import { ToastService } from '../../services/toast.service';
import { TOAST_TYPE } from '../../services/ui.interfaces';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppService } from '../../services/app.service';
import { getPastDays, getPastYMDH, getRemainingDays, getRemainingYMDH } from '../../services/util.service';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CalendarComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent implements OnInit {
  id = ''; // Workspace ID
  name = '';
  description = '';

  isHideExpired = true;
  isHideColumns = true;
  isSelectedAllTags = true;

  expenses: dExpense[] = [];
  expensesFiltered: dExpense[] = [];

  grandTotal = 0;
  operation: 'AND' | 'OR' = 'AND';

  readonly columns = [
    { name: 'Name', prop: 'name', },
    { name: 'Description', prop: 'description', isHidden: this.isHideColumns },
    { name: 'Amount', prop: 'amount' },
    // { name: 'Status', prop: 'status' },
    { name: 'Start Date', prop: '', isHidden: this.isHideColumns },
    { name: 'End Date', prop: '' },
    { name: 'YMDH', prop: '' },
    { name: 'D', prop: '' },
    { name: 'Created At', prop: 'createdAt', isHidden: this.isHideColumns },
    { name: 'Tags', prop: 'tags' },
    { name: 'Action', prop: 'action' }
  ];
  readonly tagsMap: { [key: string]: dTag } = {};

  constructor(public appService: AppService, private apiService: ApiService, private toastService: ToastService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the ID from the route parameters
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (this.id) {
      const workspace = this.appService.workspaces.find(workspace => workspace.id === this.id);
      if (workspace) {
        this.name = workspace.name;
        this.description = workspace.description;
        this.init();
      }
    }
    this.appService.tags.forEach((tag, index) => {
      this.tagsMap[tag.id] = tag;
    });
  }
  private init() {
    if (this.appService.expenses[this.id]) {
      this.assignExpenses(this.appService.expenses[this.id]);
    } else {
      this.fetchExpenses();
    }
  }
  public fetchExpenses() {
    this.appService.isLoading = true;
    this.apiService.getExpenses(this.id).subscribe({
      next: (res: any) => {
        this.saveExpenses(res.data);
        this.appService.isLoading = false;
      },
      error: (error) => {
        console.log(error)
        this.toastService.showToastAuto('Error fetching expenses', error.message, TOAST_TYPE.ERROR);
        this.appService.isLoading = false;
      }
    });
  }
  public saveExpenses(expenses: dExpense[]): void {
    // sort based on createdAt
    expenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    expenses.forEach((e) => {
      e.validFrom = parseInt(e.validFrom + "");
      e.validTo = parseInt(e.validTo + "");
      e.ymdh = e.hasValidity ? getRemainingYMDH(e.validFrom, e.validTo) :
        getPastYMDH(e.validFrom);

      e.remainingDays = e.hasValidity ? getRemainingDays(e.validFrom, e.validTo) || 0 : getPastDays(e.validFrom);
    })

    this.assignExpenses(expenses);
    const d = this.appService.getLocalStorage();
    if (!d.expenses) {
      d.expenses = {};
    }
    d.expenses[this.id] = this.expenses;
    this.appService.saveToLocalStorage(d);
  }

  private assignExpenses(expenses: dExpense[]): void {
    this.expenses = expenses;
    this.assignExpensesFiltered(expenses);
  }
  private assignExpensesFiltered(expenses: dExpense[]) {
    this.expensesFiltered = this.isHideExpired ? expenses.filter(e => ((e.remainingDays || 0) > 0) || !e.hasValidity) : expenses;
    this.grandTotal = 0;
    const tagIds = new Set<string>();
    this.expensesFiltered.forEach(e => {
      this.grandTotal += e.amount;
      e.tags.forEach(tagId => tagIds.add(tagId));
    });
    // this.expensesFiltered = this.isHideExpired ? this.expenses.filter(e => e.hasValidity) : this.expenses;
    this.appService.tags.forEach(tag => {
      tag.isExist = tagIds.has(tag.id);
    });
  }
  onChangeHideExpired() {
    this.assignExpensesFiltered(this.expenses);
  }
  onChangeHideColumns() {
    this.columns.forEach(col => {
      if (col.hasOwnProperty('isHidden')) {
        col.isHidden = this.isHideColumns;
      }
    })
  }
  onChangeSelectAllTags() {
    if (this.isSelectedAllTags) {
      this.assignExpensesFiltered(this.expenses);
      this.appService.tags.forEach(tag => {
        tag.isSelected = false;
      });
    }
  }
  onChangeSelectTag() {
    this.isSelectedAllTags = false;
    this.updateFilteredExpenses();
  }
  onChangeOperation() {
    if (this.isSelectedAllTags) {
    } else {
      this.updateFilteredExpenses();
    }
  }
  private updateFilteredExpenses() {
    const TagIds = this.appService.tags.filter(tag => tag.isSelected).map(tag => tag.id);
    if (TagIds.length) {
      const expensesFiltered = this.expenses.filter(expense => {
        if (this.operation == 'AND') {
          return TagIds.every(tagId => expense.tags.includes(tagId));
        } else {
          return expense.tags.some(tagId => TagIds.includes(tagId));
        }
      });
      this.assignExpensesFiltered(expensesFiltered);
    } else {
      this.assignExpensesFiltered([]);
    }
  }
}
