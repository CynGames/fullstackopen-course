/* eslint-disable react/prop-types */
import { CoursePart } from "../types"
import Part from "./Part"

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) =>
{
  return (
    <>
      {
        parts.map((part, i) => <Part key={i} part={part} />)
      }
    </>
  )
}

export default Content