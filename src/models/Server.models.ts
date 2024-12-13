import mongoose, { Document, Schema } from "mongoose";
import { User, userInterface } from "./User.models";

export interface serverInterface extends Document{
    serverName: string
    serverAddress: string
    defaultTimer: "1m" | "3m" | "5m" | "10m"
    isActive: boolean
    createdBy: userInterface
}

const serverSchema: Schema<serverInterface> = new mongoose.Schema({
    serverName:{
        type: String,
        required: true,
        index: true,
        trim: true
    },
    serverAddress:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    defaultTimer:{
        type: String,
        enum: ["1m", "3m", "5m", "10m"],
        default: "10m",
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    }

}, { timestamps: true })

export const Servers = (mongoose.models.Servers as mongoose.Model<serverInterface>) || mongoose.model<serverInterface>("Server", serverSchema)