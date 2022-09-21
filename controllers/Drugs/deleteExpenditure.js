const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// delete data in Drugs collections
module.exports = async (req, res) => {
    const {
        _id,
        _receive,
        _expenditure,
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id) || !mongoose.Types.ObjectId.isValid(_receive) || !mongoose.Types.ObjectId.isValid(_expenditure)) {
        return res.status(400).json({
            status: `error`,
            msg: `ID Obat tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        let drugs = await db.findOne({ _id }, { drug: 1 });
        drugs.drug.forEach(r => {
            if(r._id.toString() === _receive) {
                r.expenditure = r.expenditure.filter(r => r._id.toString() !== _expenditure);
            }
        });

        const result = await db.updateOne({ _id }, { drug: drugs.drug });
        
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
