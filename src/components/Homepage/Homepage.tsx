import React, { useState, useEffect, useCallback } from "react";
import Button from "../ui/Button.tsx";
import ProductCard from "../ui/ProductCard.tsx";
import SponsorsCard from "../ui/SponsorsCard.tsx";
import PurchaseForm from "../PurchaseForm/PurchaseForm.tsx";
import PurchaseSuccess from "../PurchaseSuccess/PurchaseSuccess.tsx";
import Footer from "../Footer/Footer.tsx";
import Navbar from "../Navbar/Navbar.tsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchAppleProducts } from "../../api/fallbackProducts.tsx";
import fallbackSponsors from "../../api/fallbackSponsors.tsx";
import { HomepageStyles } from "./Homepage.styles.ts";
import { usePurchases } from "../../context/AppContext.tsx";

const Homepage = () => {
  const { addPurchase } = usePurchases();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPurchaseFormOpen, setIsPurchaseFormOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: string } | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const productsData = await fetchAppleProducts();
      setProducts(productsData);
      setLoading(false);
    };

    loadProducts();
  }, []);

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

    addPurchase({
      name: data.name || "",
      email: data.email || "",
      productName: selectedProduct?.name || ""
    });
  };

  const handleCloseSuccess = useCallback(() => {
    setIsSuccessOpen(false);
    setSelectedProduct(null);
  }, []);

  return (
    <>
      <Navbar />
      <section id="store" className={HomepageStyles.rootSection}>
        <div className={HomepageStyles.container}>
          {loading ? (
            <div className={HomepageStyles.loadingContainer}>
              <div className={HomepageStyles.loadingSpinner}></div>
            </div>
          ) : (
            <>
              <div className={HomepageStyles.leftPanel}>
                <h2 className={HomepageStyles.title}>
                  {products[currentSlide]?.name}
                </h2>
                <p className={HomepageStyles.price}>
                  {products[currentSlide]?.price}
                </p>
                <Button
                  onBuy={() => handleBuyNow(products[currentSlide]?.name || "", products[currentSlide]?.price || "")}
                  label="Buy Now"
                />
              </div>

              <div className={HomepageStyles.rightPanel}>
                <img
                  src={products[currentSlide]?.image}
                  alt={products[currentSlide]?.name}
                  className={HomepageStyles.heroImg}
                />
              </div>
            </>
          )}

          <button onClick={goToPrevious}
            className={`${HomepageStyles.navBtn} ${HomepageStyles.prevBtn} hidden md:flex`}>
            <ChevronLeft className={HomepageStyles.chevronIcon} />
          </button>
          <button onClick={goToNext}
            className={`${HomepageStyles.navBtn} ${HomepageStyles.nextBtn} hidden md:flex`}>
            <ChevronRight className={HomepageStyles.chevronIcon} />
          </button>

          <div className={HomepageStyles.dots}>
            {products.map((product, index) => (
              <button key={index} onClick={() => goToSlide(index)}
                className={index === currentSlide ? HomepageStyles.dotActive : HomepageStyles.dot}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="products" className={HomepageStyles.productsSection}>
        <div className={HomepageStyles.maxWidth}>
          <h1 className={HomepageStyles.sectionHeading}>Our Products</h1>
          <div className={HomepageStyles.productScroller}>
            <div className={HomepageStyles.productRow}>
              {products.map((product) => (
                <ProductCard name={product.name} price={product.price} image={product.image}
                  onBuy={() => handleBuyNow(product.name, product.price)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sponsors" className={HomepageStyles.sponsorsSection}>
        <div className={HomepageStyles.maxWidth}>
          <h1 className={HomepageStyles.sectionHeading}>Our Partners</h1>
          <p className={HomepageStyles.sponsorsDescription}>
            Collaborating with industry leaders to bring you the best technology
          </p>
          <div className={HomepageStyles.sponsorsGrid}>
            {fallbackSponsors.map((sponsor) => (
              <SponsorsCard name={sponsor.name} description={sponsor.description} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <PurchaseForm
        isOpen={isPurchaseFormOpen}
        onClose={() => setIsPurchaseFormOpen(false)}
        onSubmit={handlePurchaseSubmit}
        productName={selectedProduct?.name || ""}
      />

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
