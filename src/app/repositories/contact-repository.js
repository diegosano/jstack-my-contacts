const { v4: uuidv4 } = require('uuid');
const db = require('../../database');

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

  async create({
    name, email, phone, categoryId,
  }) {
    const [row] = await db.query(`
      INSERT INTO
        contacts (name, email, phone, category_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `, [
      name, email, phone, categoryId,
    ]);

    return row;
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
