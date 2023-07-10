const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("db", "contacts.json");

const withErrorsHandling = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.log(error.message);
    }
  };
};

const generateID = async () => {
  const { nanoid } = await import("nanoid");
  return nanoid();
};

const listContacts = withErrorsHandling(async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
});

// async function listContacts() {
//   try {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

const getContactById = withErrorsHandling(async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
});

// async function getContactById(contactId) {
//   try {
//     const contacts = await listContacts();
//     const result = contacts.find((contact) => contact.id === contactId);
//     return result || null;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

const removeContact = withErrorsHandling(async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
});

// async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }

//   try {
//     const [result] = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return result;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

const addContact = withErrorsHandling(async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: await generateID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
});

// async function addContact({ name, email, phone }) {
//   try {
//     const contacts = await listContacts();
//     const newContact = { id: await generateID(), name, email, phone };
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  generateID,
};
