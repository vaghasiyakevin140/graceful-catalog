import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearchQuery } from '@/store/slices/productsSlice';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.products.searchQuery);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-md"
    >
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="pl-12 h-12 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20 rounded-full text-foreground placeholder:text-muted-foreground"
      />
    </motion.div>
  );
};

export default SearchBar;
