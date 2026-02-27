import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPizzaPrice } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
import { getTotalCartQuantity } from "../../../../../ultimate-react-course-main/16-fast-react-pizza/final-2-final/src/features/cart/cartSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const formErrors = useActionData();
  const navigation = useNavigation();

  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();

  const {
    userName,
    status: adressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = adressStatus === "loading";

  const cart = useSelector(getCart);
  const totlCartPrice = useSelector(getTotalPizzaPrice);

  const isSubmitting = navigation.state === "submitting";
  const priorityPrice = withPriority ? totlCartPrice * 0.2 : 0;
  const totalPrice = totlCartPrice + priorityPrice;

  const isCartEmpty = useSelector(getTotalCartQuantity) === 0;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col sm:flex sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input sm:grow"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex flex-col sm:flex sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="sm:grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-200 px-2 py-1 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col sm:flex sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="sm:grow">
            <input
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
              className="input w-full"
            />
            {adressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-200 px-2 py-1 text-xs text-red-700">
                There was a problem getting your address. Make sure to fill this
                field!
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="z-99 absolute bottom-0 right-[0px] top-[24px] sm:top-1">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-6">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.longitude && position.latitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />
        <div>
          {isCartEmpty ? (
            <Button type="small" to="/menu">
              Back to menu
            </Button>
          ) : (
            <Button disabled={isSubmitting || isLoadingAddress} type="primary">
              {isSubmitting
                ? "...placing order"
                : `Order now, for ${formatCurrency(totalPrice)}`}
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please enter a valid phone number we might need it to contact you";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
