
import Link from "next/link";
import Header from "../components/Header";

export default function Page404() {

    return (
        <>
        
        <Header
            title={"Page not Found"}
        />
        <div className="flex justify-center">
                <h1 className="pt-8" style={{fontSize: "x-large"}}>The page you're looking for can't be found</h1>

        </div>
        <div className="flex justify-center pt-4 ">
            <Link className="hover:text-blue-400 bg-gray-200 rounded-md px-5 py-2" href="/">Return Home</Link>

        </div>

                    
            


        </>
        
    )
}