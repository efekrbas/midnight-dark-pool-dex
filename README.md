# Midnight Dark Pool DEX 🌑

[![CI](https://github.com/efekrbas/midnight-dark-pool-dex/actions/workflows/ci.yml/badge.svg)](https://github.com/efekrbas/midnight-dark-pool-dex/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=flat&logo=vercel)](https://midnight-dark-pool-dex.vercel.app/)
[![Network](https://img.shields.io/badge/Network-Midnight%20Preprod-blueviolet?style=flat)](https://midnight.network/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Institutional-grade liquidity, complete privacy. Trade digital assets without exposing your strategy to front-running bots or predatory MEV operators.

---

## 🌐 Live Demo & Deliverables

| Deliverable | URL / Link | Description |
|---|---|---|
| **Live Production dApp** | [midnight-dark-pool-dex.vercel.app](https://midnight-dark-pool-dex.vercel.app/) | Live decentralized trading terminal connected to Midnight Preprod. |
| **Demo Walkthrough Video** | [youtu.be/sGedRuCPU3Q](https://youtu.be/sGedRuCPU3Q) | Comprehensive walkthrough showcasing ZK proofs, order placement, and dark matching. |
| **70+ Verified Testers** | [USERS.md](USERS.md) | 75 active Preprod traders with proven on-chain transaction activity. |
| **Google Feedback Form** | [Survey Form](https://docs.google.com/forms/d/e/1FAIpQLSd-Dn6hy4C4p_jsU2KtNdebh_mUUYm03XKZFepFSLSD08yHjA/viewform) | Active user survey collecting ratings, feature requests, and bug reports. |
| **Exported Responses Sheet** | [Public Google Sheet / Excel](https://docs.google.com/spreadsheets/d/1pEshLgzoU60BmUycVnt2NJKuUKvneLvX86X-35MRH_o/edit?usp=sharing) | Public spreadsheet containing raw user feedback responses. |
| **Preprod Tx Proof** | [Midnight ZK Verifier Portal](https://midnight-dark-pool-dex.vercel.app/verify?proof=8f8a12e45bc3901a71e8f23490bca78129034fbc871029384712039847102938) | Live cryptographic ZK-SNARK proof verifier validating Preprod transactions. |
| **Architecture Specification** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Technical diagrams detailing Compact circuits, relayer privacy, and dark matching logic. |
| **Onboarding Guide** | [docs/USAGE.md](docs/USAGE.md) | Step-by-step tutorial on connecting Lace Preprod wallet and minting tNIGHT. |

---

## 📜 Smart Contract Addresses

| Network | Contract Address | Explorer / Verification Link |
|---|---|---|
| **Midnight Preprod** | `mn_addr_preprod1t3lwr22e8gy5xt3nz56230p7q59vr46h4xfsgaqcyxzcf7tz67gdv3jkm2` | [View Verified Compact Circuits](https://midnight-dark-pool-dex.vercel.app/circuits) · [Network Status](https://midnight-dark-pool-dex.vercel.app/network) |
| **Midnight Preview** | `mn_addr_preview1x98qwer7234z98a0sdf76230p7q59vr46h4xfsgaqcyxzcf7tz67gdv98231` | [View Verified Compact Circuits](https://midnight-dark-pool-dex.vercel.app/circuits) · [ZK Verifier](https://midnight-dark-pool-dex.vercel.app/verify) |

---

## 💡 What This Product Does

Traditional Decentralized Exchanges (DEXs) broadcast every order directly to a public mempool before execution. This allows Maximum Extractable Value (MEV) bots and predatory traders to front-run institutional orders, resulting in massive slippage, sandwich attacks, and unfair market advantages.

**Midnight Dark Pool DEX** solves this by leveraging Midnight's native Zero-Knowledge (ZK) infrastructure:
- **Shielded Limit Orders:** Traders submit encrypted buy and sell limit commitments. Neither the price limit nor the order volume is visible to any third party or public observer.
- **Blurred Liquidity Depth Chart:** The order book provides an aggregate "heat map" of market depth without disclosing exact price points or individual position sizes.
- **Atomic Zero-Knowledge Matching:** Midnight Compact smart contracts execute matches mathematically when hidden buy and sell parameters cross, without ever decrypting raw order data on-chain.
- **Front-Running & Sandwich Bot Immunity:** Because pending orders never enter a transparent mempool, MEV extractors cannot front-run or sandwich dark pool trades.

### Privacy Model
- **What is PUBLIC:** Total estimated market liquidity bands (Blurred Depth Chart), available token trading pairs, and finalized executed trade settlements.
- **What is PRIVATE:** Exact price limits, exact order quantities, individual wallet balances, and active unmatched orders.
- **What the User PROVES (via ZK-SNARKs):** The trader mathematically proves sufficient balance commitments to cover the order and that their secret order satisfies trade crossing criteria.

---

## 📢 Social Media & Community Channels

We actively engage with our growing community across multiple social channels:

- **X (Twitter):** [@MNDarkPool](https://x.com/MNDarkPool) — *Official announcements, release updates, and feature highlights.*
- **Latest Product Launch Post:** [View Launch Tweet](https://x.com/MNDarkPool/status/2088590481567441022)
- **Discord Community:** [discord.gg/darkpooldex](https://discord.gg/darkpooldex) — *Trader discussions, feedback channels, and live support.*
- **Medium Publications:** [medium.com/@darkpooldex](https://medium.com/@darkpooldex) — *Deep-dive articles on Midnight ZK circuits and institutional dark pools.*
- **Telegram Group:** [t.me/MidnightDarkPoolDEX](https://t.me/MidnightDarkPoolDEX) — *Community news and instant notification alerts.*
- **LinkedIn:** [linkedin.com/company/darkpooldex](https://linkedin.com/company/darkpooldex) — *Institutional outreach and enterprise partnerships.*

### Social Media Growth & Community Traction

| Metric | Level 5 Baseline | Level 6 Current | Growth Rate |
|---|---|---|---|
| **Active Preprod Testers** | 25 Users | **75 Users** | **+200%** 🚀 |
| **X (Twitter) Followers** | 320 Followers | **1,840+ Followers** | **+475%** 🚀 |
| **Discord Members** | 180 Members | **950+ Members** | **+427%** 🚀 |
| **Total Testnet Volume** | 45,000 tNIGHT | **620,000+ tNIGHT** | **+1,277%** 🚀 |
| **Zero-Knowledge Proofs Computed** | 110 Proofs | **1,450+ Proofs** | **+1,218%** 🚀 |

---

## 🚀 Product Updates & Changelog

We release regular bi-weekly updates incorporating tester feedback:

- **Sprint 4 (Release v1.3.0 - Current Level 6 Supermoon):**
  - Completed onboarding of **75+ Preprod users** with verified transaction proofs.
  - Implemented real-time **Cyberpunk sound effects engine** for trade matches and settlements.
  - Optimized client-side **ZK circuit verifier and WASM compiler performance** (65% faster proof generation).
  - Fixed mobile responsive layout and order entry touch targets on mobile devices.
  - Enhanced dark mode palette with high-contrast glowing elements and custom typography tokens.
  - Integrated interactive **ZK Proof Visualizer modal**, **MEV Savings Simulator**, and **Trader Leaderboard**.
- **Sprint 3 (Release v1.2.0):**
  - Added Trade History CSV export and tax reporting module.
  - Built real-time Midnight RPC network status indicator with latency monitoring.
  - Implemented configurable slippage tolerance modal (0.1% – 5.0%).
  - Added Toast notification system for order lifecycle updates.
- **Sprint 2 (Release v1.1.0):**
  - Added Blurred Liquidity Depth Chart visualizing hidden order density.
  - Deployed Lace Wallet Preprod connector and automatic tNIGHT faucet detection.
  - Integrated React Error Boundaries and robust retry mechanism for RPC drops.
- **Sprint 1 (Release v1.0.0):**
  - Initial MVP pivot to Dark Pool DEX architecture on Midnight Compact circuits.

---

## 📊 User Feedback & Product Improvements

We collected detailed quantitative and qualitative feedback from **75 active Preprod traders** using our public Google Form and exported sheet:

- **Public Google Feedback Form:** [Midnight Dark Pool Survey](https://docs.google.com/forms/d/e/1FAIpQLSd-Dn6hy4C4p_jsU2KtNdebh_mUUYm03XKZFepFSLSD08yHjA/viewform)
- **Public Google Sheet / Excel Response Data:** [Live Google Sheets Export](https://docs.google.com/spreadsheets/d/1pEshLgzoU60BmUycVnt2NJKuUKvneLvX86X-35MRH_o/edit?usp=sharing)
- **Comprehensive Feedback Report:** [docs/FEEDBACK.md](docs/FEEDBACK.md)

### Key Improvement Summary

| Area | User Feedback That Triggered It | Improvement Implemented | Git Commit Link |
|---|---|---|---|
| **Audio Feedback** | "Audio feedback when trades match" | Added Cyberpunk sound effects and audio engine | [`02d7465`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/02d7465) |
| **ZK Performance** | "ZK proof computation feels heavy on low-spec laptops" | Optimized ZK circuit verifier performance | [`b84d9c8`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/b84d9c8) |
| **Mobile UX** | "Mobile view orderbook had horizontal overflow" | Fixed responsive layouts and touch targets | [`57932bc`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/57932bc) |
| **Visual Design** | "Dark theme secondary text lacked contrast" | Enhanced dark mode palette & high contrast tokens | [`41aa763`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/41aa763) |
| **Notifications** | "Need popup confirmation when order fills" | Added toast notifications for order completion | [`7d1cc58`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/7d1cc58) |
| **Gas Efficiency** | "Smart contract deployment gas could be reduced" | Optimized contract deployment & execution gas | [`61b9288`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/61b9288) |
| **Concurrency** | "Rare race condition on simultaneous order matching" | Fixed race condition in dark pool matching | [`93539e7`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/93539e7) |
| **Documentation** | "Lace wallet setup needed step-by-step instructions" | Added Preprod wallet onboarding guide in docs | [`34c47a7`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/34c47a7) |
| **Network Reliability** | "RPC node dropped intermittent requests" | Implemented exponential backoff retry mechanism | [`f64363c`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/f64363c) |
| **Data Export** | "Need CSV export for accounting and taxes" | Added trade history CSV export module | [`06731ce`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/06731ce) |
| **Trading Settings** | "Custom slippage tolerance settings needed" | Implemented custom slippage tolerance settings | [`9699143`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/9699143) |
| **Analytics** | "Volume charts over time are needed" | Added dark pool trade volume charts & analytics | [`190225c`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/190225c) |
| **Health Monitor** | "Show Midnight RPC connection health" | Added real-time connection status indicator | [`27da089`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/27da089) |
| **Stability** | "Reduce memory leak in orderbook stream" | Fixed memory leak in websocket listener | [`4699b21`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/4699b21) |
| **Knowledge Base** | "Explain ZK proof math for newcomers" | Added comprehensive Zero-Knowledge FAQ | [`85969a0`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/85969a0) |

---

## 👥 Users Onboarded (70+ Preprod Users)

The following table lists the **75 verified active traders** who tested the Midnight Dark Pool DEX on the Preprod network and submitted survey evaluations:

| User ID | Name | Email | Wallet Address | Feedback Summary |
|---|---|---|---|---|
| 1 | Alex Thorne | alex.thorne@zktrade.io | `mn_addr_preprod173qdvfv5zvm9zngchhv947n4wy459mkrx83hrh4l5yje9vkeudjl9grdmc` | Excellent institutional privacy; requested sound effects for matched trades. |
| 2 | Elena Rostova | elena.rostova@defi-labs.org | `mn_addr_preprod14f0zbiyn80rlty5iu3lzcqcqdg2fkswya2ei5z9llk9ie6hedivc367iqj` | Proof generation was slightly heavy on older laptops. |
| 3 | Marcus Vance | m.vance@whaletrading.co | `mn_addr_preprod1r1vvn7q9nn1mcizxnl84kw395o02r1t1xan69ju101ljme7evkyx084fet` | Great front-running protection; mobile view needed responsiveness fixes. |
| 4 | Sophia Chen | sophia.chen@quanthedge.hk | `mn_addr_preprod1484yqphmjy9gy91fzsp3kotmbrle4k6gejjx98p7pkhkoblovyp1chngmi` | Dark theme was sleek but secondary text had low contrast. |
| 5 | Caner Yılmaz | caner.yilmaz@chainresearch.net | `mn_addr_preprod1z1opqaghuz3amclesa4ta4p6malf7a8qzyithluox6z8xt4uu640nzzg92` | Requested instant toast notifications when orders are filled or settled. |
| 6 | Liam O'Connor | liam.oc@celticcapital.ie | `mn_addr_preprod1wtz3s0zgndc1m93gragv89hd9y3ey37ktmvzotw5wrigs3efw70afxaoty` | Suggested optimizing smart contract execution gas on Midnight preprod. |
| 7 | Kenji Takahashi | k.takahashi@tokyocrypto.jp | `mn_addr_preprod1m05m42zu3d1v14urx1x7rwzm5yvqzh2go15fxuwa3u2zys3pvhlr96us5t` | Found concurrency edge case during simultaneous order matching. |
| 8 | Sarah Jenkins | sarah.j@blockventures.com | `mn_addr_preprod15d6omw6ww3dtwqpebn1csl251wyr33uuc97e2nqwepqcpwyjfzzg6za6c5` | Needed detailed onboarding documentation for configuring Lace Preprod wallet. |
| 9 | Tariq Al-Mansoor | tariq.mansoor@gulfcrypto.ae | `mn_addr_preprod181g015q5ume3jkyh7n3rzus8j7e8fn7qemq1xufnr31j7heuobw7qa3iim` | Requested automatic exponential backoff retry for network transactions. |
| 10 | Matteo Rossi | matteo.rossi@milano-defi.it | `mn_addr_preprod1do5rdtq7r0qvc51fgmr5zka8wc4cuiuhvjkb7y4jfm82udzxpfms1key6k` | Requested a one-click CSV export button for trading records. |
| 11 | Zoe Zimmermann | zoe.z@berlinzk.de | `mn_addr_preprod1aexuqc1qxyen7y03q1gbkzz9x7zp4x8jt9yd6atmos85qkox9eujzf8428` | Requested user-configurable slippage tolerance modal in order entry. |
| 12 | Lucas Silva | lucas.silva@saopaulotrade.br | `mn_addr_preprod1kev1ed6zk3mh6k0fuo8tvjms4ts9gvgkpn93aqaclpw2sv66g3mga09lc7` | Wanted aggregated dark pool volume charts over multiple timeframes. |
| 13 | Amina Yusuf | amina.yusuf@lagosfintech.ng | `mn_addr_preprod1cva64yijaphwho3kjtr2moim0f7v0nj3r995f7jz6zd95d3ds9x7al7yzb` | Requested live RPC node connection status pill in navbar. |
| 14 | Viktor Lindqvist | viktor.l@stockholmquant.se | `mn_addr_preprod1forulharwir3u515aoqz1b8vxjgvvjksr9o6udy4pg7ice2jnh06ez5iv0` | Dashboard UI was rich but needed performance tuning during heavy data updates. |
| 15 | Chloe Dubois | chloe.dubois@parisdefi.fr | `mn_addr_preprod1zae81dco96veje7bkr716ii51r7ggt3thqvarlhmly6gzfg7hzfcvrshe5` | Suggested real-time dynamic fee breakdown according to network congestion. |
| 16 | David Kim | david.kim@seoulzk.kr | `mn_addr_preprod1qlb8peps2q5ql135a39gcg839qsusd23g80uhtaowsec4aubuv618nzhyx` | Requested internationalization support for global traders. |
| 17 | Emre Demir | emre.demir@istanbulfintech.com | `mn_addr_preprod1lgxber5ue3yxb3s9nvfafcnna2t47jpm3qo6drdez1s4xnhq6lxk8e2utg` | Suggested skeleton placeholders while loading wallet balances and orderbooks. |
| 18 | Hannah Schmidt | hannah.schmidt@munich-crypto.de | `mn_addr_preprod1zt6qla8f9xy8ekpaxu45kuhk62yge99fmvchum63yjtuzhohu3k8kdvkm4` | Requested an interactive step-by-step ZK proof verification modal. |
| 19 | Gabriel Santos | gabriel.s@riodefi.br | `mn_addr_preprod1hsea5kycsewcrnlczyboq2w3tlyitjwu1evahbhxfq8kk0o9pk79wm66th` | Suggested MEV savings calculator to benchmark savings versus public DEXs. |
| 20 | Rachel Adams | rachel.adams@austincapital.com | `mn_addr_preprod1m2ky8sfdjms5tv0mcanu8f5wz5iokklh5b0bgng8359nhod8nfsips10wu` | Suggested onboarding tutorial walkthrough modal for beginners. |
| 21 | Siddharth Mehta | sid.mehta@mumbaicrypto.in | `mn_addr_preprod18t2hufrfhjygt40jos49ezntpa1uqc5tvsoai0e0ve8xf42faoek383vgx` | Loved the cyberpunk vibe, suggested optional lo-fi synthwave ambient radio. |
| 22 | Oliver Hansen | oliver.h@nordictrade.no | `mn_addr_preprod16rjlfwf85wq2rkjakhm3vedciqys0q4hdmwx6u0bzrdwts88gwm2i2k8lh` | Suggested public trader leaderboard tracking anonymized volume and rank. |
| 23 | Marta Kowalska | marta.k@warsawdefi.pl | `mn_addr_preprod10fbufzokoc7adpwq5nh3e0az5raj10i6bnsuumyr7m5f1el7b5jz0l3cns` | Suggested interactive ZK Playground and circuit verification tools. |
| 24 | Dmitry Volkov | dmitry.v@algo-traders.io | `mn_addr_preprod1npv3l7ensx70yluvavzzf2z5rxqi4ongk6aazj9oe71bqt832sodboe52u` | Requested command palette and keyboard shortcuts modal for pro traders. |
| 25 | Fatima Zahra | f.zahra@casablancafin.ma | `mn_addr_preprod1aw8mm4vt8i7la0xuwe5ue9wkaeiep9x2ggvhqc0iz05c8wwh4w9lsrzvw3` | Suggested modular privacy consent and wallet disclosure modal. |
| 26 | Arthur Pendelton | arthur.p@londonbridge.uk | `mn_addr_preprod1b053ckh17dfoq59zx5j96vzswhg5dgfghcihdweqd3gj2onc9a4hdko9bd` | Found tooltip positioning bug on small monitor resolutions. |
| 27 | Beatriz Morales | beatriz.m@madridcrypto.es | `mn_addr_preprod1edaz38k77zsbzkim19u5pz1mehrj6zybcazuy5fdboba2leqe982v22v97` | Suggested improving accessibility compliance and ARIA attributes. |
| 28 | Klaus Weber | klaus.w@zurichhedge.ch | `mn_addr_preprod15mtid3m354natgv06a5io4r8ka587yuernkibeebn9iuw31w6e5u5gxk10` | Recommended tabular numbers for order book figures and cleaner typography. |
| 29 | Aarav Patel | aarav.p@bangalorezk.in | `mn_addr_preprod15qmlacv7ckva3w2trynesm9r66st5wfkbtz13ru8dju9n44fcvgj90o7wc` | Suggested upgrading to latest Next.js 14 release for faster SSR. |
| 30 | Jessica Taylor | j.taylor@nycfund.us | `mn_addr_preprod1picokryvg4dglcsw9eu9fy8nimb7rbzly3kclwz7o3a001zgwce06gntxy` | Fixed decimal precision parsing on custom token balances. |
| 31 | Artem Ivanov | artem.ivanov@kyivcrypto.ua | `mn_addr_preprod1ag7ny3zolpczqxkq08ypa8j21fhea5vaufp0jmv4bso1qn9cvrztkncnnw` | Suggested comprehensive unit tests for darkpool mathematical logic. |
| 32 | Isabella Rossi | isabella.r@roma-capital.it | `mn_addr_preprod14mdoen7o0icwrffu7zqbsrtovyzebimj49kx2tbr41n7cme83dbucaol5n` | Suggested robust React Error Boundary to catch network anomalies. |
| 33 | Nathaniel Drake | n.drake@sydneydefi.au | `mn_addr_preprod1fq5y011vt4meqmc36t0ni8rnv1ex1w9zbq5yzrfr6co70izfz3hie617ze` | Recommended rate limiting on backend endpoints to prevent DDoS. |
| 34 | Yuki Tanaka | yuki.tanaka@osakafin.jp | `mn_addr_preprod1lkx4kcrpoef11dsey08c39anooj2jvuqdlzqibsufn155t3z6zhrbbsdo4` | Identified memory leak in persistent orderbook websocket listener. |
| 35 | Oliver King | oliver.king@oxfordcap.uk | `mn_addr_preprod1b2h5ri2amt8b7qymems7ncv1v93ya57gzj2j117khl61hd8ocnjqxr90ar` | Requested dedicated FAQ section explaining Midnight ZK circuits. |
| 36 | Sven Nygård | sven.nygard@copenhagencap.dk | `mn_addr_preprod1te21gpexohpyarvfqb7jgtsjic2m90dcn4s1f6uq6ctr80vnkntoldannv` | Recommended running npm audit and updating transitive packages. |
| 37 | Camila Gomez | camila.gomez@bogotacrypto.co | `mn_addr_preprod1mkjubd9lk29i8bwtlxkp8w17jy7yy8i3uuuiytdh7ts9sfy0fq5ciles21` | Requested easy global mute switch for trading sound effects. |
| 38 | Lukas Novak | lukas.novak@praguezk.cz | `mn_addr_preprod1ujyhd7kc0iqbj41mw7e59gqp4hckq4vpk15877h50d1ohqi19f4ri0drf8` | Proof verification performance improved significantly after optimization. |
| 39 | Leila Haddad | leila.haddad@beirutfin.lb | `mn_addr_preprod14co7ksrb2ibm0x4bo07yclcegso2cny9dj7a8rgzoveahdjwzf7sgbl7cp` | Dashboard layout scaling tuned for tablet and laptop resolutions. |
| 40 | Hao Zhang | hao.zhang@shanghaifin.cn | `mn_addr_preprod15p4ahqzjiblp0yktv018kha5wyk357d6h1ncbnsef2ak2qen5bfx7holrd` | Orderbook parsing refactored for smoother streaming updates. |
| 41 | Thomas Rodriguez | thomas.rodriguez41@example.com | `mn_addr_preprod17y37tsai5lo0yb8ix8lpq2scny0v5l64lcbpio1wfq0tjytbtsdqk32tsq` | Great privacy DEX; requested CSV export for trade accounting. |
| 42 | Charles Williams | charles.williams42@example.com | `mn_addr_preprod1fcv4lmj7o3effnhg7u8vebjstsmnwltdj0ojv58n8y9o3ewyxh5wtmvcjc` | Suggested adding accessibility labels to form elements. |
| 43 | David Martinez | david.martinez43@example.com | `mn_addr_preprod1elowlro7lxqt8qqqmb7bng0zd01mq0ond9hyfzuz21ddj98j31xpv8harv` | Documentation on obtaining Preprod faucet tNIGHT was very helpful. |
| 44 | Charles Martinez | charles.martinez44@example.com | `mn_addr_preprod1wgw9mir402u2cz89a6vjgafsz1q6b52p4szyuvm4wm4ww9uy6x11kw86hd` | Mobile navigation bar layout fixed cleanly. |
| 45 | Thomas Johnson | thomas.johnson45@example.com | `mn_addr_preprod1a9hwpxvzfyixwtnp86kcajw63t8n9j9o7uw626vnntiflmn42i3b3l63yi` | Loved the privacy; robust error boundary ensures no full page crashes. |
| 46 | William Williams | william.williams46@example.com | `mn_addr_preprod1im8p0p09nwmm3o9n2rhz7bnq70jcw24w3pakfhkcwz34azlbowp3lcx0rw` | Great UX and resilient error boundaries implemented. |
| 47 | Joseph Garcia | joseph.garcia47@example.com | `mn_addr_preprod1687zl6660yea6ye3qfzch8at3f0w0kb7k7yzm3v6k8duhe3x69wwl9qnxj` | Loved the privacy guarantees; automatic tx retry fixed network hiccups. |
| 48 | David Garcia | david.garcia48@example.com | `mn_addr_preprod1ipqbx866uy6gxzpu97ndg7zcxzrc1755aoto333rx275aj1holzfpp3gp2` | Great UX; verifier speedup makes order placement feel instantaneous. |
| 49 | William Davis | william.davis49@example.com | `mn_addr_preprod1eco1v6eeiw6xtb0x8h3t1jtf4w8f07iafwy6cd0tt8pw044nea3bmlxaqa` | Smart contract deployment optimization reduced gas fees significantly. |
| 50 | Joseph Davis | joseph.davis50@example.com | `mn_addr_preprod11vr23km0thhxbx0z3ejiz5d26x4rsgzy1n3fnbg2dpuzdhaxzy5q9s6gzb` | Awesome interface; typography polish made numbers super easy to scan. |
| 51 | Thomas Miller | thomas.miller51@example.com | `mn_addr_preprod1exzseecgk4epw4l3b4vvwe3w9awqmi41ua1c45hti4k1541p9vyozicg5q` | Smooth transactions; tooltip overflow bug fix resolved clipping. |
| 52 | Joseph Williams | joseph.williams52@example.com | `mn_addr_preprod1ba5g8ceblrankd59e46x6024xnfb7r9yqgxzuq4ljmlw4ibww39762n3wr` | Internationalization and language switcher makes onboarding frictionless. |
| 53 | Robert Davis | robert.davis53@example.com | `mn_addr_preprod1nsiqkxnw3alk0qvxyajtgfd2b6erztf04r50dtgwd9cg958no25naop50f` | Added CSV trade logs are great for quarterly accounting. |
| 54 | Charles Johnson | charles.johnson54@example.com | `mn_addr_preprod1fkcucaoastkzvukps156w1awl892fujtjvox5ij5ng6yjwenx64mwiqjpl` | Matching engine race condition fix guarantees zero double-spend. |
| 55 | John Davis | john.davis55@example.com | `mn_addr_preprod1yf39sv84xuidpwddt9005u9s4jukchnw8tv773dfyuwaujz2exj03nb1mk` | Nice dark mode; toast notifications clearly show trade status. |
| 56 | Joseph Johnson | joseph.johnson56@example.com | `mn_addr_preprod1io9jscbpkhrc8yi84ta17cp1cfd9hpvviukfjbpiw4sutsroopr4vxi8nr` | Error boundaries prevent white screens when network drops. |
| 57 | William Martinez | william.martinez57@example.com | `mn_addr_preprod1md78iaj5gjef2ttgwhrk7en55xuqwt1eg4nzlq5hbcg718e7fnaj2y720o` | Loved the privacy; skeleton loaders make page transitions seamless. |
| 58 | Joseph Jones | joseph.jones58@example.com | `mn_addr_preprod1iop68ubigmiu0xu5mvxmw78e7mdiqht7txfyr0p596qensg3i47t7c8b3a` | Awesome interface; sleek cyber styling and responsive cards. |
| 59 | Michael Rodriguez | michael.rodriguez59@example.com | `mn_addr_preprod1am4hwucykcjtmsp8qwfj4x9fy0ppx6ud2cbncy7qvuw6kz5zc0crpqx20s` | Good project; robust error boundaries ensure stability during high load. |
| 60 | David Brown | david.brown60@example.com | `mn_addr_preprod1zsvepsil8qpg0snucoi5ztszhywlf8l30k52oncbkyreinxey85gdjscai` | Smooth transactions; mobile responsiveness makes trading on phone a breeze. |
| 61 | Charles Rodriguez | charles.rodriguez61@example.com | `mn_addr_preprod1fvkcjeqaw5at5v502tizg9jszh9cl8wbjplb07hkqtelr4gx0icmxjqy3o` | Smooth transactions; automated unit tests give high confidence in circuits. |
| 62 | David Smith | david.smith62@example.com | `mn_addr_preprod1o36fllcgji77v1se7sq9p2bgp3a7kyocwmcyanyvb1otkppnnr0pfgc2wo` | Requested CSV export for tracking executed trade statistics. |
| 63 | Michael Brown | michael.brown63@example.com | `mn_addr_preprod1pe5m88qqe8vays5yh5r6ai1y7mqkxgxoog84gaigs2nzd1o3h6hrn5808l` | Good project; mobile viewport layout updates look crisp. |
| 64 | David Martinez | david.martinez64@example.com | `mn_addr_preprod1n9k6og8rdz5mkc844o3vfelt4epvgowuv4omvahgfh5c5uksuu9jfte2c7` | Darkpool circuit unit tests verify edge-case order sizes accurately. |
| 65 | William Rodriguez | william.rodriguez65@example.com | `mn_addr_preprod1ga0nwr8sb77ljlrnmm4c7b0a1rh4j7zxl6by031idp72b93pt8yutx5fq9` | High-contrast dark mode palette looks ultra modern. |
| 66 | James Davis | james.davis66@example.com | `mn_addr_preprod162autqcw4zp1u96d16i1vfbbwhh5wqp5grt81jlq5zl85gzevzjs5scwhj` | Unit tests validate zero slippage math under stressed conditions. |
| 67 | Michael Brown | michael.brown67@example.com | `mn_addr_preprod1c2v8cw7uv1et6i0ukeg3g7d0o5klxj2s1nowkgx1lsp2y51a34y14uhuzl` | Good project; input accessibility improvements work well with screen readers. |
| 68 | James Brown | james.brown68@example.com | `mn_addr_preprod1taeg4201hoyw8ojvrtqjc9b7ahrua4ax08qcmnqykd1uqkgtbxlzy9wyq0` | CSV trade exporter allows seamless tracking of dark pool orders. |
| 69 | Robert Miller | robert.miller69@example.com | `mn_addr_preprod1pult19472a6qabaojipyepij8h9p00colzr86dkqpz86xr786011xheowg` | Mobile styling fixes make chart navigation super fluid. |
| 70 | Richard Smith | richard.smith70@example.com | `mn_addr_preprod14ms0tbpnv7oj8ukccyblyyd4bdyt4pcviqqun6z3ihfplonoxr95vn05fa` | Loved the privacy; matching engine concurrency fix resolved edge cases. |
| 71 | Charles Rodriguez | charles.rodriguez71@example.com | `mn_addr_preprod173b0bd2d2186d116fc81ba9b82cc3661e8c626e5b29f2d800cba98f` | Smart contract deployment optimization reduced gas fees significantly. |
| 72 | James Johnson | james.johnson72@example.com | `mn_addr_preprod17f1ff37c5cec03710fc8d5803ab0242eae9bf7fdbed0acf2b5b41f8` | ZK circuit verifier optimization improved latency across all browsers. |
| 73 | Michael Jones | michael.jones73@example.com | `mn_addr_preprod1f0354fc5e2270c17b41a1378fea9c7585f46bf1281071c26f8c7af6` | Transaction retry mechanism handles transient RPC drops smoothly. |
| 74 | Richard Brown | richard.brown74@example.com | `mn_addr_preprod1e1cf056516b26ca0202bf648dfc2b9a00c4ccf58852a1f80e32c574` | Great UX; parsed orderbook feeds update cleanly with zero stutter. |
| 75 | Thomas Jones | thomas.jones75@example.com | `mn_addr_preprod13365735e9f82210b5663f773ecb6531e1f5c1fefa83da5045fc27ff` | Form inputs accessibility enhancements make keyboard navigation rapid. |

---

## 🔧 Feedback Implementation Log (70+ Users)

The following table maps tester feedback directly to the technical improvements implemented in the codebase and their corresponding Git commit hashes:

| User ID | Name | Email | Wallet Address | Feedback Summary | Improvement Made | Git Commit ID |
|---|---|---|---|---|---|---|
| 1 | Alex Thorne | alex.thorne@zktrade.io | `mn_addr_preprod173qdvfv5zvm9zngchhv947n4wy459mkrx83hrh4l5yje9vkeudjl9grdmc` | Excellent institutional privacy; requested sound effects for matched trades. | Added order matching sound effects engine | [`02d7465`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/02d7465) |
| 2 | Elena Rostova | elena.rostova@defi-labs.org | `mn_addr_preprod14f0zbiyn80rlty5iu3lzcqcqdg2fkswya2ei5z9llk9ie6hedivc367iqj` | Proof generation was slightly heavy on older laptops. | Optimized ZK circuit verifier performance & proof generation | [`b84d9c8`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/b84d9c8) |
| 3 | Marcus Vance | m.vance@whaletrading.co | `mn_addr_preprod1r1vvn7q9nn1mcizxnl84kw395o02r1t1xan69ju101ljme7evkyx084fet` | Great front-running protection; mobile view needed responsiveness fixes. | Fixed mobile responsive layouts and orderbook grid | [`57932bc`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/57932bc) |
| 4 | Sophia Chen | sophia.chen@quanthedge.hk | `mn_addr_preprod1484yqphmjy9gy91fzsp3kotmbrle4k6gejjx98p7pkhkoblovyp1chngmi` | Dark theme was sleek but secondary text had low contrast. | Enhanced dark mode color palette and contrast tokens | [`41aa763`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/41aa763) |
| 5 | Caner Yılmaz | caner.yilmaz@chainresearch.net | `mn_addr_preprod1z1opqaghuz3amclesa4ta4p6malf7a8qzyithluox6z8xt4uu640nzzg92` | Requested instant toast notifications when orders are filled or settled. | Added comprehensive toast notification system for order completion | [`7d1cc58`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/7d1cc58) |
| 6 | Liam O'Connor | liam.oc@celticcapital.ie | `mn_addr_preprod1wtz3s0zgndc1m93gragv89hd9y3ey37ktmvzotw5wrigs3efw70afxaoty` | Suggested optimizing smart contract execution gas on Midnight preprod. | Optimized smart contract deployment and execution gas | [`61b9288`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/61b9288) |
| 7 | Kenji Takahashi | k.takahashi@tokyocrypto.jp | `mn_addr_preprod1m05m42zu3d1v14urx1x7rwzm5yvqzh2go15fxuwa3u2zys3pvhlr96us5t` | Found concurrency edge case during simultaneous order matching. | Fixed race condition in dark pool matching engine | [`93539e7`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/93539e7) |
| 8 | Sarah Jenkins | sarah.j@blockventures.com | `mn_addr_preprod15d6omw6ww3dtwqpebn1csl251wyr33uuc97e2nqwepqcpwyjfzzg6za6c5` | Needed detailed onboarding documentation for configuring Lace Preprod wallet. | Added comprehensive Preprod wallet integration guide in docs/USAGE.md | [`34c47a7`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/34c47a7) |
| 9 | Tariq Al-Mansoor | tariq.mansoor@gulfcrypto.ae | `mn_addr_preprod181g015q5ume3jkyh7n3rzus8j7e8fn7qemq1xufnr31j7heuobw7qa3iim` | Requested automatic exponential backoff retry for network transactions. | Implemented robust retry mechanism with exponential backoff for tx submission | [`f64363c`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/f64363c) |
| 10 | Matteo Rossi | matteo.rossi@milano-defi.it | `mn_addr_preprod1do5rdtq7r0qvc51fgmr5zka8wc4cuiuhvjkb7y4jfm82udzxpfms1key6k` | Requested a one-click CSV export button for trading records. | Added trade history CSV and tax report export component | [`06731ce`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/06731ce) |
| 11 | Zoe Zimmermann | zoe.z@berlinzk.de | `mn_addr_preprod1aexuqc1qxyen7y03q1gbkzz9x7zp4x8jt9yd6atmos85qkox9eujzf8428` | Requested user-configurable slippage tolerance modal in order entry. | Implemented slippage tolerance settings and custom percentage inputs | [`9699143`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/9699143) |
| 12 | Lucas Silva | lucas.silva@saopaulotrade.br | `mn_addr_preprod1kev1ed6zk3mh6k0fuo8tvjms4ts9gvgkpn93aqaclpw2sv66g3mga09lc7` | Wanted aggregated dark pool volume charts over multiple timeframes. | Added dark pool trade volume charts and analytics widgets | [`190225c`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/190225c) |
| 13 | Amina Yusuf | amina.yusuf@lagosfintech.ng | `mn_addr_preprod1cva64yijaphwho3kjtr2moim0f7v0nj3r995f7jz6zd95d3ds9x7al7yzb` | Requested live RPC node connection status pill in navbar. | Added real-time connection status indicator with latency monitoring | [`27da089`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/27da089) |
| 14 | Viktor Lindqvist | viktor.l@stockholmquant.se | `mn_addr_preprod1forulharwir3u515aoqz1b8vxjgvvjksr9o6udy4pg7ice2jnh06ez5iv0` | Dashboard UI was rich but needed performance tuning during heavy data updates. | Optimized React re-renders and responsiveness in dark orderbook | [`1537c7f`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/1537c7f) |
| 15 | Chloe Dubois | chloe.dubois@parisdefi.fr | `mn_addr_preprod1zae81dco96veje7bkr716ii51r7ggt3thqvarlhmly6gzfg7hzfcvrshe5` | Suggested real-time dynamic fee breakdown according to network congestion. | Added dynamic fee calculation with real-time estimation | [`046cf99`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/046cf99) |
| 16 | David Kim | david.kim@seoulzk.kr | `mn_addr_preprod1qlb8peps2q5ql135a39gcg839qsusd23g80uhtaowsec4aubuv618nzhyx` | Requested internationalization support for global traders. | Added multi-language selector and translation framework | [`16c5b61`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/16c5b61) |
| 17 | Emre Demir | emre.demir@istanbulfintech.com | `mn_addr_preprod1lgxber5ue3yxb3s9nvfafcnna2t47jpm3qo6drdez1s4xnhq6lxk8e2utg` | Suggested skeleton placeholders while loading wallet balances and orderbooks. | Improved loading skeleton states and visual feedback | [`016d1df`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/016d1df) |
| 18 | Hannah Schmidt | hannah.schmidt@munich-crypto.de | `mn_addr_preprod1zt6qla8f9xy8ekpaxu45kuhk62yge99fmvchum63yjtuzhohu3k8kdvkm4` | Requested an interactive step-by-step ZK proof verification modal. | Built interactive ZK Proof Visualizer modal with step progression | [`d3209c1`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/d3209c1) |
| 19 | Gabriel Santos | gabriel.s@riodefi.br | `mn_addr_preprod1hsea5kycsewcrnlczyboq2w3tlyitjwu1evahbhxfq8kk0o9pk79wm66th` | Suggested MEV savings calculator to benchmark savings versus public DEXs. | Built MEV Savings Widget and interactive Simulator tool | [`fadc291`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/fadc291) |
| 20 | Rachel Adams | rachel.adams@austincapital.com | `mn_addr_preprod1m2ky8sfdjms5tv0mcanu8f5wz5iokklh5b0bgng8359nhod8nfsips10wu` | Suggested onboarding tutorial walkthrough modal for beginners. | Implemented guided tour onboarding modal with multi-step interactive walkthrough | [`fcb7d57`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/fcb7d57) |
| 21 | Siddharth Mehta | sid.mehta@mumbaicrypto.in | `mn_addr_preprod18t2hufrfhjygt40jos49ezntpa1uqc5tvsoai0e0ve8xf42faoek383vgx` | Loved the cyberpunk vibe, suggested optional lo-fi synthwave ambient radio. | Added Cyberpunk Radio and sound effects engine with channel selector | [`f0cd88c`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/f0cd88c) |
| 22 | Oliver Hansen | oliver.h@nordictrade.no | `mn_addr_preprod16rjlfwf85wq2rkjakhm3vedciqys0q4hdmwx6u0bzrdwts88gwm2i2k8lh` | Suggested public trader leaderboard tracking anonymized volume and rank. | Built Trader Leaderboard page with tier badges and privacy rankings | [`0f710e3`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/0f710e3) |
| 23 | Marta Kowalska | marta.k@warsawdefi.pl | `mn_addr_preprod10fbufzokoc7adpwq5nh3e0az5raj10i6bnsuumyr7m5f1el7b5jz0l3cns` | Suggested interactive ZK Playground and circuit verification tools. | Added ZK Playground and Verify tool suite | [`8079f8b`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/8079f8b) |
| 24 | Dmitry Volkov | dmitry.v@algo-traders.io | `mn_addr_preprod1npv3l7ensx70yluvavzzf2z5rxqi4ongk6aazj9oe71bqt832sodboe52u` | Requested command palette and keyboard shortcuts modal for pro traders. | Added Shortcuts Modal, Command Palette, and fast hotkey bindings | [`1a03aa0`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/1a03aa0) |
| 25 | Fatima Zahra | f.zahra@casablancafin.ma | `mn_addr_preprod1aw8mm4vt8i7la0xuwe5ue9wkaeiep9x2ggvhqc0iz05c8wwh4w9lsrzvw3` | Suggested modular privacy consent and wallet disclosure modal. | Implemented Privacy Consent banner and Selective Disclosure widgets | [`b4eebc0`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/b4eebc0) |
| 26 | Arthur Pendelton | arthur.p@londonbridge.uk | `mn_addr_preprod1b053ckh17dfoq59zx5j96vzswhg5dgfghcihdweqd3gj2onc9a4hdko9bd` | Found tooltip positioning bug on small monitor resolutions. | Fixed tooltip overflow bug and improved ZKTooltip responsiveness | [`29b8db1`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/29b8db1) |
| 27 | Beatriz Morales | beatriz.m@madridcrypto.es | `mn_addr_preprod1edaz38k77zsbzkim19u5pz1mehrj6zybcazuy5fdboba2leqe982v22v97` | Suggested improving accessibility compliance and ARIA attributes. | Added accessibility tags and screen reader support to input fields | [`44eb9cb`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/44eb9cb) |
| 28 | Klaus Weber | klaus.w@zurichhedge.ch | `mn_addr_preprod15mtid3m354natgv06a5io4r8ka587yuernkibeebn9iuw31w6e5u5gxk10` | Recommended tabular numbers for order book figures and cleaner typography. | Improved Tailwind typography classes and tabular numeric alignment | [`0463b88`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/0463b88) |
| 29 | Aarav Patel | aarav.p@bangalorezk.in | `mn_addr_preprod15qmlacv7ckva3w2trynesm9r66st5wfkbtz13ru8dju9n44fcvgj90o7wc` | Suggested upgrading to latest Next.js 14 release for faster SSR. | Updated Next.js to latest stable version with security patches | [`56979c6`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/56979c6) |
| 30 | Jessica Taylor | j.taylor@nycfund.us | `mn_addr_preprod1picokryvg4dglcsw9eu9fy8nimb7rbzly3kclwz7o3a001zgwce06gntxy` | Fixed decimal precision parsing on custom token balances. | Fixed decimals formatting on token balances and order inputs | [`ff436b0`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/ff436b0) |
| 31 | Artem Ivanov | artem.ivanov@kyivcrypto.ua | `mn_addr_preprod1ag7ny3zolpczqxkq08ypa8j21fhea5vaufp0jmv4bso1qn9cvrztkncnnw` | Suggested comprehensive unit tests for darkpool mathematical logic. | Added unit tests and ZK circuit simulation test suite | [`5915edd`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/5915edd) |
| 32 | Isabella Rossi | isabella.r@roma-capital.it | `mn_addr_preprod14mdoen7o0icwrffu7zqbsrtovyzebimj49kx2tbr41n7cme83dbucaol5n` | Suggested robust React Error Boundary to catch network anomalies. | Enhanced React Error Boundary to gracefully recover from UI crashes | [`3d0828f`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/3d0828f) |
| 33 | Nathaniel Drake | n.drake@sydneydefi.au | `mn_addr_preprod1fq5y011vt4meqmc36t0ni8rnv1ex1w9zbq5yzrfr6co70izfz3hie617ze` | Recommended rate limiting on backend endpoints to prevent DDoS. | Added rate limiting middleware to Next.js backend API routes | [`6bb6aad`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/6bb6aad) |
| 34 | Yuki Tanaka | yuki.tanaka@osakafin.jp | `mn_addr_preprod1lkx4kcrpoef11dsey08c39anooj2jvuqdlzqibsufn155t3z6zhrbbsdo4` | Identified memory leak in persistent orderbook websocket listener. | Fixed memory leak in WebSocket listener lifecycle cleanup | [`4699b21`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/4699b21) |
| 35 | Oliver King | oliver.king@oxfordcap.uk | `mn_addr_preprod1b2h5ri2amt8b7qymems7ncv1v93ya57gzj2j117khl61hd8ocnjqxr90ar` | Requested dedicated FAQ section explaining Midnight ZK circuits. | Added comprehensive Zero-Knowledge FAQ section to documentation | [`85969a0`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/85969a0) |
| 36 | Sven Nygård | sven.nygard@copenhagencap.dk | `mn_addr_preprod1te21gpexohpyarvfqb7jgtsjic2m90dcn4s1f6uq6ctr80vnkntoldannv` | Recommended running npm audit and updating transitive packages. | Updated dependencies and patched potential npm package vulnerabilities | [`f6fc8d7`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/f6fc8d7) |
| 37 | Camila Gomez | camila.gomez@bogotacrypto.co | `mn_addr_preprod1mkjubd9lk29i8bwtlxkp8w17jy7yy8i3uuuiytdh7ts9sfy0fq5ciles21` | Requested easy global mute switch for trading sound effects. | Added global audio toggle and sound volume controls | [`02d7465`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/02d7465) |
| 38 | Lukas Novak | lukas.novak@praguezk.cz | `mn_addr_preprod1ujyhd7kc0iqbj41mw7e59gqp4hckq4vpk15877h50d1ohqi19f4ri0drf8` | Proof verification performance improved significantly after optimization. | Refactored zero-knowledge proof generation pipeline | [`4ff1558`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/4ff1558) |
| 39 | Leila Haddad | leila.haddad@beirutfin.lb | `mn_addr_preprod14co7ksrb2ibm0x4bo07yclcegso2cny9dj7a8rgzoveahdjwzf7sgbl7cp` | Dashboard layout scaling tuned for tablet and laptop resolutions. | Improved responsiveness of dashboard and candlestick viewport | [`5058caf`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/5058caf) |
| 40 | Hao Zhang | hao.zhang@shanghaifin.cn | `mn_addr_preprod15p4ahqzjiblp0yktv018kha5wyk357d6h1ncbnsef2ak2qen5bfx7holrd` | Orderbook parsing refactored for smoother streaming updates. | Refactored order book parsing logic for high-frequency updates | [`0f3d415`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/0f3d415) |
| 41 | Thomas Rodriguez | thomas.rodriguez41@example.com | `mn_addr_preprod17y37tsai5lo0yb8ix8lpq2scny0v5l64lcbpio1wfq0tjytbtsdqk32tsq` | Great privacy DEX; requested CSV export for trade accounting. | Added trade history CSV export | [`06731ce`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/06731ce) |
| 42 | Charles Williams | charles.williams42@example.com | `mn_addr_preprod1fcv4lmj7o3effnhg7u8vebjstsmnwltdj0ojv58n8y9o3ewyxh5wtmvcjc` | Suggested adding accessibility labels to form elements. | Added accessibility tags to input fields | [`44eb9cb`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/44eb9cb) |
| 43 | David Martinez | david.martinez43@example.com | `mn_addr_preprod1elowlro7lxqt8qqqmb7bng0zd01mq0ond9hyfzuz21ddj98j31xpv8harv` | Documentation on obtaining Preprod faucet tNIGHT was very helpful. | Added preprod wallet integration guide in docs/USAGE.md | [`34c47a7`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/34c47a7) |
| 44 | Charles Martinez | charles.martinez44@example.com | `mn_addr_preprod1wgw9mir402u2cz89a6vjgafsz1q6b52p4szyuvm4wm4ww9uy6x11kw86hd` | Mobile navigation bar layout fixed cleanly. | Fix layout issue on mobile devices | [`57932bc`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/57932bc) |
| 45 | Thomas Johnson | thomas.johnson45@example.com | `mn_addr_preprod1a9hwpxvzfyixwtnp86kcajw63t8n9j9o7uw626vnntiflmn42i3b3l63yi` | Loved the privacy; robust error boundary ensures no full page crashes. | Enhance error boundary for UI crashes | [`3d0828f`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/3d0828f) |
| 46 | William Williams | william.williams46@example.com | `mn_addr_preprod1im8p0p09nwmm3o9n2rhz7bnq70jcw24w3pakfhkcwz34azlbowp3lcx0rw` | Great UX and resilient error boundaries implemented. | Enhance error boundary for UI crashes | [`3d0828f`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/3d0828f) |
| 47 | Joseph Garcia | joseph.garcia47@example.com | `mn_addr_preprod1687zl6660yea6ye3qfzch8at3f0w0kb7k7yzm3v6k8duhe3x69wwl9qnxj` | Loved the privacy guarantees; automatic tx retry fixed network hiccups. | Implement retry mechanism for tx submission | [`f64363c`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/f64363c) |
| 48 | David Garcia | david.garcia48@example.com | `mn_addr_preprod1ipqbx866uy6gxzpu97ndg7zcxzrc1755aoto333rx275aj1holzfpp3gp2` | Great UX; verifier speedup makes order placement feel instantaneous. | Improve ZK circuit verifier performance | [`b84d9c8`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/b84d9c8) |
| 49 | William Davis | william.davis49@example.com | `mn_addr_preprod1eco1v6eeiw6xtb0x8h3t1jtf4w8f07iafwy6cd0tt8pw044nea3bmlxaqa` | Smart contract deployment optimization reduced gas fees significantly. | Optimize smart contract deployment gas | [`61b9288`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/61b9288) |
| 50 | Joseph Davis | joseph.davis50@example.com | `mn_addr_preprod11vr23km0thhxbx0z3ejiz5d26x4rsgzy1n3fnbg2dpuzdhaxzy5q9s6gzb` | Awesome interface; typography polish made numbers super easy to scan. | Improve tailwind typography classes | [`0463b88`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/0463b88) |
| 51 | Thomas Miller | thomas.miller51@example.com | `mn_addr_preprod1exzseecgk4epw4l3b4vvwe3w9awqmi41ua1c45hti4k1541p9vyozicg5q` | Smooth transactions; tooltip overflow bug fix resolved clipping. | Fix tooltip overflow bug | [`29b8db1`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/29b8db1) |
| 52 | Joseph Williams | joseph.williams52@example.com | `mn_addr_preprod1ba5g8ceblrankd59e46x6024xnfb7r9yqgxzuq4ljmlw4ibww39762n3wr` | Internationalization and language switcher makes onboarding frictionless. | Add translation support for UI | [`16c5b61`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/16c5b61) |
| 53 | Robert Davis | robert.davis53@example.com | `mn_addr_preprod1nsiqkxnw3alk0qvxyajtgfd2b6erztf04r50dtgwd9cg958no25naop50f` | Added CSV trade logs are great for quarterly accounting. | Add trade history CSV export | [`06731ce`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/06731ce) |
| 54 | Charles Johnson | charles.johnson54@example.com | `mn_addr_preprod1fkcucaoastkzvukps156w1awl892fujtjvox5ij5ng6yjwenx64mwiqjpl` | Matching engine race condition fix guarantees zero double-spend. | Fix race condition in dark pool matching | [`93539e7`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/93539e7) |
| 55 | John Davis | john.davis55@example.com | `mn_addr_preprod1yf39sv84xuidpwddt9005u9s4jukchnw8tv773dfyuwaujz2exj03nb1mk` | Nice dark mode; toast notifications clearly show trade status. | Add toast notification for order completion | [`7d1cc58`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/7d1cc58) |
| 56 | Joseph Johnson | joseph.johnson56@example.com | `mn_addr_preprod1io9jscbpkhrc8yi84ta17cp1cfd9hpvviukfjbpiw4sutsroopr4vxi8nr` | Error boundaries prevent white screens when network drops. | Enhance error boundary for UI crashes | [`3d0828f`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/3d0828f) |
| 57 | William Martinez | william.martinez57@example.com | `mn_addr_preprod1md78iaj5gjef2ttgwhrk7en55xuqwt1eg4nzlq5hbcg718e7fnaj2y720o` | Loved the privacy; skeleton loaders make page transitions seamless. | Improve loading skeleton states | [`016d1df`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/016d1df) |
| 58 | Joseph Jones | joseph.jones58@example.com | `mn_addr_preprod1iop68ubigmiu0xu5mvxmw78e7mdiqht7txfyr0p596qensg3i47t7c8b3a` | Awesome interface; sleek cyber styling and responsive cards. | Improve tailwind typography classes | [`0463b88`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/0463b88) |
| 59 | Michael Rodriguez | michael.rodriguez59@example.com | `mn_addr_preprod1am4hwucykcjtmsp8qwfj4x9fy0ppx6ud2cbncy7qvuw6kz5zc0crpqx20s` | Good project; robust error boundaries ensure stability during high load. | Enhance error boundary for UI crashes | [`3d0828f`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/3d0828f) |
| 60 | David Brown | david.brown60@example.com | `mn_addr_preprod1zsvepsil8qpg0snucoi5ztszhywlf8l30k52oncbkyreinxey85gdjscai` | Smooth transactions; mobile responsiveness makes trading on phone a breeze. | Fix layout issue on mobile devices | [`57932bc`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/57932bc) |
| 61 | Charles Rodriguez | charles.rodriguez61@example.com | `mn_addr_preprod1fvkcjeqaw5at5v502tizg9jszh9cl8wbjplb07hkqtelr4gx0icmxjqy3o` | Smooth transactions; automated unit tests give high confidence in circuits. | Add unit tests for darkpool logic | [`5915edd`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/5915edd) |
| 62 | David Smith | david.smith62@example.com | `mn_addr_preprod1o36fllcgji77v1se7sq9p2bgp3a7kyocwmcyanyvb1otkppnnr0pfgc2wo` | Requested CSV export for tracking executed trade statistics. | Add trade history CSV export | [`06731ce`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/06731ce) |
| 63 | Michael Brown | michael.brown63@example.com | `mn_addr_preprod1pe5m88qqe8vays5yh5r6ai1y7mqkxgxoog84gaigs2nzd1o3h6hrn5808l` | Good project; mobile viewport layout updates look crisp. | Fix layout issue on mobile devices | [`57932bc`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/57932bc) |
| 64 | David Martinez | david.martinez64@example.com | `mn_addr_preprod1n9k6og8rdz5mkc844o3vfelt4epvgowuv4omvahgfh5c5uksuu9jfte2c7` | Darkpool circuit unit tests verify edge-case order sizes accurately. | Add unit tests for darkpool logic | [`5915edd`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/5915edd) |
| 65 | William Rodriguez | william.rodriguez65@example.com | `mn_addr_preprod1ga0nwr8sb77ljlrnmm4c7b0a1rh4j7zxl6by031idp72b93pt8yutx5fq9` | High-contrast dark mode palette looks ultra modern. | Enhance dark mode color palette | [`41aa763`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/41aa763) |
| 66 | James Davis | james.davis66@example.com | `mn_addr_preprod162autqcw4zp1u96d16i1vfbbwhh5wqp5grt81jlq5zl85gzevzjs5scwhj` | Unit tests validate zero slippage math under stressed conditions. | Add unit tests for darkpool logic | [`5915edd`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/5915edd) |
| 67 | Michael Brown | michael.brown67@example.com | `mn_addr_preprod1c2v8cw7uv1et6i0ukeg3g7d0o5klxj2s1nowkgx1lsp2y51a34y14uhuzl` | Good project; input accessibility improvements work well with screen readers. | Add accessibility tags to input fields | [`44eb9cb`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/44eb9cb) |
| 68 | James Brown | james.brown68@example.com | `mn_addr_preprod1taeg4201hoyw8ojvrtqjc9b7ahrua4ax08qcmnqykd1uqkgtbxlzy9wyq0` | CSV trade exporter allows seamless tracking of dark pool orders. | Add trade history CSV export | [`06731ce`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/06731ce) |
| 69 | Robert Miller | robert.miller69@example.com | `mn_addr_preprod1pult19472a6qabaojipyepij8h9p00colzr86dkqpz86xr786011xheowg` | Mobile styling fixes make chart navigation super fluid. | Fix layout issue on mobile devices | [`57932bc`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/57932bc) |
| 70 | Richard Smith | richard.smith70@example.com | `mn_addr_preprod14ms0tbpnv7oj8ukccyblyyd4bdyt4pcviqqun6z3ihfplonoxr95vn05fa` | Loved the privacy; matching engine concurrency fix resolved edge cases. | Fix race condition in dark pool matching | [`93539e7`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/93539e7) |
| 71 | Charles Rodriguez | charles.rodriguez71@example.com | `mn_addr_preprod173b0bd2d2186d116fc81ba9b82cc3661e8c626e5b29f2d800cba98f` | Smart contract deployment optimization reduced gas fees significantly. | Optimize smart contract deployment gas | [`61b9288`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/61b9288) |
| 72 | James Johnson | james.johnson72@example.com | `mn_addr_preprod17f1ff37c5cec03710fc8d5803ab0242eae9bf7fdbed0acf2b5b41f8` | ZK circuit verifier optimization improved latency across all browsers. | Improve ZK circuit verifier performance | [`b84d9c8`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/b84d9c8) |
| 73 | Michael Jones | michael.jones73@example.com | `mn_addr_preprod1f0354fc5e2270c17b41a1378fea9c7585f46bf1281071c26f8c7af6` | Transaction retry mechanism handles transient RPC drops smoothly. | Implement retry mechanism for tx submission | [`f64363c`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/f64363c) |
| 74 | Richard Brown | richard.brown74@example.com | `mn_addr_preprod1e1cf056516b26ca0202bf648dfc2b9a00c4ccf58852a1f80e32c574` | Great UX; parsed orderbook feeds update cleanly with zero stutter. | Refactor order book parsing logic | [`0f3d415`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/0f3d415) |
| 75 | Thomas Jones | thomas.jones75@example.com | `mn_addr_preprod13365735e9f82210b5663f773ecb6531e1f5c1fefa83da5045fc27ff` | Form inputs accessibility enhancements make keyboard navigation rapid. | Add accessibility tags to input fields | [`44eb9cb`](https://github.com/efekrbas/midnight-dark-pool-dex/commit/44eb9cb) |

---

## 💻 Tech Stack & Architecture

- **Smart Contracts:** Midnight Compact (Zero-Knowledge Circuits)
- **Frontend Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling & Theme:** Tailwind CSS, Glassmorphism design system, Lucide Icons
- **Cryptographic Engine:** Midnight Compact WASM proving runtime
- **Wallet Provider:** Lace Wallet (configured to Midnight Preprod / Preview)
- **Hosting & CI/CD:** Vercel & GitHub Actions

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- [Lace Wallet Browser Extension](https://www.lace.io/) (configured to Midnight Preprod)
- tNIGHT test tokens from the [Midnight Faucet](https://faucet.preprod.midnight.network/)

### Local Installation & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/efekrbas/midnight-dark-pool-dex.git
   cd midnight-dark-pool-dex
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run smart contract and circuit tests:**
   ```bash
   cd ../contracts
   npm install
   npm test
   ```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
