const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    // verifying authentication
    const { __token } = req.body;
    if(!__token) {
        return res.status(400).json({
            status: `error`,
            msg: `Pengguna tidak memiliki Token Autentikasi`,
            desc: null,
            data: null,
        });
    }
    
    try {
        jwt.verify(__token, process.env.SECRET, (err, decoded) => {
            if(err) {
                console.log(`gagal terautentikasi`);
                return res.status(400).json({
                    status: `error`,
                    msg: `Token Pengguna tidak terautentikasi`,
                    desc: null,
                    data: null,
                });
            }
            if(decoded) {
                next();
            }
        });
    }
    catch(e) {
        return res.status(500).json({
            status: `error`,
            msg: `Gagal melakukan Autentikasi Token Pengguna`,
            desc: e.message,
            data: null,
        });
    }
    
};
