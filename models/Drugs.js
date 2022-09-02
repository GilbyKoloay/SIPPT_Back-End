const mongoose = require('mongoose');

const drugsSchema = new mongoose.Schema({
    // changeLog (array) (stores changes. in case when the patient's data is changed, etc)
    drugName: {
        type: String,
        required: [true, "'Nama Obat' tidak boleh kosong"],
    },
});

// const changeLogSchema = new mongoose.Schema({});

module.exports = mongoose.model('Drugs', drugsSchema);
