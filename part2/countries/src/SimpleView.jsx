import React from 'react'

const SimpleView = ({ result, setCountryQuery }) =>
{
  return (
    <>
      { result.name.common } <button onClick={ () => setCountryQuery(result.name.common) }> Show </button>
    </>
  )
}

export default SimpleView