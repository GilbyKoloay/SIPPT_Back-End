const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// change drug data inside Drugs collections
module.exports = async (req, res) => {
    const {
        _employee,
        _id,
        _receive,
        _expenditure,
        expenditureTotal,
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
            msg: `ID obat/pemasukkan/pengeluaran tidak valid`,
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

    // check drug expenditure's id
    if(!mongoose.Types.ObjectId.isValid(_expenditure)) {
        return res.status(400).json({
            status: "error",
            msg: `ID pengeluaran obat tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        let drugs = await db.findOne({ _id }, { drug: 1, changeLog: 1 });
        // check if the drug exist
        if(!drugs) {
            return res.status(404).json({
                status: "error",
                msg: `Obat kosong`,
                desc: null,
                data: null,
            });
        }
        // check if the receive in drug exist
        if(!drugs.drug.find(r => r._id.toString() === _receive)) {
            return res.status(404).json({
                status: "error",
                msg: `Data obat yang masuk tidak ditemukan`,
                desc: null,
                data: null,
            });
        }
        // check if the expenditure in receive exist
        drugs.drug.forEach(r => {
            if(r._id.toString() === _receive) {
                if(!r.expenditure.find(e => e._id.toString() === _expenditure)) {
                    return res.status(404).json({
                        status: "error",
                        msg: `Data obat yang keluar tidak ditemukan`,
                        desc: null,
                        data: null,
                    });
                }
            }
        });

        drugs.drug.map(r => {
            if(r._id.toString() === _receive) {
                r.expenditure.map(e => {
                    if(e._id.toString() === _expenditure) {
                        e.expenditureTotal = expenditureTotal;
                    }
                });
            }
        });

        const result = await db.updateOne({ _id }, {
            $push: { changeLog: {
                _changedBy: _employee,
                description: "Mengubah data pengeluaran obat",
            }},
            $set: {
                drug: drugs.drug,
            },
        });
        
        res.status(201).json({
            status: "success",
            msg: `Berhasil mengubah data pengeluaran obat`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal mengubah data pengeluran obat`,
            desc: e.message,
            data: null,
        });
    }
};
