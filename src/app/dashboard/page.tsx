"use client"
import Navbar from "@/components/Navbar"
import Popup from "@/components/popup"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Page(){
    const router = useRouter();
    const [name, setName] = useState("")
    const [isVerified, setIsVerified] = useState(false)

    const verifyUser = async () => {
        const id = sessionStorage.getItem('userId');
        if (!id) {
            toast.error("Unauthorized access")
            router.push('/login')
        }
    }

    const defaultConfig = async () => {
        const userId = sessionStorage.getItem("userId")
        setName(sessionStorage.getItem("fullName")!)
        const boolValue = sessionStorage.getItem("isVerified")
        setIsVerified(Boolean(boolValue))
        try {
            const res = await axios.post("/api/userDetails", { userId })
            setIsVerified(res.data.data.isVerified)
        } catch (error) {
            console.log(`${error}`);
        }
    }

    useEffect(() => {
        verifyUser();
        defaultConfig();
    }, [])  

    return(
        <>
        <Navbar />
        {
            !isVerified ? (
                <Popup />
            ) : (
                <div className="mt-14">
                </div>
            )
        }
        <div className="w-full p-10" >
            <h1 className="text-4xl font-semibold" >{`Welcome ${name}`}</h1>
            <p className="text-zinc-400" > check your servers status</p>
        </div>
        </>
    )
}