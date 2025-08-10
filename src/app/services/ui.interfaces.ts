export type ToastType = 'success' | 'error';

export enum TOAST_TYPE {
  SUCCESS = 'success',
  ERROR = 'error'
};

export interface Toast {
  id: number;
  message: string;
  body: string;
  type: ToastType;
  duration?: number; // Duration in milliseconds
  isDeleted: boolean;
}

export enum THEME_TYPE {
  AUTO = 'auto',
  DARK = 'dark',
  LIGHT = 'light'
};
