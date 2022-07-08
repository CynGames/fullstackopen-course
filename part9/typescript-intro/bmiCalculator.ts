interface BodyValues
{
  height: number,
  weight: number
}

const parseCalculatorArgs = (args: Array<string>): BodyValues =>
{
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])))
  {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else
  {
    throw new Error("Provided values were not numbers!")
  }
}

export const calculateBmi = (height: number, weight: number): string =>
{
  let heightInMeters: number = height / 100
  const bmiIndex: number = weight / (heightInMeters * heightInMeters);

  if (bmiIndex < 16.0) return "Underweight (Severe Thinness)";
  if (bmiIndex >= 16.0 && bmiIndex <= 16.9) return "Underweight (Moderate Thinness)";
  if (bmiIndex >= 17.0 && bmiIndex <= 18.4) return "Underweight (Mild Thinness)";
  if (bmiIndex >= 18.5 && bmiIndex <= 24.9) return "Normal Range";
  if (bmiIndex >= 25.0 && bmiIndex <= 29.9) return "Overweight (Pre-obese)";
  if (bmiIndex >= 30.0 && bmiIndex <= 34.9) return "Obese (Class I)";
  if (bmiIndex >= 35.0 && bmiIndex <= 39.9) return "Obese (Class II)";
  else return "Obese (Class III)";
}

try
{
  const { height, weight } = parseCalculatorArgs(process.argv);

  console.log(calculateBmi(height, weight))
} catch (error: unknown)
{
  let errorMessage = "Something bad happened.";
  if (error instanceof Error)
  {
    errorMessage += " Error: " + error.message;
  }

  console.log(errorMessage);
}

