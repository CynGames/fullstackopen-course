import { Gender, NewPatientEntry } from './types';

const parseName = (name: unknown): string =>
{
  if (!name || !isString(name))
  {
    throw new Error("Incorrect or Missing Name: " + name);
  }

  return name;
};

const parseSSN = (ssn: unknown): string =>
{
  if (!isString(ssn))
  {
    throw new Error("Incorrect SSN Property Type: " + ssn);
  }

  return ssn;
};

const parseDate = (date: unknown): string =>
{
  if (!isString(date) || !isDate(date))
  {
    throw new Error("Incorrect Date Property Type: " + date);
  }

  return date;
};

const parseGender = (gender: unknown): Gender =>
{
  if (!gender || !isGender(gender))
  {
    throw new Error("Incorrect or Missing Gender: " + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string =>
{
  if (!occupation || !isString(occupation))
  {
    throw new Error("Incorrect or Missing Occupation: " + occupation);
  }

  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender =>
{
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isString = (text: unknown): text is string =>
{
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean =>
{
  return Boolean(Date.parse(date));
};

type Fields = { name: unknown, gender: unknown, occupation: unknown, ssn?: unknown, dateOfBirth?: unknown };

const toNewPatientEntry = ({ name, gender, occupation, ssn, dateOfBirth }: Fields): NewPatientEntry =>
{
  const newPatientEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };

  return newPatientEntry;
};

export default toNewPatientEntry;