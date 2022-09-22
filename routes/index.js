// exporting all routes

const loginRouter = require('./Login');
const employeesRouter = require('./Employees');
const patientsRouter = require('./Patients');
const BPJSRouter = require('./BPJS');
const medicalRecordsRouter = require('./MedicalRecords');
const queueRouter = require('./Queues');
const drugRouter = require('./drug');

module.exports = {
    loginRouter,
    employeesRouter,
    patientsRouter,
    BPJSRouter,
    medicalRecordsRouter,
    drugRouter,
    queueRouter,
};
