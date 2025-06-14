
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
}

const TestimonialsCarousel = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Thabo Mthembu",
      location: "Johannesburg",
      rating: 5,
      comment: "OneCard has completely changed how I buy airtime. The cashback rewards are amazing and the service is always reliable! Happy to be a paid up member of this Agentic Movement with Divinely Mobile.",
      avatar: "TM"
    },
    {
      name: "Sarah Johnson",
      location: "Cape Town",
      rating: 5,
      comment: "As a vendor, OneCard has increased my revenue by 40%. The platform is easy to use and my customers love it.",
      avatar: "SJ"
    },
    {
      name: "Mandla Khoza",
      location: "Durban",
      rating: 5,
      comment: "The OneCard system is brilliant. I've saved over R500 this month alone on airtime purchases!",
      avatar: "MK"
    },
    {
      name: "Priya Patel",
      location: "Pretoria",
      rating: 5,
      comment: "Lightning fast delivery and great deals on all networks. OneCard is my go-to for all airtime needs.",
      avatar: "PP"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers across South Africa
          </p>
        </div>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
