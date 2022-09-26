const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// get record data in MedicalRecords collections
module.exports = async (req, res) => {
    const { _id, _record } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id) || !mongoose.Types.ObjectId.isValid(_record)) {
        return res.status(400).json({
            status: "error",
            msg: `ID rekam medis tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const MRresult = await db.findOne({ _id });
        if(!MRresult) {
            return res.status(404).json({
                status: "error",
                msg: `Data rekam medis tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        const result = MRresult.records.filter(r => r._id.toString() === _record);
        if(MRresult.records.length === 0 || !result) {
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
