import { Product, Size } from "@prisma/client";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  item: Product;
  quantity: number;
  size: string;
  newId?: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItemQuantity: (id: number, quantity: string | number) => void;
  removeItem: (id: number) => void;
  removeAllItems: () => void;
}

const useCart = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      addItem: (item: CartItem) => {
        const existingProduct = get().items.find(
          (product) => product.item.id === item.item.id
        );

        if (existingProduct) {
          return toast.error(
            "Item already in cart you can edit it from cart page."
          );
        }

        item.newId = get().items.length;

        set({ items: [...get().items, item] });
        toast.success("Item added to cart.");
      },
      removeItem: (id: number) => {
        set({ items: get().items.filter((item) => item.newId !== id) });
        toast.success("Item removed from cart.");
      },
      removeAllItems: () => {
        set({ items: [] });
      },
      updateItemQuantity: (id: number, quantity: number | string) => {
        const productIndex = get().items.findIndex(
          (product) => product.newId === id
        );

        const tQuantity = Number(quantity);

        get().items[productIndex].quantity = tQuantity;
        set({ items: get().items });
        toast.success("update item quantity successfully.");
      },
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export default useCart;
