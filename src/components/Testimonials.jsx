import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ayesha Khan',
      location: 'Peshawar, KPK',
      review: 'Outstanding quality abayas! The craftsmanship is exceptional and delivery was super fast. Highly recommend Bolqa House for authentic, premium abayas.',
      rating: 5,
    },
    {
      name: 'Fatima Ahmed',
      location: 'Dir Lower, KPK',
      review: 'Best place to buy traditional abayas online. The customer service is wonderful and the prices are very reasonable. Will definitely order again!',
      rating: 5,
    },
    {
      name: 'Hina Malik',
      location: 'Mardan, KPK',
      review: 'Love the variety and quality! Every piece feels premium and authentic. The whole experience from browsing to delivery was seamless and professional.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-[#f5efe6] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs font-black uppercase tracking-widest text-[#1a3a2a] mb-3 border-l-4 border-[#c9a96e] pl-3 inline-block"
          >
            What Customers Say
          </motion.p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a3a2a] uppercase tracking-tight leading-tight mt-4">
            Customer <span className="text-[#c9a96e]">Testimonials</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white rounded-3xl shadow-lg p-8 md:p-6 lg:p-8 relative border border-[#c9a96e]/10 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Quotation Mark */}
              <div className="text-6xl text-[#c9a96e] mb-4 leading-none">
                "
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium mb-6">
                {testimonial.review}
              </p>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-[#c9a96e] text-[#c9a96e]"
                  />
                ))}
              </div>

              {/* Reviewer Info */}
              <div>
                <p className="text-[#1a3a2a] font-black uppercase text-sm tracking-wide">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-xs font-bold">
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 text-sm md:text-base mb-6">
            Join thousands of satisfied customers across KPK
          </p>
          <a
            href="https://instagram.com/alansarabaya"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 md:px-12 py-3 md:py-4 border-2 border-[#1a3a2a] text-[#1a3a2a] font-black uppercase text-xs md:text-sm tracking-widest rounded-full hover:bg-[#1a3a2a] hover:text-white transition-all duration-300"
          >
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
