import express from "express";
import { calculateBmi } from './bmiCalculator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InputValues, Result, exerciseCalculator } from './exerciseCalculator';

import bp from "body-parser";

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/hello", (_request, response) => { response.send("Hello Full Stack!"); });

app.get("/bmi", (request, response) =>
{
  if (request.query
    && Object.keys(request.query).includes("weight")
    && Object.keys(request.query).includes("height"))
  {
    const bmi = calculateBmi(Number(request.query.height), Number(request.query.weight));
    response.json({
      height: request.query.height,
      weight: request.query.weight,
      bmi: bmi
    });
  }
  else
  {
    response.status(400).json({
      error: "malformatted parameters"
    });
  }
});

app.post("/exercises", (request, response) =>
{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: InputValues = request.body;

  if (body.target === undefined || body.weekValues === undefined)
    response.status(400).json({ error: "Parameters Missing" });

  if (!isFinite(body.target) || !body.weekValues.every(n => isFinite(n)))
    response.status(400).json({ error: "Malformatted Parameters" });

  const result: Result = exerciseCalculator(body.target, body.weekValues);

  response.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => { console.log(`Server running on Port: ${PORT}`); });