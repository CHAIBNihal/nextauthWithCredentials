import { connect } from "@/Connect/Mongodb";
import User from "@/Models/User";
import { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            credentials: {},
            async authorize(credentials : any)  {
                const {email,password} = credentials;

                try {
                    await connect();
                    const isUser = await User.findOne({email})
                    if(!isUser){
                        return null;
                    }
                     const decodedPass = await bcrypt.compare(password, isUser.password);
                     
                     if(!decodedPass){
                        return null;
                     }
                     return isUser;
                } catch (error) {
                    console.log("an error is occured", error)
                }
               
            },
        
        }),
    

    ],
    pages : {
        signIn : "/auth/signin"
    },
    session : {
        strategy : "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET
}