import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCategory } from '@/store/slices/productsSlice';
import { Button } from '@/components/ui/button';

const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector((state) => state.products);

  const formatCategory = (cat: string) => {
    return cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h3 className="font-serif text-lg text-foreground">Categories</h3>
      <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'ghost'}
            onClick={() => dispatch(setCategory(category))}
            className={`justify-start text-left transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {formatCategory(category)}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryFilter;
