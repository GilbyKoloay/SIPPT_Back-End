const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// get single data in MedicalRecords collections
module.exports = async (req, res) => {
    const { _id } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: `error`,
            msg: `ID Rekam Medis tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.findOne({ _id });

        if(!result) {
            return res.status(200).json({
                status: `error`,
                msg: `Data Rekam Medis tidak ditemukan`,
                desc: null,
                data: null,
            });
        }
        
        res.status(200).json({
            status: `success`,
            msg: `Berhasil mengambil data Rekam Medis`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal mengambil data Rekam Medis`,
            desc: e.message,
            data: null,
        });
    }
};
