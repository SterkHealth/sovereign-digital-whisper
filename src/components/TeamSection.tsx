const team = [
  {
    name: "Eshani Kaushal",
    role: "Founder & CEO",
    background: "Legal, Government Relations, Emerging Markets",
    previously: "Amini, Bayobab, MTN Group",
    bio: "Deep relationships with multilateral development institutions, insurers, and national governments. Drives commercial strategy and partnerships at Aixatech. Helped raise $6m+ backed by Salesforce at Amini.",
  },
  {
    name: "Leo Araujo",
    role: "CTO",
    background: "ML, AI, Hardware & Systems",
    previously: "Amini, ARM, Apple, Huawei",
    bio: "Led the core data platform development and scaling across Africa and emerging markets, previously deployed with AfDB and Aon reaching 1.2M+ farmers. Architects Aixatech's sovereign data and climate analytics stack.",
  },
  {
    name: "Dr. Frederic Schepens",
    role: "Strategic Advisor",
    background: "Legal, Digital Infrastructure",
    previously: "Bayobab Group, MTN Group",
    bio: "Led legal and business development for digital infrastructure across emerging markets. 30+ years of experience. Former CEO of Bayobab Group — MTN's fibre subsidiary — scaled to $350M in annual revenue.",
  },
  {
    name: "Daniel Abunu",
    role: "Strategic Advisor",
    background: "ML, AI, Hardware & Systems",
    previously: "Tony Blair Institute",
    bio: "Built ML models and edge hardware systems deployed at global scale. 25+ years across corporate, startup, and public sector. Successfully led multiple startups to profitability. Currently advises the Tony Blair Institute on Technology & Innovation.",
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="section-padding bg-section-alt">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            The Team
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Operators who've done this before.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="border border-border bg-card p-6">
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center font-mono text-base font-bold text-white"
                style={{ background: "hsl(33,65%,50%)" }}
              >
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-display text-base font-bold text-card-foreground">{member.name}</h3>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                {member.role}
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground/60">
                  Previously: {member.previously}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
