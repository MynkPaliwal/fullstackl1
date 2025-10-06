import React, { useState, useEffect } from "react";
import Button from "../components/ui/Button.tsx";
import ProductCard from "./ui/ProductCard.tsx";
import SponsorsCard from "./ui/SponsorsCard.tsx";
import PurchaseForm from "../components/PurchaseForm.tsx";
import PurchaseSuccess from "../components/PurchaseSuccess.tsx";
import Footer from "./Footer.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import fallbackProducts from "../api/fallbackProducts.tsx";
import fallbackSponsors from "../api/fallbackSponsors.tsx";

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPurchaseFormOpen, setIsPurchaseFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: string } | null>(null);
  const products = fallbackProducts;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (products.length || 1));
    }, 3000);

    return () => clearInterval(timer);
  }, [products.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? (products.length ? products.length - 1 : 0) : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % (products.length || 1));
  };

  const handleBuyNow = (productName: string, productPrice: string) => {
    setSelectedProduct({ name: productName, price: productPrice });
    setIsPurchaseFormOpen(true);
  };

  const handlePurchaseSubmit = (data: { name: string; email: string }) => {
    setIsPurchaseFormOpen(false);
    setIsSuccessOpen(true);
    console.log('Purchase data:', data, 'Product:', selectedProduct);
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <section id="store" className="relative h-screen bg-apple-light-gray pt-16">
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex-1 flex flex-col justify-center items-center space-y-8 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-semibold text-foreground text-center">
              {products[currentSlide]?.name}
            </h2>
            <p className="text-3xl md:text-4xl font-semibold text-apple-gray text-center">
              {products[currentSlide]?.price}
            </p>
            <Button
              onBuy={() => handleBuyNow(products[currentSlide]?.name || "", products[currentSlide]?.price || "")}
              label="Buy Now"
            />
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src={products[currentSlide]?.image}
              alt={products[currentSlide]?.name}
              className="h-96 w-auto object-contain hover-scale"
            />
          </div>

          <button onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
            {products.map((product, index) => (
              <button key={index} onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-foreground" : "w-2 bg-muted-foreground-60"}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-center mb-4 text-foreground">Our Products</h1>
          <div className="mt-8 overflow-x-auto">
            <div className="flex items-stretch gap-6 min-w-full">
              {products.map((product) => (
                <ProductCard name={product.name} price={product.price} image={product.image}
                  onBuy={() => handleBuyNow(product.name, product.price)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sponsors" className="py-20 px-6 bg-apple-light-gray">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-center mb-4 text-foreground">Our Partners</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Collaborating with industry leaders to bring you the best technology
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackSponsors.map((sponsor) => (
              <SponsorsCard name={sponsor.name} description={sponsor.description} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Purchase Form Modal */}
      <PurchaseForm
        isOpen={isPurchaseFormOpen}
        onClose={() => setIsPurchaseFormOpen(false)}
        onSubmit={handlePurchaseSubmit}
        productName={selectedProduct?.name || ""}
      />

      {/* Purchase Success Modal */}
      <PurchaseSuccess
        isOpen={isSuccessOpen}
        onClose={handleCloseSuccess}
        productName={selectedProduct?.name || ""}
        productPrice={selectedProduct?.price || ""}
        autoCloseDelay={10000}
      />
    </>
  );
};

export default Homepage;
