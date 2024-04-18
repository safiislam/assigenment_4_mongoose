import mongoose from "mongoose";
import app from "./app";
import config from "./App/config";

async function main() {
    try {
        await mongoose.connect(config.databaseUrl as string);
        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
        })
    } catch (error) {
        throw new Error('Database connection error ')
    }
}
main()