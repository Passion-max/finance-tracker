import React, {useContext} from "react";
import {FcGoogle} from "react-icons/fc"

import { authContext } from "@/lib/store/auth-context";

function SignIn() {
    const {googleLoginHandler} = useContext(authContext)
     return (
        <main className="container max-w-2xl px-6 mx-auto">
            <h1 className="mb-6 text-6xl font-bold text-center">Welcome 👋</h1>

            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-600 bg-slate-500 rounded-2xl">
                    <div className="h-52">
                        <img className="object-cover w-full h-full" src="https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" srcset="" />
                    </div>
            

            <div className="px-4 py-4">
                <h3 className="text-2xl text-center">Please Signin to continue</h3>

                <button onClick={googleLoginHandler} className="flex self-start p-4 mx-auto gap-2 mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg"> <FcGoogle className="text-2xl" />Google</button>
            </div>

            </div>
        </main>
    )
}

export default SignIn