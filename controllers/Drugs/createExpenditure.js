const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// create new drug inside Drugs collections
module.exports = async (req, res) => {
    const {
        _id,
        _receive,
        expenditureTotal,
    } = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id) || !mongoose.Types.ObjectId.isValid(_receive)) {
        return res.status(400).json({
            status: "error",
            msg: `ID Obat tidak valid`,
            desc: null,
            data: null,
        });
    }
    
    try {
        let drugs = await db.findOne({ _id }, { drug: 1 });
        if(!drugs) {
            return res.status(404).json({
                status: "error",
                msg: `Obat tidak ditemukan`,
                desc: null,
                data: result,
            });
        }
        drugs.drug.forEach(r => {
            if(r._id.toString() === _receive) {
                r.expenditure.push({ expenditureTotal });
            }
        });

        const result = await db.updateOne({ _id }, { drug: drugs.drug });

        res.status(201).json({
            status: "success",
            msg: `Berhasil menambahkan pengeluaran obat baru`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal menambahkan pengeluaran obat baru`,
            desc: e.message,
            data: null,
        });
    }
};
