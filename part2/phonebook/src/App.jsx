import { useState } from 'react'
import Filter from './Filter';
import Form from './Form';
import Numbers from './Numbers';

const App = () =>
{

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const personsToShow = filter.length > 0
    ? persons.filter((person) => person.name.toLowerCase() === filter.toLowerCase())
    : persons;

  const formHandler = (e) =>
  {
    e.preventDefault();

    if (persons.find((person) => newName === person.name))
    {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
  }

  return (
    <div>
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
      <Numbers personsToShow={ personsToShow } />
      
    </div>
  )
}

export default App