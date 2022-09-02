const db = require('../../models/Patients');
const mongoose = require('mongoose');

// get all data in Patients collections
module.exports = async (req, res) => {
    try {
        const result = await db.find();

        if(result.length === 0) {
            return res.status(200).json({
                status: `error`,
                msg: `Data Pasien kosong`,
                desc: null,
                data: null,
            });
        }

        res.status(200).json({
            status: `success`,
            msg: `Berhasil mengambil semua data Pasien`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal mengambil semua data Pasien`,
            desc: e.message,
            data: null,
        });
    }
};
