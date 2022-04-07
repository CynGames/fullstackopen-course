import React from 'react'
import PersonEntry from './PersonEntry'

const Numbers = ({ personsToShow, updateClient }) =>
{
  return (
    <ul>
      { personsToShow.map((person) => <PersonEntry key={ person.name } person={ person } updateClient={ updateClient } />) }
    </ul>
  )
}

export default Numbers