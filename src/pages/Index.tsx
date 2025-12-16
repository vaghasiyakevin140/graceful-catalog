import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, fetchCategories } from '@/store/slices/productsSlice';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import CategoryFilter from '@/components/CategoryFilter';
import CartDrawer from '@/components/CartDrawer';

const Index = () => {
  const dispatch = useAppDispatch();
  const { status, filteredItems } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-16 md:py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="gold-text">Discover</span>
            <br />
            <span className="text-foreground">Luxury Redefined</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            Curated collection of premium products for the discerning connoisseur.
            Experience excellence in every detail.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex justify-center gap-4"
          >
            <span className="text-sm text-muted-foreground">
              {filteredItems.length} Products Available
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <CategoryFilter />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <ProductGrid />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-serif text-2xl gold-text mb-4">LUXE</p>
          <p className="text-muted-foreground text-sm">
            © 2024 LUXE Collection. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
