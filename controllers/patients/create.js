const db = require('../../models/Patients');
const dbMR = require('../../models/MedicalRecords');
const dbB = require('../../models/BPJS');
const mongoose = require('mongoose');

// create new data in Patients collections
module.exports = async (req, res) => {
    const { patient, BPJS } = req.body;
    const {
        medicalRecordNumber,
        name: patientName,
        birthPlace,
        birthDate: patientBirthDate,
        sex,
        familyCardName,
        address: patientAddress,
        phoneNumber,
        paymentMethod,
        religion,
        maritalStatus,
        job,
    } = patient;
    const {
        cardNumber,
        name: BPJSName,
        birthDate: BPJSBirthDate,
        healthFacilityLevel,
        nursingClass,
        NIK,
        address: BPJSAddress,
    } = BPJS;

    try {
        // create MedicalRecord
        const MRResult = await dbMR.create({});
        if(!MRResult) {
            return res.status(500).json({
                status: `error`,
                msg: `Gagal menambahkan Pasien baru (tidak dapat membuat Rekam Medis)`,
                desc: null,
                data: null,
            });
        }

        // create BPJS
        const BResult = await dbB.create({
            cardNumber,
            name: BPJSName,
            birthDate: {
                date: BPJSBirthDate.date,
                month: BPJSBirthDate.month,
                year: BPJSBirthDate.year,
            },
            healthFacilityLevel,
            nursingClass,
            NIK,
            address: BPJSAddress,
        });
        if(!BResult) {
            return res.status(500).json({
                status: `error`,
                msg: `Gagal menambahkan Pasien baru (tidak dapat membuat BPJS)`,
                desc: null,
                data: null,
            });
        }

        // create Patient
        const result = await db.create({
            _medicalRecord: MRResult._id,
            _BPJS: BResult._id,
            medicalRecordNumber,
            name: patientName,
            birthPlace,
            birthDate: {
                date: patientBirthDate.date,
                month: patientBirthDate.month,
                year: patientBirthDate.year,
            },
            sex,
            familyCardName,
            address: {
                village: patientAddress.village,
                district: patientAddress.district,
                city: patientAddress.city,
            },
            phoneNumber,
            paymentMethod,
            religion,
            maritalStatus,
            job,
        });

        res.status(200).json({
            status: `success`,
            msg: `Berhasil menambahkan Pegawai baru`,
            desc: null,
            data: {
                patient: result,
                medicalRecord: MRResult,
                BPJS: BResult,
            },
        });
    }
    catch(e) {
        console.log(`created medical record _id: ${MR_result2._id}`)
        MR_result2 = await dbMR.deleteOne({
            _id: MR_result2._id,
        });

        res.status(500).json({
            status: `error`,
            msg: `Gagal menambahkan Pegawai baru`,
            desc: e.message,
            data: null,
        });
    }
};
