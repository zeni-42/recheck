"use client"
import Image from "next/image";
import axios from "axios";
import bg from "@/images/gradiant.jpg"
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
    email: string,
    password: string
}

export default function Page(){
    const [fullName, setFullName] = useState("")


    const router = useRouter()
    const { register, handleSubmit, reset, formState: {errors} } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const res = await axios.post('/api/login', data)
            if (res.status === 200) {
                sessionStorage.setItem("userId", res.data.data._id)
                sessionStorage.setItem("fullName", res.data.data.fullName)
                sessionStorage.setItem("isVerified", res.data.data.isVerified)
                setFullName(res.data.data.fullName)
                toast.success(`Welcome ${fullName}`)
                router.push('/dashboard')
                reset();
            }
        } catch (error : any) {
            if (error.response) {
                const { status, data} = error.response
                if (status === 400) {
                    toast.error(data.message || "Missing values")
                } else if (status === 404){
                    toast.error(data.message || "User not found")
                } else if (status === 401) {
                    toast.error(data.message ||  "Invalid credentials")
                } else {
                    toast.error("Inernal server error")
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
                <Image src={bg} alt="Test Image" className="object-fill top-0 left-0 -z-10 relative w-5/6 h-full rounded-3xl " />
                <h1 className="absolute top-0 p-10 text-3xl font-mono tracking-tight" >Welcome!  </h1> 
                <p className="px-10 font-mono text-xl absolute top-20 text-md" >Login to see your Dashboard</p>
            </div>
            <div className="w-1/2 h-screen flex justify-center items-center flex-col gap-10 ">
                <div>
                    <h1 className="text-4xl font-extrabold uppercase" >Recheck</h1>
                </div>
                <div className="w-2/3 h-1/2 rounded-3xl border border-zinc-800 p-7 flex justify-start items-center flex-col gap-5" >
                    <h1 className="text-2xl font-semibold uppercase " >Login </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-2/3 flex justify-start items-center flex-col px-5" >
                        <div className="w-full  ">
                            <Mail className="translate-y-[42px] translate-x-5"/>
                            <input {...register("email", { required: true })} type="eamil" autoComplete="off" className="w-full bg-[#0a0a0a] border border-zinc-700 h-16 rounded-xl outline-none px-16 text-lg" placeholder="Email" />
                        </div>
                        <div className="w-full  ">
                            <KeyRound className="translate-y-[42px] translate-x-5"/>    
                            <input {...register("password", { required: true })} type="password" autoComplete="off" className="w-full bg-[#0a0a0a] border border-zinc-700 h-16 rounded-xl outline-none px-16 text-lg" placeholder="Password" />
                        </div>
                        <div className="w-full pt-7" >
                            <button type="submit" className="w-full h-14 text-lg bg-white text-zinc-950 hover:bg-zinc-50 rounded-xl "> Login </button>
                        </div>
                    </form>
                    <p className=" w-full px-7 text-zinc-400 " >
                        don't have an account? <Link href='/signup' className="underline text-slate-50 ">Signup</Link>
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