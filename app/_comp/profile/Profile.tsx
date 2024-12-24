
import Image from "next/image";
import { useSession } from "next-auth/react";
import Login from "../auth/Login";
import SignOutBtn from "../auth/SignOutBtn";
export default  function Home() {
  const { data, status } =  useSession();

  return (
    <div>
      {status === "loading" && <p>loading</p>}
      {status === "unauthenticated" && <Login />}
      {status === "authenticated" && (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Home Page </h1>
        <h1>Email : {data.user?.email}</h1>
        <h1>Name : {data.user?.name} </h1>
        <SignOutBtn/>
      </div>)
      }

    </div>
  );
}
