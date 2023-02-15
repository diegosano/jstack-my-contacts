const { v4: uuidv4 } = require('uuid');

let contacts = [
  {
    id: uuidv4(),
    name: 'Edgar Jones',
    email: 'innaj@biulogi.ug',
    phone: '(967) 988-2917',
    categoryId: uuidv4(),
  },
  {
    id: uuidv4(),
    name: 'Devin Pratt',
    email: 'gusuz@neviuv.cx',
    phone: '(347) 394-5819',
    categoryId: uuidv4(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      resolve((contacts = contacts.filter((contact) => contact.id !== id)));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  create({
    name, email, phone, categoryId,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
        categoryId,
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(id, {
    name, email, phone, categoryId,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        categoryId,
      };
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === id) {
          return updatedContact;
        }

        return contact;
      });

      contacts = updatedContacts;
      resolve(updatedContacts);
    });
  }
}

module.exports = new ContactRepository();
