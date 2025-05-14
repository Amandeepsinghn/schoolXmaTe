import { SearchBar } from "./Searchbar";
import logo from "../icons/logo.png";
import { HistorySection } from "./HistorySection";
export function Sidebar() {
  return (
    <div className="h-screen bg-grey-400 w-76  p-3 flex flex-col gap-8">
      <div>
        <img src={logo} className="w-30 h-13" />
      </div>
      <div>
        <SearchBar />
      </div>
      <HistorySection type="Today" />
      <HistorySection type="Yestarday" />
      <HistorySection type="This Month" />
    </div>
  );
}
