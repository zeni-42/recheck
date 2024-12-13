import mongoose, { Schema, Document } from "mongoose";

export interface userInterface extends Document{
    fullName: string
    email: string
    password: string
    token: string
    verificationCode: string
    verificationcodeExpiry: Date
    isVerified: boolean
    servers: []
}

const userSchema: Schema<userInterface> = new mongoose.Schema({
    fullName:{
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty"],
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password cannot be empty"],
    },
    token: {
        type: String
    },
    verificationCode:{
        type: String
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false
    },
    verificationcodeExpiry: {
        type: Date,
        required: true
    }
}, { timestamps: true })

export const User = (mongoose.models.User as mongoose.Model<userInterface>) ||  mongoose.model<userInterface>("User", userSchema)