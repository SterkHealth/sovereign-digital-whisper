const team = [
  {
    name: "Dr. Amara Osei",
    role: "Chief Executive Officer",
    bio: "Former Director of Digital Transformation at the African Development Bank. 18 years in public sector technology strategy.",
  },
  {
    name: "Rajiv Menon",
    role: "Chief Technology Officer",
    bio: "Previously led national ID infrastructure at scale for 200M+ citizens. Deep expertise in privacy-preserving systems.",
  },
  {
    name: "Fatima Al-Rashid",
    role: "VP of Government Relations",
    bio: "Former policy advisor to three MENA governments. Expert in digital regulation and procurement frameworks.",
  },
  {
    name: "Dr. Kwame Asante",
    role: "Head of AI & Engineering",
    bio: "PhD in distributed systems from ETH Zürich. Built AI infrastructure at a leading European govtech company.",
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="section-padding bg-section-alt">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Leadership
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built by people who understand the mission.
          </h2>
          <p className="mt-4 font-body text-base text-muted-foreground">
            Our team combines deep public sector experience with world-class engineering capability.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="border border-border bg-card p-6"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center bg-primary font-mono text-lg font-bold text-primary-foreground">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-display text-base font-bold text-card-foreground">
                {member.name}
              </h3>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                {member.role}
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
