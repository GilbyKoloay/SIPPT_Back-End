const db = require('../../models/Drugs');
const mongoose = require('mongoose');

// create new drug inside Drugs collections
module.exports = async (req, res) => {
    const {
        _employee,
        _id,
        _receive,
        expenditureTotal,
        expenditureDate,
    } = req.body;
    console.log(req.body); // dev

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
            desc: null,
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
        let drugs = await db.findOne({ _id }, { drug: 1, changeLog: 1 });
        // check if drug exist
        if(!drugs) {
            return res.status(404).json({
                status: "error",
                msg: `Obat tidak ditemukan`,
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
                r.expenditure.push({
                    expenditureTotal,
                    expenditureDate: new Date(`${expenditureDate.year}/${expenditureDate.month}/${(parseInt(expenditureDate.date)+1).toString()}`)
                });
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
