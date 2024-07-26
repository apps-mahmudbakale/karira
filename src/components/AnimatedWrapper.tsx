import { AnimatePresence, motion } from "framer-motion";



const AnimatedWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div>
    <AnimatePresence mode="wait">
      <motion.div
       initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1.5, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  </div>
);

export default AnimatedWrapper;