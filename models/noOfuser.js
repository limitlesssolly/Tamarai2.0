import mongoose from 'mongoose';

const noOfUsersSchema = new mongoose.Schema ( {
    usersno: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const NoOfUsersModel = mongoose.model('noOfusers', noOfUsersSchema);

export default NoOfUsersModel;