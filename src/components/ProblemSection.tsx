import { AlertTriangle, Lock, Clock, DollarSign } from "lucide-react";

const problems = [
  {
    icon: Lock,
    title: "Vendor lock-in",
    description:
      "Most governments depend on foreign-owned platforms for critical services. When contracts end or geopolitics shift, access disappears.",
  },
  {
    icon: AlertTriangle,
    title: "Citizen data at risk",
    description:
      "Personal data flows through systems your teams cannot audit. Privacy regulations exist, but the infrastructure to enforce them does not.",
  },
  {
    icon: Clock,
    title: "Years-long deployments",
    description:
      "Traditional system integrators deliver on multi-year timelines. By the time infrastructure arrives, the need has already evolved.",
  },
  {
    icon: DollarSign,
    title: "No lasting capacity",
    description:
      "Consultants leave. Code sits unmaintained. The knowledge to operate and extend sovereign systems never transfers to local teams.",
  },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            The Challenge
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Digital sovereignty is not optional.{" "}
            <span className="text-muted-foreground">It&apos;s overdue.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <div key={p.title} className="group">
              <div className="mb-4 inline-flex border border-border bg-secondary p-3">
                <p.icon size={20} className="text-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
