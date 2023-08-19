import { api } from "@/utils/api";
import SearchArea from "@/components/SearchBar";
import HomeScreen from "@/components/homescreen/HomeScreen";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  return (
    <>
      <div className="h-screen w-screen ">
        <HomeScreen />
      </div>
    </>
  );
}
