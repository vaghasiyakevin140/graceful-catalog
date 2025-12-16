import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

const ProductGrid = () => {
  const navigate = useNavigate();
  const { filteredItems, status } = useAppSelector((state) => state.products);

  if (status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Failed to load products. Please try again.</p>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <p className="text-2xl font-serif text-muted-foreground">No products found</p>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredItems.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onClick={() => navigate(`/product/${product.id}`)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
