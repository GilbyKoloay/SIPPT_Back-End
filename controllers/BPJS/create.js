const db = require('../../models/BPJS');
const mongoose = require('mongoose');

// create new data in BPJS collections
module.exports = async (req, res) => {
    const {
        _employee,
        cardNumber,
        name,
        birthDate,
        healthFacilityLevel,
        nursingClass,
        NIK,
        address,
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
            cardNumber,
            name,
            birthDate: {
                date: birthDate.date,
                month: birthDate.month,
                year: birthDate.year,
            },
            healthFacilityLevel,
            nursingClass,
            NIK,
            address,
            changeLog: [{
                _changedBy: _employee,
                description: "Membuat BPJS baru",
            }],
        });

        res.status(201).json({
            status: "success",
            msg: `Berhasil membuat BPJS baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal membuat BPJS baru`,
            desc: e.message,
            data: null,
        });
    }
};
