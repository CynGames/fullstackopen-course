import React from 'react'
import ExpandedDetails from './ExpandedDetails'
import SimpleView from './SimpleView'

const Country = ({ result, isOnlyResult, setCountryQuery }) =>
{

  return (
    <>
      { isOnlyResult
        ? <ExpandedDetails result={ result } />
        : <SimpleView result={ result } setCountryQuery={ setCountryQuery } /> }

      <br />
    </>
  )
}

export default Country