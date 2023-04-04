
const { nanoid } = require('nanoid');

const fs = require('fs').promises;
const path = require('path');



const contactsPath = path.resolve(__dirname, './db/contacts.json');

console.log(contactsPath);

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(data);
        return contactsList;       
    } catch (error) {
        console.log(error);
    }
}
  
  async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const result = contacts.find(({id}) => id === contactId);
        return result;
    } catch (error) {
        console.log(error);
    }
  }
  
  async function removeContact(contactId) {
    try {
        const allContacts = await listContacts();
        const contact = allContacts.find(({ id }) => id === contactId);
        if (!contact) {
            return console.log(`contact with id  ${contactId} not found`);
        }

        const contacts = allContacts.filter(({ id }) => id !== contactId);

        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return console.log(`contact with id=${contactId} was deleted`);;
    } catch (error) {
        console.log(error);
    }
  }
  
  async function addContact(name, email, phone) {
    try {
        const newContact = {id: nanoid(), name: name, email: email, phone: phone};
        const allContacts = await listContacts();
        allContacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        return newContact;
    } catch (error) {
        console.log(error);
    }
  }


  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  }