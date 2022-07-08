"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = require("./data/diagnoses");
const cors_1 = __importDefault(require("cors"));
const patientService_1 = __importDefault(require("./controller/patientService"));
const utils_1 = __importDefault(require("./src/utils"));
const app = (0, express_1.default)();
const allowedOrigins = ["http://localhost:3000"];
const options = {
    origin: allowedOrigins
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
const PORT = 3001;
app.get("/api/ping", (_request, response) => {
    console.log("Someone Pinged Here");
    response.send("Pong");
});
app.get("/api/diagnoses", (_request, response) => {
    response.json(diagnoses_1.diagnosticEntries);
});
app.get("/api/patients", (_request, response) => {
    response.json(patientService_1.default.getNonSensitivePatientEntries());
});
app.post("/api/patients", (request, response) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = (0, utils_1.default)(request.body);
        const addedEntry = patientService_1.default.addPatient(newPatientEntry);
        response.status(200).json(addedEntry);
    }
    catch (error) {
        if (error instanceof Error)
            response.status(400).send(error.message);
    }
});
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
