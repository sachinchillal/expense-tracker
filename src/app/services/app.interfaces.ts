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

// Database Interfaces
export interface dTag {
  id: string;
  name: string;
  description: string;
  status: RECORD_STATUS;
  createdAt: string;
  updatedAt: string;
}
export interface dWorkspace {
  id: string;
  name: string;
  description: string;
  status: RECORD_STATUS;
  createdAt: string;
  updatedAt: string;
}