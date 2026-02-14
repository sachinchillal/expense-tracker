import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { dExpense } from '../../services/app.interfaces';
import { CommonModule } from '@angular/common';

const Months = [
  { title: 'Jan', days: 31 },
  { title: 'Feb', days: 28 },
  { title: 'Mar', days: 31 },
  { title: 'Apr', days: 30 },
  { title: 'May', days: 31 },
  { title: 'Jun', days: 30 },
  { title: 'Jul', days: 31 },
  { title: 'Aug', days: 31 },
  { title: 'Sep', days: 30 },
  { title: 'Oct', days: 31 },
  { title: 'Nov', days: 30 },
  { title: 'Dec', days: 31 }
];

interface CalendarInfo {
  title: string;
  subtitle: string;
  expenses: dExpense[];
  isCurrentMonth: boolean;

  hasYearPrevious: boolean;
  hasYearCurrent: boolean;
  hasYearNext: boolean;

  showDetails: boolean;
  isFutureYearCurrent: boolean;
  isFutureYearNext: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input() expensesFiltered: dExpense[] = [];

  showComponent = false;
  months: CalendarInfo[] = [];

  constructor(private appService: AppService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.init();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expensesFiltered']) {
      this.init();
    }
  }
  private init() {
    this.months = [];
    Months.forEach((m) => {
      this.months.push({
        title: m.title,
        subtitle: "",
        expenses: [],
        isCurrentMonth: false,

        hasYearPrevious: false,
        hasYearCurrent: false,
        hasYearNext: false,

        showDetails: false,
        isFutureYearCurrent: false,
        isFutureYearNext: false
      })
    })

    // one time
    const now = new Date();
    const monthCurrent = now.getMonth();

    const currYear = now.getFullYear();
    const preYear = currYear - 1;
    const nextYear = currYear + 1;

    this.months[monthCurrent].isCurrentMonth = true;

    this.expensesFiltered.forEach(e => {
      if (e.hasValidity) {

      } else {

        const d = new Date(e.validFrom);
        const year = d.getFullYear();
        if (year == preYear || year == currYear || year == nextYear) {
          const m = d.getMonth();
          this.months[m].expenses.push(e);
          const n = this.months[m].expenses.length;
          if (n == 1) {
            this.months[m].subtitle = `${n} event`;
          } else {
            this.months[m].subtitle = `${n} events`;
          }
          if (year == preYear) {
            this.months[m].hasYearPrevious = true;
          } else if (year == currYear) {
            this.months[m].hasYearCurrent = true;
            if (e.validFrom > now.getTime()) {
              this.months[m].isFutureYearCurrent = true;
            }
          } else if (year == nextYear) {
            this.months[m].hasYearNext = true;
            if (e.validFrom > now.getTime()) {
              this.months[m].isFutureYearNext = true;
            }
          }
        }
      }
    });
  }

}
