import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeCart, removeFromCart, updateQuantity, selectCartTotal, selectCartItemsCount } from '@/store/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const total = useAppSelector(selectCartTotal);
  const itemsCount = useAppSelector(selectCartItemsCount);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="font-serif text-2xl text-foreground">Your Cart</h2>
                <span className="bg-primary text-primary-foreground text-sm px-2 py-0.5 rounded-full">
                  {itemsCount}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch(closeCart())}
                className="rounded-full hover:bg-secondary"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Items */}
            <ScrollArea className="flex-1 p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="font-serif text-xl text-muted-foreground">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Add some luxurious items to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-4 glass-card rounded-lg"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 bg-secondary/50 rounded-lg p-2 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-primary font-semibold mt-1">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() =>
                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                              }
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-foreground font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() =>
                                dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                              }
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-serif text-2xl gold-text">${total.toFixed(2)}</span>
                </div>
                <Button className="w-full h-14 text-lg font-medium" size="lg">
                  Checkout
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
