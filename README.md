# contacts-address-book
create a contacts address book web app


## FRONT-END
The front-end should be in react/angular preferably typescript, but you can use javascript if you've not used typescript before. 

### stories
* a user will be able to view a contact list
  * display '<first> <last>'
* a user will be able to search the contact list,
  * the text will act as a filter on the contact list
* a user will be able to add a contact item
  * an add button will be on the list component will open a blank contact in the item component
* a user will be able to view a contact item
  * clicking on a list item will load that contact into the item component.
* a user will be able to edit a contact item
  * an edit button (visable in view state) will change state to editing 
  * edit state will enable editing of first name, last name, adding addional email address, removing email address
  * a 'save contact' and 'cancel' button (visable in edit state) will be on the bottem left of the item component. both actions will revert to view state
    * first and last name are required
    * save contact will validate first and last name 
* a user will be able to delete a contact item
  * a 'delete contact' button will be on the bottem right of the item component visable in edit state.  this action will revert to view state
* a user will be able to have one or more emails in a contact item
  * a text box with button will add an email to the contact 
    * email will be validated
Use the linked figma as a mockup: 
* https://www.figma.com/file/tVRSQUmXf7lidiLrR9IOzd/Contacts?node-id=2%3A2

Save the data to local storage. Make sure to use reusable components.

Impress us!

- Make sure there's no signup/login page
- Deploy it on a publicly accessible URL
- Put the source code on a publicly accessible repo on github/gitlab/bitbucket
- Reply to this email with the links to both the app and repo
