import { Fingerprint, CreditCard, Database, FileCheck, Globe, BarChart3 } from "lucide-react";

const products = [
  {
    icon: Fingerprint,
    title: "National Digital Identity",
    description: "Foundational and functional ID systems with biometric enrollment, credential issuance, and verification APIs.",
  },
  {
    icon: CreditCard,
    title: "Payment & Transfer Rails",
    description: "Interoperable payment infrastructure for G2P transfers, merchant payments, and cross-border settlement.",
  },
  {
    icon: Database,
    title: "Data Exchange Layer",
    description: "Secure, consent-based data sharing between ministries, agencies, and regulated entities.",
  },
  {
    icon: FileCheck,
    title: "Consent & Privacy Engine",
    description: "Citizen-controlled consent management that enforces data protection regulation at the protocol level.",
  },
  {
    icon: Globe,
    title: "Interoperability Gateway",
    description: "Standards-compliant adapters connecting national systems to regional and global digital ecosystems.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Monitoring",
    description: "Real-time dashboards for system health, adoption metrics, and policy impact measurement.",
  },
];

const WhatWeBuildSection = () => {
  return (
    <section id="what-we-build" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
            What We Build
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Modular DPI components, ready to deploy.
          </h2>
          <p className="mt-4 font-body text-lg text-muted-foreground">
            Each module is independently deployable, auditable, and extensible by your teams.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.title}
              className="card-hover rounded-xl border border-border bg-card p-7"
            >
              <div className="mb-4 inline-flex rounded-md border border-border bg-secondary p-2.5">
                <p.icon size={18} className="text-gold" />
              </div>
              <h3 className="font-display text-base font-bold text-card-foreground">
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

export default WhatWeBuildSection;
