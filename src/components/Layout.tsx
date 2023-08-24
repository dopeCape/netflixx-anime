import NavBar from "./navbar/Narbar";
export default function Layout({ children }) {
  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 z-50 h-[5%] w-full bg-transparent">
        <NavBar />
      </div>
      {children}
    </div>
  );
}
