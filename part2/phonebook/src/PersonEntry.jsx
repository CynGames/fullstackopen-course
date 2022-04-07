import React from 'react'

import personService from "./services/persons"

const PersonEntry = ({ person, updateClient }) =>
{
  const deleteHandler = () =>
  {
    if (window.confirm(`Delete ${person.name}?`))
    {
      personService
        .deletePerson(person.id)
        .then( () => updateClient())
    }
  }

  return (
    <>
      { person.name } { person.number } <button onClick={ () => deleteHandler() } > Delete </button>
      <br />
    </>
  )
}

export default PersonEntry