import { FaPlay } from "react-icons/fa";
export function GenerateButton({ onClick }) {
  return (
    <button className="cursor-pointer" onClick={onClick}>
      <div className="flex p-2 w-fit my-5 flex-row items-center gap-2 rounded-3xl bg-black">
        <div className="p-2 rounded-full bg-grey-400">
          <FaPlay className="" />
        </div>
        <div className="text-white">Generate Quiz</div>
      </div>
    </button>
  );
}
