import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(removeItem(pizzaId));
  }
  return (
    <Button onClick={handleClick} type="small">
      delete
    </Button>
  );
}

export default DeleteItem;
