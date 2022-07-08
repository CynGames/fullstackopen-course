"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or Missing Name: " + name);
    }
    return name;
};
const parseSSN = (ssn) => {
    if (!isString(ssn)) {
        throw new Error("Incorrect SSN Property Type: " + ssn);
    }
    return ssn;
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect Date Property Type: " + date);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or Missing Gender: " + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or Missing Occupation: " + occupation);
    }
    return occupation;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const toNewPatientEntry = ({ name, gender, occupation, ssn, dateOfBirth }) => {
    const newPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newPatientEntry;
};
exports.default = toNewPatientEntry;
