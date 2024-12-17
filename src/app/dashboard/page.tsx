"use client"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Page(){
    const router = useRouter()

    const handleLogout = async () => {
        const res = await axios.post('/api/logout')
        console.log(res);        
        router.push('/login')
    }

    return(
        <>
        This is the Dashboard <br />
        <button onClick={handleLogout} className="border border-red-600 text-red-600 w-40 h-10 rounded-xl" > Logout </button>
        </>
    )
}