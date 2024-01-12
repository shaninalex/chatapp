import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity"
import { createReducer, on } from "@ngrx/store"
import { ContactActions, SubsActions } from "./actions"

export interface Contact {
  id: string
  jid: string
  photo?: string
  fullName?: string
}

export interface ContactsState extends EntityState<Contact> { }
export const contactsAdapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();
export const initialContactsState: ContactsState = contactsAdapter.getInitialState();

export const contactsReducer = createReducer(
  initialContactsState,
  on(ContactActions.set, (state, {list}) => contactsAdapter.addMany(list, state)),
  on(ContactActions.remove, (state, {id}) => contactsAdapter.removeOne(id, state)),
);

const {
  selectAll
} = contactsAdapter.getSelectors();

export const allContacts = selectAll;
