import Loader from "../../Eclipse-1s-200px.svg";

export default function GenricReaButton({ text, func, state, disabled }) {
  return (
    <button
      className="text-bold h-full w-full rounded-[5px]  border-none bg-netflix_red px-2 py-1 text-white outline-none"
      disabled={disabled}
      onClick={() => {
        func();
      }}
    >
      {state ? "Loading." : text}
    </button>
  );
}
