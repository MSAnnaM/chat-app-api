// models/User.js

import mongoose from 'mongoose';

// Визначення схеми користувача
const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true, // Забезпечує унікальність Google ID
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Унікальність email (якщо отримується від Google)
    },
}, { versionKey: false });

// Створення моделі користувача на основі схеми
const User = mongoose.model('User', userSchema);

export default User;
