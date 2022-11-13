const db = require('../../models/Patients');
const mongoose = require('mongoose');

// create new data in Patients collections
module.exports = async (req, res) => {
    const {
        _employee,
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
        religion,
        maritalStatus,
        job,
        paymentMethod,
        JKN,
        otherInsurance,
        number,
    } = req.body;

    // check employee's (changedBy) id
    if(!mongoose.Types.ObjectId.isValid(_employee)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pegawai tidak valid`,
            desc: null,
            data: null,
        });
    }

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
            religion,
            maritalStatus,
            job,
            paymentMethod,
            JKN,
            otherInsurance,
            number,
            changeLog: [{
                _changedBy: _employee,
                description: "Menambahkan pasien baru",
            }],
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
