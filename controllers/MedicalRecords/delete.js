const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// delete data in MedicalRecords collections
module.exports = async (req, res) => {
    const { _id } = req.body;

    // check medical record's id
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID rekam medis tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        let result = await db.findOne({ _id });
        if(!result) {
            return res.status(404).json({
                status: "error",
                msg: `Data rekam medis tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        result = await db.deleteOne({ _id });
        
        res.status(200).json({
            status: "success",
            msg: `Berhasil menghapus data rekam medis`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal menghapus data rekam medis`,
            desc: e.message,
            data: null,
        });
    }
};
