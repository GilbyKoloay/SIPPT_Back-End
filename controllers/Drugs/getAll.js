const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// get all data in Drugs collections
module.exports = async (req, res) => {
    try {
        const result = await db.find({}, { __v: 0 });

        if(result.length === 0) {
            return res.status(404).json({
                status: "error",
                msg: `Data obat kosong`,
                desc: null,
                data: null,
            });
        }
        
        res.status(200).json({
            status: "success",
            msg: `Berhasil mengambil semua data obat`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengambil semua data obat`,
            desc: e.message,
            data: null,
        });
    }
};
