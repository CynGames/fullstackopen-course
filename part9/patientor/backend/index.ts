import express from 'express';

import { diagnosticEntries } from './data/diagnoses';
import cors from "cors";
import patientService from './controller/patientService';
import toNewPatientEntry from './src/utils';

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(options));
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_request, response) =>
{
  console.log("Someone Pinged Here");
  response.send("Pong");
});

app.get("/api/diagnoses", (_request, response) =>
{
  response.json(diagnosticEntries);
});

app.get("/api/patients", (_request, response) =>
{
  response.json(patientService.getNonSensitivePatientEntries());
});

app.post("/api/patients", (request, response) =>
{
  try
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(request.body);

    const addedEntry = patientService.addPatient(newPatientEntry);

    response.status(200).json(addedEntry);
  } catch (error)
  {
    if (error instanceof Error) response.status(400).send(error.message);
  }
});

app.listen(PORT, () =>
{
  console.log(`Server running on Port: ${PORT}`);
});