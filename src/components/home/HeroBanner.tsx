import * as React from 'react';
import { ArrowRight } from 'lucide-react';

// Banner Images
import banner1 from '../../assets/image/banner/image.png';
import banner2 from '../../assets/image/banner/image copy.png';
import banner3 from '../../assets/image/banner/image copy 2.png';

interface Slide {
  title: string;
  subtitle: string;
  bgClass: string;
  buttonText: string;
  image: string;
  discount?: string;
}

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = React.useMemo<Slide[]>(
    () => [
      {
        title: 'Fresh Daily Essentials',
        subtitle: 'Convenience Delivered',
        bgClass: 'bg-emerald-50',
        buttonText: 'Shop Now',
        image: banner1,
        discount: 'Free Delivery over $20'
      },
      {
        title: 'Snacks & Beverages',
        subtitle: 'Your Favorite Brands',
        bgClass: 'bg-amber-50',
        buttonText: 'Order Now',
        image: banner2,
        discount: 'Flat 10% Off'
      },
      {
        title: 'Household Needs',
        subtitle: 'Everything You Need',
        bgClass: 'bg-blue-50',
        buttonText: 'Explore',
        image: banner3,
        discount: 'Best Prices'
      },
    ],
    []
  );

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const current = slides[currentSlide];

  return (
    <div className="relative w-full max-w-[1400px] mx-auto rounded-xl md:rounded-3xl overflow-hidden h-[280px] md:h-[400px] shadow-sm font-sans">

      {/* Background Transition Wrapper */}
      <div className={`absolute inset-0 transition-colors duration-700 ease-in-out ${current.bgClass}`}></div>

      <div className="relative h-full flex items-center px-4 sm:px-8 md:px-12 lg:px-20">

        {/* Content */}
        <div className="w-full md:w-1/2 z-10 space-y-3 md:space-y-6">
          {current.discount && (
            <span className="inline-block bg-white/80 backdrop-blur-sm text-emerald-800 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide shadow-sm mb-2 animate-in slide-in-from-left fade-in duration-500">
              {current.discount}
            </span>
          )}

          <div className="space-y-1 md:space-y-2">
            <h3 className="text-sm sm:text-lg md:text-2xl text-gray-500 font-medium animate-in slide-in-from-bottom fade-in duration-500 delay-100">
              {current.subtitle}
            </h3>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight animate-in slide-in-from-bottom fade-in duration-700 delay-200">
              {current.title}
            </h1>
          </div>

          <button className="group mt-4 md:mt-8 bg-emerald-600 text-white px-5 py-2.5 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all flex items-center gap-2 animate-in zoom-in fade-in duration-500 delay-300">
            {current.buttonText}
            <ArrowRight size={16} className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Image */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:flex items-center justify-center">
          <img
            key={current.image}
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover drop-shadow-2xl animate-in fade-in zoom-in duration-700 slide-in-from-right-10"
          />
        </div>

      </div>

      {/* Controls */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${idx === currentSlide ? 'w-6 md:w-8 h-1.5 md:h-2 bg-emerald-600' : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-400 hover:bg-emerald-400'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>



    </div>
  );
};

export default React.memo(HeroBanner);