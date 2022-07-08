/* eslint-disable react/prop-types */
import { CoursePart } from "../types"

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) =>
{
  return (
    <p>
      Number of exercises{" "}
      {
        parts.reduce((carry, part) => carry + part.exerciseCount, 0)
      }
    </p>
  )
}

export default Total