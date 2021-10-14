import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Contact, NEW_CONTACT, StateView, UNSET_CONTACT, REGEX_EMAIL } from '../shared/contact';
import {faCheck as fasCheck, faTimes as fasClose, faPencilAlt as fasPencil, faTrashAlt as fasTrash, faPlus as fasPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  
  private _stateView: StateView = StateView.LOADING;
  get isLoading(): boolean{
    return this._stateView===StateView.LOADING;
  }
  get isView(): boolean{
    return this._stateView===StateView.VIEW;
  }
  get isEdit(): boolean{
    return this._stateView===StateView.EDIT;
  }
  private _contactId: number = UNSET_CONTACT;
  get isNew(): boolean{
    return this._contactId===NEW_CONTACT;
  }
  get isUnset(): boolean{
    return this._contactId===undefined || this._contactId===UNSET_CONTACT;
  }

  public faEdit = fasPencil;
  public faCheck = fasCheck;
  public faClose = fasClose;
  public faTrash = fasTrash;
  public faPlus = fasPlus;

  ADD_TITLE = "Add Contact";
  EDIT_TITLE = "Edit Contact";
  get title(): string {
    return (this.isNew)? this.ADD_TITLE : this.EDIT_TITLE;
  }
  contactModel: Contact;
  contactForm: FormGroup;
  get firstName() { return this.contactForm.get('firstName'); }
  get lastName() { return this.contactForm.get('lastName'); }

  newEmail: string = '';

  constructor(private fb: FormBuilder, public dataService: DataService) {

    dataService.stateView$.subscribe( (stateViewUpdate: StateView) => {
      this._stateView = stateViewUpdate;
    })
    dataService.contactId$.subscribe( (contactIdUpdate: number) => {
      this._contactId = contactIdUpdate;
      this.initContact();
      console.log(this.contactModel);
    })

    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  initContact(){
    if (!this.isNew && !this.isUnset){
      this.fetchContact()
      .then(contact=> this.setContact(contact))
      .catch(err=>console.error(err));
    } else {
      this.clearContact();
    }
  }
  clearContact(){
    this.contactForm.patchValue({
      firstName: '',
      lastName: ''
    });

  }
  async fetchContact(): Promise<Contact> {

    console.debug(this._contactId);
    return this.dataService.getContact(this._contactId).toPromise();
  }
  setContact(contact: Contact) {
    this.contactForm.patchValue({
      firstName: contact.firstName,
      lastName: contact.lastName
    });
    this.contactModel = contact;
    this.dataService.setStateView(StateView.VIEW);
    console.log(contact);
  }
  doSetViewToEdit() {
    this.dataService.setStateView(StateView.EDIT);
  }
  doCreationAndSetView() {
    this.createOnDatabase();
    this.dataService.setStateView(StateView.VIEW);
  }
  createOnDatabase() {
    this.dataService.postContact(this.contactModel);
  }
  doUpdateAndSetView() {
    this.updateOnDatabase();
    this.dataService.setStateView(StateView.VIEW);
  }
  updateOnDatabase() {
    this.dataService.putContact(this._contactId, this.contactModel);
  }
  doDeleteAndSetView() {
    this.DeleteOnDatabase();
    this.dataService.setStateView(StateView.VIEW);
  }
  doCancelAndSetView() {
    this.initContact();
    this.dataService.setStateView(StateView.VIEW);
  }
  DeleteOnDatabase() {
    this.dataService.deleteContact(this._contactId)
  }
  doAddEmail() {
    if(!this.isValidateEmail()){
      return;
    }
    this.contactModel.emails.push(this.newEmail);
  }
  isValidateEmail() {
    return this.newEmail && REGEX_EMAIL.test(String(this.newEmail).toLowerCase());
  }
  doRemoveEmail(value) {
    let indexOfValueToRemove = this.contactModel.emails.findIndex(value);
    let indexBeforeValueToRemove = indexOfValueToRemove - 1;
    this.contactModel.emails.splice(indexBeforeValueToRemove, 1)
  }
  

  async ValidateCreateOrUpdate() {
    if(!this.isFormValid) return;
    this.contactModel = this.contactForm.value;
    if(this.isNew){
      this.doCreationAndSetView();
    } else {
      this.doUpdateAndSetView()
    }
  }
  get isFormValid(): boolean{
    return this.contactForm.valid;
  }
}
