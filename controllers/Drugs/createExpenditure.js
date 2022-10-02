const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// create new drug inside Drugs collections
module.exports = async (req, res) => {
    const {
        _employee,
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
        let drugs = await db.findOne({ _id }, { drug: 1, changeLog: 1 });
        if(!drugs) {
            return res.status(404).json({
                status: "error",
                msg: `Obat tidak ditemukan`,
                desc: null,
                data: null,
            });
        }
        if(!drugs.drug.find(r => r._id.toString() === _receive)) {
            return res.status(404).json({
                status: "error",
                msg: `Obat yang masuk tidak ditemukan`,
                desc: null,
                data: null,
            });
        }
        
        drugs.drug.map(r => {
            if(r._id.toString() === _receive) {
                r.expenditure.push({ expenditureTotal });
                drugs.changeLog.push({
                    _changedBy: _employee,
                    description: "Menambahkan pengeluaran obat baru",
                });
            }
        });

        const result = await db.updateOne({ _id }, { $set: {
            drug: drugs.drug,
            changeLog: drugs.changeLog,
        } });
        
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
