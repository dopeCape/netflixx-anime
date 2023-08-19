export default function GenricReaButton({ text, func }) {
  return (
    <button
      className="text-bold h-full w-full rounded-[5px]  border-none bg-netflix_red px-2 py-1 text-white outline-none"
      onClick={() => {
        func();
      }}
    >
      {text}
    </button>
  );
}
