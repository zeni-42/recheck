"use client"
import Image from "next/image";
import logo from '@/images/gradiant.jpg'
import { ArrowUpRight, KeyRound, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function Page(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await axios.post('/api/signup', {
            fullName: name,
            email,
            password
        })
        console.log(res);
        setEmail("")
        setName("")
        setPassword("")
        toast.success("User registered!")
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
                    <h1 className="text-2xl font-semibold" > Sign up </h1>
                    <div className="w-full h-2/3 flex justify-evenly items-center flex-col px-5" >
                        <div className="w-full  ">
                            <UserRound className="translate-y-[42px] translate-x-5"/>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full bg-transparent border border-zinc-700 h-16 rounded-xl outline-none px-16 text-lg" placeholder="Name" />
                        </div>
                        <div className="w-full  ">
                            <Mail className="translate-y-[42px] translate-x-5"/>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="w-full bg-transparent border border-zinc-700 h-16 rounded-xl outline-none px-16 text-lg" placeholder="Email" />
                        </div>
                        <div className="w-full  ">
                            <KeyRound className="translate-y-[42px] translate-x-5"/>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="w-full bg-transparent border border-zinc-700 h-16 rounded-xl outline-none px-16 text-lg" placeholder="Password" />
                        </div>
                        <div className="w-full pt-7" >
                            <button onClick={handleSubmit} className="w-full h-14 text-lg bg-white text-zinc-950 hover:bg-zinc-50 rounded-xl "> Sign up </button>
                        </div>
                    </div>
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