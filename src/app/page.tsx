import SleighSky from "@/components/SleighSky";
import SnowCanvas from "@/components/SnowCanvas";
import StarField from "@/components/StarField";

export default function Home() {
  const itinerary = [
    {
      title: "Twilight Ticket Pick-Up",
      detail:
        "Arrive at our private Arctic hangar for hot cocoa art, custom parkas, and your golden boarding badge before the charter jet departs.",
      time: "Day 1  |  6:00 PM",
    },
    {
      title: "Secret Workshop Sleepover",
      detail:
        "Build a keepsake toy alongside Santa's master crafters while mom and dad unwind in the starlit Observatory Lounge.",
      time: "Nightfall",
    },
    {
      title: "Reindeer Flight Academy",
      detail:
        "Earn your official North Pole junior flight wings as Blitzen's crew shares real reindeer care tricks and sleigh-guided constellation spotting.",
      time: "Day 2  |  Morning",
    },
    {
      title: "Aurora Grand Banquet",
      detail:
        "Celebrate under the dancing northern lights with a chef-curated tasting menu and Santa's end-of-year wish ceremony.",
      time: "Final Evening",
    },
  ];

  const highlights = [
    {
      label: "All-inclusive wonder",
      description:
        "Chartered flights, private chalet suites, and round-the-clock kid concierges keep adventure effortless for the whole family.",
    },
    {
      label: "Curriculum-crafted fun",
      description:
        "STEAM-forward workshops led by Arctic naturalists and head elves connect holiday magic with real-world discovery.",
    },
    {
      label: "Memories that give back",
      description:
        "A portion of every itinerary funds first-snow scholarships for classrooms across the country.",
    },
  ];

  const parentAssurance = [
    {
      title: "Premium safety + staffing",
      detail:
        "24/7 pediatric nurse, chef-led allergy program, and a 4:1 guide-to-adventurer ratio on every excursion.",
    },
    {
      title: "Effortless travel",
      detail:
        "Door-to-door luggage service, heated hangar transfers, and concierge passport assistance included.",
    },
    {
      title: "Curated downtime",
      detail:
        "Fireside parent tastings, guided stargazing, and a spa-level recharge lounge while the kids explore.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-slate-100">
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-indigo-950/70 via-indigo-950/30 to-slate-900/80" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />

      <StarField />
      <SnowCanvas />
      <SleighSky />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.35),transparent_55%),radial-gradient(circle_at_70%_0%,rgba(22,78,170,0.4),transparent_45%)]" />

      <div className="absolute right-8 top-8 z-10 hidden h-40 w-40 rounded-full bg-gradient-to-br from-slate-100 via-white to-slate-300 opacity-90 shadow-[0_0_65px_rgba(255,255,255,0.45)] md:block">
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white via-slate-200/80 to-slate-500/60 opacity-90 mix-blend-screen" />
        <div className="absolute left-6 top-10 h-8 w-8 rounded-full bg-slate-300/70 opacity-60" />
        <div className="absolute left-16 top-20 h-6 w-6 rounded-full bg-slate-200/50 opacity-70" />
      </div>

      <section className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-28 pt-24 sm:px-10 md:pt-28 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-100/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-amber-100/90 backdrop-blur">
            North Pole Express
            <span className="rounded-full bg-amber-300/20 px-3 py-0.5 text-[0.7rem] font-semibold tracking-[0.18em] text-amber-100/95 shadow-[0_0_18px_rgba(254,240,138,0.35)]">
              72 Hours Left
            </span>
          </div>

          <h1 className="text-glow max-w-2xl text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
            Last-Minute Golden Tickets to Santa&apos;s Moonlit Hideaway
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-slate-200/80 sm:text-xl">
            Bundle up for the only private adventure where kids ages 7-11
            apprentice with Santa&apos;s crew, sip velvet cocoa beneath the
            northern lights, and fall asleep in a chalet tucked inside the
            Claus family quarters. We&apos;ve held a handful of luxury suites
            just for spontaneous holiday heroes.
          </p>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <a
              href="#reserve"
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 px-8 py-3 text-base font-semibold text-indigo-950 shadow-[0_20px_40px_rgba(250,204,21,0.35)] transition hover:scale-[1.02] hover:shadow-[0_22px_48px_rgba(250,204,21,0.45)]"
            >
              Unlock the Final Sleigh Spot
              <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-indigo-900/30 bg-indigo-900/20 text-xs font-bold text-indigo-950">
                Go
              </span>
            </a>
            <div className="flex items-center gap-4 text-sm text-slate-200/80">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]">
                Parents Welcome
              </span>
              Complimentary concierge call in under 15 minutes.
            </div>
          </div>

          <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg sm:grid-cols-3">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-emerald-200/70">
                Travelers
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">12 kids</p>
              <p className="text-sm text-slate-200/70">Curated cohort with similar ages &amp; interests.</p>
            </div>
            <div className="border-y border-white/10 py-3 sm:border-x sm:border-y-0 sm:px-6">
              <p className="text-sm uppercase tracking-[0.18em] text-emerald-200/70">
                Dates
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">
                Dec 21-24
              </p>
              <p className="text-sm text-slate-200/70">Snow-guaranteed with private aurora forecast.</p>
            </div>
            <div className="sm:pl-6">
              <p className="text-sm uppercase tracking-[0.18em] text-emerald-200/70">
                Investment
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">
                $14,800
              </p>
              <p className="text-sm text-slate-200/70">
                For one child + two caregivers, everything included.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
          <h2 className="text-2xl font-semibold text-white">
            A snow globe itinerary made for curious hearts
          </h2>
          <p className="text-sm text-slate-200/70">
            Each moment pairs playtime magic with awe-filled learning to keep
            imaginative minds sparking long after the sleigh touches down.
          </p>

          <div className="space-y-6">
            {itinerary.map((stop) => (
              <div
                key={stop.title}
                className="rounded-2xl border border-white/10 bg-indigo-950/40 p-5 shadow-[0_10px_30px_rgba(30,58,138,0.35)]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm uppercase tracking-[0.22em] text-amber-100/80">
                    {stop.time}
                  </p>
                  <span className="h-px flex-1 bg-gradient-to-r from-amber-200/30 via-white/10 to-transparent" />
                </div>
                <p className="mt-3 text-lg font-semibold text-white">
                  {stop.title}
                </p>
                <p className="mt-2 text-sm text-slate-200/75">{stop.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto grid w-full max-w-6xl gap-8 px-6 pb-24 sm:px-10 lg:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="group rounded-3xl border border-emerald-100/10 bg-emerald-500/10 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-emerald-100/25 hover:bg-emerald-500/16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-100/80">
              {item.label}
            </span>
            <p className="mt-3 text-base leading-relaxed text-slate-100/90">
              {item.description}
            </p>
          </div>
        ))}
      </section>

      <section className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-28 sm:px-10 lg:flex-row">
        <div className="flex-1 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h3 className="text-2xl font-semibold text-white">
            Parents, relax-Santa&apos;s team handles the details
          </h3>
          <p className="text-sm text-slate-200/70">
            We designed the sprint-to-Christmas adventure for families who crave
            spontaneous magic with five-star polish.
          </p>

          <div className="space-y-5">
            {parentAssurance.map((perk) => (
              <div
                key={perk.title}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-sky-200/80">
                  {perk.title}
                </p>
                <p className="mt-2 text-sm text-slate-200/75">{perk.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          id="reserve"
          className="flex-1 space-y-6 rounded-3xl border border-amber-100/20 bg-gradient-to-br from-amber-200/35 via-amber-100/20 to-amber-300/10 p-8 backdrop-blur"
        >
          <h3 className="text-2xl font-semibold text-indigo-950">
            Reserve in ten made-for-holiday minutes
          </h3>
          <p className="text-sm text-indigo-900/80">
            Our concierges will confirm your suite, private chef notes, and any
            custom wish list details in one personal call.
          </p>

          <form className="space-y-5">
            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-900/80">
                Adventurer Name
              </span>
              <input
                type="text"
                placeholder="First & last"
                className="w-full rounded-xl border border-indigo-900/20 bg-white/80 px-4 py-3 text-sm text-indigo-950 placeholder:text-indigo-900/40 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200/50"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-900/80">
                Parent Contact Email
              </span>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-xl border border-indigo-900/20 bg-white/80 px-4 py-3 text-sm text-indigo-950 placeholder:text-indigo-900/40 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200/50"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-900/80">
                Wish-List Highlights
              </span>
              <textarea
                rows={4}
                placeholder="Tell Santa about favorite hobbies, treats, and must-see surprises."
                className="w-full rounded-xl border border-indigo-900/20 bg-white/80 px-4 py-3 text-sm text-indigo-950 placeholder:text-indigo-900/40 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200/50"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-indigo-950 px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-200 shadow-[0_15px_35px_rgba(30,64,175,0.45)] transition hover:scale-[1.01] hover:bg-indigo-900"
            >
              Hold My Golden Ticket
            </button>
          </form>

          <p className="text-xs text-indigo-950/70">
            A concierge will text within ten minutes to align travel logistics
            and answer every question-no payment collected until you confirm.
          </p>
        </div>
      </section>

      <footer className="relative z-20 mx-auto w-full max-w-6xl px-6 pb-12 text-xs uppercase tracking-[0.3em] text-slate-200/60 sm:px-10">
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.68rem] sm:flex-row sm:justify-between">
          <span>North Pole Charter Collective  |  An Evergreen Experiences Company</span>
          <span>FAA-certified  |  Snow-safety insured  |  Est. 1998</span>
        </div>
      </footer>
    </main>
  );
}
