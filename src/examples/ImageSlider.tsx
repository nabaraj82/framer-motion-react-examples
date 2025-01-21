import { AnimatePresence, motion, wrap } from "framer-motion";
import { useState } from "react";

const variants = {
  enter: (delta: number) => ({
    x: delta > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (delta: number) => ({
    x: delta > 0 ? -1000 : 1000,
    opacity: 0,
    zIndex: 0,
  }),
};

type ImagePorps = {
  src: string;
  paginate: (newDelta: number) => void;
  delta: number;
};

const Image: React.FC<ImagePorps> = ({ src, paginate, delta }) => (
  <motion.img
    src={src}
    custom={delta}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={1}
    transition={{ duration: 2 }}
    onDragEnd={(e, { offset, velocity }) => {
      const swipe = Math.abs(offset.x) * velocity.x;
      if (swipe > 10000) {
        paginate(-1);
      } else if (swipe < -10000) {
        paginate(1);
      }
    }}
  />
);
const ImageSlider = () => {
  const [[page, delta], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);
  const paginate = (newDelta: number) => {
    setPage([page + newDelta, newDelta]);
  };

  return (
    <div className="container">
      <style>
        {`
        .container{
          max-width: 50rem;
          margin-top: 10%;
        min-height: 30rem;
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        }

        img{
           position: absolute;
            width: 100%;
             height: 100%;
             border-radius: 10px;
            }
             .next, .prev{
             position: absolute;
             background: black;
             height: 40px;
             width: 40px;
             z-index: 3;
             color: white;
             display: flex;
             justify-content: center;
             align-items: center;
             border-radius: 50%;
             cursor: pointer;
             }

             .next{
             right: 0;
             }
             .prev{
             left: 0;
             }
        `}
      </style>
      <AnimatePresence initial={false} custom={delta}>
        <Image
          src={images[imageIndex]}
          paginate={paginate}
          delta={delta}
          key={page}
        />
          </AnimatePresence>
          <div className="next" onClick={() => paginate(1)}>
              {
                  ">"
              }
          </div>
          <div className="prev">
              {"<"}
          </div>
    </div>
  );
};

export default ImageSlider;

const images = [
  "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
];
