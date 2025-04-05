const express = require('express')
const { RegisterAdmin, verifyAdmin, getAdmin, getUsers } = require('../Controller/Admin')

const adminRouter = express.Router();
const admin = express.Router();

adminRouter.post('/register', RegisterAdmin)
adminRouter.post('/verifyAdmin', verifyAdmin)
adminRouter.get('/getAdmin', getAdmin)
adminRouter.get('/getUsers',getUsers)

admin.get('/check-auth', (req, res) => {
    const token = req.cookies.adminToken
    if (!token) {
        return res.json({ isAuthenticated: false })
    }
    return res.json({ isAuthenticated: true })
})
module.exports = { adminRouter, admin }