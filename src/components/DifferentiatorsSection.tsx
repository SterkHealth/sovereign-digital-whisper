const proofPoints = [
  {
    partners: "AfDB + Aon",
    tags: "Climate Risk · Parametric Insurance",
    stat: "1.2M farmers covered",
    description:
      "Developed climate intelligence infrastructure deployed by the African Development Bank and Aon, enabling parametric insurance products for over 1.2 million smallholder farmers across East Africa. The system delivered real-time satellite and weather data to trigger automatic payouts — no claims process needed.",
  },
  {
    partners: "GCF / AON / AIC",
    tags: "Agri Data · Parametric Insurance",
    stat: "500K farmers covered",
    description:
      "Collaborated to power Uganda's first satellite-driven crop insurance product for 500,000 smallholder maize farmers — replacing manual crop assessments with 8 years of AI-derived yield intelligence to unlock affordable, scalable coverage across one of Africa's most underinsured agricultural markets.",
  },
  {
    partners: "TBI / Government of Sierra Leone",
    tags: "Climate Risk Intelligence · Agri Data",
    stat: "Rice Yield Intelligence",
    description:
      "Built the first AI-powered rice yield intelligence system for the Government of Sierra Leone by turning satellite data, soil chemistry, and historical harvests into district-level predictions that government officials could act on in real time through a live decision dashboard.",
  },
];

const DifferentiatorsSection = () => {
  return (
    <section id="differentiators" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Proof Points
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            We've done this before. At scale.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {proofPoints.map((p) => (
            <div key={p.partners} className="border border-border bg-card p-8">
              <div className="mb-5">
                <p className="font-display text-base font-bold text-card-foreground">{p.partners}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {p.tags}
                </p>
              </div>
              <p
                className="font-mono text-sm font-bold uppercase tracking-[0.1em]"
                style={{ color: "hsl(33,65%,50%)" }}
              >
                {p.stat}
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorsSection;
