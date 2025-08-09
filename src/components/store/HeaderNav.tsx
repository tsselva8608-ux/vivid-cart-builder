import { ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";

interface HeaderNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onSearch: (value: string) => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ cartCount, onOpenCart, onSearch }) => {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex items-center gap-4 py-4">
        <a href="/" aria-label="VividCart Home" className="font-semibold text-lg tracking-tight">
          VividCart
        </a>
        <div className="relative ml-auto w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" aria-label="Open cart" onClick={onOpenCart}>
          <ShoppingCart />
        </Button>
        {cartCount > 0 && (
          <span className="-ml-3 -mt-6 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            {cartCount}
          </span>
        )}
      </nav>
    </header>
  );
};

export default HeaderNav;
