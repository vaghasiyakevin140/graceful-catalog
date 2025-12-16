const ProductSkeleton = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="aspect-square shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 shimmer rounded" />
        <div className="h-5 w-full shimmer rounded" />
        <div className="h-5 w-3/4 shimmer rounded" />
        <div className="h-4 w-24 shimmer rounded" />
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="h-8 w-20 shimmer rounded" />
          <div className="h-10 w-10 shimmer rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
