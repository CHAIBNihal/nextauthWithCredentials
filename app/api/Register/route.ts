import { connect } from "@/Connect/Mongodb";
import User from "@/Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();
export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "All field is required " }, { status: 400 })
        }

        const isExistUser = await User.findOne({ email }).select("_id");
        if (isExistUser) {
            console.log(isExistUser)
            return NextResponse.json({ user: isExistUser, message: "This user is already exist" }, { status: 401 })
        }

        const hachedPassword = await bcrypt.hash(password, 10);


        const newUser = await User.create({
            name,
            email,
            password: hachedPassword
        })
        return NextResponse.json({ message: 'User is created succesfully', user: newUser }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error", error: error }, { status: 500 })
    }
}