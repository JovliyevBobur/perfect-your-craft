import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Yangi avlod texnologiyasi
            </span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-center font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
          Kelajak{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            Bugun
          </span>
          {" "}Boshlanadi
        </h1>

        {/* Subtitle */}
        <p className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up animation-delay-200 font-body">
          Innovatsion yechimlar bilan biznesingizni yangi bosqichga olib chiqing. 
          Tez, ishonchli va samarali xizmatlar sizni kutmoqda.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-300">
          <Button variant="hero" size="lg">
            Boshlash
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg">
            Batafsil ma'lumot
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up animation-delay-400">
          {[
            { value: "10K+", label: "Foydalanuvchilar" },
            { value: "99.9%", label: "Ishlash vaqti" },
            { value: "24/7", label: "Qo'llab-quvvatlash" },
            { value: "150+", label: "Mamlakatlar" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
