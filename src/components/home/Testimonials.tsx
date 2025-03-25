
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "Savvy has completely transformed how I manage my finances. The AI-powered insights helped me save an extra $400 each month that I didn't even know I was wasting!",
      author: "Sarah Johnson",
      position: "Marketing Director",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      content: "As someone who knew nothing about investing, the educational resources and personalized guidance gave me the confidence to start building my portfolio. The results speak for themselves.",
      author: "Michael Chen",
      position: "Software Engineer",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      content: "The fraud detection feature saved me from a major headache when it caught suspicious activity on my account within minutes. The immediate notification allowed me to prevent any damage.",
      author: "Emma Rodriguez",
      position: "Small Business Owner",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 4,
      content: "I've tried many budgeting apps, but Savvy's intuitive design and smart categorization of expenses has made it the only financial tool I need. Truly life-changing.",
      author: "David Kim",
      position: "Healthcare Professional",
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 340; // Width of a card + gap
      
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
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-secondary/20 to-background">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[10%] top-[20%] w-[30%] h-[30%] rounded-full bg-blue-100/30 blur-3xl" />
        <div className="absolute left-[5%] bottom-[10%] w-[20%] h-[20%] rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our <span className="text-gradient">Users Say</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of satisfied users who have transformed their financial futures with our platform.
          </p>
        </div>
        
        {/* Testimonial Carousel Control */}
        <div className="relative">
          <div className="flex justify-end space-x-3 mb-6">
            <button 
              onClick={() => scroll('left')} 
              className="p-2 rounded-full bg-white shadow-sm hover:bg-secondary transition-colors"
              disabled={scrollPosition <= 0}
            >
              <ChevronLeft className="text-primary" />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="p-2 rounded-full bg-white shadow-sm hover:bg-secondary transition-colors"
              disabled={scrollPosition >= (testimonials.length - 1) * 340}
            >
              <ChevronRight className="text-primary" />
            </button>
          </div>
          
          {/* Testimonial Carousel */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="glass min-w-[300px] max-w-xs flex-shrink-0 p-6 rounded-xl shadow-soft animate-fade-in snap-start"
                style={{ animationDelay: `${0.1 * testimonial.id}s` }}
              >
                {/* Stars */}
                <div className="flex items-center mb-4 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                
                {/* Testimonial Content */}
                <blockquote className="text-foreground mb-6">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
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
