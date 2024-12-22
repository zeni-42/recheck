"use client"
import Navbar from "@/components/Navbar";
import Popup from "@/components/popup";
import axios from "axios";
import { X, Plus, Timer,Link, Server} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Page(){
    const router = useRouter()
    const [isAddedActive, setIsAddedActive] = useState(false)
    const {register, handleSubmit, reset} = useForm()

    const verifyUser = async () => {
        const id = sessionStorage.getItem('userId');
        if (!id) {
            toast.error("Unauthorized access")
            router.push('/login')
        }
    }
    const isVerifiedFromLocalStorage = sessionStorage.getItem("isVerified")

    const handleResponse = (status: number) => {
        switch (status) {
            case 200:
                toast.success("Server added successfully");
                break;
            case 400:
                toast.error("All fields are required");
                break;
            case 420:
                toast.error("Server already exists");
                break;
            case 414:
                toast.error("Failed to update user");
                break;
            case 415:
                toast.error("Failed to add server");
                break;
            case 500:
                toast.error("Internal server error");
                break;
            default:
                toast.error("Something went wrong. Please try again.");
        }
    };

    const verifyAndAddserver = async (data: object) => {
        const userId = sessionStorage.getItem("userId")
        if (!userId) {
            toast.error("Unauthorized access")
            router.push('/login')
        }
        const userDetails = await axios.post('/api/userDetails',{ userId })
        const updatedData = {...data, userDetails: userDetails.data.data}
        const serverResponseForAddingServer = await axios.post("/api/addServer",{ ...updatedData })
        handleResponse(serverResponseForAddingServer.status)
        if (serverResponseForAddingServer.status === 200) {
            reset()
            setIsAddedActive(false)
        }
    }

    useEffect(() => {
        verifyUser();
    },[])

    return(
        <>
        <Navbar />
        {
            isVerifiedFromLocalStorage === 'false' ? (
                <Popup />
            ) : (
                <div className="mt-14" ></div>
            )
        }
        <div className="p-10 flex justify-between items-center ">
            <h1 className="text-4xl font-semibold">Manage your servers</h1>
            <button onClick={() => setIsAddedActive(e => !e)} className="w-40 h-14 flex justify-center items-center gap-2 bg-yellow-500 text-black rounded-xl " ><Plus /> Add server </button>
        </div>
        <AnimatePresence>
        {
            isAddedActive && (
                <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                    exit={{ y:"-100%" }}
                    className="w-full h-screen fixed top-0 bg-black/70 backdrop-blur-3xl" >
                    <div className="border-b border-zinc-800 w-full h-20 flex justify-between items-center px-20" >
                        <h1 className="text-2xl font-semibold">Add server</h1>
                        <button onClick={() => setIsAddedActive(e => !e)} ><X size={32} /></button>
                    </div>
                    <form onSubmit={handleSubmit(verifyAndAddserver)} className="w-full h-[92vh] flex ">
                        <div className="w-1/3 h-full flex justify-center items-center flex-col gap-5 " >
                            <div className="px-10 h-14 rounded-xl flex justify-start gap-2 items-center w-1/2 bg-zinc-900"><Server /> Server Name </div>
                            <div className="px-10 h-14 rounded-xl flex justify-start gap-2 items-center w-1/2 bg-zinc-900"><Link /> Server URL </div>
                            <div className="px-10 h-14 rounded-xl flex justify-start gap-2 items-center w-1/2 bg-zinc-900"><Timer /> Default Time</div>
                        </div>
                        <div className="w-2/3 bg-zinc-950 rounded-l-2xl h-full flex justify-start items-center py-10 flex-col ">
                            <div className="w-full h-1/4 flex justify-center items-start flex-col px-40 gap-5 " >
                                <h1 className="text-3xl font-mono " >Server Name:</h1>
                                <input autoComplete="off" {...register("serverName")} className="text-lg px-5 w-full rounded-lg h-14 outline-none bg-transparent border border-zinc-800" type="text" />
                            </div>
                            <div className="w-full h-1/4 flex justify-center items-start flex-col px-40 gap-5 " >
                                <h1 className="text-3xl font-mono " >Server URL:</h1>
                                <input autoComplete="off" {...register("serverAddress")} className="text-lg px-5 w-full rounded-lg h-14 outline-none bg-transparent border border-zinc-800" type="text" />
                            </div>
                            <div className="w-full h-1/4 flex justify-center items-start flex-col px-40 gap-5 " >
                                <h1 className="text-3xl font-mono " >Default time:</h1>
                                <select {...register("defaultTimer")} defaultValue={"10m"} className="text-lg px-5 w-full rounded-lg h-14 outline-none bg-transparent border border-zinc-800" >
                                    <option className="bg-black border-none" value="1m">1 minute</option>
                                    <option className="bg-black border-none" value="3m">3 minute</option>
                                    <option className="bg-black border-none" value="5m">5 minute</option>
                                    <option className="bg-black border-none" value="10m">10 minute</option>
                                </select>
                            </div>
                            <div className="w-full h-1/4 px-40 gap-10 flex " >
                                <button onClick={() => reset() } className="w-60 h-14 text-yellow-500 border border-yellow-500/50 rounded-xl" >
                                    Clear
                                </button>
                                <button type="submit" className="w-60 h-14 bg-yellow-500 rounded-xl text-black " >
                                    Veify & add server
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            )
        }
        </AnimatePresence>
        </>
    )
}