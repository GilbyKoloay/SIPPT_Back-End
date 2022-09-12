const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// delete data in MedicalRecords collections
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
        const result = await db.deleteOne({ _id });
        
        res.status(200).json({
            status: `success`,
            msg: `Berhasil menghapus data Rekam Medis`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal menghapus data Rekam Medis`,
            desc: e.message,
            data: null,
        });
    }
};
