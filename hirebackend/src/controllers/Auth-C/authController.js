import Auth from "../../models/Auth-M/authModel.js";
import Temp from "../../models/Temp-M/tempSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from 'nodemailer';
import crypto from 'crypto';

import Auth from "../../models/Auth-M/authModel.js";
import Temp from "../../models/Temp-M/tempSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export const temp = async (req, res) => {

    try {
        const { firstName, lastName, email, password, confirm_password } = req.body;

        const checkAuth = await Temp.findOne({ email })

        if (checkAuth) {
            return res.status(400).json({
                message: "already have an account"
            })
        }

        console.log(checkAuth);
        

        if (password != confirm_password) {
            return res.status(401).json({
                message: "confirm_password are not matched"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const tempUser = new Temp({
            firstName, lastName, email, password: hash, confirm_password
        });

        await tempUser.save();

        res.status(200).json({
            message: "temporary registration"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};



export const register = async (req, res) => {

    try {
        const { firstName, country, mobile_number, address, state, city, zip_code } = req.body;

        const tempData = await Temp.findOne({ firstName });

        if (tempData) {

            const newAuth = new Auth({
                firstName,
                country,
                mobile_number,
                address,
                state,
                city,
                zip_code,
                ...tempData.toObject()
            });

            await newAuth.save();

            await tempData.deleteOne({ firstName });

            res.status(200).json({
                message: "Auth registered successfully"
            });
        } else {
            res.status(404).json({
                message: "please correct your firstName"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// login auth
export const login = async (req, res) => {

    try {

        const { email, password, firstName } = req.body

        const checkEmail = await Auth.findOne(email ? { email } : { firstName })

        if (!checkEmail) {
            return res.status(400).json({
                message: "details are not matched"
            })
        }

        const checkPassword = await bcrypt.compare(password, checkEmail.password)

        if (!checkPassword) {
            return res.status(400).json({
                message: "details are not matched"
            })
        }

        const token = await jwt.sign({ _id: checkEmail._id }, process.env.KEY, {
            expiresIn: "2h"
        })

        res.status(200).json({
            message: "auth login",
            authId: checkEmail._id,
            firstName: checkEmail.firstName,
            lastName: checkEmail.lastName,
            authProfile : checkEmail.authProfile,
            token
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


// chnage password
export const changePassword = async (req, res) => {

    try {
        const { authId } = req.params

        const { oldPassword, newPassword, confirm_password } = req.body

        const checkUser = await Auth.findOne({ _id: authId })

        if (!checkUser) {
            return res.status(404).json({
                message: "auth not found"
            })
        }

        const checkPassword = await bcrypt.compare(oldPassword, checkUser.password)

        if (!checkPassword) {
            return res.status(400).json({
                message: "wrong Current Password"
            })
        }


        if (newPassword != confirm_password) {
            return res.status(401).json({
                message: "confirm_password are not matched"
            })
        }

        const hash = await bcrypt.hash(newPassword, 10)

        const chnage = await Auth.findOneAndUpdate({ _id: authId }, {

            $set: {
                password: hash
            }
        }, { new: true })

        res.status(200).json({
            message: "change password successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// update auth profile
// export const updateAuth = async (req, res) => {

//     try {
//         const { authId } = req.params

//         const { firstName, lastName, country, mobile_number, address, state, city, zip_code, tagline, description, Educations } = req.body

//         const checkUser = await Auth.findOne({ _id: authId })

//         if (!checkUser) {
//             return res.status(404).json({
//                 message: "auth details not found"
//             })
//         }

//         const change = await Auth.findOneAndUpdate({ _id: authId }, {

//             $set: {
//                 firstName, lastName, country, mobile_number, address, state, city, zip_code, tagline, description, Educations
//             }

//         }, { new: true })

//         res.status(200).json({
//             message: "updated your profile",
//             checkUser
//         })

//     } catch (error) {
//         res.status(500).json({
//             message: "internal server error"
//         })
//     }
// }


export const updateAuth = async (req, res) => {
    try {
        const { authId } = req.params;
        const { firstName, lastName, country, mobile_number, address, state, city, zip_code, tagline, description, Educations } = req.body;

        const checkUser = await Auth.findOne({ _id: authId });

        if (!checkUser) {
            return res.status(404).json({
                message: "Auth details not found"
            });
        }

        const updatedUser = await Auth.findOneAndUpdate(
            { _id: authId },
            {
                $set: {
                    firstName, lastName, country, mobile_number, address, state, city, zip_code, tagline, description, Educations
                }
            },
            { new: true }
        );

        res.status(200).json({
            message: "Profile updated successfully",
            checkUser: updatedUser,
        });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// get profile
export const getProfile = async (req, res) => {

    try {
        const { authId } = req.params

        const checkAuth = await Auth.findOne({ _id: authId }).sort({createdAt : -1})

        if (checkAuth) {
            res.status(200).json({
                message: "your profile",
                auth_profile: checkAuth
            })
        }

        else {
            res.status(404).json({
                message: "not found auth profile"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "markanddighe3@gmail.com",
        pass: "ubgkmxlfrovktztm",
    },
});


export const forgetPassword = async (req, res) => {

    try {
        const { email } = req.body

        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const otp = crypto.randomInt(100000, 999999).toString();

        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();


        const mailOptions = {
            from: 'markanddighe3@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to send OTP' });
            }
            res.status(200).json({ message: 'OTP sent to your email' });
        });

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const verifyOtp = async (req, res) => {

    try {
        const { otp } = req.body;

        const user = await Auth.findOne({ otp });

        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        await Auth.findOneAndUpdate({ otp }, {

            $set: {
                otp: ""
            }
        }, { new: true })

        res.status(200).json({ message: 'OTP verified successfully' });

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const reset_password = async (req, res) => {

    try {
        const { email, newPassword, confirm_password } = req.body

        const checkAuth = await Auth.findOne({ email })

        if (!checkAuth) {
            return res.status(400).json({
                message: "no details found"
            })
        }

        if (newPassword != confirm_password) {
            return res.status(400).json({
                message: "confirm password are not matched"
            })
        }

        const hash = await bcrypt.hash(newPassword, 10)

        const chnage = await Auth.findOneAndUpdate({ email }, {

            $set: {
                password: hash
            }
        }, { new: true })

        res.status(200).json({
            message: "reset password successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const resent_otp = async (req, res) => {

    try {

        const { email } = req.body

        const user = await Auth.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "not found details"
            })
        }

        if (user.otpExpires && user.otpExpires > Date.now()) {
            return res.status(400).json({ message: 'OTP is still valid. Please use the existing OTP.' });
        }

        const otp = crypto.randomInt(100000, 999999).toString();

        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();


        const mailOptions = {
            from: 'markanddighe3@gmail.com',
            to: email,
            subject: 'Resend OTP for Password Reset',
            text: `Your new OTP for password reset is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to resend OTP' });
            }
            res.status(200).json({ message: 'OTP resent successfully to your email' });
        });

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const addEducation = async (req, res) => {

    try {

        const { authId } = req.params

        const { Educations } = req.body

        const checkUser = await Auth.findOne({ _id: authId })

        checkUser.Educations.push(...Educations) //education ko add karna tha

        await checkUser.save()

        res.status(200).json({
            message: "education is added"
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const deleteEduction = async (req, res) => {

    try {

        const { authId, educationId } = req.params;

        const checkUser = await Auth.findOne({ _id: authId });
        if (!checkUser) {
            return res.status(404).json({
                message: "auth details not found"
            });
        }

        if (educationId) {
            const updatedProfile = await Auth.findOneAndUpdate(
                { _id: authId },
                { $pull: { Educations: { _id: educationId } } },
                { new: true }
            );

            return res.status(200).json({
                message: "Education deleted successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const contactUs = async (req, res) => {

    try {
        const { firstName, email, subject, message } = req.body

        const mailOptions = {
            from: 'markanddighe3@gmail.com',
            to: 'markanddighe3@gmail.com',
            subject: subject,
            text: `Message from ${firstName}:\n\n${message}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to send mail' });
            }
            res.status(200).json({ message: 'successfully sent mail' });
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const updateAuthImage = async (req, res) => {

    try {
        const { authId } = req.params

        // const authProfile = req.file ? req.file.filename : null

        const authProfile = req.file ? req.file.filename : req.body.authProfile ? req.body.oldImage : null;


        const checkAuth = await Auth.findOne({ _id: authId })

        if (!checkAuth) {
            return res.status(404).json({
                message: "not found auth"
            })
        }

        const updatedUser = await Auth.findOneAndUpdate(
            { _id: authId },
            { $set: { authProfile: authProfile } },
            { new: true }
        );

        res.status(200).json({
            message: "Profile image updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}