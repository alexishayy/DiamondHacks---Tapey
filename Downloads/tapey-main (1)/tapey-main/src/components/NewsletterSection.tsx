import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  return (
    <section style={{backgroundColor: '#d5bdaf', bordercolor: '#d5bdaf'}} className="bg-foreground py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl text-background mb-3">
          Join the <span className="italic">TAPEY Community!</span>
        </h2>
        <p className="text-background/100 font-body font-light mb-8">
          Be the first to discover new clean beauty collections, great deals, and tips.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-transparent border border-background/100 text-background placeholder:text-background/100 px-5 py-3 text-sm font-body focus:outline-none focus:border-background/100 rounded-none"
          />
          <Button style={{backgroundColor: '#cc8b86', bordercolor:'#cc8b86'}}className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-8 tracking-wider uppercase text-xs font-body">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
