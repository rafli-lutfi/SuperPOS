import Image from "next/image";
import Spinner from "./Spinner";

export default function Loading() {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <Image src={"/logo-2.png"} width={200} height={200} alt="logo" />
                <Spinner />
            </div>
        </div>
    );
}
