import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 border-stone-200 bg-yellow-500 px-4 py-3 uppercase tracking-widest">
      <Link to="/">FAST REACT PIZZA CO.</Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
