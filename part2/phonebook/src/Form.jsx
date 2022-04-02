import React from 'react'

const Form = ({ formHandler, newName, newNumber, setNewName, setNewNumber }) =>
{
  return (
    <form onSubmit={ formHandler }>
      <div>
        Name: <input value={ newName } onChange={ setNewName } />
      </div>
      <div>
        Number: <input value={ newNumber } onChange={ setNewNumber } />
      </div>
      <div>
        <button type="submit"> Add </button>
      </div>
    </form>
  )
}

export default Form