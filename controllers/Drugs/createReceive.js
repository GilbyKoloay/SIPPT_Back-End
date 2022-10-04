const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// create new drug inside Drugs collections
module.exports = async (req, res) => {
    const {
        _employee,
        _id,
        receiveTotal,
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
        const result = await db.updateOne({ _id }, { $push: {
            drug: { receiveTotal, /* date  (taken from front end) */ },
            changeLog: {
                _changedBy: _employee,
                description: "Menambahkkan pemasukkan obat baru",
            }
        }});

        res.status(201).json({
            status: "success",
            msg: `Berhasil menambahkan pemasukkan obat baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal menambahkan pemasukkan obat baru`,
            desc: e.message,
            data: null,
        });
    }
};
