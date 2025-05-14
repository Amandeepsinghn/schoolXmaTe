import { SearchIcon } from "../icons/SearchIcon";
export function SearchBar() {
  return (
    <div className="flex items-center justify-around border border-slate-600 rounded-full px-3 py-1">
      <div>
        <input type="text" placeholder="Search" />
      </div>
      <SearchIcon />
      <div className="flex"></div>
    </div>
  );
}
