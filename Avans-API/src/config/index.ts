import dotenv from 'dotenv';

dotenv.config();

export default {
    jwt: {
        secret: process.env.JWT_SECRET
    },
    avans: {
        consumer_key: process.env.AVANS_CONSUMER_KEY,
        consumer_secret: process.env.AVANS_CONSUMER_SECRET,
        callback_url: process.env.AVANS_CALLBACK_URL,
        android_callback: process.env.AVANS_ANDROID_CALLBACK
    },
    session: {
        secret: process.env.SESSION_SECRET
    },
    mysql: {
        port: process.env.TYPEORM_PORT || 3306,
        host: process.env.TYPEORM_HOST,
        user: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE
    }
};
