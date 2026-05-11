"use client"

import { ArrowRight, ArrowUpRight, Send } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { siteContent } from "@/content/content"
import { useTheme } from "@/lib/use-theme"

type SectionVariant = "light" | "dark" | "white" | "black"

export default function Home() {
  const { theme } = useTheme()
  const variants: SectionVariant[] =
    theme === "dark"
      ? ["dark", "black", "dark", "black", "dark", "black", "dark", "black"]
      : ["light", "white", "light", "white", "light", "white", "light", "white"]

  return (
    <>
      <Navbar />
      <main id="top">
        <Section variant={variants[0]} size="lg">
          <Reveal className="grid gap-10 py-12 md:grid-cols-12 md:items-end">
            <div className="space-y-8 md:col-span-8">
              <p className="text-caption font-medium uppercase text-primary">
                {siteContent.hero.eyebrow}
              </p>
              <div className="space-y-6">
                <h1 className="max-w-4xl font-heading text-h2 font-bold text-text-primary md:text-h1">
                  {siteContent.hero.headline}
                </h1>
                <p className="max-w-3xl text-body-lg text-text-secondary">
                  {siteContent.hero.body}
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild>
                  <a href="#work">
                    {siteContent.hero.primaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href="#contact">{siteContent.hero.secondaryCta}</a>
                </Button>
              </div>
            </div>
            <div className="md:col-span-4">
              <Card className="bg-surface">
                <CardHeader>
                  <CardTitle>{siteContent.about.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body text-text-secondary">
                    {siteContent.about.paragraphs[1]}
                  </p>
                </CardContent>
              </Card>
            </div>
          </Reveal>
        </Section>

        <Section variant={variants[1]}>
          <Reveal className="mx-auto max-w-3xl space-y-6" >
            <div id="about" className="space-y-4">
              <p className="text-caption font-medium uppercase text-primary">
                {siteContent.about.label}
              </p>
              <h2 className="font-heading text-h2 font-semibold text-text-primary">
                {siteContent.about.heading}
              </h2>
            </div>
            <div className="grid gap-4 text-body text-text-secondary">
              {siteContent.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </Section>

        <Section variant={variants[2]}>
          <Reveal className="space-y-10">
            <div id="services" className="max-w-2xl space-y-4">
              <p className="text-caption font-medium uppercase text-primary">
                {siteContent.services.label}
              </p>
              <h2 className="font-heading text-h2 font-semibold text-text-primary">
                {siteContent.services.heading}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {siteContent.services.items.map((service) => (
                <Card key={service.title}>
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-text-secondary">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </Section>

        <Section variant={variants[3]} size="lg">
          <Reveal className="space-y-10">
            <div id="work" className="grid gap-6 md:grid-cols-12 md:items-end">
              <div className="space-y-4 md:col-span-7">
                <p className="text-caption font-medium uppercase text-primary">
                  {siteContent.work.label}
                </p>
                <h2 className="font-heading text-h2 font-semibold text-text-primary">
                  {siteContent.work.heading}
                </h2>
              </div>
              <p className="text-body text-text-secondary md:col-span-5">
                {siteContent.proof.metric}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {siteContent.work.items.map((project) => (
                <Card key={project.title}>
                  <CardHeader>
                    <p className="text-caption text-primary">{project.tag}</p>
                    <CardTitle>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-body text-text-secondary">
                      {project.description}
                    </p>
                    <Button asChild variant="ghost" size="sm">
                      <a href="#contact">
                        {project.cta}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </Section>

        <Section variant={variants[4]}>
          <Reveal className="space-y-10">
            <div id="process" className="max-w-2xl space-y-4">
              <p className="text-caption font-medium uppercase text-primary">
                {siteContent.process.label}
              </p>
              <h2 className="font-heading text-h2 font-semibold text-text-primary">
                {siteContent.process.heading}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {siteContent.process.steps.map((step, index) => (
                <div key={step.title} className="space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-caption font-medium text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-h3 font-medium text-text-primary">
                      {step.title}
                    </h3>
                    <p className="text-body text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        <Section variant={variants[5]}>
          <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="text-caption font-medium uppercase text-primary">
              {siteContent.proof.label}
            </p>
            <blockquote className="font-heading text-h3 font-medium text-text-primary">
              {siteContent.proof.quote}
            </blockquote>
            <p className="text-body text-text-secondary">
              {siteContent.proof.metric}
            </p>
          </Reveal>
        </Section>

        <Section variant={variants[6]}>
          <Reveal className="mx-auto max-w-3xl space-y-8 text-center">
            <h2 className="font-heading text-h2 font-semibold text-text-primary">
              {siteContent.cta.heading}
            </h2>
            <Button asChild>
              <a href="#contact">
                {siteContent.cta.button}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </Reveal>
        </Section>

        <Section variant={variants[7]}>
          <Reveal className="mx-auto grid max-w-3xl gap-8">
            <div id="contact" className="space-y-4">
              <p className="text-caption font-medium uppercase text-primary">
                {siteContent.contact.label}
              </p>
              <h2 className="font-heading text-h2 font-semibold text-text-primary">
                {siteContent.contact.heading}
              </h2>
              <p className="text-body text-text-secondary">
                {siteContent.contact.intro}
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <form className="grid gap-4">
                  <Input
                    name="name"
                    placeholder={siteContent.contact.fields.name}
                    aria-label={siteContent.contact.fields.name}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder={siteContent.contact.fields.email}
                    aria-label={siteContent.contact.fields.email}
                  />
                  <Textarea
                    name="message"
                    placeholder={siteContent.contact.fields.message}
                    aria-label={siteContent.contact.fields.message}
                  />
                  <Button type="submit">
                    {siteContent.contact.submit}
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  )
}
