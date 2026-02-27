import { AnimatePresence, motion } from "framer-motion";

interface DividerProps {
  isExpanded: boolean;
}

const Divider = ({ isExpanded }: DividerProps) => (
  <AnimatePresence>
    {isExpanded && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.15 } }}
        exit={{ opacity: 0, transition: { duration: 0.05 } }}
      >
        <div className="mx-3 mt-4 border-t border-border" />
      </motion.div>
    )}
  </AnimatePresence>
);

export default Divider;
