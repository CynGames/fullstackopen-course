import { useState, useEffect } from 'react'
import Filter from './Filter';
import Form from './Form';
import Notification from './Notification';
import Numbers from './Numbers';

import personService from './services/persons';

const App = () =>
{

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const [notificationMessage, setNotificationMessage] = useState(null);

  const updateClient = () => 
  {
    personService
      .getAllPersons()
      .then(initialPersons => setPersons(initialPersons))
  }

  useEffect(() =>
  {
    updateClient()
  }, [])

  const personsToShow = filter.length > 0
    ? persons.filter((person) => person.name.toLowerCase() === filter.toLowerCase())
    : persons;

  const formHandler = (e) =>
  {
    e.preventDefault();

    const person = persons.find((person) => newName === person.name)

    if (person)
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      {
        const personObject = {
          name: newName,
          number: newNumber,
          id: person.id
        }

        personService
          .updatePerson(person.id, personObject)
          .then(() =>
          {
            setNotificationMessage([`Updated ${newName} contact number`, `success`])

            setTimeout(() =>
            {
              setNotificationMessage(null)
            }, 5000)

            return updateClient()
          }).catch((err) => 
          {
            // setNotificationMessage([`Information of ${newName} has already been removed from server`, `failure`])
            setNotificationMessage([err.response.data, `failure`])

            setTimeout(() =>
            {
              setNotificationMessage(null)
            }, 5000)
          })
      }

      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    personService
      .createPerson(personObject)
      .then(returnedPersonObject =>
      {
        setNotificationMessage([`Added ${newName} to contact list`, `success`])

        setTimeout(() =>
        {
          setNotificationMessage(null)
        }, 5000)

        setPersons(persons.concat(returnedPersonObject))

        return updateClient()
      })
      .catch(err =>
      {
        console.log(err);
        console.log("---");
        console.log(err.response.data);
        console.log("---");
        console.log(err.error);


        //Needs Testing
        // setNotificationMessage([err.response.data, `failure`])

        setTimeout(() =>
        {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  return (
    <div>

      { notificationMessage !== null
        && <Notification message={ notificationMessage[0] } type={ notificationMessage[1] } /> }

      <h2>Phonebook</h2>
      <Filter value={ filter } onChange={ (e) => setFilter(e.target.value) } />

      <Form
        formHandler={ formHandler }
        newName={ newName }
        newNumber={ newNumber }
        setNewName={ (e) => setNewName(e.target.value) }
        setNewNumber={ (e) => setNewNumber(e.target.value) }
      />

      <h2>Numbers</h2>
      <Numbers personsToShow={ personsToShow } updateClient={ updateClient } />

    </div>
  )
}

export default App