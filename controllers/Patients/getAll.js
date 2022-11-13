const db = require('../../models/Patients');
const mongoose = require('mongoose');

// get all data in Patients collections
module.exports = async (req, res) => {
    try {
        const result = await db.find({}, { __v: 0 });

        if(result.length === 0) {
            return res.status(404).json({
                status: "error",
                msg: `Data pasien kosong`,
                desc: null,
                data: null,
            });
        }

        res.status(200).json({
            status: "success",
            msg: `Berhasil mengambil semua data pasien`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengambil semua data pasien`,
            desc: e.message,
            data: null,
        });
    }
};
