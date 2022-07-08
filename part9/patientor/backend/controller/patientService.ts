import data from "../data/patients";
import { v1 as uuid } from "uuid";
import { Patients, NewPatientEntry, PatientsNoSSN } from "../src/types";

const patients: Array<Patients> = data;

const getNonSensitivePatientEntries = (): PatientsNoSSN[] =>
{
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => (
    {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }
  )
  );
};

const addPatient = (entry: NewPatientEntry): Patients =>
{
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  addPatient,
  getNonSensitivePatientEntries
};