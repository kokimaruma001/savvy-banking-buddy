import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "I finally understand what all those bank fees mean! Savvy explained it in a way that actually made sense. Found out I was paying R85 a month I didn't need to.",
      author: "Thandi M.",
      position: "Teacher, Johannesburg",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      content: "I always felt anxious about money stuff. Now I can ask questions without feeling judged. It's like having a financially-savvy friend who explains things calmly.",
      author: "Sipho K.",
      position: "Store Manager, Durban",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      content: "My husband and I used to argue about our budget. Savvy helped us see where our money was actually going. No more guessing, no more fights!",
      author: "Lerato N.",
      position: "Nurse, Pretoria",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 4,
      content: "I was scared to look at my bank statements. Now I actually understand them. Savvy doesn't make you feel stupid for asking basic questions.",
      author: "James P.",
      position: "Freelancer, Cape Town",
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 340;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setScrollPosition(Math.min(
          (testimonials.length - 1) * scrollAmount, 
          scrollPosition + scrollAmount
        ));
      }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Real people, real results
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            People like you are feeling more confident about money
          </h2>
          <p className="text-muted-foreground">
            No financial experts here — just everyday South Africans who wanted to understand their finances better.
          </p>
        </div>
        
        {/* Carousel Controls */}
        <div className="relative">
          <div className="flex justify-end space-x-3 mb-6">
            <button 
              onClick={() => scroll('left')} 
              className="p-3 rounded-full bg-card border border-border/50 shadow-soft hover:bg-secondary/50 transition-colors"
              disabled={scrollPosition <= 0}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="p-3 rounded-full bg-card border border-border/50 shadow-soft hover:bg-secondary/50 transition-colors"
              disabled={scrollPosition >= (testimonials.length - 1) * 340}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
          
          {/* Testimonial Carousel */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-card min-w-[320px] max-w-sm flex-shrink-0 p-6 rounded-2xl border border-border/50 shadow-soft snap-start"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/20" />
                </div>
                
                {/* Stars */}
                <div className="flex items-center mb-4 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                
                {/* Testimonial Content */}
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center pt-4 border-t border-border/50">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
