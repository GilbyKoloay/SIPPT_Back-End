const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// delete data in Drugs collections
module.exports = async (req, res) => {
    const {
        _id,
        _receive,
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id) || !mongoose.Types.ObjectId.isValid(_receive)) {
        return res.status(400).json({
            status: `error`,
            msg: `ID Obat tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        let drugResult = await db.findOne({ _id }, { drug: 1 });
        drugResult = drugResult.drug.filter(r => r._id.toString() !== _receive);
        
        const result = await db.updateOne({ _id }, { drug: drugResult });
        
        res.status(200).json({
            status: `success`,
            msg: `Berhasil menghapus data Obat`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal menghapus data Obat`,
            desc: e.message,
            data: null,
        });
    }
};
