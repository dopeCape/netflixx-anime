import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import GenricReaButton from "./GenricButtonRed";
import NetflixLogo from "../../../public/netflix (1).svg"

export default function HomeScreenheader() {
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <div className="absolute z-30 flex h-[10%] w-screen justify-between px-5 pt-5 2xl:justify-around ">
      <img
        src={NetflixLogo}
        alt="netflix"
        className="relative  z-30 w-[160px] 2xl:right-[10%] 2xl:w-[200px]"
      />

      <div className=" relative top-[10%] h-[40px] w-[100px] 2xl:left-[10%] ">
        <GenricReaButton
          func={() => {
            if (status == "authenticated") {
              void signOut()

            }
            if (status == "unauthenticated") {

              void router.push("/login");

            }
          }}
          text={status === "loading" ? "loading" : status == "authenticated" ? "logout" : status == "unauthenticated" ? "Sign in" : ""}
        />
      </div>
    </div>
  );
}
