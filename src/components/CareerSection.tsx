import { motion } from "framer-motion";

const education = [
  { degree: "Ph.D. (International Relations and Economics)", year: "2005", institution: "Graduate Institute, Geneva & University of Geneva", note: "Supervisor: Prof. Richard E. Baldwin" },
  { degree: "M.A. (Economics)", year: "2003", institution: "University of Michigan" },
  { degree: "M.A. (Economics)", year: "2000", institution: "Hitotsubashi University" },
  { degree: "B.A. (Economics)", year: "1999", institution: "Hitotsubashi University" },
];

const career = [
  { position: "Professor", period: "2015 – Present", institution: "Faculty of Economics, Keio University" },
  { position: "Associate Professor", period: "2011 – 2015", institution: "Faculty of Economics, Keio University" },
  { position: "Associate Professor", period: "2008 – 2011", institution: "RIEB, Kobe University" },
  { position: "Research Associate", period: "2006 – 2008", institution: "IPEG, University of Manchester" },
  { position: "Post-doctoral Fellow", period: "2005 – 2006", institution: "Graduate Institute, Geneva" },
];

const editorialService = [
  { role: "Associate Editor", journal: "Journal of Regional Science", period: "2010 – Present" },
  { role: "Editorial Board", journal: "Review of Urban and Regional Development Studies", period: "2017 – 2019" },
];

const visitingPositions = [
  "Stockholm University (2023)",
  "University of Zurich (2023, 2014, 2010–)",
  "University of Birmingham (2022)",
  "Kyoto University (2019–2020)",
  "University of Tokyo / CREPE (2020–)",
  "Oxford University (2010)",
  "CORE, UCLouvain (2011, 2009)",
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CareerSection = () => {
  return (
    <section id="career" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12"
        >
          Career & Education
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Career */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <h3 className="text-sm font-body font-semibold tracking-wide uppercase text-muted-foreground mb-6">
              Academic Positions
            </h3>
            <div className="space-y-5">
              {career.map((item, i) => (
                <div key={i} className="relative pl-5 border-l border-border">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-accent -translate-x-[5px]" />
                  <p className="font-display font-semibold text-foreground">{item.position}</p>
                  <p className="text-sm text-muted-foreground font-body">{item.institution}</p>
                  <p className="text-xs text-accent font-body font-medium">{item.period}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3 className="text-sm font-body font-semibold tracking-wide uppercase text-muted-foreground mb-6">
              Education
            </h3>
            <div className="space-y-5">
              {education.map((item, i) => (
                <div key={i} className="relative pl-5 border-l border-border">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary -translate-x-[5px]" />
                  <p className="font-display font-semibold text-foreground">{item.degree}</p>
                  <p className="text-sm text-muted-foreground font-body">{item.institution}</p>
                  {item.note && <p className="text-xs text-muted-foreground/70 font-body italic">{item.note}</p>}
                  <p className="text-xs text-accent font-body font-medium">{item.year}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Editorial & Visiting */}
        <div className="grid md:grid-cols-2 gap-16 mt-16">
          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.3 }}>
            <h3 className="text-sm font-body font-semibold tracking-wide uppercase text-muted-foreground mb-6">
              Editorial Service
            </h3>
            <div className="space-y-3">
              {editorialService.map((item, i) => (
                <div key={i} className="bg-card rounded-md p-4 border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
                  <p className="font-display font-semibold text-foreground">{item.role}</p>
                  <p className="text-sm italic text-muted-foreground font-body">{item.journal}</p>
                  <p className="text-xs text-accent font-body font-medium">{item.period}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.4 }}>
            <h3 className="text-sm font-body font-semibold tracking-wide uppercase text-muted-foreground mb-6">
              Selected Visiting Positions
            </h3>
            <div className="flex flex-wrap gap-2">
              {visitingPositions.map((pos) => (
                <span key={pos} className="px-3 py-1.5 text-xs font-body rounded-full bg-secondary text-secondary-foreground border border-border">
                  {pos}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
