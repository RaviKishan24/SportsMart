require('dotenv').config();
const { Admin } = require('../models/admin')
const { User } = require("../models/user")
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt')

const GMAIL = process.env.GMAIL
const MAIL_PASS = process.env.MAIL_PASS
const SECREAT_KEY = process.env.SECREAT_KEY
const MASTER_ADMIN_EMAIL = process.env.MASTER_ADMIN_EMAIL

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL,
        pass: MAIL_PASS
    }

})

const RegisterAdmin = async (req, res) => {
    try {
        const { name, email, mobile, password, dob, gender, profilePic } = req.body;

        console.log("Admin data for account creation:", name, email, mobile, password, dob, gender, profilePic);

        // Check required fields
        if (!name || !email || !mobile || !password || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "Missing Input Field"
            });
        }

        // Validate Date of Birth
        if (dob && isNaN(new Date(dob).getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid Date of Birth format"
            });
        }
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: "Admin must be at least 18 years old"
            });
        }

        // Validate gender
        if (!['Male', 'Female', 'Other'].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: "Invalid gender value"
            });
        }

        // Check if email or mobile already exists
        const existingEmail = await Admin.findOne({ email });
        const existingMobile = await Admin.findOne({ mobile });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email ID is already registered"
            });
        }
        if (existingMobile) {
            return res.status(400).json({
                success: false,
                message: "Mobile number is already registered"
            });
        }


        const userOTP = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        const adminOTP = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        const otpExpiration = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        const hashPassword = await bcrypt.hash(password, 10);


        const newAdmin = await Admin.create({
            name,
            email,
            mobile,
            password: hashPassword,
            otp: userOTP, // Store user OTP
            otpAdmin: adminOTP, // Store master admin OTP
            otpExpiration,
            dob,
            gender,
            profilePic: profilePic || "",
            role: 'admin',
            isVerified: false
        });


        const userMailMessage = {
            from: GMAIL,
            to: email,
            subject: "Admin Account Verification OTP",
            text: `Hello ${name}, thank you for registering as an Admin. Your OTP is ${userOTP}. Please verify your account within 5 minutes.`
        };


        const adminMailMessage = {
            from: GMAIL,
            to: MASTER_ADMIN_EMAIL,
            subject: "New Admin Account Request",
            text: `Alert: A user is trying to create an Admin account.\n\nDetails:\nName: ${name}\nEmail: ${email}\nMobile: ${mobile}\n\nOTP for verification: ${adminOTP}\nPlease approve this request if it is valid.`
        };

        // Send both emails asynchronously
        await Promise.all([
            transport.sendMail(userMailMessage),
            transport.sendMail(adminMailMessage)
        ]);

        res.status(201).json({
            success: true,
            message: "Admin account creation request received. OTP sent for verification.",
            data: newAdmin
        });

    } catch (error) {
        console.error("Error in RegisterAdmin:", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const verifyAdmin = async (req, res) => {
    try {
        const { email, otp, otpAdmin } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Missing input field"

            })
        }
        const existingUser = await Admin.findOne({ email: email })
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "no user found with this email"
            })
        }
        if (existingUser.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "invalid otp"
            })
        }

        if (existingUser.otpAdmin !== otpAdmin) {
            return res.status(400).json({
                success: false,
                message: "Invalid Master Admin OTP"
            })
        }

        if (Date.now() > existingUser.otpExpiration) {
            return res.status(400).json({
                success: false,
                message: "otp has expired"
            })

        }


        existingUser.otp = null;
        existingUser.otpExpiration = null;
        existingUser.isVerified = true;
        existingUser.otpAdmin = null;
        await existingUser.save();
        return res.status(200).json({
            success: true,
            message: "otp'S verified successfully",
            data: existingUser

        })


    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }

};

const getAdmin = async (req, res) => {

    const token = req.cookies.adminToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });

    }
    try {
        const decoded = jwt.verify(token, SECREAT_KEY);

        const admin = await Admin.findById(decoded.userid).select("-password")


        if (!admin) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // **STRICTLY take role from DB**
        if (!admin.role) {
            return res.status(400).json({
                success: false,
                message: "Role is not defined in the database"
            });
        }

        const role = admin.role;
        res.status(200).json({
            success: true,
            message: "Admin get successfully",
            data: admin,
            role: role,

        });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

const getUsers = async (req, res) => {
    try {
        const token = req.cookies.adminToken;
        if (!token) {
            res.status(400).json({
                success: false,
                message: "Admin Token not found. Token is required "
            })
        }
        const decoded = await jwt.verify(token, SECREAT_KEY)
        const admin = await Admin.findById(decoded.userid).select("-password");
        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Unauthorzed Access"
            });
        }
        const users = await User.find();
        admin.users = users;
        await admin.save()
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

module.exports = { RegisterAdmin, verifyAdmin, getAdmin,getUsers };