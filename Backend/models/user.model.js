import moongoose from 'mongoose';

const userSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role :{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    },
    cart: [
        {
        productid : { type: String , required: true },
        quantity : { type: Number , required: true },
        price : { type: Number , required: true },
        imgUrl : { type: String , required: true },
        name : { type: String , required: true }
    }
    ]
        
});

const User = moongoose.model('User', userSchema);

export default User;