import * as React from "react";
import HeaderNav from "@/components/store/HeaderNav";
import ProductGrid from "@/components/store/ProductGrid";
import CartDrawer, { type CartItem } from "@/components/store/CartDrawer";
import type { Product } from "@/components/store/ProductCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import heroImg from "@/assets/hero.jpg";
import laptopImg from "@/assets/products/laptop.jpg";
import headphonesImg from "@/assets/products/headphones.jpg";
import sneakersImg from "@/assets/products/sneakers.jpg";

const productsSeed: Product[] = [
  { id: "laptop", name: "Ultrabook Pro 14\"", price: 129999, image: laptopImg, rating: 4.7 },
  { id: "headphones", name: "Auralux Wireless Headphones", price: 19999, image: headphonesImg, rating: 4.5 },
  { id: "sneakers", name: "StrideOne Sneakers", price: 8999, image: sneakersImg, rating: 4.2 },
  { id: "laptop-2", name: "Ultrabook Air 13\"", price: 99999, image: laptopImg, rating: 4.4 },
  { id: "headphones-2", name: "Auralux Studio", price: 24999, image: headphonesImg, rating: 4.6 },
  { id: "sneakers-2", name: "StrideOne Lite", price: 7999, image: sneakersImg, rating: 4.0 },
];

const Index = () => {
  const [search, setSearch] = React.useState("");
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState<CartItem[]>([]);

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase();
    return productsSeed.filter((p) => p.name.toLowerCase().includes(q));
  }, [search]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.product.id === product.id);
      if (exists) {
        return prev.map((c) =>
          c.product.id === product.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    toast({ title: "Added to cart", description: product.name });
  };

  const increment = (id: string) =>
    setCart((prev) => prev.map((c) => (c.product.id === id ? { ...c, qty: c.qty + 1 } : c)));
  const decrement = (id: string) =>
    setCart((prev) =>
      prev
        .map((c) => (c.product.id === id ? { ...c, qty: Math.max(1, c.qty - 1) } : c))
    );
  const remove = (id: string) => setCart((prev) => prev.filter((c) => c.product.id !== id));

  const checkout = () => {
    setCartOpen(false);
    toast({ title: "Checkout", description: "This is a demo. Connect Stripe to enable payments." });
  };

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "VividCart",
            url: "/",
          }),
        }}
      />

      <HeaderNav cartCount={cartCount} onOpenCart={() => setCartOpen(true)} onSearch={setSearch} />

      <main>
        {/* HERO */}
        <section className="relative">
          <div className="container mx-auto grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-16">
            <article className="space-y-6">
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                Shop smarter with VividCart
              </h1>
              <p className="max-w-prose text-lg text-muted-foreground">
                Discover premium tech, style, and essentials. Fast checkout, smart cart, and deals you’ll love.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#shop" className="inline-block">
                  <Button variant="hero" size="lg" aria-label="Shop now">
                    Shop Now
                    <span className="pointer-events-none relative ml-2 inline-block overflow-hidden rounded-full">
                      <span className="absolute inset-0 -skew-x-12 bg-white/40 mix-blend-overlay opacity-30" />
                    </span>
                  </Button>
                </a>
                <Button variant="outline" size="lg" onClick={() => setCartOpen(true)}>
                  View Cart ({cartCount})
                </Button>
              </div>
              <ul className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <li>Free returns</li>
                <li>2-year warranty</li>
                <li>24/7 support</li>
              </ul>
            </article>
            <aside className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImg}
                alt="VividCart hero showcasing laptop, headphones, and sneakers"
                loading="eager"
                className="mx-auto w-full max-w-2xl rounded-lg shadow-[var(--shadow-elegant)]"
              />
              <div className="pointer-events-none absolute -inset-10 -z-10 opacity-50 blur-2xl" style={{ backgroundImage: "var(--gradient-primary)" }} />
            </aside>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="shop" className="border-t py-12" style={{ backgroundImage: "var(--gradient-subtle)" }}>
          <div className="container mx-auto mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">Featured products</h2>
            <p className="text-sm text-muted-foreground">{filtered.length} items</p>
          </div>
          <ProductGrid products={filtered} onAddToCart={(p) => addToCart(p)} />
        </section>
      </main>

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cart}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={remove}
        onCheckout={checkout}
      />
    </div>
  );
};

export default Index;
