import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-primary opacity-95" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%_/_0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Hoziroq boshlang
          </h2>
          
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 font-body">
            Minglab muvaffaqiyatli kompaniyalar safiga qo'shiling. 
            Birinchi qadamni qo'ying va imkoniyatlarni kashf eting.
          </p>

          {/* Email form */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-background text-foreground placeholder:text-muted-foreground border-0 shadow-soft focus:outline-none focus:ring-2 focus:ring-ring font-body"
              />
            </div>
            <Button 
              variant="subtle" 
              size="lg" 
              className="h-14 px-8"
            >
              Yuborish
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Trust badges */}
          <p className="text-primary-foreground/60 text-sm font-body">
            ✓ Bepul sinov davri &nbsp; ✓ Kredit karta talab qilinmaydi &nbsp; ✓ Istalgan vaqtda bekor qilish
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
