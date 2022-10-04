const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// delete data in Drugs collections
module.exports = async (req, res) => {
    const { _id } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID Obat tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const drug = await db.findOne({ _id });
        // check if drug exist
        if(!drug) {
            return res.status(404).json({
                status: "error",
                msg: `Data obat tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        const result = await db.deleteOne({ _id });
        
        res.status(200).json({
            status: "success",
            msg: `Berhasil menghapus data obat`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal menghapus data obat`,
            desc: e.message,
            data: null,
        });
    }
};
