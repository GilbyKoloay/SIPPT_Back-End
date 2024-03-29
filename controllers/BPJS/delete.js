const db = require('../../models/BPJS');
const mongoose = require('mongoose');

// delete data in BPJS collections
module.exports = async (req, res) => {
    const { _id } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID BPJS tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        let result = await db.findOne({ _id });
        if(!result) {
            return res.status(404).json({
                status: `error`,
                msg: `Data BPJS tidak ditemukan`,
                desc: e.message,
                data: null,
            });
        }
        
        result = await db.deleteOne({ _id });
        
        res.status(200).json({
            status: "success",
            msg: `Berhasil menghapus data BPJS`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal menghapus data BPJS`,
            desc: e.message,
            data: null,
        });
    }
};
