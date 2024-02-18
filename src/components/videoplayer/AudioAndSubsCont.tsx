interface Iprop {
  isDubAvaliable: boolean;
  isDub: boolean;
  isDubSetter: (x: boolean) => void;
  changeSouce: (isDub: boolean) => void;
}
export default function AudioAndSubsCont({
  isDubSetter,
  isDubAvaliable,
  isDub,
  changeSouce,
}: Iprop) {
  return (
    <div className=" relative flex h-full  w-full bg-[#262626] text-white ">
      <div className="relative flex h-full w-[50%]  flex-col">
        <div className="ml-16 mt-5 text-[2rem] text-white">Audio</div>
        <div
          className=" flex cursor-pointer bg-[#262626] py-3 hover:bg-[#3c3c3c]"
          onClick={() => {
            if (isDub) {
              isDubSetter(false);
              changeSouce(false)
            }
          }}
        >
          <div style={{ opacity: !isDub ? 1 : 0 }} className="ml-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
              data-name="Checkmark"
              aria-hidden="true"
              data-uia="audio-selected"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="ml-3 text-xl text-white ">Japanese</div>
        </div>
        {isDubAvaliable && (
          <div
            className=" flex cursor-pointer bg-[#262626] py-3 hover:bg-[#3c3c3c]"
            onClick={() => {
              if (!isDub) {
                isDubSetter(true);
                changeSouce(true)
              }
            }}
          >
            <div style={{ opacity: isDub ? 1 : 0 }} className="ml-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
                data-name="Checkmark"
                aria-hidden="true"
                data-uia="audio-selected"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <div className="ml-3 text-xl">English</div>
          </div>
        )}
      </div>
      <div className="relative flex h-full w-[50%]  flex-col">
        <div className="ml-16 mt-5 text-[2rem] text-white">Subtitles</div>{" "}
      </div>
    </div>
  );
}
