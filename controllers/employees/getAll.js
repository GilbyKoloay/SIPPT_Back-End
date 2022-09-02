const db = require('../../models/Employees');
const mongoose = require('mongoose');

// get all data from Employees collections
module.exports = async(req, res) => {
    try {
        const result = await db.find();

        if(result.length === 0) {
            return res.status(200).json({
                status: `success`,
                message: `Data Pegawai kosong`,
                desc: null,
                data: null,
            });
        }

        res.status(200).json({
            status: `success`,
            message: `Berhasil mengambil semua data Pegawai`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            message: `Gagal mengambil semua data Pegawai`,
            desc: e.message,
            data: null,
        });
    }
};
