const db = require('../../models/Employees');
const mongoose = require('mongoose');

// get all data in Employees collections
module.exports = async (req, res) => {
    try {
        const result = await db.find();

        if(result.length === 0) {
            return res.status(200).json({
                status: `success`,
                msg: `Data Pegawai kosong`,
                desc: null,
                data: null,
            });
        }

        res.status(200).json({
            status: `success`,
            msg: `Berhasil mengambil semua data Pegawai`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal mengambil semua data Pegawai`,
            desc: e.message,
            data: null,
        });
    }
};
