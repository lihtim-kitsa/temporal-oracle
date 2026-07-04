// ============================================================
// TEMPORAL ORACLE — Curated Historical Scenarios
// ============================================================
// Each scenario represents a genuine moment of uncertainty.
// Context is written from the perspective of the scenario date.
// All data is historically accurate.
// ============================================================

const SCENARIOS = [

  // ──────────────────────────────────────────────
  // 1. LEHMAN BROTHERS ON THE BRINK
  // ──────────────────────────────────────────────
  {
    id: 'lehman-brothers-2008',
    date: '2008-09-14',
    title: 'Lehman Brothers on the Brink',
    category: 'economics',
    difficulty: 'medium',
    wikiArticles: ['Lehman_Brothers', 'Subprime_mortgage_crisis'],
    context: `It's Sunday, September 14, 2008. Lehman Brothers, the 158-year-old investment bank, is in freefall. The stock has plunged 94% this year, and emergency weekend negotiations at the New York Fed have failed to produce a buyer. Bank of America walked away to buy Merrill Lynch instead. Barclays pulled out after the British government refused to guarantee Lehman's trading obligations. Treasury Secretary Hank Paulson has signaled the government will not provide a bailout — a stark contrast to the Bear Stearns rescue six months ago. Lehman's board is meeting tonight to consider its options. The firm holds $639 billion in assets and its collapse would be the largest bankruptcy in American history.`,
    headlines: [
      'Bank of America in Talks to Buy Merrill Lynch for $50 Billion',
      'Barclays Withdraws from Lehman Negotiations',
      'AIG Seeks $40 Billion Federal Reserve Lifeline',
      'Wall Street Braces for Lehman Fallout as Asian Markets Open',
      'Paulson: "No Public Money" for Lehman Rescue'
    ],
    stockTicker: {
      symbol: 'LEH',
      label: 'Lehman Brothers Holdings',
      prices: [16.20, 14.15, 13.47, 16.66, 14.68, 13.16, 11.10, 10.28, 7.79, 9.50, 11.16, 10.56, 7.25, 4.22, 3.65]
    },
    question: 'Will Lehman Brothers survive the week?',
    baseRate: 'Of the 5 major investment banks that existed in 2007, Bear Stearns was already rescued via forced sale in March 2008.',
    expertConsensus: 'Markets priced Lehman CDS at extreme levels suggesting ~85% chance of default. Most analysts expected a last-minute government rescue or buyer — "too big to fail" was conventional wisdom. Some hedge funds were positioning for a bailout.',
    outcome: false,
    outcomeExplanation: `Lehman Brothers filed for Chapter 11 bankruptcy on Monday, September 15, 2008 — the largest bankruptcy filing in US history at $639 billion in assets. The collapse triggered a global financial panic: the Dow fell 504 points that day, money market funds "broke the buck," credit markets froze worldwide, and the ensuing crisis led to the $700 billion TARP bailout, millions of job losses, and the deepest recession since the 1930s.`,
    revealDate: '2008-09-15',
    keySignals: [
      'Paulson explicitly said "no public money" — breaking from the Bear Stearns precedent',
      'Both potential buyers (BofA, Barclays) had withdrawn by Sunday morning',
      'The Fed was arranging an "orderly wind-down" protocol, suggesting they expected failure',
      'Lehman\'s commercial real estate exposure was far larger than Bear Stearns\''
    ],
    biases: [
      { name: 'Anchoring', description: 'The Bear Stearns rescue 6 months earlier anchored expectations that the government would always intervene for major banks' },
      { name: 'Normalcy Bias', description: 'A 158-year-old institution feels permanent; it\'s hard to imagine something that old simply ceasing to exist' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 2. BREXIT VOTE
  // ──────────────────────────────────────────────
  {
    id: 'brexit-vote-2016',
    date: '2016-06-22',
    title: 'The Brexit Vote',
    category: 'politics',
    difficulty: 'medium',
    wikiArticles: ['United_Kingdom_European_Union_membership_referendum,_2016', 'Brexit'],
    context: `Tomorrow, June 23, the United Kingdom votes on whether to remain in or leave the European Union. The campaign has been bitter and divisive, dominated by immigration, sovereignty, and economic warnings. The murder of Labour MP Jo Cox by a far-right extremist one week ago shocked the nation and paused campaigning. Polls have seesawed wildly — Leave led by as much as 6 points in early June, but the Cox tragedy appeared to swing momentum back to Remain. Betting markets are pricing Remain at roughly 75-80%. The pound has recovered strongly in the past week. Most political and financial establishment figures — from Barack Obama to the Bank of England — have warned of dire consequences from Brexit.`,
    headlines: [
      'Final Polls Show Race Too Close to Call — Slight Remain Lead',
      'Betting Markets Put Remain Odds at 75%',
      'Farage: "I Think Remain Will Edge It"',
      'Obama: Brexit Would Put UK "Back of the Queue" for Trade Deal',
      'Sterling Surges as Remain Sentiment Grows After Cox Murder'
    ],
    stockTicker: {
      symbol: 'GBPUSD',
      label: 'British Pound / US Dollar',
      prices: [1.448, 1.441, 1.432, 1.418, 1.410, 1.422, 1.428, 1.415, 1.409, 1.420, 1.430, 1.437, 1.468, 1.477, 1.489]
    },
    question: 'Will the United Kingdom vote to leave the European Union?',
    baseRate: 'No EU member state had ever voted to leave the bloc. Independence/secession referendums globally succeed roughly 40-50% of the time.',
    expertConsensus: 'Betting markets: ~75-80% Remain. Most pollsters: too close to call with slight Remain lean. Financial markets: strongly positioned for Remain (pound rallied). Nigel Farage himself conceded on referendum eve: "I think Remain will edge it."',
    outcome: true,
    outcomeExplanation: `Leave won with 51.9% to 48.1% on June 23, 2016, with a turnout of 72.2%. The result shocked financial markets: the pound collapsed to a 31-year low against the dollar, falling over 10% in hours. Prime Minister David Cameron resigned the next morning. The result triggered years of political turmoil, three prime ministers, and the UK formally left the EU on January 31, 2020.`,
    revealDate: '2016-06-24',
    keySignals: [
      'Phone polls consistently showed Leave ahead; online polls were mixed — the methodology gap was a known issue',
      'Voter registration surged in Leave-leaning areas, suggesting higher turnout motivation',
      'The EU\'s immigration crisis in 2015-16 had intensified anti-immigration sentiment across Europe',
      'Previous referendums (Quebec 1995, Scotland 2014) showed late swings to status quo — but this time the pattern broke'
    ],
    biases: [
      { name: 'Status Quo Bias', description: 'People tend to expect the current state to continue — "surely they won\'t actually vote to leave"' },
      { name: 'Social Desirability Bias', description: '"Shy Leavers" may have underreported their intentions to pollsters, similar to the "shy Tory" effect' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 3. COVID-19 PANDEMIC WARNING
  // ──────────────────────────────────────────────
  {
    id: 'covid-pandemic-2020',
    date: '2020-01-22',
    title: 'A Novel Coronavirus in Wuhan',
    category: 'science',
    difficulty: 'hard',
    wikiArticles: ['2019–20_Wuhan_coronavirus_outbreak'],
    context: `Chinese authorities have confirmed a new coronavirus spreading in the city of Wuhan, Hubei province. As of today, there are 571 confirmed cases and 17 deaths — all in China. The virus appears to have originated from the Huanan Seafood Market. Human-to-human transmission has been confirmed. The WHO's emergency committee is meeting today to decide whether to declare a Public Health Emergency of International Concern (PHEIC), but has not done so yet. China has announced it will quarantine Wuhan starting tomorrow. A handful of cases have been identified in Thailand, Japan, South Korea, and the United States. Memories of SARS (2003, 8,096 cases, 774 deaths) and MERS (2012, ~2,500 cases) loom — both coronaviruses that were eventually contained.`,
    headlines: [
      'China Confirms New Coronavirus Can Spread Between Humans',
      'WHO Emergency Committee to Meet on Wuhan Virus',
      'Wuhan to Be Quarantined Starting Thursday',
      'First US Case of Novel Coronavirus Confirmed in Washington State',
      'Asian Markets Fall on Virus Fears; WHO Holds Off on Emergency Declaration'
    ],
    stockTicker: {
      symbol: 'SPX',
      label: 'S&P 500',
      prices: [3230, 3254, 3265, 3283, 3295, 3289, 3320, 3316, 3329, 3321, 3330, 3325, 3317, 3321, 3322]
    },
    question: 'Will this novel coronavirus become a global pandemic (>100,000 cases across multiple continents)?',
    baseRate: 'Since 2000, novel respiratory viruses declared emergencies: SARS (2003) was contained at ~8,000 cases. MERS (2012) was contained at ~2,500 cases. H1N1 (2009) became a pandemic with ~1.4 billion cases. Roughly 1 in 4 novel respiratory virus outbreaks since 2000 reached pandemic scale.',
    expertConsensus: 'WHO declined to declare a PHEIC (did so 8 days later). Most Western public health officials described the risk to other countries as "low." Financial markets showed minimal concern. A few epidemiologists (notably, those who worked on SARS) expressed serious alarm about the R0 estimates and asymptomatic transmission.',
    outcome: true,
    outcomeExplanation: `COVID-19 became the deadliest pandemic in a century. By March 11, 2020, the WHO declared it a pandemic. The virus spread to every country on Earth, infecting over 770 million confirmed cases and killing at least 7 million people (likely far more). It triggered global lockdowns, the deepest economic contraction since the Great Depression, and the fastest vaccine development in history.`,
    revealDate: '2020-03-11',
    keySignals: [
      'The R0 (basic reproduction number) estimates of 2-3 were higher than SARS (1.7) and suggested exponential spread',
      'Evidence of asymptomatic transmission was emerging — a critical difference from SARS, which was only contagious when symptomatic',
      'China locking down a city of 11 million people was an unprecedented step, suggesting authorities knew more than publicly stated',
      'The virus had already been detected in 4 countries despite limited testing — the true spread was almost certainly larger'
    ],
    biases: [
      { name: 'Base Rate Neglect', description: 'SARS and MERS were contained, so people assumed this would be too — ignoring that H1N1 showed pandemic-scale spread was possible' },
      { name: 'Normalcy Bias', description: 'A global pandemic feels like a movie plot, not something that happens in modern life with modern medicine' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 4. UKRAINE CHAIN — PART 1: THE BUILDUP
  // ──────────────────────────────────────────────
  {
    id: 'ukraine-buildup',
    date: '2022-02-23',
    title: 'Russian Forces Surround Ukraine',
    category: 'geopolitics',
    difficulty: 'medium',
    wikiArticles: ['2021–2022_Russo-Ukrainian_crisis', 'Russo-Ukrainian_War'],
    context: `Russia has amassed an estimated 190,000 troops along Ukraine's borders — the largest military buildup in Europe since World War II. Yesterday, President Putin recognized the independence of the Donetsk and Luhansk "people's republics" and ordered Russian troops into the Donbas region as "peacekeepers." The US and UK have been warning for weeks that a full-scale invasion is imminent, releasing intelligence assessments with unusual specificity. President Zelensky has called up reservists but continues to urge calm, warning against panic. European leaders have shuttled to Moscow for last-ditch diplomacy. Today, Russia's Federation Council authorized the use of military force abroad.`,
    headlines: [
      'Russia\'s Parliament Authorizes Use of Military Force Abroad',
      'US Embassy in Kyiv Evacuated; Citizens Told to Leave Immediately',
      'Biden Announces "First Tranche" of Sanctions on Russian Banks',
      'Zelensky: "We Are Not Afraid" — Calls Up Military Reservists',
      'Oil Prices Spike Above $97 as Tensions Escalate'
    ],
    stockTicker: {
      symbol: 'MOEX',
      label: 'Moscow Exchange Index',
      prices: [3770, 3690, 3631, 3573, 3505, 3440, 3480, 3370, 3300, 3251, 3290, 3110, 2900, 2750, 2511]
    },
    question: 'Will Russia launch a full-scale invasion of Ukraine (beyond the Donbas) within the next 72 hours?',
    baseRate: 'Historical military buildups of this scale (>150,000 troops) at borders lead to full invasion roughly 60-70% of the time. However, Russia conducted a similar buildup in April 2021 and withdrew.',
    expertConsensus: 'US/UK intelligence: invasion imminent, possibly within hours. European leaders: still hopeful for diplomacy. Prediction markets: ~70-80% chance of invasion. Ukrainian government: publicly downplaying immediate threat to prevent panic. Many analysts thought Putin was bluffing to extract concessions.',
    outcome: true,
    outcomeExplanation: `Russia launched a full-scale invasion of Ukraine at approximately 5:00 AM on February 24, 2022 — less than 12 hours after this scenario's date. Missile strikes hit cities across Ukraine, including Kyiv, and ground forces advanced from multiple directions: the north (toward Kyiv via Belarus), the east (Donbas), and the south (from Crimea). It was the largest conventional military attack in Europe since World War II.`,
    revealDate: '2022-02-24',
    keySignals: [
      'The Federation Council authorization was the legal step that preceded the 2014 Crimea operation — same playbook',
      'Field hospitals and blood supplies had been moved to forward positions — a logistical indicator of imminent combat',
      'Russia had moved forces into attack formations (not defensive postures) visible on satellite imagery',
      'The April 2021 buildup lacked the scale, logistics tail, and political preparation of this one'
    ],
    biases: [
      { name: 'Anchoring', description: 'The April 2021 buildup (which ended without invasion) anchored many analysts to expect the same outcome again' },
      { name: 'Optimism Bias', description: 'Full-scale European war felt unthinkable in the 21st century, leading people to underweight clear evidence' }
    ],
    chainNext: 'ukraine-kyiv-falls',
    chainLabel: 'Part 1 of 3 — The Buildup'
  },

  // ──────────────────────────────────────────────
  // 5. UKRAINE CHAIN — PART 2: WILL KYIV FALL?
  // ──────────────────────────────────────────────
  {
    id: 'ukraine-kyiv-falls',
    date: '2022-02-25',
    title: 'Russian Forces Advance on Kyiv',
    category: 'geopolitics',
    difficulty: 'hard',
    wikiArticles: ['2022_Russian_invasion_of_Ukraine', 'Battle_of_Kyiv_(2022)'],
    context: `Russia's full-scale invasion began yesterday. Missile strikes have hit military targets across Ukraine. Russian forces are advancing on multiple fronts — most alarmingly, an armored column from Belarus is racing toward Kyiv, just 200km away. Russian airborne troops attempted to seize Hostomel Airport northwest of Kyiv but were repelled after fierce fighting. Zelensky has declared martial law and issued a general mobilization. Western intelligence agencies are reportedly offering Zelensky evacuation, which he has refused. "I need ammunition, not a ride," he reportedly told US officials. The speed of the northern advance has shocked Western military analysts — some predict Kyiv could fall within 72 hours.`,
    headlines: [
      'Russia Invades Ukraine: Explosions Reported Across the Country',
      'Russian Troops Reach Outskirts of Kyiv',
      'Zelensky Refuses US Evacuation Offer: "I Need Ammunition, Not a Ride"',
      'UN Security Council Emergency Session — Russia Vetoes Resolution',
      'Western Officials: Kyiv Could Fall Within Days'
    ],
    stockTicker: null,
    question: 'Will Russian forces capture Kyiv within two weeks?',
    baseRate: 'In modern conventional warfare, capital cities of similar size typically resist siege for weeks to months unless the defending army collapses (e.g., Baghdad 2003 fell in 21 days against vastly superior US forces). Urban warfare heavily favors defenders.',
    expertConsensus: 'Multiple Western intelligence assessments predicted Kyiv could fall in 72 hours to 2 weeks. US officials were preparing for a government-in-exile scenario. Russian military doctrine emphasized rapid "decapitation" strikes. However, some military analysts noted the difficulties of urban warfare and Ukrainian resistance.',
    outcome: false,
    outcomeExplanation: `Kyiv did not fall. Ukrainian forces, bolstered by territorial defense volunteers and Western-supplied Javelin and Stinger missiles, inflicted devastating losses on the Russian advance. The 64km Russian convoy north of Kyiv became bogged down by logistics failures, mud, and ambushes. By late March, Russia abandoned its entire northern offensive and withdrew from the Kyiv region. The Battle of Kyiv became a defining symbol of Ukrainian resistance.`,
    revealDate: '2022-04-02',
    keySignals: [
      'The Hostomel Airport assault was repelled — Russia\'s key plan to airlift forces into Kyiv failed on day one',
      'Russian logistics were visibly stretched — the 64km convoy was stalled and vulnerable',
      'Ukrainian morale was extremely high; civilian resistance was widespread',
      'Russia had not achieved air superiority despite massive numerical advantages'
    ],
    biases: [
      { name: 'Authority Bias', description: 'Western intelligence agencies predicted a rapid fall, making it feel authoritative — but they overestimated Russian military competence' },
      { name: 'Availability Bias', description: 'Recent examples of rapid military victories (Afghanistan\'s fall to Taliban in 2021) made quick capitulation feel more likely' }
    ],
    chainNext: 'ukraine-sanctions',
    chainLabel: 'Part 2 of 3 — Will Kyiv Fall?'
  },

  // ──────────────────────────────────────────────
  // 6. UKRAINE CHAIN — PART 3: WESTERN SANCTIONS
  // ──────────────────────────────────────────────
  {
    id: 'ukraine-sanctions',
    date: '2022-02-27',
    title: 'The West Responds',
    category: 'geopolitics',
    difficulty: 'easy',
    wikiArticles: ['International_sanctions_during_the_2022_Russian_invasion_of_Ukraine', 'SWIFT_(payment_network)'],
    context: `Three days into Russia's invasion of Ukraine, Western nations are debating their response. The US and EU have imposed initial sanctions on Russian banks and oligarchs, but the most powerful tool — cutting Russia off from SWIFT, the global financial messaging system — has been resisted by several European nations concerned about the impact on their own economies. Germany, Italy, and Hungary have been hesitant. Germany has also been criticized for offering Ukraine 5,000 helmets instead of weapons. However, the images of Russian attacks on Ukrainian cities and Zelensky's powerful video addresses to European parliaments are rapidly shifting public opinion. Today, in a dramatic reversal, Germany announced it would send anti-tank weapons to Ukraine.`,
    headlines: [
      'Germany Reverses Course, Will Send Weapons to Ukraine',
      'Pressure Mounts to Cut Russia from SWIFT Financial System',
      'EU Debates Unprecedented Sanctions Package',
      'Zelensky Addresses European Parliament: "Prove You Are With Us"',
      'Switzerland Considers Breaking Neutrality Over Russia Sanctions'
    ],
    stockTicker: null,
    question: 'Will the EU and US agree to remove major Russian banks from SWIFT within the next week?',
    baseRate: 'SWIFT disconnection had only been used once before — against Iran in 2012 — and was considered a "nuclear option" in financial warfare. European dependence on Russian energy made this step particularly costly.',
    expertConsensus: 'Most analysts thought SWIFT exclusion was unlikely due to European resistance and energy dependence. Germany and Italy were seen as blocking consensus. Financial analysts warned of severe blowback on European banks. However, momentum was building rapidly as public outrage grew.',
    outcome: true,
    outcomeExplanation: `On February 26-27, 2022, the US, EU, UK, and Canada announced they would disconnect selected Russian banks from SWIFT — a dramatic reversal that came together in under 48 hours. By March 12, seven major Russian banks were removed. The decision, combined with freezing the Russian central bank's $630 billion in reserves, triggered the ruble's collapse (losing 40% of its value) and represented the most sweeping financial sanctions ever imposed on a major economy.`,
    revealDate: '2022-03-02',
    keySignals: [
      'Germany\'s weapons reversal signaled a fundamental policy shift — if they broke the weapons taboo, SWIFT was next',
      'Public opinion across Europe shifted dramatically in 48 hours due to graphic war footage',
      'Switzerland\'s willingness to break neutrality indicated unprecedented consensus',
      'The coordinated Western response was moving faster than any previous sanctions regime'
    ],
    biases: [
      { name: 'Anchoring', description: 'Previous European reluctance on Russia sanctions anchored expectations that they would remain divided' },
      { name: 'Base Rate Neglect', description: 'SWIFT exclusion had only been used once (Iran), making it feel unlikely — but this was also an unprecedented situation' }
    ],
    chainNext: null,
    chainLabel: 'Part 3 of 3 — The Western Response'
  },

  // ──────────────────────────────────────────────
  // 7. DEEPWATER HORIZON
  // ──────────────────────────────────────────────
  {
    id: 'deepwater-horizon-2010',
    date: '2010-04-22',
    title: 'Deepwater Horizon Explodes',
    category: 'science',
    difficulty: 'medium',
    wikiArticles: ['Deepwater_Horizon_explosion', 'Deepwater_Horizon_oil_spill'],
    context: `Two days ago, on April 20, the Deepwater Horizon drilling rig exploded in the Gulf of Mexico, about 40 miles off the Louisiana coast. 11 workers are missing and presumed dead. The rig, operated by BP, was drilling the Macondo well at a depth of 18,000 feet. The rig has sunk and there are reports of oil leaking from the wellhead on the ocean floor, about 5,000 feet below the surface. BP says it is activating the blowout preventer and assessing the situation. Coast Guard officials initially estimated the leak at about 1,000 barrels per day, though this figure is uncertain. BP says it has plans to drill relief wells if needed, but those would take months.`,
    headlines: [
      'Deepwater Horizon Sinks in Gulf of Mexico After Two-Day Fire',
      '11 Workers Missing, Presumed Dead After Rig Explosion',
      'BP Activating Emergency Plans; Oil Slick Visible on Surface',
      'Coast Guard Estimates 1,000 Barrels Per Day Leaking',
      'Obama Administration Monitoring Situation'
    ],
    stockTicker: {
      symbol: 'BP',
      label: 'BP plc',
      prices: [59.88, 60.48, 59.78, 60.20, 59.99, 60.57, 60.20, 59.60, 59.22, 60.17, 60.39, 59.48, 59.86, 52.56, 50.81]
    },
    question: 'Will the oil leak be stopped within 30 days?',
    baseRate: 'Major deep-sea oil well blowouts have historically taken weeks to months to cap. The 1979 Ixtoc I blowout in the Gulf of Mexico took nearly 10 months to stop.',
    expertConsensus: 'BP expressed confidence that the blowout preventer or relief wells would resolve the situation. The initial 1,000 bbl/day estimate suggested a manageable spill. Independent engineers were more skeptical, noting the extreme depth made intervention extremely difficult.',
    outcome: false,
    outcomeExplanation: `The Macondo well was not capped until July 15, 2010 — 87 days after the explosion. The actual flow rate turned out to be approximately 62,000 barrels per day, not the 1,000 initially estimated. It became the largest marine oil spill in history, with 4.9 million barrels released. BP's total costs exceeded $65 billion. The environmental devastation affected thousands of miles of coastline.`,
    revealDate: '2010-07-15',
    keySignals: [
      'The blowout preventer had failed — the last line of defense was already broken',
      'At 5,000 feet depth, no human intervention was possible; everything relied on remotely operated vehicles',
      'The Ixtoc I precedent (1979) showed deep-water blowouts could take months to resolve',
      'Initial flow estimates were based on surface observations, not actual wellhead measurements'
    ],
    biases: [
      { name: 'Optimism Bias', description: 'BP\'s confident public statements and low flow estimates encouraged optimism about a quick resolution' },
      { name: 'Anchoring', description: 'The 1,000 bbl/day estimate anchored expectations, even though the actual flow was 62x higher' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 8. CRIMEA ANNEXATION
  // ──────────────────────────────────────────────
  {
    id: 'crimea-2014',
    date: '2014-03-01',
    title: 'Unmarked Soldiers in Crimea',
    category: 'geopolitics',
    difficulty: 'medium',
    wikiArticles: ['2014_Crimean_crisis', 'Annexation_of_Crimea_by_the_Russian_Federation'],
    context: `Ukraine is in turmoil. President Yanukovych fled Kyiv on February 21 after months of Euromaidan protests. An interim government has been formed. Now, unidentified armed men in unmarked military uniforms — dubbed "little green men" — have seized key government buildings and airports in Crimea. Russia denies they are Russian soldiers, calling them "local self-defense forces." The Russian parliament has authorized President Putin to use military force in Ukraine. Crimea's ethnic Russian majority and Russia's Black Sea Fleet base in Sevastopol make the peninsula strategically critical to Moscow.`,
    headlines: [
      'Unidentified Gunmen Seize Crimean Parliament Building',
      'Russian Parliament Authorizes Military Force in Ukraine',
      'Obama Warns Russia of "Costs" for Military Intervention',
      'NATO Calls Emergency Meeting Over Crimea',
      'Crimean PM Asks Putin for Russian Military Assistance'
    ],
    stockTicker: null,
    question: 'Will Russia formally annex Crimea within 30 days?',
    baseRate: 'Forcible annexation of territory by a major power has been extremely rare since WWII — effectively taboo in the post-Cold War order. Russia\'s 2008 war with Georgia resulted in recognition of breakaway regions but not formal annexation.',
    expertConsensus: 'Most Western analysts expected Russia to establish a de facto frozen conflict (as in South Ossetia/Abkhazia) rather than outright annexation. Formal annexation was seen as crossing a red line that would provoke extreme consequences. Some Russia specialists argued Putin needed a domestic win and would not stop at half measures.',
    outcome: true,
    outcomeExplanation: `Russia formally annexed Crimea on March 18, 2014, following a hastily organized referendum (officially: 97% voted to join Russia) that was not recognized by the international community. It was the first forcible annexation of territory by a European power since World War II. Western nations imposed sanctions but took no military action.`,
    revealDate: '2014-03-18',
    keySignals: [
      'Russia used the same parliamentary authorization mechanism it used before the 2008 Georgia war',
      'The "local self-defense forces" were equipped with modern Russian military gear — clearly not local militia',
      'Russia\'s Black Sea Fleet was already based in Crimea, making military control trivially easy',
      'Putin\'s approval ratings were declining before the crisis — annexation would provide a massive domestic boost'
    ],
    biases: [
      { name: 'Normalcy Bias', description: 'Forcible annexation felt like a relic of the 20th century; people assumed international norms would constrain Russia' },
      { name: 'Mirror Imaging', description: 'Western analysts projected their own cost-benefit calculations onto Putin, underestimating his willingness to accept sanctions' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 9. TRUMP 2016 ELECTION
  // ──────────────────────────────────────────────
  {
    id: 'trump-2016',
    date: '2016-11-07',
    title: 'Election Eve 2016',
    category: 'politics',
    difficulty: 'hard',
    wikiArticles: ['United_States_presidential_election,_2016', 'Donald_Trump_2016_presidential_campaign'],
    context: `Tomorrow, Americans vote in one of the most contentious presidential elections in modern history. Hillary Clinton leads Donald Trump in virtually every national poll. FiveThirtyEight gives Clinton a 71% chance of winning; other models (Princeton, Huffington Post) put her above 95%. Clinton's "blue wall" of Michigan, Wisconsin, and Pennsylvania is considered nearly impregnable. However, the race tightened after FBI Director James Comey's October 28 letter announcing the reopening of the Clinton email investigation. Trump draws massive rally crowds and his supporters are intensely enthusiastic, while Clinton's coalition relies on demographics and ground game.`,
    headlines: [
      'Final National Polls: Clinton Leads by 3-4 Points',
      'FiveThirtyEight: Clinton 71%, Trump 29%',
      'Princeton Election Consortium: Clinton >99% to Win Electoral College',
      'Comey Effect: Race Tightens in Final Week',
      'Record Early Voting in Key Battleground States'
    ],
    stockTicker: {
      symbol: 'SPX',
      label: 'S&P 500',
      prices: [2126, 2151, 2139, 2141, 2128, 2126, 2111, 2085, 2083, 2085, 2098, 2100, 2083, 2085, 2131]
    },
    question: 'Will Donald Trump win the 2016 presidential election?',
    baseRate: 'Candidates trailing in polling averages by 3-4 points in the final week win roughly 15-20% of the time historically. State-level polling errors tend to be correlated across similar states.',
    expertConsensus: 'FiveThirtyEight: Clinton 71%. Betting markets: Clinton 82-85%. Princeton: Clinton >99%. New York Times Upshot: Clinton 85%. Most political commentators considered a Trump victory unlikely but not impossible. FiveThirtyEight\'s Nate Silver was notable for giving Trump higher odds than most.',
    outcome: true,
    outcomeExplanation: `Donald Trump won the presidency with 306 electoral votes to Clinton's 232, despite losing the popular vote by 2.9 million votes. He flipped Michigan (by 10,704 votes), Wisconsin (by 22,748 votes), and Pennsylvania (by 44,292 votes) — the three "blue wall" states — each by margins of less than 1%. The result was one of the biggest upsets in US political history, driven by higher-than-expected turnout in rural areas and lower-than-expected turnout among Clinton's coalition.`,
    revealDate: '2016-11-09',
    keySignals: [
      'State-level polls in Michigan and Wisconsin showed tighter races than national polls suggested',
      'Trump\'s rally attendance and enthusiasm gap suggested a potential turnout surprise',
      'The Comey letter\'s impact was still being absorbed — late-deciding voters broke heavily for Trump',
      'FiveThirtyEight\'s model, which accounted for correlated polling errors across similar states, gave Trump 29% — much higher than other models'
    ],
    biases: [
      { name: 'Groupthink', description: 'The consensus among media, pollsters, and prediction markets created an echo chamber that made a Clinton victory feel inevitable' },
      { name: 'Overconfidence', description: 'Models giving Clinton >95% odds were overconfident — they didn\'t adequately account for correlated state-level polling errors' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 10. SVB COLLAPSE
  // ──────────────────────────────────────────────
  {
    id: 'svb-collapse-2023',
    date: '2023-03-09',
    title: 'Silicon Valley Bank in Trouble',
    category: 'economics',
    difficulty: 'hard',
    wikiArticles: ['Silicon_Valley_Bank', 'Collapse_of_Silicon_Valley_Bank'],
    context: `Silicon Valley Bank (SVB), the 16th-largest bank in America and the go-to bank for tech startups, is in crisis. Yesterday, SVB announced it had sold $21 billion in securities at a $1.8 billion loss and would raise $2.25 billion in new capital to shore up its balance sheet. The stock plunged 60% today — wiping out $10 billion in market value. Prominent VCs — including Peter Thiel's Founders Fund — are advising their portfolio companies to pull deposits immediately. A bank run appears to be underway, with an estimated $42 billion in withdrawal requests today alone. The FDIC insures deposits up to $250,000, but the vast majority of SVB's deposits are above that limit (93% uninsured). SVB's management is seeking emergency options.`,
    headlines: [
      'SVB Stock Crashes 60% After Emergency Capital Raise Announcement',
      'VCs Advise Startups to Pull Money from Silicon Valley Bank',
      'Biggest Bank Run in Years: $42 Billion in Withdrawal Requests',
      'FDIC Insurance Covers Only 7% of SVB Deposits',
      'Treasury Secretary Yellen Monitoring the Situation'
    ],
    stockTicker: {
      symbol: 'SIVB',
      label: 'SVB Financial Group',
      prices: [287.51, 283.00, 280.20, 276.44, 271.15, 268.63, 267.83, 287.34, 283.20, 271.88, 267.42, 262.89, 261.30, 268.16, 106.04]
    },
    question: 'Will Silicon Valley Bank survive the week (avoid FDIC seizure)?',
    baseRate: 'Banks experiencing a 60% single-day stock crash and active bank run survive roughly 10-15% of the time historically. Once depositor confidence breaks, recovery is extremely rare without a government backstop.',
    expertConsensus: 'Most banking analysts on Thursday evening believed SVB would find a buyer or receive a capital injection over the weekend. Some pointed to SVB\'s asset quality (mostly government bonds, not toxic assets) as a reason for optimism. Others noted the speed and scale of the bank run was unprecedented in the social media age.',
    outcome: false,
    outcomeExplanation: `Silicon Valley Bank was seized by the FDIC on Friday, March 10, 2023 — just one day after this scenario date — making it the second-largest bank failure in US history (after Washington Mutual in 2008). The collapse took just 44 hours from the initial capital raise announcement to seizure. On March 12, the government announced all depositors would be made whole, and created emergency lending facilities to prevent contagion. The collapse triggered the failure of Signature Bank and First Republic Bank in the following weeks.`,
    revealDate: '2023-03-10',
    keySignals: [
      '$42 billion in withdrawals in a single day was far beyond what any bank could survive without emergency support',
      'The speed of communication via Twitter and VC group chats made this bank run move at unprecedented speed',
      'SVB\'s concentrated depositor base (tech startups) meant they all heard the same advice simultaneously',
      '93% uninsured deposits meant rational depositors had every incentive to withdraw immediately'
    ],
    biases: [
      { name: 'Anchoring', description: 'SVB\'s 40-year track record and $209B in assets made it feel "too established to fail"' },
      { name: 'Normalcy Bias', description: 'Major bank failures feel like they belong to 2008, not 2023 — surely the system was fixed' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 11. MUBARAK RESIGNATION
  // ──────────────────────────────────────────────
  {
    id: 'mubarak-2011',
    date: '2011-02-10',
    title: 'Egypt on the Edge',
    category: 'politics',
    difficulty: 'medium',
    wikiArticles: ['Egyptian_revolution_of_2011', 'Hosni_Mubarak'],
    context: `Massive protests have gripped Egypt for 17 days. Hundreds of thousands continue to occupy Tahrir Square demanding President Hosni Mubarak's resignation. The 82-year-old autocrat has ruled Egypt for 30 years. He has offered concessions — transferring some powers to Vice President Suleiman and promising not to run for re-election in September — but protesters reject anything short of immediate departure. The military has refused to fire on protesters but has not openly broken with Mubarak. Tonight, a nationally televised address by Mubarak is expected. There are strong rumors he will resign, but Mubarak has defied expectations before.`,
    headlines: [
      'Egypt Braces for Mubarak Address — Resignation Expected',
      'Tahrir Square Crowds Swell to Largest Yet',
      'Egyptian Military: "The Demands of the People Will Be Met"',
      'CIA Director: Strong Likelihood Mubarak Will Step Down Tonight',
      'Global Markets Watch Egypt Crisis Closely'
    ],
    stockTicker: null,
    question: 'Will Mubarak step down within the next 48 hours?',
    baseRate: 'During the Arab Spring, leaders facing sustained mass protests stepped down roughly 40% of the time. Those with military backing remained; those who lost it fell.',
    expertConsensus: 'CIA Director Panetta told Congress he expected Mubarak to resign tonight. Most media outlets were preparing for a resignation speech. However, Mubarak had survived previous crises and had a history of stubbornness.',
    outcome: true,
    outcomeExplanation: `In a stunning twist, Mubarak's Thursday night speech was NOT a resignation — he doubled down, saying he would stay until September elections. The crowd erupted in fury. But the next day, February 11, Vice President Suleiman appeared on state TV to announce that Mubarak had resigned and transferred power to the Supreme Council of the Armed Forces. The 18-day revolution had succeeded.`,
    revealDate: '2011-02-11',
    keySignals: [
      'The military\'s ambiguous statements ("demands of the people will be met") signaled they would not defend Mubarak indefinitely',
      'The sheer scale of protests — estimated 2 million in Tahrir alone — made continuation untenable',
      'Key business elites and former regime allies were publicly distancing themselves',
      'The CIA director\'s public prediction suggested US was pressuring Mubarak behind the scenes'
    ],
    biases: [
      { name: 'Anchoring', description: 'Mubarak had ruled for 30 years and survived previous challenges, anchoring expectations that he would endure' },
      { name: 'Recency Bias', description: 'The Arab Spring was brand new — no one had a mental model for how quickly regimes could fall' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 12. FUKUSHIMA
  // ──────────────────────────────────────────────
  {
    id: 'fukushima-2011',
    date: '2011-03-11',
    title: 'Earthquake Hits Japan',
    category: 'science',
    difficulty: 'hard',
    wikiArticles: ['2011_Tōhoku_earthquake_and_tsunami', 'Fukushima_Daiichi_nuclear_disaster'],
    context: `A massive 9.0-magnitude earthquake — one of the most powerful ever recorded — struck off the coast of Japan today, triggering devastating tsunamis up to 40 meters high. Entire coastal cities have been swept away. Reports are still coming in but casualties are expected to be catastrophic. Of immediate concern: the Fukushima Daiichi Nuclear Power Plant has lost external power, and its emergency diesel generators — needed to cool the reactors — were reportedly damaged by the tsunami. TEPCO (the plant operator) has declared a nuclear emergency. Three reactors were operating at the time of the earthquake and automatically shut down, but they still require active cooling to prevent overheating. Backup battery power is expected to last about 8 hours.`,
    headlines: [
      'Magnitude 9.0 Earthquake Strikes Japan — Massive Tsunamis Hit Coast',
      'Nuclear Emergency Declared at Fukushima Daiichi Power Plant',
      'Cooling Systems Fail at Three Fukushima Reactors',
      'Japan Declares State of Emergency; Evacuations Ordered Near Plant',
      'TEPCO: Battery Backup Power Will Last ~8 Hours'
    ],
    stockTicker: null,
    question: 'Will the Fukushima Daiichi plant suffer a nuclear meltdown?',
    baseRate: 'There had been only two major nuclear accidents (Three Mile Island 1979, Chernobyl 1986) in the history of commercial nuclear power. Japanese nuclear plants were considered among the safest in the world.',
    expertConsensus: 'Nuclear industry officials expressed confidence in Japan\'s safety systems and containment. The IAEA said the situation was serious but manageable. Independent nuclear engineers were more alarmed, noting that loss of all cooling with no external power was the nightmare scenario nuclear plants were designed to prevent.',
    outcome: true,
    outcomeExplanation: `Three reactors at Fukushima Daiichi suffered full meltdowns within the next three days. Hydrogen explosions destroyed the reactor buildings of Units 1, 3, and 4. Massive amounts of radioactive material were released, contaminating a wide area. Over 150,000 residents were evacuated. It was the worst nuclear disaster since Chernobyl and was rated at the maximum Level 7 on the INES scale. The cleanup is ongoing and expected to take 30-40 years.`,
    revealDate: '2011-03-14',
    keySignals: [
      'Loss of ALL cooling (external power + diesel generators + batteries expiring in hours) was a "station blackout" — the most feared scenario in nuclear safety',
      'The reactors needed active cooling even when shut down — without it, fuel temperatures would rise inexorably',
      'TEPCO\'s declaration of a nuclear emergency within hours was itself an extreme step',
      'The tsunami was far beyond the plant\'s design basis (designed for ~5.7m, actual waves were ~14m)'
    ],
    biases: [
      { name: 'Authority Bias', description: 'Trust in Japanese engineering excellence and TEPCO\'s reassurances led many to underestimate the danger' },
      { name: 'Representativeness', description: 'Nuclear meltdowns are associated with Chernobyl-style operator error, not natural disasters — making this scenario feel less likely' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 13. GREEK DEFAULT
  // ──────────────────────────────────────────────
  {
    id: 'greece-default-2015',
    date: '2015-06-25',
    title: 'Greece at the Precipice',
    category: 'economics',
    difficulty: 'medium',
    wikiArticles: ['Greek_debt_crisis', 'Greek_government-debt_crisis'],
    context: `Greece is days away from a €1.6 billion payment to the IMF, due June 30. Negotiations between the Syriza government and the "troika" (EU, ECB, IMF) have broken down. Prime Minister Alexis Tsipras, elected on an anti-austerity platform, has called a surprise referendum for July 5 on the creditors' latest bailout terms — a move that enraged European leaders. The ECB is maintaining Emergency Liquidity Assistance to Greek banks but could cut it off at any moment. Greek citizens are lining up at ATMs. Capital controls appear imminent. Five years of crisis, multiple bailouts, and austerity have devastated Greece — GDP has fallen 25% since 2009, and unemployment is at 25%.`,
    headlines: [
      'Tsipras Calls Referendum on Bailout Terms — Creditors Furious',
      'ECB Freezes Emergency Lending Limit to Greek Banks',
      'Greek Citizens Queue at ATMs as Bank Run Fears Mount',
      'Eurozone: "The Door Remains Open" for Last-Minute Deal',
      'IMF Payment of €1.6 Billion Due in 5 Days'
    ],
    stockTicker: null,
    question: 'Will Greece default on its IMF payment due June 30?',
    baseRate: 'No developed nation had defaulted on an IMF payment since the fund\'s creation in 1945. However, Greece was the most indebted developed country relative to GDP and had already required two massive bailouts.',
    expertConsensus: 'Markets were pricing in roughly 50-60% probability of default. Many analysts expected a last-minute deal — Europe had a pattern of reaching agreements at the "eleventh hour." Others argued Tsipras had painted himself into a corner with the referendum call.',
    outcome: true,
    outcomeExplanation: `Greece missed its €1.6 billion IMF payment on June 30, 2015, becoming the first developed nation to default on the IMF. Capital controls were imposed — banks closed, ATM withdrawals limited to €60/day. The July 5 referendum resulted in a resounding 61% "No" vote against creditor terms. However, in a dramatic reversal, Tsipras then accepted an even harsher bailout deal on July 13, effectively ignoring the referendum result. Greece narrowly avoided leaving the eurozone.`,
    revealDate: '2015-06-30',
    keySignals: [
      'The referendum call made a deal before June 30 nearly impossible — there was literally no mechanism to agree in time',
      'The ECB\'s decision to freeze (not increase) emergency lending was a signal that the safety net was being withdrawn',
      'Tsipras\'s political base would have revolted if he accepted creditor terms before the referendum',
      'ATM queues and capital flight showed the situation was already past the point of orderly resolution'
    ],
    biases: [
      { name: 'Anchoring', description: 'Five years of last-minute eurozone deals anchored expectations that "they always find a way"' },
      { name: 'Optimism Bias', description: 'The consequences of default were so severe that people assumed rational actors would prevent it' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 14. OBAMA RE-ELECTION
  // ──────────────────────────────────────────────
  {
    id: 'obama-reelection-2012',
    date: '2012-11-05',
    title: 'Obama vs. Romney — Election Eve',
    category: 'politics',
    difficulty: 'easy',
    wikiArticles: ['United_States_presidential_election,_2012'],
    context: `Tomorrow, Americans decide between President Barack Obama and Republican challenger Mitt Romney. National polls show an extremely tight race — essentially tied in the popular vote. However, Obama holds narrow leads in most key swing states (Ohio, Virginia, Colorado, Iowa). Romney's campaign surged after a dominant first debate performance in October, but Obama recovered with stronger performances in the second and third debates. Hurricane Sandy's aftermath in late October may have helped Obama, as his response earned bipartisan praise including an embrace from New Jersey's Republican Governor Chris Christie. The Romney campaign insists their internal polls show a path to 300 electoral votes.`,
    headlines: [
      'Final Polls: Obama and Romney Tied Nationally at 48%',
      'FiveThirtyEight: Obama 90.9% Chance of Winning',
      'Romney Campaign Claims "Momentum" in Final Days',
      'Obama Holds Narrow Lead in Ohio — Key to Victory',
      'Record Early Voting Reported Across Swing States'
    ],
    stockTicker: null,
    question: 'Will Barack Obama win re-election?',
    baseRate: 'Incumbent presidents seeking re-election have won roughly 70% of the time historically (since 1900). Incumbents with improving economic indicators tend to win.',
    expertConsensus: 'FiveThirtyEight: Obama 90.9%. Betting markets: Obama ~75-80%. National polls: essentially tied. State-level polls: Obama leading in enough states for 270+ electoral votes. Conservative media and the Romney campaign insisted polls were oversampling Democrats.',
    outcome: true,
    outcomeExplanation: `Barack Obama won re-election decisively, defeating Mitt Romney 332-206 in the electoral college and 51.1%-47.2% in the popular vote. Obama swept every battleground state except North Carolina. The result validated FiveThirtyEight's model and polling aggregation methodology, while discrediting the "unskewed polls" movement in conservative media.`,
    revealDate: '2012-11-06',
    keySignals: [
      'Obama led in the vast majority of state-level polls in swing states — more reliable than national polls',
      'Early voting data favored Democratic turnout',
      'Fundamentals (improving economy, incumbency advantage) favored Obama',
      'FiveThirtyEight\'s 90.9% was based on Monte Carlo simulations of correlated state outcomes'
    ],
    biases: [
      { name: 'Availability Bias', description: 'Romney\'s debate bounce and large rally crowds created a narrative of momentum that wasn\'t supported by data' },
      { name: 'Wishful Thinking', description: 'Partisans on both sides interpreted ambiguous national polls as favoring their candidate' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 15. SNOWDEN
  // ──────────────────────────────────────────────
  {
    id: 'snowden-2013',
    date: '2013-06-10',
    title: 'The NSA Whistleblower Revealed',
    category: 'politics',
    difficulty: 'medium',
    wikiArticles: ['Edward_Snowden', 'Global_surveillance_disclosures_(2013–present)'],
    context: `Four days ago, The Guardian and The Washington Post published explosive revelations about NSA mass surveillance programs — PRISM, which collects data from tech companies, and bulk phone metadata collection. Yesterday, the source identified himself: Edward Snowden, a 29-year-old NSA contractor working for Booz Allen Hamilton. He is currently in Hong Kong. He says he chose Hong Kong for its "spirited commitment to free speech." The US government has called the leaks criminal and is preparing charges. Snowden's fate is now the world's biggest story. He faces the near-certain prospect of espionage charges. The question is whether the US can compel his return.`,
    headlines: [
      'Edward Snowden Reveals Himself as NSA Leak Source',
      'NSA Collects Phone Records of Millions of Verizon Customers',
      'PRISM: NSA Taps Into Servers of Google, Apple, Facebook',
      'US Prepares Espionage Charges Against Snowden',
      'Snowden in Hong Kong: "I Am Not Here to Hide"'
    ],
    stockTicker: null,
    question: 'Will Edward Snowden be extradited or returned to the United States within 6 months?',
    baseRate: 'The US has a high success rate in obtaining extradition from treaty partners (~85%). However, Hong Kong/China, Russia, and other non-allied nations have a near-zero rate of honoring US extradition requests for political cases.',
    expertConsensus: 'Legal experts were divided. Hong Kong has an extradition treaty with the US, but with significant political offense exceptions. Many expected China to ultimately hand Snowden over to avoid diplomatic complications. Others believed China or Russia would shelter him as a strategic asset.',
    outcome: false,
    outcomeExplanation: `Snowden was never extradited. On June 23, he flew from Hong Kong to Moscow, apparently en route to Ecuador or Venezuela. His US passport was canceled mid-flight. He became stranded in Moscow's Sheremetyevo airport for 39 days before Russia granted him temporary asylum. He has remained in Russia ever since, eventually receiving permanent residency and Russian citizenship. He was charged under the Espionage Act in the US but has never stood trial.`,
    revealDate: '2013-08-01',
    keySignals: [
      'Hong Kong\'s extradition treaty with the US had broad political offense exceptions that could apply',
      'China had strategic interest in the intelligence Snowden possessed and little incentive to help the US',
      'Snowden chose Hong Kong deliberately, not a US-allied nation — suggesting he had an exit plan',
      'WikiLeaks was actively assisting Snowden\'s travel, suggesting a network was in place'
    ],
    biases: [
      { name: 'Just World Bias', description: 'The belief that the US legal system would "get its man" regardless — underestimating geopolitical sheltering' },
      { name: 'Availability Bias', description: 'High-profile US extraditions from allied countries are well-known, but political asylum cases get less attention' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 16. CURIOSITY MARS LANDING
  // ──────────────────────────────────────────────
  {
    id: 'curiosity-2012',
    date: '2012-08-05',
    title: 'Curiosity\'s Seven Minutes of Terror',
    category: 'science',
    difficulty: 'easy',
    wikiArticles: ['Curiosity_(rover)', 'Mars_Science_Laboratory'],
    context: `NASA's Mars Science Laboratory mission is about to attempt the most complex planetary landing ever. The Curiosity rover — the size of a car, weighing 900kg — must land on Mars tonight using a never-before-tested "sky crane" system. The sequence is terrifying: the spacecraft enters the atmosphere at 13,000 mph, deploys a supersonic parachute, then a rocket-powered descent stage lowers the rover on cables before flying away. NASA engineers call it "seven minutes of terror" — the entire landing happens autonomously because the 14-minute signal delay to Earth means mission control can only watch. Previous Mars landers were much smaller. Two-thirds of all Mars missions have historically failed.`,
    headlines: [
      'NASA\'s Curiosity Rover Approaches Mars — Landing Attempt Tonight',
      '"Seven Minutes of Terror": Engineers Describe Landing Challenge',
      'Mars Landing to Use Never-Tested Sky Crane System',
      'Times Square to Host Live Viewing of Mars Landing',
      'Two-Thirds of Mars Missions Have Failed Historically'
    ],
    stockTicker: null,
    question: 'Will the Curiosity rover successfully land on Mars?',
    baseRate: 'Historically, ~2/3 of all Mars missions have failed. However, NASA\'s recent Mars landing record was strong: Spirit and Opportunity (2004) and Phoenix (2008) all succeeded. The sky crane system was entirely new and untested in actual Mars conditions.',
    expertConsensus: 'NASA publicly stated confidence but acknowledged the extreme risk. Internal estimates put success probability at roughly 70-80%. The space community was deeply anxious — the sky crane was an unprecedented engineering gamble. Failure would be a devastating blow to NASA\'s planetary science program.',
    outcome: true,
    outcomeExplanation: `Curiosity landed flawlessly on August 6, 2012 at 05:17 UTC in Gale Crater. The sky crane system worked perfectly. The first images arrived within minutes. The rover went on to far exceed its planned 2-year mission, making groundbreaking discoveries about Mars's past habitability, including evidence of ancient riverbeds and organic molecules. As of 2024, Curiosity is still operating after 12+ years on Mars.`,
    revealDate: '2012-08-06',
    keySignals: [
      'NASA had conducted over 10,000 simulations of the landing sequence — far more testing than any previous mission',
      'Every component had been individually tested, even if the complete sequence hadn\'t been tested on Mars',
      'NASA\'s recent Mars landing record (3 successes in a row) suggested institutional competence',
      'The mission had cost $2.5 billion — NASA would not have proceeded without high internal confidence'
    ],
    biases: [
      { name: 'Base Rate Neglect', description: 'The historical 2/3 failure rate includes early Soviet missions — NASA\'s modern success rate was much higher' },
      { name: 'Narrative Bias', description: '"Seven Minutes of Terror" framing made the landing sound riskier than engineering data suggested' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 17. COVID VACCINE EUA
  // ──────────────────────────────────────────────
  {
    id: 'covid-vaccine-2020',
    date: '2020-11-08',
    title: 'The Vaccine Race',
    category: 'science',
    difficulty: 'medium',
    wikiArticles: ['COVID-19_vaccine', 'Tozinameran'],
    context: `The world has been in the grip of the COVID-19 pandemic for 10 months. Over 50 million cases and 1.2 million deaths have been recorded. Multiple vaccine candidates are in Phase 3 trials — Pfizer/BioNTech, Moderna, AstraZeneca/Oxford, and Johnson & Johnson are the frontrunners. Pfizer's trial has enrolled over 43,000 participants and interim results are expected any day. The FDA has said it requires at least 2 months of safety data after vaccination before considering an Emergency Use Authorization. Operation Warp Speed has invested billions, but many Americans are skeptical — polls show only 50-60% say they would take a vaccine. No mRNA vaccine has ever been approved for human use.`,
    headlines: [
      'Pfizer Phase 3 Trial: Interim Results Expected Soon',
      'FDA Sets High Bar: 50% Efficacy Minimum for COVID Vaccine',
      'Operation Warp Speed: Multiple Vaccines in Final Trials',
      'Poll: Only 58% of Americans Would Take a COVID Vaccine',
      'Biden Wins Presidential Election; Promises Science-Led Pandemic Response'
    ],
    stockTicker: null,
    question: 'Will a COVID vaccine receive Emergency Use Authorization in the US before the end of 2020?',
    baseRate: 'Typical vaccine development takes 10-15 years. The fastest previous vaccine (mumps) took 4 years. No vaccine had ever gone from pathogen identification to authorization in under a year. However, unprecedented resources and parallel (not sequential) trial phases had compressed timelines dramatically.',
    expertConsensus: 'Most public health experts expected EUA in Q1 2021 at the earliest. Some were optimistic about December 2020 if trial data was strong. Skeptics pointed out that mRNA technology was unproven at scale and that the political pressure for a fast approval raised safety concerns.',
    outcome: true,
    outcomeExplanation: `On November 9 — just one day after this scenario — Pfizer/BioNTech announced their vaccine was 95% effective, far exceeding the FDA's 50% threshold. On December 11, the FDA granted Emergency Use Authorization for the Pfizer vaccine, making it the first COVID-19 vaccine authorized in the US. Moderna's vaccine received EUA on December 18. The mRNA vaccines proved to be one of the greatest achievements in medical history, developed in under 11 months from pathogen identification to authorization.`,
    revealDate: '2020-12-11',
    keySignals: [
      'Pfizer\'s trial design called for interim analysis when a specific number of COVID cases accumulated — this threshold was approaching',
      'The trial enrollment of 43,000 was complete, and the 2-month safety window was nearly met',
      'Pfizer had begun manufacturing at scale before results — a signal of internal confidence',
      'The FDA had published detailed guidance documents, suggesting the review pathway was ready'
    ],
    biases: [
      { name: 'Anchoring', description: 'The "vaccines take 10-15 years" anchor made sub-1-year development feel impossible, even with unprecedented resources' },
      { name: 'Pessimism Bias', description: 'After months of bad pandemic news, many found it hard to believe something could go right this quickly' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 18. JANUARY 6
  // ──────────────────────────────────────────────
  {
    id: 'january6-2021',
    date: '2021-01-05',
    title: 'Congress to Certify the Election',
    category: 'politics',
    difficulty: 'hard',
    wikiArticles: ['2021_United_States_Electoral_College_vote_count', '2020_United_States_presidential_election'],
    context: `Tomorrow, January 6, Congress will meet in a joint session to certify the Electoral College results, confirming Joe Biden as the 46th president. President Trump continues to insist the election was "stolen" and has called for a massive rally in Washington: "Big protest in D.C. on January 6th. Be there, will be wild!" Thousands of Trump supporters are gathering in Washington. Several Republican senators and over 100 House members plan to object to results from key states, though they lack the votes to change the outcome. Vice President Pence is under pressure from Trump to reject electoral votes — which constitutional scholars say he has no authority to do. Security experts have flagged concerning chatter on far-right forums about "storming" the Capitol.`,
    headlines: [
      'Trump Urges Supporters to D.C. on Jan 6: "Be There, Will Be Wild!"',
      'Thousands Gather in Washington Ahead of Electoral Vote Certification',
      'Over 100 House Republicans to Object to Biden\'s Electoral College Win',
      'Pence Under Pressure: Trump Wants VP to Reject Electoral Votes',
      'Security Officials Monitor Far-Right Chatter About January 6'
    ],
    stockTicker: null,
    question: 'Will Congress certify Biden\'s win without significant disruption (violence, breach of Capitol, multi-hour delay)?',
    baseRate: 'Electoral vote certification has been a ceremonial procedure for over 200 years. Minor objections have occurred (2001, 2005, 2017) but were resolved in hours with no disruption. No violent interruption of the process has ever occurred.',
    expertConsensus: 'Most political analysts expected a noisy but ultimately procedural day — objections would be raised, debated, voted down, and Biden certified by evening. Some security experts were alarmed by online chatter but most expected a large but peaceful protest. The Capitol Police had declined National Guard support.',
    outcome: false,
    outcomeExplanation: `On January 6, 2021, a mob of Trump supporters stormed the United States Capitol, breaching security barriers, breaking windows, and occupying the building for hours. Lawmakers were evacuated or sheltered in place. Five people died in connection with the events. The certification was suspended for over 6 hours before resuming late that night and completing at 3:44 AM on January 7. It was the worst attack on the US Capitol since the War of 1812.`,
    revealDate: '2021-01-06',
    keySignals: [
      'Trump\'s "will be wild" tweet was a clear call to action beyond normal rally language',
      'Far-right forums (Parler, TheDonald) had explicit discussions about breaching the Capitol',
      'Capitol Police had declined National Guard support despite intelligence warnings',
      'Trump was publicly pressuring Pence to take unconstitutional action — raising the stakes beyond ceremony'
    ],
    biases: [
      { name: 'Normalcy Bias', description: 'The Capitol certification had been peaceful for 200+ years, making violent disruption feel inconceivable' },
      { name: 'System Justification', description: 'Trust in democratic institutions made it hard to imagine that the system itself could be physically attacked' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 19. SCOTTISH INDEPENDENCE
  // ──────────────────────────────────────────────
  {
    id: 'scotland-2014',
    date: '2014-09-17',
    title: 'Scottish Independence Vote',
    category: 'politics',
    difficulty: 'easy',
    wikiArticles: ['2014_Scottish_independence_referendum'],
    context: `Tomorrow, Scotland votes on whether to become an independent country, ending a 307-year union with England. The campaign has been extraordinary — turnout is expected to exceed 85%. Polls have swung dramatically: Yes (independence) surged into the lead in early September, causing panic in Westminster and a last-minute vow of more devolution from all three major UK party leaders. The latest polls show a very tight race, with No holding a slight 2-4 point lead. Businesses have warned of economic disruption; oil revenues and EU membership are hotly debated. The emotional case for independence has energized a grassroots movement, while the economic risks dominate the No campaign.`,
    headlines: [
      'Scotland Decides: Final Polls Show Tight Race',
      'UK Party Leaders Make "Vow" of More Powers for Scotland',
      'Yes Campaign: "This Is Our Moment"',
      'Businesses Warn of Jobs Exodus If Scotland Votes Yes',
      'Queen: "I Hope People Will Think Very Carefully"'
    ],
    stockTicker: null,
    question: 'Will Scotland vote for independence?',
    baseRate: 'Independence referendums in established democracies succeed roughly 40-50% of the time globally. Late swings toward the status quo are common (Quebec 1995: late swing to No).',
    expertConsensus: 'Betting markets: ~75-80% No. Polls: slight No lead (2-4 points). Most analysts expected No, citing the historical pattern of late swings toward the status quo and the strength of economic uncertainty arguments.',
    outcome: false,
    outcomeExplanation: `Scotland voted No by 55.3% to 44.7% on September 18, 2014, with a record 84.6% turnout. The result followed the historical pattern of late swings to the status quo. However, the closeness of the race transformed Scottish politics — the SNP surged to dominance, and Brexit in 2016 reignited independence debates.`,
    revealDate: '2014-09-19',
    keySignals: [
      'The historical "status quo bias" pattern in referendums consistently shows late undecided voters breaking for No',
      'The last-minute "Vow" from UK leaders gave wavering voters a reason to choose No without feeling they were rejecting change',
      'Economic uncertainty arguments historically dominate close referendums — and the No campaign led on economic trust',
      'Extremely high expected turnout often brings out cautious voters who favor the status quo'
    ],
    biases: [
      { name: 'Availability Bias', description: 'The dramatic Yes surge and passionate rallies made independence feel more likely than underlying fundamentals suggested' },
      { name: 'Bandwagon Effect', description: 'The Yes campaign\'s visible energy and social media presence created an impression of inevitability' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 20. ALPHAGO
  // ──────────────────────────────────────────────
  {
    id: 'alphago-2016',
    date: '2016-03-08',
    title: 'Machine vs. Human: The Go Challenge',
    category: 'tech',
    difficulty: 'hard',
    wikiArticles: ['AlphaGo_versus_Lee_Sedol'],
    context: `Tomorrow begins a five-game match between Google DeepMind's AlphaGo AI and Lee Sedol, one of the greatest Go players in history. Go has long been considered the "final frontier" of board games for AI — its combinatorial complexity (more possible positions than atoms in the universe) was thought to be decades away from computer mastery. In October 2015, AlphaGo defeated European champion Fan Hui 5-0, but Fan Hui is ranked much lower than Lee Sedol. Most Go professionals believe Lee Sedol will win convincingly. Lee himself has said he expects to win 5-0 or 4-1. Deep learning experts are more cautious, noting AlphaGo may have improved significantly since the Fan Hui match.`,
    headlines: [
      'AlphaGo vs Lee Sedol: The Match of the Century Begins Tomorrow',
      'Go Experts: Computer Has No Chance Against Lee Sedol',
      'Lee Sedol: "I Will Win 5-0, Maybe 4-1"',
      'DeepMind CEO: "We Have Made Significant Progress Since October"',
      'The Game AI Experts Said Would Take 10 More Years to Solve'
    ],
    stockTicker: {
      symbol: 'GOOGL',
      label: 'Alphabet Inc.',
      prices: [699, 706, 712, 718, 726, 730, 733, 725, 722, 728, 735, 741, 745, 750, 752]
    },
    question: 'Will AlphaGo win the match against Lee Sedol (best of 5)?',
    baseRate: 'No AI program had ever defeated a top professional Go player in an even match. The consensus among AI researchers as recently as 2014 was that this was "at least a decade away."',
    expertConsensus: 'Go professionals overwhelmingly expected Lee Sedol to win easily. AI researchers were split — deep learning experts gave AlphaGo maybe a 20-30% chance. A poll of professional Go players showed ~90% predicting Lee Sedol victory. Betting markets barely existed for this event.',
    outcome: true,
    outcomeExplanation: `AlphaGo won the match 4-1, shocking the Go world and the broader AI community. AlphaGo's "Move 37" in Game 2 — a deeply unconventional play that no human would make — was later recognized as a creative masterpiece. Lee Sedol won Game 4 with his own brilliant "God's Touch" move but lost the overall match. The result accelerated global AI investment and marked a watershed moment in artificial intelligence history.`,
    revealDate: '2016-03-15',
    keySignals: [
      'AlphaGo\'s 5-0 victory over Fan Hui showed it had already achieved professional-level play — the gap to top professionals may have been smaller than assumed',
      'DeepMind had 5 months between the Fan Hui match and this one — time for significant improvement with their resources',
      'The deep learning revolution was accelerating rapidly; "10 years away" predictions in AI had been consistently wrong (too conservative)',
      'Google would not have staged such a high-profile match without internal confidence in the outcome'
    ],
    biases: [
      { name: 'Expert Overconfidence', description: 'Go professionals overestimated the gap between Fan Hui and Lee Sedol, assuming it would be insurmountable for AI' },
      { name: 'Anchoring', description: 'The "at least a decade away" consensus anchored expectations despite rapid recent progress in deep learning' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 21. IRAN NUCLEAR DEAL
  // ──────────────────────────────────────────────
  {
    id: 'iran-deal-2015',
    date: '2015-07-13',
    title: 'Iran Nuclear Talks — Final Hours',
    category: 'geopolitics',
    difficulty: 'medium',
    wikiArticles: ['Joint_Comprehensive_Plan_of_Action', 'Iran_nuclear_deal_framework'],
    context: `Negotiations between Iran and the P5+1 (US, UK, France, Russia, China, Germany) over Iran's nuclear program have been going on for 20 months, with the current round in Vienna extending far beyond its original deadline. The talks have been extended four times already. Key sticking points remain: the pace of sanctions relief, access for IAEA inspectors to military sites, and the future of Iran's Fordow enrichment facility. Foreign ministers from all parties are in Vienna. Secretary Kerry has been negotiating for 17 consecutive days. Both sides say they are "closer than ever" but significant gaps remain. Critics in both the US Congress and Iran's hardline establishment oppose any deal.`,
    headlines: [
      'Iran Nuclear Talks Enter 17th Consecutive Day in Vienna',
      'Kerry: "Genuine Progress" But Gaps Remain',
      'Deadline Extended for Fourth Time',
      'Congressional Republicans Warn Against "Bad Deal"',
      'Iranian Supreme Leader: "We Will Not Accept a Humiliating Deal"'
    ],
    stockTicker: null,
    question: 'Will Iran and the P5+1 reach a comprehensive nuclear agreement this week?',
    baseRate: 'Multi-party nuclear negotiations that reach the "foreign ministers in the room" stage succeed roughly 60-70% of the time, though often with further delays. The four previous deadline extensions suggested difficulty but also momentum.',
    expertConsensus: 'Most diplomats and analysts expected a deal — the political investment from all sides was too great to walk away. But timing was uncertain; many expected yet another extension. Skeptics argued the remaining gaps (IAEA access to military sites) were fundamental, not just technical.',
    outcome: true,
    outcomeExplanation: `The Joint Comprehensive Plan of Action (JCPOA) was announced on July 14, 2015 — the next day. It was one of the most complex international agreements in decades: Iran agreed to reduce its enriched uranium stockpile by 98%, limit enrichment to 3.67%, and allow extensive IAEA inspections in exchange for sanctions relief. The deal held until 2018 when the US withdrew under President Trump.`,
    revealDate: '2015-07-14',
    keySignals: [
      'All foreign ministers remaining in Vienna for 17+ days signaled extreme commitment to a deal',
      'The political cost of walking away — after this much public investment — was higher than the cost of compromise',
      'Both Kerry and Zarif had domestic political cover: Kerry from Obama, Zarif from Rouhani',
      'The P5+1 framework agreement in April had already resolved most major issues'
    ],
    biases: [
      { name: 'Anchoring', description: 'Four deadline extensions created a "boy who cried wolf" effect — people stopped believing a deal was imminent' },
      { name: 'Cynicism Bias', description: 'Years of failed diplomacy with Iran made many assume this attempt would also fail' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 22. PARIS AGREEMENT WITHDRAWAL
  // ──────────────────────────────────────────────
  {
    id: 'paris-withdrawal-2017',
    date: '2017-01-19',
    title: 'A New Administration Takes Power',
    category: 'politics',
    difficulty: 'easy',
    wikiArticles: ['United_States_withdrawal_from_the_Paris_Agreement', 'Paris_Agreement'],
    context: `Tomorrow, Donald Trump is inaugurated as the 45th President of the United States. During the campaign, he called climate change a "hoax invented by the Chinese" and pledged to "cancel the Paris Agreement." However, since winning the election, signals have been mixed. His daughter Ivanka has met with Al Gore and Leonardo DiCaprio about climate policy. Secretary of State nominee Rex Tillerson (former ExxonMobil CEO) said the US should "maintain its seat at the table" on Paris. Some advisors argue withdrawal would damage US credibility. Others, led by Steve Bannon and EPA pick Scott Pruitt, push for full withdrawal. Campaign promises are broken often — will this one be kept?`,
    headlines: [
      'Trump to Be Inaugurated Tomorrow — Climate Policy Unclear',
      'Ivanka Trump Meets Al Gore on Climate Change',
      'Tillerson: US Should "Keep Its Seat at the Table" on Paris',
      'Bannon, Pruitt Push for Full Paris Agreement Withdrawal',
      '195 Nations Signed the Paris Agreement; Will the US Stay?'
    ],
    stockTicker: null,
    question: 'Will the new US administration formally announce withdrawal from the Paris Climate Agreement within its first year?',
    baseRate: 'New presidents fulfill major campaign promises roughly 60-70% of the time. However, international treaty withdrawal is rare and complex — the Paris Agreement has a 3-year lock-in period followed by a 1-year withdrawal process.',
    expertConsensus: 'Split. Climate hawks expected withdrawal based on campaign rhetoric. Moderates expected the administration to stay in but weaken US commitments. Some analysts noted the Paris Agreement\'s flexible structure allowed staying in with reduced ambitions, giving Trump a face-saving option.',
    outcome: true,
    outcomeExplanation: `On June 1, 2017, President Trump announced the US would withdraw from the Paris Agreement, declaring "I was elected to represent the citizens of Pittsburgh, not Paris." The formal withdrawal process began on November 4, 2019 (the earliest possible date), and the US officially left on November 4, 2020. President Biden rejoined the agreement on his first day in office, January 20, 2021.`,
    revealDate: '2017-06-01',
    keySignals: [
      'Trump had been remarkably consistent on this issue throughout the campaign — it was a core promise',
      'His key appointees (Pruitt at EPA, Bannon as chief strategist) were ideologically committed to withdrawal',
      'The "mixed signals" from Ivanka/Tillerson were overweighted — Trump had the final say',
      'Trump\'s base expected this action and he was sensitive to base expectations'
    ],
    biases: [
      { name: 'Wishful Thinking', description: 'Climate advocates hoped the weight of office and international pressure would moderate Trump\'s position' },
      { name: 'Salience Bias', description: 'The Ivanka/Gore meeting received outsized attention relative to the much stronger signals from Bannon/Pruitt' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 23. MH17 ATTRIBUTION
  // ──────────────────────────────────────────────
  {
    id: 'mh17-2014',
    date: '2014-07-18',
    title: 'Flight MH17 Shot Down',
    category: 'geopolitics',
    difficulty: 'easy',
    wikiArticles: ['Malaysia_Airlines_Flight_17'],
    context: `Yesterday, Malaysia Airlines Flight MH17 was shot down over eastern Ukraine, killing all 298 people on board. The Boeing 777, en route from Amsterdam to Kuala Lumpur, crashed near Hrabove in territory controlled by pro-Russian separatists. Both sides are blaming each other: Ukrainian officials say the separatists shot it down with a Buk missile system supplied by Russia. The separatists deny responsibility, claiming Ukraine's military shot it down. Russia suggests a Ukrainian fighter jet was involved. Social media posts reportedly from separatist leader Igor Girkin (Strelkov) initially boasted about shooting down a military transport plane before being deleted. The crash site is in a war zone and international investigators have not yet gained access.`,
    headlines: [
      'Malaysia Airlines Flight MH17 Crashes in Eastern Ukraine — 298 Dead',
      'Ukraine, Russia Trade Blame Over Downing of Passenger Jet',
      'Separatist Social Media Post Celebrated Shooting Down "Transport Plane" Before Deletion',
      'US Intelligence: Missile Launch Detected from Separatist-Held Territory',
      'UN Security Council Demands Full Investigation'
    ],
    stockTicker: null,
    question: 'Will the downing of MH17 be officially attributed to a surface-to-air missile (Buk system)?',
    baseRate: 'Since 1970, commercial aircraft shot down in conflict zones have been hit by surface-to-air missiles in the vast majority of confirmed cases (Iran Air 655, KAL 007 etc.).',
    expertConsensus: 'US intelligence immediately assessed with "high confidence" that MH17 was hit by a Buk missile fired from separatist-held territory. Aviation experts noted the aircraft was at 33,000 feet — too high for MANPADS, requiring a sophisticated system like the Buk. Russia proposed alternative theories (Ukrainian fighter jet, Ukrainian Buk) that most Western analysts found implausible.',
    outcome: true,
    outcomeExplanation: `The Dutch Safety Board concluded in October 2015 that MH17 was struck by a Buk surface-to-air missile. The Joint Investigation Team (JIT) determined in 2016 that the Buk was transported from Russia to eastern Ukraine and fired from a field near Pervomaisk. In November 2022, a Dutch court convicted three men (two Russians, one Ukrainian separatist) of murder for their role in the downing. Russia has consistently denied involvement.`,
    revealDate: '2015-10-13',
    keySignals: [
      'The deleted Strelkov/Girkin social media post was a near-real-time admission before they realized it was a civilian aircraft',
      'The aircraft was at 33,000 feet, ruling out all weapons except sophisticated SAM systems like the Buk',
      'US satellite and signals intelligence detected the missile launch from separatist territory',
      'Separatists had shot down Ukrainian military aircraft in the preceding weeks using Buk systems'
    ],
    biases: [
      { name: 'Contrarianism', description: 'Some people gave undue weight to Russia\'s alternative theories out of a desire to question the "mainstream" narrative' },
      { name: 'Complexity Bias', description: 'The straightforward explanation (separatists with Russian Buk) was rejected by some in favor of more elaborate conspiracy theories' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 24. APPLE iPad ANNOUNCEMENT
  // ──────────────────────────────────────────────
  {
    id: 'ipad-2010',
    date: '2010-01-11',
    title: 'Apple\'s Mystery Device',
    category: 'tech',
    difficulty: 'easy',
    wikiArticles: ['IPad', 'Apple_Inc.'],
    context: `Apple has sent out invitations for a special event on January 27 with the tagline "Come see our latest creation." The tech world is in a frenzy of speculation. For years, rumors have swirled about an Apple tablet computer — Steve Jobs reportedly killed several tablet prototypes in the past. Recent supply chain leaks suggest a 10-inch touchscreen device is in production. The Wall Street Journal, citing sources, reported Apple is preparing a "tablet-like device." Some analysts predict it will be a larger iPod Touch; others believe it will be a full computing platform. The big question: is there actually a market for a device between a smartphone and a laptop? Microsoft tried tablets in 2002 and failed.`,
    headlines: [
      'Apple Sends Invitations for January 27 Event',
      'WSJ: Apple Preparing Tablet-Like Device',
      'Supply Chain Sources: 10-inch Touchscreen in Production',
      'Analysts: Is There a Market for a Device Between Phone and Laptop?',
      'Microsoft\'s 2002 Tablet PC Failed — Will Apple Fare Better?'
    ],
    stockTicker: {
      symbol: 'AAPL',
      label: 'Apple Inc.',
      prices: [210, 212, 214, 211, 209, 213, 215, 214, 212, 210, 211, 213, 214, 212, 210]
    },
    question: 'Will Apple announce a tablet device at its January 27 event?',
    baseRate: 'Apple special events typically introduce major new products. When supply chain leaks and credible media reports converge on a specific product category, Apple delivers roughly 85-90% of the time.',
    expertConsensus: 'Virtually unanimous expectation of a tablet announcement. The supply chain evidence was overwhelming. Debate centered on features, price, and market viability rather than whether it would be announced. Some skeptics recalled Apple killing previous tablet projects.',
    outcome: true,
    outcomeExplanation: `Apple unveiled the iPad on January 27, 2010. Starting at $499, it was positioned as a new category between iPhone and Mac. Critics initially dismissed it as "just a big iPod Touch." It went on sale in April and sold 300,000 units on its first day, 3 million in 80 days, and defined the entire tablet computing category. The iPad generated $20 billion in revenue in its first full year.`,
    revealDate: '2010-01-27',
    keySignals: [
      'Multiple independent supply chain sources confirmed a 10-inch touchscreen device in production',
      'Apple had booked the Yerba Buena Center (used for major product launches, not minor updates)',
      'The Wall Street Journal (known for accurate Apple scoops) confirmed the tablet',
      'Apple\'s event invitation art showed a glowing, tablet-shaped form'
    ],
    biases: [
      { name: 'Contrarianism', description: 'Some skeptics doubted the tablet purely because it seemed "too obvious" and everyone expected it' },
      { name: 'Anchoring', description: 'Microsoft\'s 2002 tablet failure anchored some to believe tablets couldn\'t succeed, ignoring how different Apple\'s approach was' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 25. HURRICANE MARIA & PUERTO RICO
  // ──────────────────────────────────────────────
  {
    id: 'maria-2017',
    date: '2017-09-18',
    title: 'Hurricane Maria Bears Down',
    category: 'science',
    difficulty: 'medium',
    wikiArticles: ['Hurricane_Maria', 'Hurricane_Irma'],
    context: `Hurricane Maria has rapidly intensified into a Category 5 hurricane with 175 mph winds and is heading directly toward Puerto Rico, expected to make landfall on September 20. This comes just two weeks after Hurricane Irma passed north of Puerto Rico as a Category 5, leaving much of the island without power. Puerto Rico's electrical grid — PREPA — was already in terrible condition before Irma, with $9 billion in debt and decades of deferred maintenance. The island's infrastructure is still partially damaged from Irma. Maria's track puts it on a direct hit course — the first Category 4+ hurricane to make direct landfall on Puerto Rico since 1932. Governor Rosselló has declared a state of emergency.`,
    headlines: [
      'Hurricane Maria Intensifies to Category 5 — Puerto Rico in Direct Path',
      'Maria Expected to Make Landfall on Puerto Rico Wednesday',
      'Puerto Rico Still Recovering from Hurricane Irma\'s Damage',
      'Island\'s Fragile Power Grid at Risk of Total Collapse',
      'Governor Rosselló Declares State of Emergency'
    ],
    stockTicker: null,
    question: 'Will Hurricane Maria cause catastrophic, island-wide infrastructure damage to Puerto Rico (total power grid failure)?',
    baseRate: 'Category 4-5 hurricanes making direct landfall on islands cause catastrophic damage roughly 80% of the time. Puerto Rico\'s grid was already identified as one of the most vulnerable in the US territory system.',
    expertConsensus: 'The National Hurricane Center warned of "potentially catastrophic" damage. Emergency managers were extremely concerned given Irma\'s prior damage and the fragile grid. However, some officials hoped the mountains might weaken the storm after landfall. Weather models were unusually consistent on the direct-hit track.',
    outcome: true,
    outcomeExplanation: `Hurricane Maria made landfall on September 20, 2017 as a high-end Category 4 with 155 mph winds, passing directly across Puerto Rico. The entire island lost power — the largest blackout in US history. The electrical grid was essentially destroyed, with some areas not regaining power for nearly a year. An estimated 2,975 people died (the initial official count of 64 was later revised dramatically upward). Maria caused approximately $90 billion in damage, making it one of the costliest natural disasters in US history.`,
    revealDate: '2017-09-21',
    keySignals: [
      'Maria\'s track was directly across the island, not a glancing blow — maximizing damage',
      'The power grid was already partially failed from Irma — it couldn\'t withstand another major hurricane',
      'PREPA\'s $9 billion debt meant years of deferred maintenance and zero resilience',
      'Category 5 intensity with direct landfall on a small island is essentially worst-case scenario'
    ],
    biases: [
      { name: 'Normalcy Bias', description: 'Puerto Rico had avoided a direct major hurricane hit for 85 years, creating complacency' },
      { name: 'Optimism Bias', description: 'The mountains of central Puerto Rico led some to hope the storm would weaken after landfall' }
    ],
    chainNext: null,
    chainLabel: null
  },

  // ──────────────────────────────────────────────
  // 26. OIL PRICE CRASH 2008
  // ──────────────────────────────────────────────
  {
    id: 'oil-crash-2008',
    date: '2008-07-11',
    title: 'Oil Hits All-Time High',
    category: 'economics',
    difficulty: 'hard',
    wikiArticles: ['2000s_energy_crisis', 'Price_of_oil'],
    context: `Oil has just hit an all-time record of $147.27 per barrel. Prices have doubled in a year and quadrupled since 2004. Goldman Sachs has forecast oil could reach $200 per barrel. The narrative is compelling: surging Chinese and Indian demand, peak oil concerns, Middle East instability, the weakening dollar, and speculation by commodity funds. Some analysts talk about a "new paradigm" where oil will never be cheap again. Gas prices in the US have hit $4/gallon for the first time. Airlines are going bankrupt. Consumers are struggling. But beneath the surface, the US housing market is collapsing, credit markets are seizing up, and a few contrarian analysts warn that a severe recession could destroy oil demand.`,
    headlines: [
      'Oil Smashes Record: $147 Per Barrel',
      'Goldman Sachs: Oil Could Hit $200',
      'Gas Prices Hit $4/Gallon — American Consumers Squeezed',
      'Airlines Cut Flights, Add Fees as Fuel Costs Soar',
      'Peak Oil Fears Drive Commodity Boom'
    ],
    stockTicker: {
      symbol: 'CL',
      label: 'Crude Oil (WTI)',
      prices: [100.1, 104.5, 109.7, 115.4, 120.2, 126.3, 131.9, 135.5, 138.1, 140.0, 134.6, 139.6, 141.4, 143.6, 147.3]
    },
    question: 'Will oil prices stay above $100/barrel through the end of 2008?',
    baseRate: 'Commodity supercycles historically end with sharp crashes, but timing the peak is extremely difficult. Previous oil price crashes (1985, 1998) occurred after extended periods of high prices.',
    expertConsensus: 'Goldman Sachs forecast $200 oil. Most energy analysts expected elevated prices for years due to structural supply constraints. OPEC had limited spare capacity. A minority of contrarian analysts warned that the housing crisis could trigger a recession severe enough to crash demand.',
    outcome: false,
    outcomeExplanation: `Oil prices collapsed spectacularly. By December 2008, crude had fallen to $32 per barrel — a 78% decline from the July peak in just 5 months. The financial crisis and global recession destroyed demand. The "new paradigm" of permanently expensive oil was shattered. Goldman Sachs' $200 forecast became a cautionary tale about Wall Street predictions.`,
    revealDate: '2008-12-31',
    keySignals: [
      'The US housing market was already in free fall — mortgage defaults were accelerating every month',
      'Credit markets were tightening — Bear Stearns had been rescued in March, signaling systemic stress',
      'Speculative positions in oil futures were at record levels — suggesting a bubble component',
      'Oil demand was already weakening in the US and Europe, masked by still-growing Asian demand'
    ],
    biases: [
      { name: 'Recency Bias', description: 'Years of rising prices made it feel like the trend would continue indefinitely' },
      { name: 'Narrative Bias', description: 'The "peak oil / Chinese demand / new paradigm" story was so compelling that contradicting data was dismissed' }
    ],
    chainNext: null,
    chainLabel: null
  }
];
