const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// change drug data inside Drugs collections
module.exports = async (req, res) => {
    const {
        _id,
        _receive,
        _expenditure,
        expenditureTotal,
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id) || !mongoose.Types.ObjectId.isValid(_receive) || !mongoose.Types.ObjectId.isValid(_expenditure)) {
        return res.status(400).json({
            status: `error`,
            msg: `ID Obat tidak valid`,
            data: null,
        });
    }

    try {
        // let drugs = await db.findOne({ _id }, { drug: 1 });
        // drugs.drug.forEach(r => {
        //     if(r._id.toString() === _receive) {
        //         r.expenditure.forEach(e => {
        //             if(e._id.toString() === _expenditure) {
        //                 e.expenditureTotal = expenditureTotal;
        //             }
        //         });
        //     }
        // });

        let drugs = await db.findOne({ _id });
        drugs.drug.forEach(r => {
            if(r._id.toString() === _receive) {
                r.expenditure.forEach(e => {
                    if(e._id.toString() === _expenditure) {
                        e.expenditureTotal = expenditureTotal;
                    }
                });
            }
        });

        const result = await db.updateOne({ _id }, { drug: drugs.drug });
        
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
