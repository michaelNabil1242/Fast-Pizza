import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPizzaPrice, getTotalPizzaQuantity } from "./cartSlice";

function CartOverview() {
  const totalPizzaQuantity = useSelector(getTotalPizzaQuantity);
  const totalPizzaPrice = useSelector(getTotalPizzaPrice);
  return (
    <div className="bg-stone-800 p-4 text-stone-200">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{totalPizzaQuantity}</span>
        <span>${totalPizzaPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
