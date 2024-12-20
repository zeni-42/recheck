"use client"
import Image from "next/image";
import logo from '@/images/gradiant.jpg'
import { ArrowUpRight, KeyRound, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormData {
    fullName: string
    email: string
    password: string
}

export default function Page(){
    const router = useRouter();
    const { register, handleSubmit, reset, formState: {errors} } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const res = await axios.post('/api/signup', data)
            if (res.status === 200) {
                toast.success("User registerd")
                reset();
                router.push('/login')
            }
        } catch (error : any) {
            if (error.response) {
                const { status, data} = error.response
                if (status === 400) {
                    toast.error(data.message || "Missing values")
                } else if (status === 401){
                    toast.error(data.message || "Email is taken")
                } else {
                    toast.error("Internal server error")
                }
            } else {
                toast.error("Somthing went wrong. Please try again later")
            }
        }
    }

    return(
        <>
        <div className="w-full h-screen p-5 flex justify-between items-center" >
            <div className="w-1/2 h-full rounded-3xl  ">
                <Image src={logo} alt="Test Image" className="top-0 left-0 -z-10 relative w-5/6 h-full rounded-3xl " />
                <h1 className="absolute top-0 p-10 text-3xl font-mono tracking-tight" >Looks like you are new here </h1> 
                <p className="px-10 font-mono text-xl absolute top-20 text-md" >go ahead and signup </p>
                <a href="mailto:mailzeni42@gmail.com" target="_blank" className="absolute bottom-10 px-10 flex underline" >contact <ArrowUpRight/> </a>
            </div>
            <div className="w-1/2 h-screen flex justify-center items-center flex-col gap-10 ">
                <div>
                    <h1 className="text-4xl font-extrabold uppercase" >Recheck</h1>
                </div>
                <div className="w-2/3 h-2/3 rounded-3xl border border-zinc-800 p-7 flex justify-start items-center flex-col gap-5" >
                    <h1 className="text-2xl font-semibold uppercase" > Sign up </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-2/3 flex justify-evenly items-center flex-col px-5" >
                        <div className="w-full  ">
                            <UserRound className="translate-y-[42px] translate-x-5"/>
                            <input {...register("fullName", {required: true})} type="text" autoComplete="off" className="w-full bg-[#0a0a0a] border border-zinc-700 h-16 rounded-xl outline-none px-16 text-lg" placeholder="Full Name" />
                        </div>
                        <div className="w-full  ">
                            <Mail className="translate-y-[42px] translate-x-5"/>
                            <input {...register("email", { required: true })} type="eamil" autoComplete="off" className="w-full bg-[#0a0a0a] border border-zinc-700 h-16 rounded-xl outline-none px-16 text-lg" placeholder="Email" />
                        </div>
                        <div className="w-full  ">
                            <KeyRound className="translate-y-[42px] translate-x-5"/>    
                            <input {...register("password", { required: true })} type="password" autoComplete="off" className="w-full bg-[#0a0a0a] border border-zinc-700 h-16 rounded-xl outline-none px-16 text-lg" placeholder="Password" />
                        </div>
                        <div className="w-full pt-7" >
                            <button type="submit" className="w-full h-14 text-lg bg-white text-zinc-950 hover:bg-zinc-50 rounded-xl "> Sign up </button>
                        </div>
                    </form>
                    <p className=" w-full px-7 text-zinc-400 " >
                        already have an account? <Link href='/login' className="underline text-slate-50 "> Login </Link>
                    </p>
                    <p className="text-zinc-700 pt-5" >
                        Google authentication will be provided soon
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}