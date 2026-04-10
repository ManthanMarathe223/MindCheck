// src/pages/OurJourneyPage.jsx
import { journeyEvents, fieldWorkPhotos } from "@/data/journey";
import { specialThanks } from "@/data/thanks";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

/* ── Timeline Image ── */
function TimelineImage({ src, alt, stepNumber }) {
  const [err, setErr] = useState(false);

  const gradients = [
    "from-primary/20 to-[hsl(var(--soft-green))]",
    "from-[hsl(var(--accent)/0.2)] to-[hsl(var(--soft-peach))]",
    "from-primary/15 to-[hsl(var(--soft-green))]",
    "from-[hsl(var(--accent)/0.15)] to-[hsl(var(--soft-peach))]",
    "from-primary/20 to-[hsl(var(--soft-green))]",
    "from-[hsl(var(--accent)/0.2)] to-[hsl(var(--soft-peach))]",
  ];

  if (err || !src) {
    return (
      <div
        className={`w-full h-[250px] rounded-xl bg-gradient-to-br ${gradients[(stepNumber - 1) % gradients.length]} flex items-center justify-center`}
      >
        <span className="text-5xl font-bold text-primary/30 font-heading">{stepNumber}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt || `Step ${stepNumber}`}
      onError={() => setErr(true)}
      className="w-full h-[250px] object-cover rounded-xl"
    />
  );
}

/* ── Gallery Image (masonry grid) ── */
function GalleryImage({ src, index }) {
  const [err, setErr] = useState(false);

  const gradients = [
    "from-primary/20 to-[hsl(var(--soft-green))]",
    "from-[hsl(var(--accent)/0.2)] to-[hsl(var(--soft-peach))]",
    "from-primary/15 to-[hsl(var(--soft-green))]",
    "from-[hsl(var(--accent)/0.15)] to-[hsl(var(--soft-peach))]",
    "from-primary/20 to-[hsl(var(--soft-green))]",
    "from-[hsl(var(--accent)/0.2)] to-[hsl(var(--soft-peach))]",
  ];

  if (err || !src) {
    return (
      <div
        className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}
      >
        <span className="text-3xl font-bold text-primary/20 font-heading">{index + 1}</span>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl group">
      <img
        src={src}
        alt={`Field work ${index + 1}`}
        onError={() => setErr(true)}
        className="w-full aspect-[4/3] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

/* ── Thanks Photo ── */
function ThanksPhoto({ src, name }) {
  const [err, setErr] = useState(false);
  const initials = name
    .split(" ")
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (err || !src) {
    return (
      <div className="w-36 h-36 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/20 to-[hsl(var(--soft-peach))] flex items-center justify-center mx-auto border-4 border-[hsl(var(--accent)/0.3)]">
        <span className="text-3xl font-bold text-primary font-heading">{initials}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setErr(true)}
      className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover mx-auto border-4 border-[hsl(var(--accent)/0.3)] shadow-lg"
    />
  );
}

export default function OurJourneyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero Header ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--soft-green))] via-background to-[hsl(var(--soft-peach)/0.4)]" />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center animate-fade-in-up">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Behind the Scenes
          </Badge>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4">
            Our Journey
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From a spark of an idea to a deployed ML model — follow the milestones that shaped MindCheck.
          </p>
        </div>
      </section>

      {/* ── Alternating Timeline with Inline Images ── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

            <div className="flex flex-col gap-12">
              {journeyEvents.map((event, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={event.id}
                    className="relative animate-fade-in-up"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {/* Dot */}
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1 z-10">
                      <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-sm" />
                    </div>

                    {/* Mobile: stacked layout (text then image) */}
                    <div className="pl-8 md:hidden">
                      <p className="text-xs font-medium text-primary mb-0.5">{event.date}</p>
                      <h3 className="font-heading text-base font-bold text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{event.description}</p>
                      <div className="mt-4">
                        <TimelineImage
                          src={event.imagePath}
                          alt={event.imageAlt}
                          stepNumber={event.id}
                        />
                      </div>
                    </div>

                    {/* Desktop: alternating text + image */}
                    <div className="hidden md:grid md:grid-cols-2 md:gap-10 w-full">
                      {isLeft ? (
                        <>
                          <div className="text-right pr-8 flex flex-col justify-center">
                            <p className="text-xs font-medium text-primary mb-0.5">{event.date}</p>
                            <h3 className="font-heading text-lg font-bold text-foreground">{event.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{event.description}</p>
                          </div>
                          <div className="pl-8">
                            <TimelineImage
                              src={event.imagePath}
                              alt={event.imageAlt}
                              stepNumber={event.id}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="pr-8 flex justify-end">
                            <div className="w-full max-w-md">
                              <TimelineImage
                                src={event.imagePath}
                                alt={event.imageAlt}
                                stepNumber={event.id}
                              />
                            </div>
                          </div>
                          <div className="pl-8 flex flex-col justify-center">
                            <p className="text-xs font-medium text-primary mb-0.5">{event.date}</p>
                            <h3 className="font-heading text-lg font-bold text-foreground">{event.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{event.description}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* End dot */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 -bottom-1 z-10">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--accent))] ring-4 ring-background" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Field Work Gallery (Masonry Grid only — no slider) ── */}
      <section className="py-16 md:py-20 bg-[hsl(var(--soft-green))]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">Gallery</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Our Field Work in Action
            </h2>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {fieldWorkPhotos.map((photo, i) => (
              <div
                key={i}
                className="animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 80}ms` }}
              >
                <GalleryImage src={photo} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Special Thanks ── */}
      <section className="py-24 md:py-28 bg-gradient-to-b from-background to-[hsl(var(--soft-peach)/0.4)]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-sm font-medium text-[hsl(var(--accent))] uppercase tracking-wider mb-2">Gratitude</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Special Thanks
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              This project would not have been possible without the guidance and support of these incredible people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {specialThanks.map((person, i) => (
              <div
                key={person.name}
                className="flex flex-col items-center text-center gap-5 animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 150}ms` }}
              >
                <ThanksPhoto src={person.photo} name={person.name} />
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{person.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{person.qualification}</p>
                  <p className="text-sm text-foreground/80 mt-3 leading-relaxed italic">
                    "{person.contribution}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
