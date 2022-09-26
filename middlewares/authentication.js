const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    // verifying authentication
    const { __token } = req.body;
    if(!__token) {
        return res.status(403).json({
            status: "error",
            msg: `Pengguna tidak memiliki token autentikasi`,
            desc: null,
            data: null,
        });
    }
    
    try {
        jwt.verify(__token, process.env.SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    status: "error",
                    msg: `Token pengguna tidak terautentikasi`,
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
            status: "error",
            msg: `Gagal melakukan autentikasi token pengguna`,
            desc: e.message,
            data: null,
        });
    }
    
};
