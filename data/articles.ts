import { Article } from "@/types";

export const ARTICLES_DATA_VERSION = "2026-10-16-v2";

export const SAMPLE_ARTICLES: Article[] = [
  // ── Article 3: Most Recent (Top) ──
  {
    id: "jet-bottleneck-fork-future-aviation",
    editionNumber: 3,
    title: "The Jet Bottleneck: The Fork in the Future of Aviation!",
    summary:
      "This article covers how the market is reaching a point where current manufacturers won't be able to meet current market demands. What are the stats from manufacturers? What will happen in response to this high demand? This article is continuity of topics we discussed in M1's 1st and 2nd editions.",
    category: "Supply Chain & Market Economics",
    date: "Sep 08, 2026",
    accentColor: "border-amber-600/50 bg-gradient-to-br from-amber-950/40 via-zinc-950 to-black hover:border-amber-500",
    thumbBg: "bg-amber-900/40",
    readTime: "8 min read",
    imageUrl: "/images/articles/article-3/card-thumb.png",
    sections: [
      {
        heading: "Introduction: The September Edition",
        content: [
          "Welcome to the September edition of M1 monthly articles on aviation. Our first piece looked at where innovation in the industry is headed; the second mapped the history of the business cycle aviation is moving through and where we sit on it right now.",
          "This article picks up from there: the bottleneck that cycle is currently running into, and the two ways it can resolve. We suggest reading articles 1 and 2 before this article, as it continues the picture painted by the previous articles.",
        ],
      },
      {
        heading: "The Backlog: Commercial Aviation Paradox",
        layout: "wrap-right",
        imageUrl: "/images/articles/article-3/a22-interior.png",
        imageCaption: "Airbus ACJ TwoTwenty cabin interior representing soaring executive demand amidst constrained deliveries.",
        content: [
          "Commercial aviation is sitting on a paradox. Demand for air travel has fully recovered from the pandemic and continues to climb, yet the two companies that build most of the world's jets, Boeing and Airbus, cannot turn orders into airplanes fast enough. As of mid-2026, the combined order backlog between the two manufacturers sits well above 16,000 aircraft, roughly a decade of production at current output rates. Airbus alone is carrying a backlog north of 9,000 aircraft, over ten years of coverage at its current delivery pace.",
          "Pre-owned business jet inventory is also a mess; the aircraft available for a buyer who doesn't want to wait years for a factory-new delivery has fallen to roughly 4-6% of the global fleet in 2026. Historically, the balance has been around 9-12%.",
          "In the heavy jet segment specifically, inventory sat at just 5.2% in the first half of 2026 even as transactions were up 18.5% year over year. The cause is the same upstream story as commercial aviation, just more acute. Gulfstream's backlog stood at $21.8 billion by mid-2026, and its book-to-bill ratio—new orders relative to what it delivered—hit 1.5x, meaning the order book is growing faster than the factory can empty it. Bombardier's Global 7500 carries an 18-24 month backlog; its flagship large-cabin jets and Gulfstream's G700/G800 are effectively sold out into 2027 and beyond.",
        ],
      },
      {
        heading: "Upstream Constraints & Gliders on the Tarmac",
        layout: "wrap-left",
        imageUrl: "/images/articles/article-3/G800.png",
        imageCaption: "Gulfstream G800: Large-cabin flagship orders effectively sold out through 2027.",
        content: [
          "This isn't a demand problem. Airlines and private owners are still ordering aggressively, and cancellations are down sharply year over year. The constraint sits upstream: engines, seats, and specialty components.",
          "Rolls-Royce engine shortages are holding up A330neo and A350 deliveries; Pratt & Whitney GTF shortages are throttling A220 output; seat makers like Safran and Collins Aerospace can't build interiors fast enough, forcing Airbus to roll finished airframes off the line without engines, so-called 'gliders' waiting in a lot for a powerplant.",
          "Boeing has its own version of the same story, layered on top of quality-control fallout from recent years, which is part of why it acquired supplier Spirit AeroSystems in a bid to stabilize its 737 fuselage supply chain.",
          "Put simply: the industry has more orders than it can physically fulfill for the foreseeable future. That is the bottleneck. The interesting question isn't whether it exists (a 4-year-old can see that); it's what happens once manufacturers actually catch up.",
        ],
      },
      {
        heading: "Two Ways This Resolves: The Fork in the Road",
        layout: "wrap-right",
        imageUrl: "/images/articles/article-3/Two paths one can be choosen.png",
        imageCaption: "The strategic fork facing global aerospace: Overproduction vs. Disciplined Undersupply.",
        content: [
          "Once production capacity starts closing the gap with demand, likely over the next three to four years as new assembly lines, supplier fixes, and engine capacity come online, the industry faces a fork. Two paths: the industry can only choose one; the path chosen will determine the future of aviation and the growth of the industry.",
          "Scenario One: Overproduction and Correction — Manufacturers, having spent years underbuilding relative to demand, overproduce. New assembly lines come fully online at the same time secondhand aircraft kept flying past retirement age get replaced, and macro shocks reduce airline appetite. Result: too many jets chasing too few buyers, used-aircraft values fall, and manufacturers face a demand air pocket.",
          "Scenario Two: Disciplined Undersupply — Manufacturers and supply chains deliberately calibrate production to stay just under realized demand. In this world, there is always one less jet than the market needs. Lease and residual values stay firm, nobody holds excess metal, and growth is slower but durable.",
        ],
      },
      {
        heading: "Why the Bottleneck is an Innovation Trigger",
        layout: "full",
        imageUrl: "/images/articles/article-3/Overview of M1s SAIOS.png",
        imageCaption: "Overview of M1's SIOS: Unified operating layer linking airframes, telemetry, and market intelligence.",
        content: [
          "When you can't simply build more jets, the pressure shifts toward getting more value out of every jet you already have.",
          "It can be achieved by extending useful life, tightening maintenance turnaround, optimizing routing and utilization, and making the acquisition and ownership process itself less wasteful.",
          "Historically, aviation has been notoriously opaque and manual in exactly this area; aircraft records, maintenance history, part provenance, and ownership transfer are still handled through a patchwork of paper trails, PDFs, and siloed systems across manufacturers, lessors, MROs, and airlines.",
          "In a market where every available airframe is precious, that friction becomes expensive. M1 and other firms are competing and collaborating to create a digital, efficient, transparent, and unified ecosystem.",
        ],
      },
      {
        heading: "The Bottom Line",
        content: [
          "The next three to four years will likely feel like scarcity: airlines waiting years for deliveries, older aircraft flying longer than planned, lease rates staying firm.",
          "The manufacturers will keep solving for metal. The bigger, less crowded opportunity is solving for everything that happens to that metal after it leaves the factory—which is the exact problem M1 is built around.",
        ],
      },
    ],
  },

  // ── Article 2: Middle (July 2026) ──
  {
    id: "bloom-of-aviation-2-edition-vc-special",
    editionNumber: 2,
    title: "Bloom of Aviation - 2 Edition (VC Special)",
    summary:
      "Every industry faces depression, recovery, bloom, and recession; all of this happens in a cyclic manner. We have done deep research on the cycles of Business Aviation and composed our results in the article below. In this edition we give you analysis of current conditions, the history and answering: Why now?",
    category: "Venture Capital & Market Cycles",
    date: "Jul 07, 2026",
    accentColor: "border-sky-600/50 bg-gradient-to-br from-sky-950/40 via-zinc-950 to-black hover:border-sky-500",
    thumbBg: "bg-sky-900/40",
    readTime: "9 min read",
    imageUrl: "/images/articles/article-2/card-thumb.png",
    sections: [
      {
        heading: "Bloom of Business Aviation (VC Special Edition)",
        content: [
          "In this article, we will discuss the business cycle of the Aviation Business, its stages, history, future projections, expert analysis of current conditions, and the reasons why Aviation is attracting big names from Silicon Valley.",
          "Now, if you are not a tech guy (founder), a finance guy, or a business guy, and you are a hardcore aviation dude, with your expertise in the technical sector, just for you, I am explaining basic business terminologies, as we shall examine in the ensuing sections of this article.",
          "A business cycle is defined in the sources as the natural fluctuation of an economy between periods of growth (expansion) and decline (contraction). These cycles are not random but are driven by a complex interplay of forces, including interest rates, consumer confidence, and government spending.",
          "The four distinct phases: 1. Expansion (Recovery), 2. Peak (Bloom), 3. Contraction (Recession), 4. Trough (Depression).",
        ],
      },
      {
        heading: "The Historical Cycle of Business Aviation",
        layout: "wrap-right",
        imageUrl: "/images/articles/article-2/beechcraft-staggerwing.png",
        imageCaption: "Beechcraft Staggerwing (1932): The aircraft that launched corporate utility flight.",
        content: [
          "1. The Starting Point: (1930s–1950s) — Private aviation emerged from experiment to utility in the 1930s. The Beechcraft Staggerwing (1932) is credited as the first true business aircraft, designed specifically to carry executives faster than trains. Following World War II, the industry utilized war-surplus aircraft like the Douglas DC-3, establishing 'executive transport' as a distinct category.",
          "2. The First Bloom: The Jet Age (1960s) — The Learjet 23 (1963) mass-produced business jets. Lines like Dassault Falcon 20 and Gulfstream GII introduced long-range executive travel and created the 'jet-set' lifestyle.",
          "3. The First Major Recession: (Late 1980s–Early 1990s) — Downturn led to major consolidation, notably Bombardier acquiring Learjet in 1990, followed by the early 1990s Gulf War geopolitical shock.",
          "4. The First 'Depression': (2008 and 2020) — The 2008 Global Financial Crisis triggered a total collapse in corporate spending. The COVID-19 pandemic caused a sudden standstill followed by an unprecedented reset.",
          "5. The First Recoveries: (Post-2008 and 2021–2022) — 2021-2022 saw the most dramatic surge as first-time flyers flooded private aviation due to airline disruptions.",
          "6. Current Stage: The 2026 Inflection Point — Steady growth checked by the 2026 Strait of Hormuz energy crisis doubling jet fuel prices, combined with chronic supply chain bottlenecks, MRO delays, and labour shortages.",
        ],
      },
      {
        heading: "The 1960s Jet Age Catalyst",
        layout: "wrap-left",
        imageUrl: "/images/articles/article-2/gulfstream-2.png",
        imageCaption: "Gulfstream II: The long-range workhorse that inaugurated modern executive travel.",
        content: [
          "The first true bloom transformed business aviation from a niche hobby for wealthy pilots into an indispensable corporate power tool.",
          "The Gulfstream II and Falcon 20 set global standards for coast-to-coast and transatlantic capabilities that still govern aircraft design today.",
        ],
      },
      {
        heading: "The Next Bloom & Silicon Valley Influx",
        layout: "wrap-right",
        imageUrl: "/images/articles/article-2/phantom-3500.png",
        imageCaption: "Emerging jet technology: Next-generation flight platforms entering the autonomous digital era.",
        content: [
          "Now the question arises, when will the next bloom come? Business Aviation has been through hell, and now bloom has already started. New inventions are coming, and VCs are betting on the future of private aviation. M1 experts predict a full peak in the early 2030s.",
          "Palantir Entering Aviation: Palantir is actively investing and partnering with Avi-tech firms; they are active partners of Archer Aviation and working on air taxis.",
          "On June 29, 2026, Palantir and Surf Air Mobility expanded their partnership, providing Surf Air with Palantir AI technologies. Peter Thiel is deeply invested in aviation software.",
          "Surf OS offers Owner OS, Broker OS, and Operator OS. But will 3 separate systems solve fragmentation? M1 solves this by creating a single unified ecosystem: marketplace + OS united, uniting asset acquisition, market intelligence, telemetry, and blockchain security.",
        ],
      },
      {
        heading: "What's in it for VCs",
        layout: "wrap-left",
        imageUrl: "/images/articles/article-2/peter-thiel.png",
        imageCaption: "Peter Thiel: Backing the deep-tech and AI transformation of aerospace infrastructure.",
        content: [
          "Peter Thiel is often referred to as the Godfather of VCs, and Silicon Valley recognizes him for his direction and foresight. His view on Avi-Tech is clear.",
          "Y-Combinator, A16Z, and Sequoia Capital are actively deploying capital in aviation: funding firms like ASI, Hermeus, Beyond Aero, and Mach Industries.",
          "The message is clear: it is time to invest in niche tech companies working on AI, DePIN, Digital Twins, and IoT. Private Aviation is the next trillion-dollar frontier, and ventures like M1 represent the emerging unicorns of this transition.",
        ],
      },
    ],
  },

  // ── Article 1: Oldest (Bottom) ──
  {
    id: "future-of-private-aviation-man-manual",
    editionNumber: 1,
    title: "Future of Private Aviation: \"Man will not be managing planes in the next decade manually.\"",
    summary:
      "We just published our article on \"Future of Aviation.\" This is perhaps the best summary of where the whole industry is moving, and it paints a perfect picture of the future we are heading towards. It highlights how the tech shift—AI and DePIN—is about to change aviation in the long term! Read it below and send your thoughts about this edition to: team@rsinternational.net!",
    category: "AI & Autonomous Aviation",
    date: "Jun 02, 2026",
    accentColor: "border-emerald-600/50 bg-gradient-to-br from-emerald-950/40 via-zinc-950 to-black hover:border-emerald-500",
    thumbBg: "bg-emerald-900/40",
    readTime: "10 min read",
    imageUrl: "/images/articles/article-1/card-thumb.png",
    sections: [
      {
        heading: "The Shift in Private Aviation",
        quote: "“Man will not be managing planes in the next decade manually.”",
        layout: "wrap-right",
        imageUrl: "/images/articles/article-1/cockpit-avionics.png",
        imageCaption: "Modern glass cockpit telemetry: The transition from manual pilot intervention to autonomous envelope management.",
        content: [
          "The aviation market is changing, and the bigger picture is scaring and exciting, both at the same time. After having conversations with multiple experts in different domains of aviation, we can say:",
          "“Man will not be managing planes in the next decade manually.”",
          "Even more, there will be a future, for sure, where: “Man will not even be flying a plane in the future manually.”",
          "These are not random assumptions. These are statements presented as a summary of in-depth research on aviation, performed at M1. In the article below, these statements will be supported by numerous facts and patterns analyzed by experts at M1.",
        ],
      },
      {
        heading: "Emerging technologies:",
        layout: "dual",
        images: [
          {
            url: "/images/articles/article-1/leather-cabin.png",
            caption: "Next-generation executive cabin configuration.",
          },
          {
            url: "/images/articles/article-1/jet-flight-1.png",
            caption: "Autonomous airframe high-altitude cruise trajectory.",
          },
        ],
        content: [
          "Artificial Intelligence (AI), Decentralized Physical Infrastructure (DePin), and big data technologies have changed how we operate and conceptualize our work life, specifically emerging technologies such as PdM (Predictive Maintenance), IoT (Internet of Things), DT (Digital Twins), SPS (Streamlined Predictive Scheduling), and Supersonic Flight technologies. Each of the mentioned technologies will have a significant effect on daily aviation operations, and even more effect (or return) in the long term; however, individual effects will not be revolutionary on their own; it's more about the ecosystem these technologies will create when combined.",
          "To understand what is changing, how it is changing, and how to adapt to these changes, we have elaborated on each technology in depth below, which can serve as a guideline for you to position your firm and yourself to dominate this tech shift.",
        ],
      },
      {
        heading: "1. Artificial Intelligence: Predictive Maintenance (PdM)",
        layout: "wrap-left",
        imageUrl: "/images/articles/article-1/blockchain-jet.png",
        imageCaption: "Sensory IoT diagnostics and cryptographic provenance verification.",
        content: [
          "PdM is a proactive approach utilizing data analytics to monitor equipment conditions and forecast potential failures before they occur. Machine learning models continuously ingest high-fidelity data streams from IoT sensors across engines, hydraulics, and avionics to establish unique operational signatures.",
          "NetJets achieved a 20% decrease in unplanned maintenance, and Gulfstream reduced maintenance downtime by 15% through early prescriptive analytics.",
        ],
      },
      {
        heading: "2. Streamlined Predictive Scheduling (SPS)",
        content: [
          "While SPS is specifically identified in the M1 tech ecosystem as an intelligent scheduling layer, it algorithmically refines flight schedules, crew assignments, and network routing in real time.",
          "By ingesting live radar, air traffic slots, fuel prices, and crew limits, decision latency is cut from hours to milliseconds. The future belongs to Agent-to-Agent (A2A) coordination without human intervention.",
        ],
      },
      {
        heading: "3. IoT and Digital Twins: The Sensory Nervous System",
        content: [
          "IoT sensors act as the sensory nervous system, while Digital Twins act as the virtual brain. Digital Twins simulate aging and operational stress under harsh conditions (hot and sandy climates) to produce exact residual asset valuations.",
          "Edge Computing will process data on-board rather than waiting for cloud uploads, while autonomous drones perform automated hangar inspections guided by digital twin simulations.",
        ],
      },
      {
        heading: "The exciting and scary part",
        quote: "“Autonomous flight is coming, slowly but surely.”",
        layout: "wrap-left",
        imageUrl: "/images/articles/article-1/autonomous-dining.png",
        imageCaption: "Passenger comfort in the autonomous era: Reimagined executive interiors designed for pilotless journeys.",
        content: [
          "I. Autonomous Flight:\nWhile fully autonomous passenger flight is considered a long-term goal, the industry has established a clear regulatory and technological roadmap; it is said by Parimal Kopardekar, who leads NASA's autonomous flight efforts: 'Autonomous flight is coming, slowly but surely.'",
          "The 2035 Milestone: The FAA's National Strategy for Advanced Air Mobility (AAM) specifically targets advanced, fully autonomous operations in mixed airspace by 2035.",
          "II. Autonomous Maintenance and Operations:\nMaintenance and fleet operations are moving beyond human-led scheduling into a phase of 'prescriptive' and 'agentic' orchestration.",
          "Autonomous Maintenance: The future of maintenance involves robotics and AI performing physical tasks, such as drone-based inspections or robotic crawlers that repair components based on insights from Digital Twins.",
        ],
      },
      {
        heading: "Picture of the Future:",
        layout: "dual",
        images: [
          {
            url: "/images/articles/article-1/red-jet.png",
            caption: "Next-generation supersonic business aircraft.",
          },
          {
            url: "/images/articles/article-1/moon-jet.png",
            caption: "Long-range flagship operations under autonomous routing.",
          },
        ],
        content: [
          "If we summarize the impact of all above discussed technologies, we can imagine a future where we will be buying or selling jets online from marketplaces like M1, and the management will be automatically performed by individually developed ai agents or native ai platforms like M1 management infrastructure, which will include maintenance, finance and scheduling, further, short range autonomous flights might be nearer then we are imagining and full fledge autonomous flights will gradually come in, physical maintenance will be monitored by human controlled autobots or humanoid robots. This is the future of aviation yet to come.",
        ],
      },
      {
        heading: "Will AI replace us? (How to adapt)",
        quote: "“There exists a secret way to capitalize on such tech shifts; it is by leading in technology.”",
        layout: "wrap-left",
        imageUrl: "/images/articles/article-1/green-seat.png",
        imageCaption: "Executive comfort: Elevating human strategic oversight alongside AI automation.",
        content: [
          "I assure you, AI cannot replace you or any professional in aviation, but a person using AI efficiently will replace you.",
          "The aviation industry as a whole is going to be refined due to technological advancements; new opportunities will be created, new bars will be set, firms using AI and software like M1 will beat other firms any day, and it's not only about M1; bigger firms like NetJets have their own alternative to M1; they will beat the others too. It is all about how you adapt; most people, out of fear, condemn technology, which results in them being replaced by someone who doesn't; the same happened with Nokia and Pan Am and many other great names.",
        ],
      },
      {
        heading: "Capitalizing on the Wave of Tech Evolution",
        quote: "“There exists a secret way to capitalize on such tech shifts; it is by leading in technology.”",
        layout: "wrap-right",
        imageUrl: "/images/articles/article-1/night-runway-jet.png",
        imageCaption: "Night departure on the runway: Leading the multidecade aviation revolution with M1.",
        content: [
          "Every tech shift changes market dynamics abruptly, and if your firm can constantly look forward to adopting and participating in the tech revolution, you can emerge and sustain as a new leader.",
          "M1 right now is in early days of initiating a wave of tech evolution and these waves as seen in other sectors of world and international business, are going to be bigger then the .com wave (after which there was a subtle decline in aviation) but unlike the last tech wave, after this wave private aviation is predicted to bloom, and addition of 40k+ Private jets is predicted by 2045, and as we see the current tech roadmap, by 2040 only the initial infrastructure of this multidecade aviation revolution will be laid, which mains we can expect an addition of upto 100k+ by 2050.",
          "Gates are open for early adopters to lead this tech revolution, shoulder by shoulder with M1.",
        ],
      },
      {
        heading: "Cost Of Inaction (COI)",
        content: [
          "Surprisingly, there is going to be no cost of inaction in the short term, but in the long term, the cost will not only be 4x to 5x more expensive internal operations and maintenance but a massive generational gap, as the next emerging wave of aviation users are Gen Z, which appreciates tech more than the classical ways. In short, if a firm or an individual does not undergo temporary hardship of change, the long-term hardship will be the fate, but we are writing this not to make you worried but to guide you toward potential solutions and ensure adaptation is easy for you.",
        ],
      },
    ],
  },
];
