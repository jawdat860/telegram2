import { Modal, Placeholder, VisuallyHidden } from "@telegram-apps/telegram-ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { FaCartShopping } from "react-icons/fa6";
import BuyItem from "./BuyItem";
import { useContext , useState, useEffect } from "react";
import CartContext from "../store/CartContext";
import classes from './Cart.module.css';
import classe from './HeaderCartButton.module.css';
function BuyPage() {
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };
  const numberOfCartItems = cartCtx.items.length
  const btnClasses = `${classe.button} ${btnIsHighlighted ? classe.bump : ''}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartCtx.items]);

  return (
    <Modal
      header={<ModalHeader style={{ backgroundColor: "transparent", padding: "1rem 2rem" }}>Service Details</ModalHeader>}
      trigger={
        <button
          className={`bg-gradient-to-r relative rounded-[100%] from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-2  flex items-center gap-3 ${btnClasses}`  }
        >
          <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
          <span className="hidden md:inline">View Cart</span>
          {cartCtx.items.length === 0 ? "":  <span className={classe.badge}>{numberOfCartItems}</span>}
        </button>
      }
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "transparent",
      }}
    >
      <DialogTitle>
        <VisuallyHidden>Cart Details</VisuallyHidden>
      </DialogTitle>

      <div className="h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        {/* Cart items list */}
        <div className="overflow-y-auto flex-grow mb-6">
          <ul className={`${classes['cart-items']} flex flex-col gap-4`}>
            {cartCtx.items.map((item) => (
              <BuyItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
              />
            ))}
          </ul>
        </div>

        {/* Total amount and buttons */}
        <div className="mt-6">
          <div className="flex justify-between items-center text-gray-900 dark:text-white text-lg font-semibold mb-4">
            <span>Total Amount:</span>
            <span>{totalAmount}</span>
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-200"
              onClick={() => {}}
            >
              Close
            </button>
            {hasItems && (
              <button
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white py-2 px-6 rounded-md shadow-md transition duration-200"
              >
                Order
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default BuyPage;
