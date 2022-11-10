const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// create new data in Drugs collections
module.exports = async (req, res) => {
    const {
        _employee,
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

    try {
        const result = await db.create({
            name,
            preparationType,
            unit,
            batchNumber,
            changeLog: [{
                _changedBy: _employee,
                description: "Menambahkan obat baru",
            }],
        });

        res.status(201).json({
            status: "success",
            msg: `Berhasil menambahkan obat baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal menambahkan obat baru`,
            desc: e.message,
            data: null,
        });
    }
};
