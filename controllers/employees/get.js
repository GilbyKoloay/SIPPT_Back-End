const db = require('../../models/Employees');
const mongoose = require('mongoose');

// get single data in Employees collections
module.exports = async (req, res) => {
    const { _id } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: `error`,
            msg: `ID Pegawai tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.findOne({
            _id,
        });

        if(!result) {
            return res.status(200).json({
                status: `error`,
                msg: `Data Pegawai tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        res.status(200).json({
            status: `success`,
            msg: `Berhasil mengambil data Pegawai`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal mengambil data Pegawai`,
            desc: e.message,
            data: null,
        });
    }
};
