const argv = require("yargs").argv;

const { listContacts, getContactById, removeContact, addContact } = require('./contacts.js');


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const allContacts = await listContacts();
        console.table(allContacts);
        break;

    case "get":
        const contactById = await getContactById(id);
        console.table(contactById);
        break;

    case "add":
        const newContacts = await addContact(name, email, phone);
        console.table(await listContacts());
      break;

    case "remove":
        await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);