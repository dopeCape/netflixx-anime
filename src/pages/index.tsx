import { api } from "@/utils/api";
import SearchArea from "@/components/SearchBar";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  return (
    <>
      <div className="h-screen w-screen bg-black">
        <div className="h-full w-full">
          <SearchArea />
        </div>
      </div>
    </>
  );
}
