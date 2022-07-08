import React from 'react'
import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) =>
{
  const assertNever = (value: never): never =>
  {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  }

  const renderElementsBasedOnType = () =>
  {
    switch (part.type)
    {
      case "normal":
        return <p>{part.description}</p>
      case "submission":
        return (
          <p>
            {part.description}
            Submit to: {part.exerciseSubmissionLink}
          </p>
        );
      case "groupProject":
        return <p> Project {part.groupProjectCount} </p>
      default:
        return assertNever(part);
    }
  }

  return (
    <>
      <h1>{part.name} {part.exerciseCount}</h1>
      {renderElementsBasedOnType()}
    </>
  )
}

export default Part