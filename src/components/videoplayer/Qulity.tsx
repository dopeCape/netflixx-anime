import { useEffect } from "react";

export default function Qulity({ qulityes, changeQulityes, currentQulity }) {
  useEffect(() => { console.log(currentQulity) }, [])

  return (
    <div className="flex h-full w-full flex-col  bg-netflix_meny_gray ">
      <div className="text-bold   ml-8 mt-5 text-[1.5rem] text-white">
        Video Qulity
      </div>
      <div className="mt-2 flex h-full w-full  flex-col  cursor-pointer ">
        {qulityes.map((q, index) => {
          return (
            <div
              key={index}
              className="w-full px-2 py-3 text-white hover:bg-[#3c3c3c] "
              onClick={() => {
                if (currentQulity != q.quality) {
                  changeQulityes(q.url, q.quality)
                }
              }}
            >
              <div className=" flex"
              >
                <div className={`ml-1 opacity-${currentQulity == q.quality ? 100 : 0}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white" data-name="Checkmark" aria-hidden="true" data-uia="audio-selected"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z" fill="currentColor"></path></svg>
                </div>
                <div className="ml-5">
                  {q.quality}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
