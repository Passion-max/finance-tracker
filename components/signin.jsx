import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc"

import { authContext } from "@/lib/store/auth-context";

function SignIn() {
    const { googleLoginHandler } = useContext(authContext)
    return (
        <main className="container max-w-2xl px-6 mx-auto">

            <div className="flex items-center gap-2 mb-9">
                <div className="h-[60PX] w-[60px] rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="/BBB logo.png" alt="Beginner Bugdet Buddy Logo" referrerPolicy="no-referrer" />
                </div>
                <small className="text-4xl font-bold capitalize">BEGINNER BUDGET BUDDY</small>
            </div>
            <h1 className="mb-6 text-4xl font-bold text-center">Welcome 👋</h1>

            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-600 bg-slate-500 rounded-2xl">
                <div className="h-52">
                    <img className="object-cover w-full h-full" src="/hero-image.jpg" alt="image" />
                </div>


                <div className="px-4 py-4">
                    <h3 className="text-2xl text-center ">Please Signin to continue</h3>

                    <button onClick={googleLoginHandler} className="flex self-start p-4 mx-auto gap-2 mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg"> <FcGoogle className="text-2xl" />Google</button>
                </div>

            </div>

            <div className="mt-6 bg-slate-700 rounded-2xl px-4 py-4 ">
                <p> <span className="font-bold">Welcome to Beginner Budget Buddy :</span> Your Personal Finance Companion! Take control of your finances effortlessly with our intuitive app designed for beginners. Track expenses, set budgets, and achieve financial goals with ease. Start your journey to financial empowerment today!"</p>
            </div>
        </main>
    )
}

export default SignIn