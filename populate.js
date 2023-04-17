import { readFile } from "fs/promises";

import dontenv from "dotenv";
dontenv.config();

import connectDB from "./db/connect.js";
import Job from "./models/Job.js";

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        await Job.deleteMany();

        const jsonProducts = JSON.parse(
            await readFile(new URL("./jobs_data.json", import.meta.url))
        );
        await Job.create(jsonProducts);
        console.log("SUCCESS.");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
