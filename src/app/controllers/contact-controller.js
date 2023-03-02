const ContactRepository = require('../repositories/contact-repository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, categoryId,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (categoryId && !isValidUUID(categoryId)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (email) {
      const contactExists = await ContactRepository.findByEmail(email);

      if (contactExists) {
        return response
          .status(400)
          .json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactRepository.create({
      categoryId: categoryId || null,
      email: email || null,
      name,
      phone,
    });

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, categoryId,
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (categoryId && !isValidUUID(categoryId)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (email) {
      const contactEmailExists = await ContactRepository.findByEmail(email);

      if (contactEmailExists && contactEmailExists.id !== id) {
        return response
          .status(400)
          .json({ error: 'This e-mail is already in use' });
      }
    }

    const contact = await ContactRepository.update(id, {
      categoryId: categoryId || null,
      email: email || null,
      name,
      phone,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    await ContactRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new ContactController();
