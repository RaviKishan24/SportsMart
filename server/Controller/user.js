require('dotenv').config();
const { User } = require("../models/user")
const { Admin } = require("../models/admin")
const bcrypt = require("bcryptjs")
const GMAIl = process.env.GMAIL
const MAIL_PASS = process.env.MAIL_PASS
const SECREAT_KEY = process.env.SECREAT_KEY
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const cookie = require("cookie-parser");


const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIl,
        pass: MAIL_PASS
    }
})

const RegisterUser = async (req, res) => {


    try {
        const { name, email, mobile, password, dob, gender, profilePic } = req.body;

        console.log("user data for account creation :", name, email, mobile, password, dob, gender, profilePic)

        if (!name || !email || !mobile || !password || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "Missing Input Field"
            })

        }

        // Validate dob, gender, and profilePic if necessary
        if (dob && isNaN(new Date(dob).getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid Date of Birth format"
            })
        }
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: "User must be at least 18 year old"
            })
        }


        if (!['Male', 'Female', 'Other'].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: "Invalid gender value"
            })
        }

        const existingEmail = await User.findOne({ email });
        const existingMobile = await User.findOne({ mobile });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email id already registerd with us"
            })
        }
        if (existingMobile) {
            return res.status(400).json({
                success: false,
                message: "Mobile number already registerd with us"
            })
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpiration = Date.now() + 5 * 60 * 1000; // 5 minutes from now
        const hashpassword = await bcrypt.hash(password, 10)

        const defaultProfilePic = "";

        const newuser = await User.create({
            name,
            email,
            mobile,
            password: hashpassword,
            otp,
            otpExpiration,
            dob,
            gender,
            profilePic: profilePic || defaultProfilePic
        })

        const mailMessage = {
            from: GMAIl,
            to: email,
            subject: "Account verification",
            text: `Hello ${name} thank you for registering with us .This is your otp ${otp} please verify your account within 5 minute.`
        }

        await transport.sendMail(mailMessage)
        res.status(200).json({
            success: true,
            message: "Account created successfully",
            data: newuser
        })


    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            success: false,
            message: error.message
        })

    }

};

const otpVerification = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Missing input field"

            })
        }
        const existingUser = await User.findOne({ email: email })
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

        if (Date.now() > existingUser.otpExpiration) {
            return res.status(400).json({
                success: false,
                message: "otp has expired"
            })

        }


        existingUser.otp = null;
        existingUser.otpExpiration = null;
        existingUser.isVerified = true;
        await existingUser.save();
        return res.status(200).json({
            success: true,
            message: "otp verified successfully",
            data: existingUser

        })


    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }

};

const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found with this email"
            });
        }

        // Generate new OTP
        const newOtp = Math.floor(1000 + Math.random() * 9000);
        const newOtpExpiration = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

        // Update user record with new OTP
        user.otp = newOtp;
        user.otpExpiration = newOtpExpiration;
        await user.save();

        // Send OTP via email
        const mailMessage = {
            from: GMAIl,
            to: email,
            subject: "New OTP for Account Verification",
            text: `Hello ${user.name}, your new OTP is: ${newOtp}.verify your account whithin 5 minute`,
        };

        await transport.sendMail(mailMessage);

        return res.status(200).json({
            success: true,
            message: "New OTP sent successfully",
            data: user.otp
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


const Login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "missing input field"
            })
        }
        let existingUser = await Admin.findOne({ email }) || await User.findOne({ email })
        console.log("existing user", existingUser)

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "No account found with this email"
            });
        }
        const ispasswordMatched = await bcrypt.compare(password, existingUser.password)

        if (!ispasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "incorrect Password"
            })
        }
        // **STRICTLY take role from existingUser**
        if (!existingUser.role) {
            return res.status(400).json({
                success: false,
                message: "Role is not defined in the database"
            });
        }

        const role = existingUser.role;


        const tokenPayload = {
            userid: existingUser._id,
            email: existingUser.email,
            role: role
        }
        const tokenName = role === "admin" ? "adminToken" : "userToken"
        const token = await jwt.sign(tokenPayload, SECREAT_KEY, { expiresIn: '1d' })



        res.cookie(tokenName, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,


        })
        await existingUser.save();

        res.status(200).json({
            success: true,
            message: ` ${role === "admin" ? "Admin" : "User"} login Successully`,
            data: existingUser,
            role: existingUser.role

        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
};

const logOut = async (req, res) => {

    try {
        res.clearCookie('userToken', {
            httpOnly: true, // Ensures the cookie is accessible only by the server
            secure: process.env.NODE_ENV === "production", // Ensures HTTPS in production
            sameSite: "Strict"// Prevents CSRF attacks
        })
        res.clearCookie('adminToken', {
            httpOnly: true, // Ensures the cookie is accessible only by the server
            secure: process.env.NODE_ENV === "production", // Ensures HTTPS in production
            sameSite: "Strict"// Prevents CSRF attacks  
        })

        res.status(200).json({
            success: true,
            message: "Logout successfully",
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }

}


const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("The email is", email)

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is Required",
            })
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Incorrect Email"
            })
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpiration = Date.now() + 5 * 60 * 1000; // expiration time 5 min

        const token = jwt.sign({ otp, email, otpExpiration }, SECREAT_KEY, { expiresIn: '5m' })
        res.cookie('resetToken', token, {
            httponly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict',
            maxAge: 5 * 60 * 1000 //10 minute
        })

        const mailMessage = {
            from: process.env.GMAIL,
            to: email,
            subject: "Password Reset OTP",
            text: `Hey ${user.name}, your OTP for password reset is: ${otp}. Please use this within 5 minutes.`

        }

        await transport.sendMail(mailMessage)

        res.status(200).json({
            success: true,
            message: "OTP sent to your email",

        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error is occured during otp generation"
        })

    }

};

const verifyOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        console.log("OTP Received", otp)

        const token = req.cookies.resetToken;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'No reset token found'
            });
        }
        const decoded = jwt.verify(token, SECREAT_KEY)
        if (Date.now() > decoded.otpExpiration) {
            return res.status(400).json({
                success: false,
                message: " OTP has Expired Request a new one."
            })
        }

        if (decoded.otp !== parseInt(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }


        return res.status(200).json({
            success: true,
            message: "OTP Verified Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to verify OTP"
        })
    }
};

const changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        const token = req.cookies.resetToken;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Unauthorized access. No token found."
            })
        }
        const decoded = jwt.verify(token, SECREAT_KEY)

        const user = await User.findOne({ email: decoded.email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not found "
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();
        res.clearCookie('resetToken');


        res.status(200).json({
            success: true,
            message: "Password changed Successfully"

        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to change password"
        })
    }
};

const getUser = async (req, res) => {

    const token = req.cookies.userToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });

    }
    try {
        const decoded = jwt.verify(token, SECREAT_KEY);

        const user = await User.findById(decoded.userid).select("-password")


        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // **STRICTLY take role from DB**
        if (!user.role) {
            return res.status(400).json({
                success: false,
                message: "Role is not defined in the database"
            });
        }

        const role = user.role;
        res.status(200).json({
            success: true,
            data: user,
            role: role,

        });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};



const addAddress = async (req, res) => {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Authentication token is required"
            })
        }

        const decoded = jwt.verify(token, SECREAT_KEY)
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "token verification failed"
            })
        }

        const user = await User.findById(decoded.userid).select("-password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }


        const { name, mobile, email, house, landmark, pincode } = req.body;
        if (!name || !mobile || !email || !house || !pincode) {
            return res.status(400).json({
                success: false,
                message: "Missing Input Field "
            })
        }


        user.address.push({
            name: name,
            mobile: mobile,
            email: email,
            house: house,
            landmark: landmark || "",
            pincode: pincode,
        })
        await user.save();

        res.status(200).json({
            success: true,
            message: "Address Addedd successfully",
            data: user.address
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error occured during adding address",
            error: error.message
        })
    }

};
const getAddress = async (req, res) => {
    try {
        const token = req.cookies.userToken;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Authentication token is required"
            })
        }

        const decoded = jwt.verify(token, SECREAT_KEY)
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "token verification failed"
            })
        }

        const user = await User.findById(decoded.userid).select("-password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        await user.address;

        res.status(200).json({
            success: true,
            message: "Address Get successfully",
            data: user.address
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error occur during fetch address"
        })
    }
};
const placeOrder = async (req, res) => {
    try {
        const usertoken = req.cookies.userToken;
        if (!usertoken) {
            return res.status(401).json({
                success: false,
                message: " User token not found"
            })
        }
  
        let decoded;
        try {
            decoded = jwt.verify(usertoken,SECREAT_KEY);
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired token"
            });
        }


        const user = await User.findById(decoded.userid)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            })
        }

        if (user.cart.length === 0) {
            return res.status(400).json({
                success: false,
                message: "User has no products in cart"
            })
        }

        const totalAmount = user.cart.reduce((sum, item) => {
            const discountedPrice = item.price - (item.discount || 0);
            return sum + (discountedPrice * item.quantity)
        }, 0);

        const newOrder = {
            products: user.cart,
            totalAmount,
            orderDate: new Date(),
            status: 'Pending'

        }

        user.orders.push(newOrder)
        user.cart = [];

        await user.save();

        res.status(200).json({
            success:true,
            message: "Order placed successfully!",
            order: newOrder
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong!", error });
    }
};





module.exports = {
    RegisterUser,
    otpVerification,
    Login,
    resendOtp,
    sendOTP,
    verifyOTP,
    changePassword,
    logOut,
    getUser,
    addAddress,
    getAddress,
    placeOrder,


}
