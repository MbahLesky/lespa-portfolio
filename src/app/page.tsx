import { Section } from "@/components/sections/Section";
import { Button } from "@/components/shared/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 2. Hero */}
      <Section variant="light" spacing="large">
        <div className="flex flex-col gap-8 md:gap-12 max-w-3xl">
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
            Senior Frontend Systems Engineer
          </h1>
          <p className="text-lg md:text-xl text-textSecondary max-w-2xl leading-relaxed">
            I build structurally sound, production-ready frontend architectures designed for scale, speed, and strict systemic consistency.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <Button size="lg" asChild>
              <a href="#work">View Projects</a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </Section>

      {/* 3. About (Mission) */}
      <Section id="about" variant="dark" spacing="medium">
        <div className="max-w-3xl flex flex-col gap-6">
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-accentSecondary">
            Mission
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface">
            Bridging the gap between strict design systems and performant engineering.
          </h2>
          <p className="text-base md:text-lg text-textMuted max-w-2xl leading-relaxed">
            I specialize in the intersection of design and engineering—ensuring every token, generic pattern, and layout spacing rule translates perfectly into production environments.
          </p>
        </div>
      </Section>

      {/* 4. Services */}
      <Section id="services" variant="light" spacing="large">
        <div className="flex flex-col gap-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">Capabilities</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "System Architecture", desc: "Building scalable, token-driven component libraries." },
              { title: "Performance Tuning", desc: "Optimizing render cycles and asset delivery metrics." },
              { title: "Design Engineering", desc: "Translating static Figma concepts into fluid code." }
            ].map((service, i) => (
              <Card key={i} className="bg-surface/50 border-border/60 hover:border-primary/30 transition-colors backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-textSecondary text-base">
                    {service.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. Selected Work */}
      <Section id="work" variant="brand" spacing="large">
        <div className="flex flex-col gap-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface">Selected Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-surface border border-border/20 rounded-lg overflow-hidden flex flex-col h-full group">
                <div className="aspect-video bg-border/40 w-full" />
                <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
                  <h3 className="font-heading text-2xl font-bold text-primary">Project #{i}</h3>
                  <p className="text-textSecondary text-sm line-clamp-3">
                    Engineered a comprehensive design token logic compiler validating 150+ variables across execution environments.
                  </p>
                  <div className="mt-auto pt-4">
                    <Button variant="link" className="px-0 text-primary group-hover:text-primary-dark">Read Case Study →</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. Process */}
      <Section id="process" variant="dark" spacing="medium">
        <div className="flex flex-col gap-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface text-center">Development Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Discovery', 'Architecture', 'Execution', 'Handoff'].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary font-bold text-lg">
                  {i + 1}
                </div>
                <h4 className="font-heading text-xl font-bold text-surface">{step}</h4>
                <p className="text-sm text-textMuted">Structured constraint mapping and requirement validation.</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 7. Proof (Testimonial Placeholder) */}
      <Section variant="dark" spacing="medium">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-8">
          <p className="font-heading text-2xl md:text-3xl font-medium text-surface italic leading-relaxed">
            &quot;The most structured engineering approach I&apos;ve seen. The architecture scaled perfectly without any design degradation.&quot;
          </p>
          <p className="text-sm font-bold text-textMuted uppercase tracking-widest">— Lead Designer, TechCorp</p>
        </div>
      </Section>

      {/* 8. Contact Form */}
      <Section id="contact" variant="light" spacing="large">
        <div className="max-w-xl mx-auto w-full flex flex-col gap-8">
          <div className="text-center flex flex-col gap-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">Start a Conversation</h2>
            <p className="text-textSecondary">Looking to rebuild an architecture? Let's talk.</p>
          </div>

          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium leading-none text-textPrimary">Name</label>
              <Input id="name" placeholder="John Doe" className="bg-surface" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium leading-none text-textPrimary">Email</label>
              <Input id="email" type="email" placeholder="john@example.com" className="bg-surface" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium leading-none text-textPrimary">Message</label>
              <Textarea id="message" placeholder="How can I help you?" className="min-h-[150px] bg-surface" />
            </div>
            <Button size="lg" className="w-full">Send Message</Button>
          </form>
        </div>
      </Section>

    </div>
  );
}
