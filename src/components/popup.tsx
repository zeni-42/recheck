import Link from "next/link";

export default function Popup(){
    return(
        <>
        <div className="mt-14 w-full h-fit bg-yellow-500 text-black flex justify-center items-center ">
            You are not verified, Please verify your account <Link className="ml-2 underline" href={"/accounts"}>Verify now </Link> 
        </div>
        </>
    )
}