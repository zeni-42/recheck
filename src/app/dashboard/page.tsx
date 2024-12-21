"use client"
import Navbar from "@/components/Navbar"
import Popup from "@/components/popup"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Page(){
    const router = useRouter();

    const verifyUser = async () => {
        const id = sessionStorage.getItem('userId');
        if (!id) {
            toast.error("Unauthorized access")
            router.push('/login')
        }
    }

    const isVerifiedFromLocalstorage = sessionStorage.getItem("isVerified")
    const nameFromLocalstorage = sessionStorage.getItem("fullName")

    useEffect(() => {
        verifyUser();
    }, [])  

    return(
        <>
        <Navbar />
        {
            isVerifiedFromLocalstorage === 'false' ? (
                <Popup />
            ):(
                <div className="mt-14"></div>
            )
        }
        <div className="w-full p-10" >
            <h1 className="text-4xl font-semibold" >{`Welcome ${nameFromLocalstorage}`}</h1>
            <p className="text-zinc-400" > check your servers status</p>
        </div>
        </>
    )
}