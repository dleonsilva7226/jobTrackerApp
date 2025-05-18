import { FilterStatuses } from "./FilterStatuses";

export interface HeaderProps {
  onAddClick: () => void;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterStatuses>>;
  currentFilter: FilterStatuses;
}

const Header: React.FC<HeaderProps> = ({onAddClick, setCurrentFilter, currentFilter}) => {

  const handleFilterChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const filterValue = event.currentTarget.value as FilterStatuses;
    setCurrentFilter(filterValue);
    console.log("Filter changed to:", filterValue);
  };

  return (
    <header className = "flex justify-between items-center text-gray-800 p-[30px]">
      <h1 className="text-[50px] font-bold italic">Job Tracker</h1>
      <div className="flex space-x-[50px]">
        <div className = "flex space-x-4">
            {[FilterStatuses.Offer, FilterStatuses.Applied, FilterStatuses.Interviewing, FilterStatuses.Rejected, FilterStatuses.Nothing].map((filterStatus) =>
              <button key={filterStatus.toLowerCase()} onClick={handleFilterChange} value={filterStatus}>{filterStatus}</button>
            )}
        </div>
        <button className = "h-[50px] w-[150px] bg-blue-500 rounded-xl" onClick={onAddClick}>Add Application</button>
      </div>
    </header>
  );
}
export default Header;