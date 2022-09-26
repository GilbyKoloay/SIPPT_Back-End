const db = require('../../models/Patients');
const mongoose = require('mongoose');

// get single data in Patients collections
module.exports = async (req, res) => {
    const { _id } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID Pasien tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.findOne({ _id });

        if(!result) {
            return res.status(404).json({
                status: "error",
                msg: `Data pasien tidak ditemukan`,
                desc: null,
                data: null,
            });
        }
        
        res.status(200).json({
            status: "success",
            msg: `Berhasil mengambil data pasien`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengambil data pasien`,
            desc: e.message,
            data: null,
        });
    }
};
