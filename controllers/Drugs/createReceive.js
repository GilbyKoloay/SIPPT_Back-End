const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// create new drug inside Drugs collections
module.exports = async (req, res) => {
    const {
        _id,
        receiveTotal,
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID Obat tidak valid`,
            desc: null,
            data: null,
        });
    }
    
    try {
        const result = await db.updateOne({ _id }, { $push: { drug: { receiveTotal } } });

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
