const db = require('../../models/Employees');
const mongoose = require('mongoose');

// get single data in Employees collections
module.exports = async (req, res) => {
    const { _id } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pegawai tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.findOne({ _id }, { __v: 0 });

        if(!result) {
            return res.status(404).json({
                status: "error",
                msg: `Data pegawai tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        res.status(200).json({
            status: "success",
            msg: `Berhasil mengambil data pegawai`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengambil data pegawai`,
            desc: e.message,
            data: null,
        });
    }
};
