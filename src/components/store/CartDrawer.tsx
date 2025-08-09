import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "./ProductCard";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onOpenChange,
  items,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}) => {
  const subtotal = items.reduce((sum, it) => sum + it.product.price * it.qty, 0);
  const formatted = (subtotal / 100).toFixed(2);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full max-w-md flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-2">
          {items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty.</p>
          ) : (
            items.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-3 rounded-md border p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={`${product.name} thumbnail`}
                  loading="lazy"
                  className="h-20 w-20 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="truncate font-medium">{product.name}</div>
                    <button
                      aria-label={`Remove ${product.name}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => onRemove(product.id)}
                    >
                      <Trash />
                    </button>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    ${(product.price / 100).toFixed(2)}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-md border px-2 py-1">
                    <button aria-label="Decrease quantity" onClick={() => onDecrement(product.id)} className={cn("disabled:opacity-50", qty <= 1 && "pointer-events-none opacity-50")}> 
                      <Minus />
                    </button>
                    <span className="min-w-6 text-center">{qty}</span>
                    <button aria-label="Increase quantity" onClick={() => onIncrement(product.id)}>
                      <Plus />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-semibold">${formatted}</span>
          </div>
          <Button variant="hero" className="w-full" onClick={onCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
