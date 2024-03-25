import mongoose, { Schema, Document } from 'mongoose'

export interface UserDocument extends Document {
	username: string
	password: string
    level: number
    completionTime: number
}

const userSchema: Schema<UserDocument> = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		default: null,
	},
	level: {
		type: Number,
		default: -1,
	},
	completionTime: {
		type: Number,
		default: null,
	},
})

const User = mongoose.model<UserDocument>('user', userSchema)

export default User

