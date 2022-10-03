const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// change drug data inside Drugs collections
module.exports = async (req, res) => {
    const {
        _employee,
        _id,
        _receive,
        receiveTotal,
    } = req.body;

    // check employee's (changedBy) id
    if(!mongoose.Types.ObjectId.isValid(_employee)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pegawai tidak valid`,
            desc: null,
            data: null,
        });
    }
    
    // check drug's id
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID obat tidak valid`,
            data: null,
        });
    }

    // check drug receive's id
    if(!mongoose.Types.ObjectId.isValid(_receive)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pemasukkan obat tidak valid`,
            desc: null,
            data: null,
        });
    }
    
    try {
        let drugs = await db.findOne({ _id }, { drug: 1, changeLog: 1});
        // check if drug exist
        if(!drugs) {
            return res.status(404).json({
                status: "error",
                msg: `Obat kosong`,
                desc: null,
                data: null,
            });
        }
        // check if receive in drug exist
        if(!drugs.drug.find(r => r._id.toString() === _receive)) {
            return res.status(404).json({
                status: "error",
                msg: `Data obat yang masuk tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        drugs.drug.map(r => {
            if(r._id.toString() === _receive) {
                r.receiveTotal = receiveTotal;
            }
        });

        const result = await db.updateOne({ _id }, {
            $push: { changeLog: {
                _changedBy: _employee,
                description: "Mengubah data pemasukkan obat",
            }},
            $set: { drug: drugs.drug },
        });
        
        res.status(201).json({
            status: "success",
            msg: `Berhasil mengubah data pemasukkan obat`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengubah data pemasukkan obat`,
            desc: e.message,
            data: null,
        });
    }
};
