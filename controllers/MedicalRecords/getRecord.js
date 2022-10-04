const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// get record data in MedicalRecords collections
module.exports = async (req, res) => {
    const { _id, _record } = req.body;

    // check medical record's id
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID rekam medis tidak valid`,
            desc: null,
            data: null,
        });
    }

    // check medical record record's id
    if(!mongoose.Types.ObjectId.isValid(_record)) {
        return res.status(400).json({
            status: "error",
            msg: `ID catatan rekam medis tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const MR = await db.findOne({ _id });
        // check if medical result exist
        if(!MR) {
            return res.status(404).json({
                status: "error",
                msg: `Data rekam medis tidak ditemukan`,
                desc: null,
                data: null,
            });
        }
        // check if record in medical record exist
        if(!MR.records.find(r => r._id.toString() === _record)) {
            return res.status(404).json({
                status: "error",
                msg: `Data catatan rekam medis tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        const result = MR.records.filter(r => r._id.toString() === _record);
        if(MR.records.length === 0 || !result) {
            return res.status(404).json({
                status: "error",
                msg: `Data catatan rekam medis tidak ditemukan`,
                desc: null,
                data: null,
            });
        }
        
        res.status(200).json({
            status: "success",
            msg: `Berhasil mengambil data catatan rekam medis`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengambil data catatan rekam medis`,
            desc: e.message,
            data: null,
        });
    }
};
