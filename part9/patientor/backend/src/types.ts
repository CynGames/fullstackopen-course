export type Patients = {
  id: string,
  name: string,
  gender: Gender,
  occupation: string
  ssn?: string,
  dateOfBirth?: string,
};

export enum Gender {
  Other = "other",
  Male = "male",
  Female = "female"
}

export type PatientsNoSSN = Omit<Patients, "ssn">;
export type NewPatientEntry = Omit<Patients, "id">;