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
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
      SELECT *
        FROM contacts c
        ORDER BY c.name ${direction}
    `);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT *
        FROM contacts c
        WHERE c.id = $1
    `, [id]);

    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      resolve((contacts = contacts.filter((contact) => contact.id !== id)));
    });
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT *
        FROM contacts c
        WHERE c.email = $1
    `, [email]);

    return row;
  }

  async create({
    name, email, phone, categoryId,
  }) {
    const [row] = await db.query(`
      INSERT INTO
        contacts
          (name, email, phone, category_id)
        VALUES
          ($1, $2, $3, $4)
        RETURNING *
    `, [
      name, email, phone, categoryId,
    ]);

    return row;
  }

  async update(id, {
    name, email, phone, categoryId,
  }) {
    const row = await db.query(`
      UPDATE
        contacts
        SET
          name = $1,
          email = $2,
          phone = $3,
          category_id = $4
        WHERE
          id = $5
        RETURNING *
    `, [name, email, phone, categoryId, id]);

    return row;
  }
}

module.exports = new ContactRepository();
