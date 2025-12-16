import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCart, selectCartItemsCount } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

const Header = () => {
  const dispatch = useAppDispatch();
  const itemsCount = useAppSelector(selectCartItemsCount);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-serif text-2xl md:text-3xl font-bold gold-text"
            >
              LUXE
            </motion.div>
            <span className="hidden md:block text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Collection
            </span>
          </Link>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Cart Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => dispatch(toggleCart())}
              className="relative rounded-full w-12 h-12 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {itemsCount}
                </motion.span>
              )}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <SearchBar />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
