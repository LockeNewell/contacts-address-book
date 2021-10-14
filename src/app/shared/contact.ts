export enum StateView {
  LOADING = 'loading',
  VIEW = 'view',
  EDIT = 'edit'
}

export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const UNSET_CONTACT = -1;
export const NEW_CONTACT = 0;

export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    emails: string[];
  }