export interface Result
{
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string
  target: number,
  average: number,
}

export interface InputValues
{
  weekValues: Array<number>,
  target: number
}

const parseExerciseArgs = (args: Array<string>): InputValues =>
{
  if (args.length < 3 || args.length > 10) throw new Error("Error providing arguments: `npm run ts-node <targetAvg> <mondayHoursTrained> <tuesdayHoursTrained> ...`");

  const weekValues: Array<number> = args.splice(3, args.length - 3).map(Number);

  if (!isNaN(Number(args[2])))
  {
    return {
      weekValues,
      target: Number(args[2])
    };
  } else
  {
    throw new Error("Provided values is not a number vector or is too long!");
  }
};

export const exerciseCalculator = (target: number, weekValues: Array<number>): Result =>
{
  const periodLength: number = weekValues.length;
  const trainingDays: number = weekValues.filter(n => n !== 0).length;
  
  const average: number = Average(weekValues);
  const success: boolean = average >= target;

  let rating = 0;

  if (success) rating = 3;
  else if (average > target / 2) rating = 2;
  else rating = 1;

  let ratingDescription: string;

  switch (rating)
  {
    case 3:
      ratingDescription = "Goals have been met. Well done!";
      break;

    case 2:
      ratingDescription = "Almost met the goal, try better next time!";
      break;

    case 1:
      ratingDescription = "You should work harder next week.";
      break;

    default:
      ratingDescription = "Something went VERY wrong.";
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const Average = (weekValues: Array<number>) =>
{
  const reducer = (total: number, current: number) => total + current;

  return weekValues.reduce(reducer, 0) / weekValues.length;
};

try
{
  const { weekValues, target } = parseExerciseArgs(process.argv);

  console.log(exerciseCalculator(target, weekValues));
} catch (error: unknown)
{
  let errorMessage = "Something bad happened.";
  if (error instanceof Error)
  {
    errorMessage += " Error: " + error.message;
  }

  console.log(errorMessage);
}