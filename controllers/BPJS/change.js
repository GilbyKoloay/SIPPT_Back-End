const db = require('../../models/BPJS');
const mongoose = require('mongoose');

// change data in BPJS collections
module.exports = async (req, res) => {
    const {
        _id,
        cardNumbmer,
        name,
        birthDate,
        healthFacilityLevel,
        nursingClass,
        NIK,
        address,
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            status: "error",
            msg: `ID BPJS tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const result = await db.updateOne({ _id }, {

        });
        
        res.status(201).json({
            status: "success",
            msg: `Berhasil mengubah data BPJS`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengubah data BPJS`,
            desc: e.message,
            data: null,
        });
    }
};
