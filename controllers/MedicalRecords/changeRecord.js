const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// change data in Medical Records collections
module.exports = async (req, res) => {
    const {
        _id,
        _record,
        bodyHeight,
        bodyWeight,
        tension,
        pulse,
        respiration,
        bodyTemperature,
        laboratorium,
        his_phyExam_dia,
        suggestion,
        initials,
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id) || !mongoose.Types.ObjectId.isValid(_record)) {
        return res.status(400).json({
            status: `error`,
            msg: `ID Rekam Medis tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        const RMresult = await db.findOne({ _id });
        let recordsResult = RMresult.records;
        if(recordsResult.length !== 0) {
            recordsResult.forEach(r => {
                if(r._id.toString() === _record) {
                    r.bodyHeight = bodyHeight;
                    r.bodyWeight = bodyWeight;
                    r.tension = tension;
                    r.pulse = pulse;
                    r.respiration = respiration;
                    r.bodyTemperature = bodyTemperature;
                    r.laboratorium = laboratorium;
                    r.his_phyExam_dia = his_phyExam_dia;
                    r.suggestion = suggestion;
                    r.initials = initials;
                }
            });
        }
        const result = await db.updateOne({ _id }, {
            records: recordsResult,
        });
        
        res.status(200).json({
            status: `success`,
            msg: `Berhasil mengubah data Rekam Medis`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: `error`,
            msg: `Gagal mengubah data Rekam Medis`,
            desc: e.message,
            data: null,
        });
    }
};
