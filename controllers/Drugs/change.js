const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// change data in Drugs collections
module.exports = async (req, res) => {
    const {
        _employee,
        _id,
        name,
        preparationType,
        unit,
        batchNumber,
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

    // check drug's id
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID obat tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.updateOne({ _id }, {
            $push: { changeLog: {
                _changedBy: _employee,
                description: "Mengubah data obat",
            }},
            $set: { name, preparationType, unit, batchNumber },
        });
        
        res.status(201).json({
            status: "success",
            msg: `Berhasil mengubah data obat`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengubah data obat`,
            desc: e.message,
            data: null,
        });
    }
};
