interface ICardProp {
  url: string;
  name: string;
  synopsis: string;
  rating: number;
  width: number;
}
export default function Card({ url, name, synopsis, rating, width }: ICardProp) {
  return (
    <div className="relative flex h-full    justify-end overflow-hidden rounded-[5px]"
      style={{ width: `${width == 0 ? "100%" : width + "px"}` }}
    >
      <img className="ml-auto h-full  w-full  object-cover" src={url} />
      <div className="text-bold absolute bottom-0 left-0 z-20 mb-5 ml-5 text-[20px] text-white">
        {name}
      </div>
      <div className="left_opac absolute bottom-0 left-0  z-10 h-[40%] w-full"></div>
    </div>
  );
}
