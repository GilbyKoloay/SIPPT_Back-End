const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// delete record in Medical Record collections
module.exports = async (req, res) => {
    const { _id, _record } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
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

        let records = MRresult.records;
        records = records.filter(r => r._id.toString() !== _record);
        
        const result = await db.updateOne({ _id }, {
            records,
        });
        
        res.status(200).json({
            status: "success",
            msg: `Berhasil menghapus rekaman di rekam medis`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal menghapus rekaman di rekam medis`,
            desc: e.message,
            data: null,
        });
    }
};
