const db = require('../../models/Patients');
const mongoose = require('mongoose');

// change data in Patients collections
module.exports = async (req, res) => {
    const {
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
