const db = require('../../database');

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
      SELECT
        c.*,
        ca.name as category_name
      FROM
        contacts c
      LEFT JOIN
        categories ca
          ON ca.id = c.category_id
      ORDER BY
        c.name ${direction}
    `);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT
        c.*,
        ca.name as category_name
      FROM
        contacts c
      LEFT JOIN
        categories ca
          ON ca.id = c.category_id
      WHERE
        c.id = $1
    `, [id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE
        FROM
          contacts
        WHERE
          id = $1
    `, [id]);

    return deleteOp;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT
        c.*,
        ca.name as category_name
      FROM
        contacts c
      LEFT JOIN
        categories ca
          ON ca.id = c.category_id
      WHERE
        c.email = $1
    `, [email]);

    return row;
  }

  async create({
    name, email, phone, categoryId,
  }) {
    const [row] = await db.query(`
      INSERT
        INTO
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
