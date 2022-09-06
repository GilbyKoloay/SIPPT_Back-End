// exporting all routes

const employeesRouter = require('./Employees');
const patientsRouter = require('./Patients');
const BPJSRouter = require('./BPJS');
const medicalRecordsRouter = require('./MedicalRecords');
const loginRouter = require('./Login');

module.exports = {
    employeesRouter,
    patientsRouter,
    BPJSRouter,
    medicalRecordsRouter,
    loginRouter,
};
