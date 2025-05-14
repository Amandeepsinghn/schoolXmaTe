export function HistorySection({ type }) {
  return (
    <div className="flex flex-col pl-2 gap-2">
      <div className="font-bold">{type}</div>
      <div>History</div>
    </div>
  );
}
