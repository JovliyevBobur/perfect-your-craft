import { Zap, Shield, Globe, Layers, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Tezkor ishlash",
    description: "Yuqori tezlikdagi serverlar bilan bir zumda natija oling.",
  },
  {
    icon: Shield,
    title: "Maksimal xavfsizlik",
    description: "Ma'lumotlaringiz eng yuqori darajada himoyalangan.",
  },
  {
    icon: Globe,
    title: "Global qamrov",
    description: "Dunyoning istalgan nuqtasidan foydalanish imkoniyati.",
  },
  {
    icon: Layers,
    title: "Modulli tizim",
    description: "Ehtiyojlaringizga moslashtirilgan yechimlar.",
  },
  {
    icon: Clock,
    title: "Vaqtni tejash",
    description: "Avtomatlashtirilgan jarayonlar bilan samaradorlikni oshiring.",
  },
  {
    icon: Users,
    title: "Jamoa ishi",
    description: "Hamkorlik uchun qulay vositalar to'plami.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nima uchun{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              bizni tanlash
            </span>
            {" "}kerak?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Zamonaviy texnologiyalar va professional jamoa bilan muvaffaqiyatga erishish osonroq.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl gradient-card border border-border/50 shadow-card hover:shadow-soft transition-all duration-500 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>

              {/* Hover decoration */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
