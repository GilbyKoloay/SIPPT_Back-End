const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// create new data in Drugs collections
module.exports = async (req, res) => {
    const {
        name,
        type,
        unit,
        batchNumber,
    } = req.body;

    try {
        const result = await db.create({
            name,
            type,
            unit,
            batchNumber,
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
