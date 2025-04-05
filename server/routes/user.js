const express=require("express")
const {RegisterUser, otpVerification, Login, resendOtp, sendOTP, verifyOTP, changePassword, logOut, getUser, addAddress, getAddress, placeOrder,}= require("../Controller/user");
const UserRouter=express.Router();
const router=express.Router();

UserRouter.post("/SignUp",RegisterUser);
UserRouter.post("/otpVerification",otpVerification);
UserRouter.post("/login",Login);
UserRouter.post("/resend-otp", resendOtp);
UserRouter.post('/password-change',sendOTP,);
UserRouter.post('/otp-verify',verifyOTP);
UserRouter.patch('/update-password',changePassword);
UserRouter.post('/logout',logOut)
UserRouter.get('/getUser',getUser)
UserRouter.post('/addAddress',addAddress)
UserRouter.get('/getAddress',getAddress)
UserRouter.post('/placeOrder',placeOrder)

router.get('/check-auth',(req,res)=>{
    const token=req.cookies.userToken
    if(!token){
        return res.json({isAuthenticated:false})
    }
    return res.json({isAuthenticated:true})
})

module.exports={
    UserRouter,router
}
