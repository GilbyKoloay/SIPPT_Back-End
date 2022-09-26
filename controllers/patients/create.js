const db = require('../../models/Patients');
const mongoose = require('mongoose');

// create new data in Patients collections
module.exports = async (req, res) => {
    const {
        _medicalRecord,
        _BPJS,
        medicalRecordNumber,
        name,
        birthPlace,
        birthDate,
        sex,
        familyCardName,
        address,
        phoneNumber,
        paymentMethod,
        religion,
        maritalStatus,
        job,
    } = req.body;

    try {
        const result = await db.create({
            _medicalRecord,
            _BPJS,
            medicalRecordNumber,
            name,
            birthPlace,
            birthDate,
            sex,
            familyCardName,
            address,
            phoneNumber,
            paymentMethod,
            religion,
            maritalStatus,
            job,
        });

        res.status(201).json({
            status: "success",
            msg: `Berhasil menambahkan pasien baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal menambahkan pasien baru`,
            desc: e.message,
            data: null,
        });
    }
};
