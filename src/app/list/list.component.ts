import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Contact, StateView, UNSET_CONTACT, NEW_CONTACT } from '../shared/contact';
import {faCheck as fasCheck, faTimes as fasClose, faPencilAlt as fasPencil, faTrashAlt as fasTrash, faPlus as fasPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  contacts: Contact[] = [];
  private _stateView;
  private _contactId;
  
  public faEdit = fasPencil;
  public faCheck = fasCheck;
  public faClose = fasClose;
  public faTrash = fasTrash;
  public faPlus = fasPlus;
  

  constructor(public dataService: DataService) {
    dataService.stateView$.subscribe( stateViewUpdate => {
      this._stateView = stateViewUpdate;
    })
    dataService.contactId$.subscribe( contactIdUpdate => {
      this._contactId = contactIdUpdate;
    })
  }

  ngOnInit() {
    this.initContacts();
  }

  async initContacts() {
    this.fetchContacts()
    .then(contacts=>{
      this.contacts=contacts
      console.debug(contacts)
    })
    .catch(err=>console.error(err));
  }

  async fetchContacts(): Promise<Contact[]>{
    return this.dataService.getContacts().toPromise();
  }

  doAddSetup() {
    this.dataService.setContactId(NEW_CONTACT);
  }

  doEditSetup(id: number) {
    this.dataService.setContactId(id);
  }

  getContactName(contact): string {
    return contact.firstName + ' ' + contact.lastName;
  }
  selectedContactId(value: number):boolean{
    return value === this._contactId;
  }
}
