const onClick = () => {
    console.log("clicked");
}

const Header: React.FC = () => {
  return (
    <header className = "flex justify-between items-center text-gray-800 p-[30px]">
      <h1 className="text-[50px] font-bold italic">Job Tracker</h1>
      <div className="flex space-x-[50px]">
        <div className = "flex space-x-4">
            <button>Offer</button>
            <button>Applied</button>
            <button>Interviewing</button>
            <button>Rejected</button>
        </div>
        <button className = "h-[50px] w-[150px] bg-blue-500 rounded-xl" onClick={onClick}>Add Application</button>
      </div>
    </header>
  );
}
export default Header;