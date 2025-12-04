import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const links = {
    product: ["Xususiyatlar", "Narxlar", "Integratsiyalar", "FAQ"],
    company: ["Biz haqimizda", "Blog", "Karyera", "Aloqa"],
    legal: ["Maxfiylik", "Shartlar", "Cookie"],
  };

  const socials = [
    { icon: Twitter, href: "#" },
    { icon: Github, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Instagram, href: "#" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              Brand<span className="text-primary">.</span>
            </h3>
            <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
              Innovatsion yechimlar bilan kelajakni bugun yaratamiz.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Mahsulot</h4>
            <ul className="space-y-3">
              {links.product.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Kompaniya</h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Huquqiy</h4>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-body">
            © 2024 Brand. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-muted-foreground text-sm font-body">
            O'zbekistonda ❤️ bilan yaratilgan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
