"use client"
import {Aperture, ChevronRight, House, Menu, Server, Settings } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import profile from "@/images/pfp.jpeg"

export default function Navbar(){
    const [isActive, setIsActive ] = useState(false);

    return(
        <>
        <div className="fixed top-0 w-full h-14 backdrop-blur-lg px-10 flex  justify-between border-b border-zinc-800 items-center " >
            <div className="w-40 h-full flex justify-center items-center gap-3" >
                <Aperture /> <h1 className="uppercase text-xl font-semibold" >Recheck</h1>
            </div>
            <div className="w-40 h-full flex justify-center items-center " >
                <button onClick={() => setIsActive((prev) => !prev )} className="w-1/2 h-full flex justify-center items-center">
                    <Menu size={28} />
                </button>
            </div>
        </div>
        <AnimatePresence>
        {
            isActive && (
                <motion.div
                initial = {{ x: "100%" }}
                animate = {{ x: "0%" }}
                transition={{ duration: 0.5, delay:0.2 }}
                exit={{ x: "100%" }}
                className="fixed h-[94vh] top-14 right-0 w-1/5 bg-zinc-900/50 backdrop-blur-3xl flex justify-between flex-col ">
                    <div>
                        <Link href={"/dashboard"} className="hover:bg-zinc-800/50 hover:backdrop-blur-2xl w-full h-14 border-b border-zinc-800 flex justify-start items-center px-10 gap-3 " >
                            <House /><h1 className="text-lg" > Dashboard </h1>
                        </Link>
                        <Link href={"/servers"} className="hover:bg-zinc-800/50 hover:backdrop-blur-2xl w-full h-14 border-b border-zinc-800 flex justify-start items-center px-10 gap-3 " >
                            <Server /><h1 className="text-lg" > Servers </h1>
                        </Link>
                        <Link href={"/settings"} className="hover:bg-zinc-800/50 hover:backdrop-blur-2xl w-full h-14 border-b border-zinc-800 flex justify-start items-center px-10 gap-3 " >
                            <Settings /><h1 className="text-lg" > Settings </h1>
                        </Link>
                    </div>
                    <div>
                        <Link href={""} className="hover:bg-zinc-800 w-full h-14 border-t border-zinc-800 flex justify-start items-center px-10 gap-3 " >
                            <Image src={profile} alt="profilePicture" className="size-7 rounded" />
                            <h1 className="text-lg flex justify-center items-center" > Account <ChevronRight /></h1>
                        </Link>
                    </div>
                </motion.div>
            )
        }
        </AnimatePresence>
        </>
    )
}