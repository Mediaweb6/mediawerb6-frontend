import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { Testimonial } from '../types';

const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) => {
  return (
    <div
      className={`transform transition-all duration-500 ${
        isActive
          ? 'opacity-100 scale-100'
          : 'opacity-50 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Rating */}
        <div className="flex space-x-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
          "{testimonial.quote}"
        </p>

        {/* Author */}
        <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {testimonial.avatar}
          </div>

          {/* Info */}
          <div>
            <div className="font-bold text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-600">
              {testimonial.role} at {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'John Smith',
      role: 'CEO',
      company: 'TechVenture Inc',
      quote: 'Nexus transformed our digital presence completely. Their team\'s expertise and dedication led to a 250% increase in our online revenue.',
      avatar: 'JS',
      rating: 5,
    },
    {
      id: 2,
      name: 'Maria Garcia',
      role: 'Marketing Director',
      company: 'Fashion Forward',
      quote: 'The SEO strategy implemented by Nexus brought our website to the top of Google rankings. Our organic traffic tripled in just 6 months.',
      avatar: 'MG',
      rating: 5,
    },
    {
      id: 3,
      name: 'David Lee',
      role: 'Founder',
      company: 'StartUp Hub',
      quote: 'Exceptional service from start to finish. The team understood our vision and delivered a beautiful, functional website that exceeded expectations.',
      avatar: 'DL',
      rating: 5,
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'GrowthCo',
      quote: 'Working with Nexus was a game-changer. Their digital marketing campaigns are data-driven and deliver measurable results every single time.',
      avatar: 'SJ',
      rating: 5,
    },
  ];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            Client Testimonials
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            What Our Clients
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
              Say About Us
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real success stories from businesses we've partnered with and transformed
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          {/* Card display */}
          <div className="mb-8 h-80 flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute w-full transition-all duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <TestimonialCard testimonial={testimonial} isActive={index === currentIndex} />
              </div>
            ))}
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={goToPrevious}
              className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-300 transform hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-blue-600 w-8'
                      : 'bg-blue-300 hover:bg-blue-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-300 transform hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
