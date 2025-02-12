import Image from "next/image";
import Spinner from "./Spinner";

export default function Loading() {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <Image src={"/logo-2.png"} width={200} height={200} alt="logo" />
                <Spinner />
            </div>
        </div>
    );
}
