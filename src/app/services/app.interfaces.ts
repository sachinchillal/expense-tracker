import { RECORD_STATUS } from "./db.interfaces";

// App Specific Interfaces
export interface Tag {
  name: string;
  description: string;
}
export const INIT_TAG: Tag = {
  name: '',
  description: '',
};

export interface Workspace extends Tag {
}
export const INIT_WORKSPACE: Workspace = {
  name: '',
  description: '',
};

export interface Expense extends Tag {
  amount: number;
  returns: number;
  total: number;

  isSIP: boolean;

  hasValidity: boolean;
  validFrom: number;
  validTo: number;

  tags: string[];
}
export const INIT_EXPENSE: Expense = {
  name: '',
  description: '',

  amount: 0,
  returns: 0,
  total: 0,

  isSIP: false,

  hasValidity: false,
  validFrom: 0,
  validTo: 0,

  tags: []
};

// Database Interfaces
export interface dTag {
  id: string;
  name: string;
  description: string;
  status: RECORD_STATUS;
  createdAt: string;
  updatedAt: string;

  color?: string;
  isSelected?: boolean;
  isExist?: boolean;
}
export interface dWorkspace {
  id: string;
  name: string;
  description: string;
  status: RECORD_STATUS;
  createdAt: string;
  updatedAt: string;

  expensesCount?: number;
}

export interface dExpense {
  id: string;
  name: string;
  description: string;
  status: RECORD_STATUS;

  amount: number;
  returns: number;
  total: number;

  isSIP: boolean;

  hasValidity: boolean;
  validFrom: number;
  validTo: number;

  tags: string[];

  createdAt: string;
  updatedAt: string;

  // UI props
  ymdh?: string;
  remainingDays?: number;
  isVirtual?: boolean;
}