const db = require('../../models/Patients');
const mongoose = require('mongoose');

// change data in Patients collections
module.exports = async (req, res) => {
    const {
        _employee,
        _id,
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

    // check employee's (changedBy) id
    if(!mongoose.Types.ObjectId.isValid(_employee)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pegawai tidak valid`,
            desc: null,
            data: null,
        });
    }
    
    // check patient's id
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pasien tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.updateOne({ _id }, {
            $push: { changeLog: {
                _changedBy: _employee,
                description: "Mengubah data pasien",
            }},
            $set: {
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
            },
        });
        
        res.status(201).json({
            status: "success",
            msg: `Berhasil mengubah data pasien`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengubah data pasien`,
            desc: e.message,
            data: null,
        });
    }
};
