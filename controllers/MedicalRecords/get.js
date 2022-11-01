const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// get single data in MedicalRecords collections
module.exports = async (req, res) => {
    let { _id } = req.params;
    _id = _id.substring(1);

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID rekam medis tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.findOne({ _id }, { __v: 0 });

        if(!result) {
            return res.status(404).json({
                status: "error",
                msg: `Data rekam medis tidak ditemukan`,
                desc: null,
                data: null,
            });
        }
        
        res.status(200).json({
            status: "success",
            msg: `Berhasil mengambil data rekam medis`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengambil data rekam medis`,
            desc: e.message,
            data: null,
        });
    }
};
