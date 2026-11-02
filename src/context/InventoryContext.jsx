import { createContext, useContext, useReducer } from 'react';
import initialProducts from '../data/products';

// Acciones del reducer de inventario
export const ACTIONS = {
  ADD_PRODUCT: 'add-product',
  INCREMENT_STOCK: 'increment-stock',
  DECREMENT_STOCK: 'decrement-stock',
};

function inventoryReducer(products, action) {
  switch (action.type) {
    case ACTIONS.ADD_PRODUCT:
      return [...products, action.payload];
    case ACTIONS.INCREMENT_STOCK:
      return products.map((p) =>
        p.id === action.payload.id ? { ...p, stock: p.stock + 1 } : p
      );
    case ACTIONS.DECREMENT_STOCK:
      return products.map((p) =>
        p.id === action.payload.id ? { ...p, stock: Math.max(0, p.stock - 1) } : p
      );
    default:
      return products;
  }
}

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [products, dispatch] = useReducer(inventoryReducer, initialProducts);

  return (
    <InventoryContext.Provider value={{ products, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
