import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { getTotalPizzaQuantity } from "../features/cart/cartSlice";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const totalPizzaQuantity = useSelector(getTotalPizzaQuantity);
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header></Header>
      <div className="no-scrollbar overflow-auto">
        <div className="mx-auto max-w-3xl">
          <Outlet />
        </div>
      </div>
      {totalPizzaQuantity !== 0 && <CartOverview />}
    </div>
  );
}

export default AppLayout;
