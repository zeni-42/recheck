"use client"
import Navbar from "@/components/Navbar"
import Popup from "@/components/popup"
import axios from "axios"
import { div } from "motion/react-client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Page(){
    const router = useRouter();
    const [isVerified, setIsVerified] = useState(false)

    const verifyUser = async () => {
        const id = sessionStorage.getItem('userId');
        if (!id) {
            toast.error("Unauthorized access")
            router.push('/login')
        } else {
            try {
                const res = await axios.post('/api/userDetails', { userId: id })
                setIsVerified(res.data.data.isVerified)
            } catch (error) {
                console.error('Error verifying user');
            }
        }
    }

    useEffect(() => {
        verifyUser();
    }, [])

    return(
        <>
        <Navbar />
        {
            !isVerified && (
                <Popup />
            )
        }
        <div className="mt-14" >
        </div>
        </>
    )
}