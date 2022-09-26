const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// change data in Drugs collections
module.exports = async (req, res) => {
    const {
        _id,
        name,
        type,
        unit,
        batchNumber,
    } = req.body;

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
            name,
            type,
            unit,
            batchNumber,
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
