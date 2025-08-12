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
  hasValidity: boolean;
  validFrom: number;
  validTo: number;
  returns: number;
  total: number;
  tags: string[];
}
export const INIT_EXPENSE: Expense = {
  name: '',
  description: '',

  amount: 0,
  returns: 0,
  total: 0,

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
}

export interface dExpense {
  id: string;
  name: string;
  description: string;
  status: RECORD_STATUS;
  createdAt: string;
  updatedAt: string;

  amount: number;
  returns: number;
  total: number;

  hasValidity: boolean;
  validFrom: number;
  validTo: number;

  tags: string[];


  // UI props
  ymdh?: string;
  remainingDays?: number;
}