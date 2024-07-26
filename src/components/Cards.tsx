import { Link } from "react-router-dom";
import { data } from "../constants/data";
import { motion } from "framer-motion";

const Cards = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="px-4 pb-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-8 place-content-center lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
        {data.map((item) => (
          <Link to={item.path} key={item.id}>
            <motion.div
              key={item.id}
              className="bg-white shadow-card-shadow p-8 rounded-3xl w-full max-w-[350px] space-y-3"
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-3">
                <img src={item.image} alt={item.title} />
              </div>
              <p
                aria-label="Article"
                className="inline-block mb-3 text-2xl font-bold leading-5 text-black md:text-[32px]"
              >
                {item.title}
              </p>
              <p className="mb-5 text-secondaryBlack text-sm leading-6">
                {item.description}
              </p>
              <div className="flex items-center justify-center">
                <motion.button
                  className="text-primaryBlue border bg-white w-full h-[56px] rounded-lg border-primaryBlue font-semibold capitalize"
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book now
                </motion.button>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cards;
