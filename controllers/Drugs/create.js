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

        res.status(200).json({
            status: `success`,
            msg: `Berhasil menambahkan Obat baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal menambahkan Obat baru`,
            desc: e.message,
            data: null,
        });
    }
};
