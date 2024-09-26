import React, { useReducer } from 'react';

const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  updateItem: (id, amount) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
      const existingItem = state.items[existingItemIndex];
      
      if (existingItem) {
        // Update the existing item's quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };
        return { items: updatedItems };
      } else {
        // Add a new item
        return { items: [...state.items, action.item] };
      }
    case 'UPDATE_ITEM':
      const itemIndex = state.items.findIndex(item => item.id === action.id);
      const updatedItem = { ...state.items[itemIndex], amount: action.amount };
      const updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
      return { items: updatedItems };
    case 'REMOVE_ITEM':
      return { items: state.items.filter(item => item.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
};

export const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const addItemToCart = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  };

  const updateItemInCart = (id, amount) => {
    dispatchCartAction({ type: 'UPDATE_ITEM', id, amount });
  };

  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  };

  const clearCart = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        addItem: addItemToCart,
        updateItem: updateItemInCart,
        removeItem: removeItemFromCart,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
