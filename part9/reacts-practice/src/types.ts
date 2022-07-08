interface CoursePartBase
{
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDescriptionFormat extends CoursePartBase
{
  description: string
}

interface CourseNormalPart extends CoursePartDescriptionFormat
{
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase
{
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescriptionFormat
{
  type: "submission";
  exerciseSubmissionLink: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;