const db = require('../../models/MedicalRecords');
const mongoose = require('mongoose');

// change data in Medical Records collections
module.exports = async (req, res) => {
    const {
        _employee,
        _id,
        _record,
        bodyHeight,
        bodyWeight,
        tension,
        pulse,
        respiration,
        bodyTemperature,
        laboratorium,
        history,
        physicalExamination,
        diagnosis,
        medicalPrescription,
        suggestion,
        initials,
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id) || !mongoose.Types.ObjectId.isValid(_record)) {
        return res.status(400).json({
            status: "error",
            msg: `ID rekam medis tidak valid`,
            desc: null,
            data: null,
        });
    }

    try {
        let MR = await db.findOne({ _id }, { records: 1, changeLog: 1 });
        // check if medical ecord exists
        if(!MR) {
            return res.status(404).json({
                status: "error",
                msg: `ID rekam medis tidak ditemukan`,
                desc: null,
                data: null,
            });
        }
        // check if record in medical record exist
        if(!MR.records.find(r => r._id.toString() === _record)) {
            return res.status(404).json({
                status: "error",
                msg: `Catatan di rekam medis tidak ditemukan`,
                desc: null,
                data: null,
            });
        }

        // let records = MR.records;
        // if(records.length !== 0) {
        //     records.forEach(r => {
        //         if(r._id.toString() === _record) {
        //             r.bodyHeight = bodyHeight;
        //             r.bodyWeight = bodyWeight;
        //             r.tension = tension;
        //             r.pulse = pulse;
        //             r.respiration = respiration;
        //             r.bodyTemperature = bodyTemperature;
        //             r.laboratorium = laboratorium;
        //             r.his_phyExam_dia = his_phyExam_dia;
        //             r.suggestion = suggestion;
        //             r.initials = initials;
        //         }
        //     });
        // }
        // const result = await db.updateOne({ _id }, {
        //     records: records,
        // });
        
        MR.records.map(r => {
            if(r._id.toString() === _record) {
                r.bodyHeight = bodyHeight;
                r.bodyWeight = bodyWeight;
                r.tension = tension;
                r.pulse = pulse;
                r.respiration = respiration;
                r.bodyTemperature = bodyTemperature;
                r.laboratorium = laboratorium;
                r.history = history;
                r.physicalExamination = physicalExamination;
                r.diagnosis = diagnosis;
                r.medicalPrescription = medicalPrescription;
                r.suggestion = suggestion;
                r.initials = initials;
            }
        });
        
        const result = await db.updateOne({ _id }, {
            $push: { changeLog: {
                _changedBy: _employee,
                description: "Mengubah catatan di rekam medis",
            }},
            $set: {
                records: MR.records,
            },
        });
        
        res.status(201).json({
            status: "success",
            msg: `Berhasil mengubah catatan di rekam medis`,
            desc: null,
            data: result,
        });
    }
    catch(e) {
        res.status(500).json({
            status: "error",
            msg: `Gagal mengubah catatan di rekam medis`,
            desc: e.message,
            data: null,
        });
    }
};
