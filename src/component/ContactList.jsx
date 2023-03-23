import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactList.scss';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');

  useEffect(() => {
    // Fetch contacts from API on component mount
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setContacts(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleAddContact = () => {
    // Make a POST request to the API with new contact data
    axios.post('https://jsonplaceholder.typicode.com/users', {
      name,
      email,
      phone,
      website
    })
      .then(response => {
        // Update state with new contact data
        setContacts([...contacts, response.data]);
        // Reset form inputs
        setName('');
        setEmail('');
        setPhone('');
        setWebsite('');
      })
      .catch(error => console.log(error));
  };

  const handleUpdateContact = (id, newData) => {
    // Make a PUT request to the API with updated contact data
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, newData)
      .then(response => {
        // Update state with updated contact data
        const updatedContacts = contacts.map(contact => {
          if (contact.id === id) {
            return response.data;
          } else {
            return contact;
          }
        });
        setContacts(updatedContacts);
        setSelectedContact(null);
      })
      .catch(error => console.log(error));
  };

  const handleDeleteContact = (id) => {
    // Make a DELETE request to the API to delete the contact
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        // Update state to remove the deleted contact
        const updatedContacts = contacts.filter(contact => contact.id !== id);
        setContacts(updatedContacts);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="contact-list">
      <h1>Contact List</h1>

      <form onSubmit={e => {
        e.preventDefault();
        handleAddContact();
      }}>
        <h2>Add Contact</h2>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Website:</label>
          <input type="text" value={website} onChange={e => setWebsite(e.target.value)} />
        </div>
        <button type="submit">Add Contact</button>
      </form>

      <h2>Contact List</h2>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
                 <div>
        <strong>{contact.name}</strong>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
        <p>{contact.website}</p>
      </div>
      <div>
        {/* Update contact form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateContact(contact.id, {
              name: updatedName,
              email: updatedEmail,
              phone: updatedPhone,
            });
          }}
        >
          <h3>Update Contact</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={selectedContact}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={selectedContact}
              onChange={(e) => setUpdatedEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={selectedContact}
              onChange={(e) => setUpdatedPhone(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Update Contact</button>
          </div>
        </form>
        <button onClick={() => handleDeleteContact(contact.id)}>
          Delete Contact
        </button>
      </div>
      </li>
    ))}
  </ul>
</div>
);
};

export default ContactList;