const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// delete record in Medical Record collections
module.exports = async (req, res) => {
    const { _employee, _id, _record } = req.body;

    // check employee's (changedBy) id
    if(!mongoose.Types.ObjectId.isValid(_employee)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pegawai tidak valid`,
            desc: null,
            data: null,
        });
    }

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
        // const MRresult = await db.findOne({ _id });
        // if(!MRresult) {
        //     return res.status(404).json({
        //         status: "error",
        //         msg: `Data rekam medis tidak ditemukan`,
        //         desc: null,
        //         data: null,
        //     });
        // }

        // let records = MRresult.records;
        // records = records.filter(r => r._id.toString() !== _record);
        
        // const result = await db.updateOne({ _id }, {
        //     records,
        // });

        let MR = await db.findOne({ _id }, { records: 1, changeLog: 1 });
        // check if medical record exist
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
                msg: `Catatan rekam medis tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        const result = await db.updateOne({ _id }, {
            $push: { changeLog: {
                _changedBy: _employee,
                description: "Menghapus catatan di rekam medis",
            }},
            $set: { records: MR.records.filter(r => r._id.toString() !== _record) },
        });

        // const result = null;
        
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
