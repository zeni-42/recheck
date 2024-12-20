"use client"
import Navbar from "@/components/Navbar";
import Popup from "@/components/popup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page(){
    const router = useRouter()
    const [isVerified, setIsVerified] = useState(false)

    const verifyUser = async () => {
        const id = sessionStorage.getItem('userId');
        if (!id) {
            toast.error("Unauthorized access")
            router.push('/login')
        }
    }

    useEffect(() => {
        verifyUser();
    },[])

    return(
        <>
        <Navbar />
        
        <div className="p-10" >
            <h1 className="text-4xl font-semibold">Your servers status</h1>
        </div>
        </>
    )
}