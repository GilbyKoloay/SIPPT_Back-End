const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// change drug data inside Drugs collections
module.exports = async (req, res) => {
    const {
        _id,
        _receive,
        receiveTotal,
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id) || !mongoose.Types.ObjectId.isValid(_receive)) {
        return res.status(400).json({
            status: `error`,
            msg: `ID Obat tidak valid`,
            data: null,
        });
    }

    try {
        let drugResult = await db.findOne({ _id }, { drug: 1 });
        if(!drugResult) {
            return res.status(400).json({
                status: `error`,
                msg: `Obat tidak ditemukan`,
                desc: null,
                data: null,
            });
        }
        if(drugResult.drug.length === 0) {
            return res.status(400).json({
                status: `error`,
                msg: `Obat kosong`,
                desc: null,
            desc: null,
                data: null,
            });
        }

        drugResult.drug.forEach(r => {
            if(r._id.toString() === _receive) {
                r.receiveTotal = receiveTotal;
            }
        });

        const result = await db.updateOne({ _id }, { drug: drugResult.drug })
        
        res.status(200).json({
            status: `success`,
            msg: `Berhasil mengubah data Obat`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal mengubah data Obat`,
            desc: e.message,
            data: null,
        });
    }
};
