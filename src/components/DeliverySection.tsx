const streams = [
  {
    code: "PaaS",
    title: "Platform-as-a-Service",
    description:
      "Annual licences ($20k–$150k) to enterprise, SMEs, governments, and development organisations for access to the full platform or individual modules.",
    badge: "Recurring · High Margin",
  },
  {
    code: "DaaS",
    title: "Data-as-a-Service",
    description:
      "Metered API access for developers, insurers, agri-lenders, and climate analysts needing real-time indices, risk scores, and farmer datasets.",
    badge: "Usage-Based · Scalable",
  },
  {
    code: "SD",
    title: "Sovereign Deployments",
    description:
      "Turnkey sovereign data stack deployments for national governments, including setup, localisation, and ongoing support contracts.",
    badge: "Project-Based · Strategic",
  },
];

const DeliverySection = () => {
  return (
    <section id="delivery" className="section-padding bg-section-alt">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Business Model
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built for recurring, sovereign-scale revenue.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {streams.map((s) => (
            <div key={s.title} className="card-hover border border-border bg-card p-8">
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center font-mono text-sm font-bold text-white"
                style={{ background: "hsl(33,65%,50%)" }}
              >
                {s.code}
              </div>
              <h3 className="font-display text-xl font-bold text-card-foreground">{s.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <p
                className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em]"
                style={{ color: "hsl(33,65%,50%)" }}
              >
                {s.badge}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-border bg-card p-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Near-term target
          </p>
          <p className="mt-3 font-display text-xl font-bold text-foreground">
            4 paid pilots at an average $150K, converting to annual licences within 12 months.
          </p>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            This positions us to raise $3–5M and expand to five target markets within 18 months.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
