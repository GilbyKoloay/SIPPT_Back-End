const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// get all data in Drugs collections
module.exports = async (req, res) => {
    try {
        const result = await db.find();

        if(result.length === 0) {
            return res.status(200).json({
                status: `error`,
                msg: `Data Obat kosong`,
                desc: null,
                data: null,
            });
        }
        
        res.status(200).json({
            status: `success`,
            msg: `Berhasil mengambil semua data Obat`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal mengambil semua data Obat`,
            desc: e.message,
            data: null,
        });
    }
};
