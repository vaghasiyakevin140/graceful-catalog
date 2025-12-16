import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderState {
  items: OrderItem[];
  total: number;
  orderNumber: string;
  date: string;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state as OrderState | null;

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) return null;

  const steps = [
    { icon: CheckCircle, label: 'Order Confirmed', active: true },
    { icon: Package, label: 'Processing', active: false },
    { icon: Truck, label: 'Shipped', active: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="container mx-auto px-4 py-12">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"
              >
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute -inset-4 rounded-full border-2 border-primary/30 animate-ping"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            <span className="gold-text">Thank You!</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Your order has been placed successfully
          </p>
        </motion.div>

        {/* Order Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-6 max-w-2xl mx-auto mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-mono text-xl font-bold text-foreground">{orderData.orderNumber}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="text-foreground">{orderData.date}</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.label} className="flex flex-col items-center relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    step.active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <p className={`text-sm mt-2 ${step.active ? 'text-primary' : 'text-muted-foreground'}`}>
                  {step.label}
                </p>
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-full w-full h-0.5 bg-secondary -translate-x-1/2">
                    <div
                      className={`h-full bg-primary transition-all ${
                        step.active ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-xl overflow-hidden max-w-2xl mx-auto mb-8"
        >
          <div className="p-6 border-b border-border">
            <h2 className="font-serif text-xl text-foreground">Order Summary</h2>
          </div>
          <div className="divide-y divide-border">
            {orderData.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-4 p-4"
              >
                <div className="w-16 h-16 bg-secondary/50 rounded-lg p-2 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-foreground font-medium line-clamp-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="text-primary font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="p-6 border-t border-border bg-secondary/30">
            <div className="flex justify-between items-center">
              <span className="text-lg text-foreground">Total</span>
              <span className="font-serif text-3xl gold-text">${orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
        >
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => navigate('/')}
          >
            <Home className="w-5 h-5 mr-2" />
            Continue Shopping
          </Button>
          <Button size="lg" className="flex-1">
            Track Order
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

        {/* Email Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          A confirmation email has been sent to your email address
        </motion.p>
      </main>
    </div>
  );
};

export default OrderConfirmation;
