import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/store/slices/productsSlice';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, openCart } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: () => void;
}

const ProductCard = ({ product, index, onClick }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(openCart());
    toast({
      title: "Added to cart",
      description: `${product.title.slice(0, 30)}... has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="glass-card rounded-xl overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_hsl(43_74%_49%/0.15)]">
        {/* Image Container */}
        <div className="relative aspect-square bg-secondary/50 p-6 overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={handleAddToCart}
              className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              size="lg"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Category Badge */}
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="font-serif text-lg font-medium text-foreground line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm text-muted-foreground">{product.rating.rate}</span>
            </div>
            <span className="text-xs text-muted-foreground">({product.rating.count} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="font-serif text-2xl font-semibold gold-text">
              ${product.price.toFixed(2)}
            </span>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAddToCart}
                className="rounded-full border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
