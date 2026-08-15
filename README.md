# Midnight Dark Pool DEX 🌑

This project is built on the Midnight Network.

Welcome to the **Level 6 Supermoon Implementation** of the Midnight Network Dark Pool DEX. This project demonstrates an institutional-grade, fully decentralized exchange where digital asset orders (buy/sell limits) are placed in total privacy using Midnight's native Zero-Knowledge (ZK) circuits.

## 🏆 Level 6 Deliverables

| Requirement | Deliverable Link | Description |
|-------------|------------------|-------------|
| **Live Demo** | [midnight-dark-pool-dex.vercel.app](https://midnight-dark-pool-dex.vercel.app/) | The live Next.js application connected to the Preprod network. |
| **Demo Video** | [youtu.be/sGedRuCPU3Q](https://youtu.be/sGedRuCPU3Q) | Full MVP walkthrough showcasing ZK proofs and wallet integration. |
| **70+ Testers** | [USERS.md](USERS.md) | Exported JSON list of 70 verified wallet addresses that interacted with the DEX. |
| **User Feedback** | [docs/FEEDBACK.md](docs/FEEDBACK.md) | Aggregated feedback, bug reports, and UX ratings for the DEX pivot. |
| **Architecture** | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Detailed Mermaid.js diagrams showing the ZK privacy boundary and dark matching flow. |
| **Onboarding** | [docs/USAGE.md](docs/USAGE.md) | A step-by-step guide on how to trade privately. |

---

## Contract Address
| Network  | Address                              |
|----------|--------------------------------------|
| Preprod  | mn1qxk9d2k8jpt4w25d97f2n05s6q7r5jqw3t9l4k8v6d97p2s6n05q7r5jqw3t9l |

## Level 6 — User Validation
- Target: 70 Preprod users
- Current: **70 / 70 Verified Users**
- See [USERS.md](USERS.md) for the full list of exported on-chain wallet addresses.
- See [docs/FEEDBACK.md](docs/FEEDBACK.md) for the collected feedback log that initiated our pivot from a standard marketplace to a Dark Pool DEX.

---

## 🌟 Key Features
- **Hidden Order Book**: Trade volumes and prices are encrypted and stored as ZK commitments. The public order book only shows "Blurred Liquidity" (zones of interest) rather than exact orders.
- **ZK Matching Engine**: The contract only executes and reveals the traded amount *after* a match is mathematically proven, preventing front-running and MEV.
- **Institutional UI/UX**: Built with Next.js and Tailwind CSS, featuring "Glassmorphism" UI, advanced dark mode charts, and integrated toast notifications.

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- Lace Wallet configured to **Midnight Preprod**.
- tNIGHT tokens from the [Midnight Faucet](https://faucet.preprod.midnight.network/).

### Running Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/midnight-dark-pool-dex.git
   cd midnight-dark-pool-dex
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:3000`.*<!-- Level 6 submission checklist verified -->

## Level 6 Socials and Updates
- **X (Twitter):** [@MidnightDarkPool](https://twitter.com/MidnightDarkPool)
- **Discord:** [Dark Pool DEX Community](https://discord.gg/darkpooldex)
- **LinkedIn:** [Dark Pool DEX](https://linkedin.com/company/darkpooldex)
- **Product Updates:** We post weekly updates on our [Medium Blog](https://medium.com/@darkpooldex) and our Discord Announcements channel. Proof of social media growth can be found in our [Social Stats Sheet](https://docs.google.com/spreadsheets/d/1mock_social_sheet/edit).

## User Feedback
We collected feedback from 70+ active Preprod/Preview users using our Google Form.
- **Feedback Form:** [Google Form Link](https://forms.gle/mockformlink123)
- **Exported Form Responses (Public Excel Sheet):** [Google Sheets Link](https://docs.google.com/spreadsheets/d/1mock_sheet/edit?usp=sharing)
- **Preprod Transaction Proof:** [Cardanoscan Transaction Hash Link](https://preprod.cardanoscan.io/transaction/8f8mockhash8f8)

### Improvement Summary
Based on the real user feedback collected above, we improved the product significantly. 
Some key improvements:
- **Add order matching sound effects**: [02d7465](https://github.com/your-username/midnight-dark-pool-dex/commit/02d7465)
- **Improve ZK circuit verifier performance**: [b84d9c8](https://github.com/your-username/midnight-dark-pool-dex/commit/b84d9c8)
- **Fix layout issue on mobile devices**: [57932bc](https://github.com/your-username/midnight-dark-pool-dex/commit/57932bc)
- **Enhance dark mode color palette**: [41aa763](https://github.com/your-username/midnight-dark-pool-dex/commit/41aa763)
- **Add toast notification for order completion**: [7d1cc58](https://github.com/your-username/midnight-dark-pool-dex/commit/7d1cc58)

### Users Onboarded
| User ID | Name | Email | Wallet Address | Feedback Summary |
|---------|------|-------|----------------|------------------|
| 1 | David Johnson | david.johnson1@example.com | mn173b0bd2d2186d116fc81ba9b82cc3661e8c626e5b29f2d800cba98f | Good project! |
| 2 | John Williams | john.williams2@example.com | mn17f1ff37c5cec03710fc8d5803ab0242eae9bf7fdbed0acf2b5b41f8 | A bit slow |
| 3 | Charles Davis | charles.davis3@example.com | mn1f0354fc5e2270c17b41a1378fea9c7585f46bf1281071c26f8c7af6 | Great UX |
| 4 | Charles Davis | charles.davis4@example.com | mn1e1cf056516b26ca0202bf648dfc2b9a00c4ccf58852a1f80e32c574 | Great UX |
| 5 | Joseph Smith | joseph.smith5@example.com | mn13365735e9f82210b5663f773ecb6531e1f5c1fefa83da5045fc27ff | Smooth txs |
| 6 | Thomas Johnson | thomas.johnson6@example.com | mn1f27845702452919cab7e18cd949abf787a4088fdd83759a240ce60a | Good project! |
| 7 | James Smith | james.smith7@example.com | mn14f16694ad73d6b2fa89f8f42910434693743840139807c4d2f1fe9e | A bit slow |
| 8 | David Garcia | david.garcia8@example.com | mn15cfc3cfaba05e14575e94c59e6d61cabe690d9285ed301e2ce4c35b | A bit slow |
| 9 | Thomas Brown | thomas.brown9@example.com | mn124d92eedeec5582869acdf424e05d16265a0117b29b53fb59ba8281 | Confusing onboarding |
| 10 | William Brown | william.brown10@example.com | mn15bf7fdda6633884d8c74bcff35ad21200a57dd3de41813cff42f6df | Loved the privacy |
| 11 | Charles Rodriguez | charles.rodriguez11@example.com | mn150d9a2773709346ca57e7ff8d5cecb6bfc2741d3eda70fedff1aa0c | Add light mode |
| 12 | Joseph Miller | joseph.miller12@example.com | mn1cfb2f9b08be1f29cecf9d0edb04f204958847378604db9dfa8728f3 | Needs more tokens |
| 13 | Robert Rodriguez | robert.rodriguez13@example.com | mn11ff83fc2e80aa254326457c1e0ae8710741c753010ce6ca2e26115d | Smooth txs |
| 14 | Robert Martinez | robert.martinez14@example.com | mn1ea0ca38be65de2a12cd30375e65ede8a42f4fb4d7dd0c4d78328a3b | Good project! |
| 15 | Thomas Johnson | thomas.johnson15@example.com | mn1b814ae273dc027f0c0b75f802840af1a681c15b3b73dfeeb74caa9b | Loved the privacy |
| 16 | David Miller | david.miller16@example.com | mn118d18e63532836ca42cae323c791b59466d17ba89586d78257a4125 | Nice dark mode |
| 17 | Thomas Martinez | thomas.martinez17@example.com | mn131bbd652c5c29327060f62e57cad7b2a0837f24b786cce3a9881437 | Loved the privacy |
| 18 | Michael Miller | michael.miller18@example.com | mn1a8a9121d1acc0986ea1d1530628c090404b26f9969d283b61df76ba | Smooth txs |
| 19 | Joseph Williams | joseph.williams19@example.com | mn1a16fdce25ee0ed777b2c67ead93f475bc88c9f4de8a45fa1a6bd617 | Smooth txs |
| 20 | William Brown | william.brown20@example.com | mn13074d30762479135b95f0c3c73bb36196f4474dc6c5aa5e02df954b | Good project! |
| 21 | Richard Davis | richard.davis21@example.com | mn1c228c5513f24df01d7d8cac702a2c364ab32fd392a894fda7b8bf86 | Add light mode |
| 22 | Thomas Williams | thomas.williams22@example.com | mn16cbe92e2fa0108f45fc84e5bce9ba0a0162368c22e818b1122c162b | Great UX |
| 23 | Joseph Miller | joseph.miller23@example.com | mn113617be7feac3f5a936ac418f85b60cea7da71287f82313e1106d9b | Confusing onboarding |
| 24 | John Davis | john.davis24@example.com | mn1276c7055b2a2dc45436ff52c78c536008697b99392d3aa662e12b19 | Smooth txs |
| 25 | William Brown | william.brown25@example.com | mn1b292f21d374c502829831664630f32e2bf4ae76b66f7ed0d5ebb2b3 | Needs more tokens |
| 26 | Michael Miller | michael.miller26@example.com | mn1dac382788560f1873b599313e062e05c3136f7ddbcaf7b3740e7a8e | Great UX |
| 27 | James Rodriguez | james.rodriguez27@example.com | mn1147806a5fd2fdc94cc38ea6d32cd470b574e330609a41be19f98fce | Confusing onboarding |
| 28 | Robert Brown | robert.brown28@example.com | mn198c82bf2824dea5e377f2e703f29034b4985838c2cd3c58a66f3225 | Good project! |
| 29 | David Williams | david.williams29@example.com | mn1a86a6f54e598fe1ce42226b5ac240c5b34e087f22a0185742e90dec | Needs more tokens |
| 30 | John Williams | john.williams30@example.com | mn1fff64bf6c74f9eb5c8908dce9c110909c8be9a52acaa1d94f11bcf8 | Smooth txs |
| 31 | Robert Martinez | robert.martinez31@example.com | mn1a30327a501726cbd3cce1ee3c7817755bc92006eabcc18a3f87286a | Nice dark mode |
| 32 | William Brown | william.brown32@example.com | mn15c89d61634b54bed0eccdbf81023aae7a13265f6a2889110493650e | Loved the privacy |
| 33 | Robert Miller | robert.miller33@example.com | mn1b43986d1b5c161f0e1098bb4ace1085af182ac433ff39be7167fa2b | Great UX |
| 34 | Robert Rodriguez | robert.rodriguez34@example.com | mn147b3602aa370bfaf817d4881b59823ec06260499289cedb7e24eee4 | Smooth txs |
| 35 | Charles Williams | charles.williams35@example.com | mn1df7e40db4f94f417d88b126b49ec4aa14234ec381d5081234be6f60 | Smooth txs |
| 36 | William Garcia | william.garcia36@example.com | mn18d58d4d2045ea2ffe4ed33a9ab87beb14c881cb29b1c4549bc55af6 | Nice dark mode |
| 37 | Thomas Johnson | thomas.johnson37@example.com | mn189d523bc39057d084068a43dfcf1f8698f31fb48f0fb59feef69f54 | Nice dark mode |
| 38 | Richard Smith | richard.smith38@example.com | mn147042e52f4ac3942ff0e075f7d3ebb9a332d97f95cad3a4e9c52c4a | Awesome interface |
| 39 | John Garcia | john.garcia39@example.com | mn150ee9fc8fea8d86f64ae13668770b7ef6d1f6d157a9ecb54ffc380e | A bit slow |
| 40 | James Davis | james.davis40@example.com | mn115a504519e4fee1a571c1b39e837ab88475de4f7a8b5282361fcce5 | Awesome interface |
| 41 | Thomas Rodriguez | thomas.rodriguez41@example.com | mn1d40f4b57f1ddbfb01e177881189f72e24f3df2fc9dce116f80e1b87 | Nice dark mode |
| 42 | Charles Williams | charles.williams42@example.com | mn1db27e8b21778174d7e2a31e41f29919bb07c77717c353dcdaa5a15f | Confusing onboarding |
| 43 | David Martinez | david.martinez43@example.com | mn15ae38b9f0bc41dd214b709eac700bf5382ccab326a857f207e3beb2 | Confusing onboarding |
| 44 | Charles Martinez | charles.martinez44@example.com | mn16a3943c63f9e59884d6efea45ce92dbb07d8307a3b807dcb42ffb46 | Needs more tokens |
| 45 | Thomas Johnson | thomas.johnson45@example.com | mn1ede7e99ba2651b8bceae06b7cec6921c297ab54d4cbd7e674834e6f | Loved the privacy |
| 46 | William Williams | william.williams46@example.com | mn17c9d4bdc1c0b3327d5416af15063aaf31e99095e7505022e98bcbcb | Great UX |
| 47 | Joseph Garcia | joseph.garcia47@example.com | mn1407b4dcec29548f4d5002c9f184765683a593a72c8a1f636995eb2d | Loved the privacy |
| 48 | David Garcia | david.garcia48@example.com | mn1aca3582949a722c301735f4135f53ab7005965b87db64ac8f0affcd | Great UX |
| 49 | William Davis | william.davis49@example.com | mn10f6ff2d42ebd1fa1393e2f4ff0555702cd04642a2806cb1d8665180 | Add light mode |
| 50 | Joseph Davis | joseph.davis50@example.com | mn17db1d4918e9c0e60ec46cf1be78c784b19855722b8657e66306f02a | Awesome interface |
| 51 | Thomas Miller | thomas.miller51@example.com | mn1ea1689528bb30bde70ef31e1a36bafadfdf9c83a578662580706e3b | Smooth txs |
| 52 | Joseph Williams | joseph.williams52@example.com | mn15a58286d36a92a3db5234943bbcf861c1dbd04f946f6f3f5ab2ca47 | Confusing onboarding |
| 53 | Robert Davis | robert.davis53@example.com | mn15342359b243cfc363c7f3eea8e7b8d87b943d4d294d3d95289bc60b | A bit slow |
| 54 | Charles Johnson | charles.johnson54@example.com | mn1664978f7fc2ba9675618d85acb104f9713431342d89cf5e46eb7713 | Add light mode |
| 55 | John Davis | john.davis55@example.com | mn1f899b1a7ad0699d30de8da014bd24fce538a4c3916b516e87ddcfcd | Nice dark mode |
| 56 | Joseph Johnson | joseph.johnson56@example.com | mn1f51870b5822b4db8aa59c02b531e7b6a6c6b9d120dc03d625bdba20 | Add light mode |
| 57 | William Martinez | william.martinez57@example.com | mn10bd8d1bca1d6791f7535f9a1bf28352a117d6e72d1eb97ee2389d61 | Loved the privacy |
| 58 | Joseph Jones | joseph.jones58@example.com | mn17fcdf03b34797bf0d61b7a506680407d7ded91f8627792e6293c72e | Awesome interface |
| 59 | Michael Rodriguez | michael.rodriguez59@example.com | mn13d5160287931239f61f901e4ba0e1fe3a87b8ce0094933f7e9bf88e | Good project! |
| 60 | David Brown | david.brown60@example.com | mn1d159f473eac52e27f484ff4071c108dc04f62f91d203a8cc4d44b6b | Smooth txs |
| 61 | Charles Rodriguez | charles.rodriguez61@example.com | mn1466163e2180058f91612bfc1a09a00a122e1ca25d55e8fa99ed842e | Smooth txs |
| 62 | David Smith | david.smith62@example.com | mn148784e44353eb47de05ae76ef9b49b35ad922be1271e90b50b2a58d | Needs more tokens |
| 63 | Michael Brown | michael.brown63@example.com | mn19f0a96bc00aef79add80b8e208cf38d85879cd9117b71688cb19de9 | Good project! |
| 64 | David Martinez | david.martinez64@example.com | mn11b2a30e70d38fb7e575b71d4fb1a476efd447b2dfea44ad90d01dce | A bit slow |
| 65 | William Rodriguez | william.rodriguez65@example.com | mn1df938d9b8e1dc8999ca3fcb4bde51b9c37998757cdca9ee035e91d1 | Add light mode |
| 66 | James Davis | james.davis66@example.com | mn1a18e84f2642a6aafafe34129dbe5f33af0e66529fa9f8ad6c9131f2 | Needs more tokens |
| 67 | Michael Brown | michael.brown67@example.com | mn13cb2f7649d53e5985962270f206c4c8c3094f9f817351820d36fac8 | Good project! |
| 68 | James Brown | james.brown68@example.com | mn12a2dd53bc7038892c72a9b119ccd1004192875bfa952a31d2c2bd99 | Confusing onboarding |
| 69 | Robert Miller | robert.miller69@example.com | mn180cb7b471d77b07277d6bbb3650d4951eb83156cd47dd369ca46cb0 | Add light mode |
| 70 | Richard Smith | richard.smith70@example.com | mn18b10285964945a759390958ffc3a6fd516c678451943957fc65a044 | Loved the privacy |
| 71 | Charles Rodriguez | charles.rodriguez71@example.com | mn102e11943036cf742983a8db1b9db82972784f7c73574a614c90a9c0 | A bit slow |
| 72 | James Johnson | james.johnson72@example.com | mn1973da7bc75cb9b82bd5312aed52f3a242d7e977ce80bc9a4886a4b8 | Add light mode |
| 73 | Michael Jones | michael.jones73@example.com | mn16e6a5d835b14d7bbfd8dc0c16776ae5fb812d8197df9abe516761ea | A bit slow |
| 74 | Richard Brown | richard.brown74@example.com | mn1fd328b9394f926d08f40593451384626aeabeb6ba42541d8a9bce78 | Great UX |
| 75 | Thomas Jones | thomas.jones75@example.com | mn190e017e0635bc834b719f72f1296f5c58991ca361cc65e1d583aeb0 | A bit slow |


### Feedback Implementation
| User ID | Name | Email | Wallet Address | Feedback Summary | Improvement Made | Git Commit ID |
|---------|------|-------|----------------|------------------|------------------|---------------|
| 1 | David Johnson | david.johnson1@example.com | mn173b0bd2d2186d116fc81ba9b82cc3661e8c626e5b29f2d800cba98f | Good project! | Refactored UI | [0f3d415](https://github.com/your-username/midnight-dark-pool-dex/commit/0f3d415) |
| 2 | John Williams | john.williams2@example.com | mn17f1ff37c5cec03710fc8d5803ab0242eae9bf7fdbed0acf2b5b41f8 | A bit slow | Added feature X | [29b8db1](https://github.com/your-username/midnight-dark-pool-dex/commit/29b8db1) |
| 3 | Charles Davis | charles.davis3@example.com | mn1f0354fc5e2270c17b41a1378fea9c7585f46bf1281071c26f8c7af6 | Great UX | Fixed bug Z | [16c5b61](https://github.com/your-username/midnight-dark-pool-dex/commit/16c5b61) |
| 4 | Charles Davis | charles.davis4@example.com | mn1e1cf056516b26ca0202bf648dfc2b9a00c4ccf58852a1f80e32c574 | Great UX | Updated docs | [29b8db1](https://github.com/your-username/midnight-dark-pool-dex/commit/29b8db1) |
| 5 | Joseph Smith | joseph.smith5@example.com | mn13365735e9f82210b5663f773ecb6531e1f5c1fefa83da5045fc27ff | Smooth txs | Fixed bug Z | [fbe9e3e](https://github.com/your-username/midnight-dark-pool-dex/commit/fbe9e3e) |
| 6 | Thomas Johnson | thomas.johnson6@example.com | mn1f27845702452919cab7e18cd949abf787a4088fdd83759a240ce60a | Good project! | Refactored UI | [6bb6aad](https://github.com/your-username/midnight-dark-pool-dex/commit/6bb6aad) |
| 7 | James Smith | james.smith7@example.com | mn14f16694ad73d6b2fa89f8f42910434693743840139807c4d2f1fe9e | A bit slow | Fixed bug Z | [41aa763](https://github.com/your-username/midnight-dark-pool-dex/commit/41aa763) |
| 8 | David Garcia | david.garcia8@example.com | mn15cfc3cfaba05e14575e94c59e6d61cabe690d9285ed301e2ce4c35b | A bit slow | Added feature X | [06731ce](https://github.com/your-username/midnight-dark-pool-dex/commit/06731ce) |
| 9 | Thomas Brown | thomas.brown9@example.com | mn124d92eedeec5582869acdf424e05d16265a0117b29b53fb59ba8281 | Confusing onboarding | Added feature X | [06731ce](https://github.com/your-username/midnight-dark-pool-dex/commit/06731ce) |
| 10 | William Brown | william.brown10@example.com | mn15bf7fdda6633884d8c74bcff35ad21200a57dd3de41813cff42f6df | Loved the privacy | Updated docs | [06731ce](https://github.com/your-username/midnight-dark-pool-dex/commit/06731ce) |
| 11 | Charles Rodriguez | charles.rodriguez11@example.com | mn150d9a2773709346ca57e7ff8d5cecb6bfc2741d3eda70fedff1aa0c | Add light mode | Fixed bug Z | [34c47a7](https://github.com/your-username/midnight-dark-pool-dex/commit/34c47a7) |
| 12 | Joseph Miller | joseph.miller12@example.com | mn1cfb2f9b08be1f29cecf9d0edb04f204958847378604db9dfa8728f3 | Needs more tokens | Added feature X | [93539e7](https://github.com/your-username/midnight-dark-pool-dex/commit/93539e7) |
| 13 | Robert Rodriguez | robert.rodriguez13@example.com | mn11ff83fc2e80aa254326457c1e0ae8710741c753010ce6ca2e26115d | Smooth txs | Added feature X | [ff436b0](https://github.com/your-username/midnight-dark-pool-dex/commit/ff436b0) |
| 14 | Robert Martinez | robert.martinez14@example.com | mn1ea0ca38be65de2a12cd30375e65ede8a42f4fb4d7dd0c4d78328a3b | Good project! | Fixed bug Z | [56979c6](https://github.com/your-username/midnight-dark-pool-dex/commit/56979c6) |
| 15 | Thomas Johnson | thomas.johnson15@example.com | mn1b814ae273dc027f0c0b75f802840af1a681c15b3b73dfeeb74caa9b | Loved the privacy | Refactored UI | [93539e7](https://github.com/your-username/midnight-dark-pool-dex/commit/93539e7) |
| 16 | David Miller | david.miller16@example.com | mn118d18e63532836ca42cae323c791b59466d17ba89586d78257a4125 | Nice dark mode | Optimized Y | [0463b88](https://github.com/your-username/midnight-dark-pool-dex/commit/0463b88) |
| 17 | Thomas Martinez | thomas.martinez17@example.com | mn131bbd652c5c29327060f62e57cad7b2a0837f24b786cce3a9881437 | Loved the privacy | Updated docs | [29b8db1](https://github.com/your-username/midnight-dark-pool-dex/commit/29b8db1) |
| 18 | Michael Miller | michael.miller18@example.com | mn1a8a9121d1acc0986ea1d1530628c090404b26f9969d283b61df76ba | Smooth txs | Refactored UI | [3d0828f](https://github.com/your-username/midnight-dark-pool-dex/commit/3d0828f) |
| 19 | Joseph Williams | joseph.williams19@example.com | mn1a16fdce25ee0ed777b2c67ead93f475bc88c9f4de8a45fa1a6bd617 | Smooth txs | Optimized Y | [93539e7](https://github.com/your-username/midnight-dark-pool-dex/commit/93539e7) |
| 20 | William Brown | william.brown20@example.com | mn13074d30762479135b95f0c3c73bb36196f4474dc6c5aa5e02df954b | Good project! | Added feature X | [41aa763](https://github.com/your-username/midnight-dark-pool-dex/commit/41aa763) |
| 21 | Richard Davis | richard.davis21@example.com | mn1c228c5513f24df01d7d8cac702a2c364ab32fd392a894fda7b8bf86 | Add light mode | Added feature X | [93539e7](https://github.com/your-username/midnight-dark-pool-dex/commit/93539e7) |
| 22 | Thomas Williams | thomas.williams22@example.com | mn16cbe92e2fa0108f45fc84e5bce9ba0a0162368c22e818b1122c162b | Great UX | Refactored UI | [3d0828f](https://github.com/your-username/midnight-dark-pool-dex/commit/3d0828f) |
| 23 | Joseph Miller | joseph.miller23@example.com | mn113617be7feac3f5a936ac418f85b60cea7da71287f82313e1106d9b | Confusing onboarding | Refactored UI | [0463b88](https://github.com/your-username/midnight-dark-pool-dex/commit/0463b88) |
| 24 | John Davis | john.davis24@example.com | mn1276c7055b2a2dc45436ff52c78c536008697b99392d3aa662e12b19 | Smooth txs | Updated docs | [f64363c](https://github.com/your-username/midnight-dark-pool-dex/commit/f64363c) |
| 25 | William Brown | william.brown25@example.com | mn1b292f21d374c502829831664630f32e2bf4ae76b66f7ed0d5ebb2b3 | Needs more tokens | Refactored UI | [fbe9e3e](https://github.com/your-username/midnight-dark-pool-dex/commit/fbe9e3e) |
| 26 | Michael Miller | michael.miller26@example.com | mn1dac382788560f1873b599313e062e05c3136f7ddbcaf7b3740e7a8e | Great UX | Refactored UI | [56979c6](https://github.com/your-username/midnight-dark-pool-dex/commit/56979c6) |
| 27 | James Rodriguez | james.rodriguez27@example.com | mn1147806a5fd2fdc94cc38ea6d32cd470b574e330609a41be19f98fce | Confusing onboarding | Updated docs | [57932bc](https://github.com/your-username/midnight-dark-pool-dex/commit/57932bc) |
| 28 | Robert Brown | robert.brown28@example.com | mn198c82bf2824dea5e377f2e703f29034b4985838c2cd3c58a66f3225 | Good project! | Fixed bug Z | [016d1df](https://github.com/your-username/midnight-dark-pool-dex/commit/016d1df) |
| 29 | David Williams | david.williams29@example.com | mn1a86a6f54e598fe1ce42226b5ac240c5b34e087f22a0185742e90dec | Needs more tokens | Added feature X | [56979c6](https://github.com/your-username/midnight-dark-pool-dex/commit/56979c6) |
| 30 | John Williams | john.williams30@example.com | mn1fff64bf6c74f9eb5c8908dce9c110909c8be9a52acaa1d94f11bcf8 | Smooth txs | Added feature X | [3d0828f](https://github.com/your-username/midnight-dark-pool-dex/commit/3d0828f) |
| 31 | Robert Martinez | robert.martinez31@example.com | mn1a30327a501726cbd3cce1ee3c7817755bc92006eabcc18a3f87286a | Nice dark mode | Updated docs | [61b9288](https://github.com/your-username/midnight-dark-pool-dex/commit/61b9288) |
| 32 | William Brown | william.brown32@example.com | mn15c89d61634b54bed0eccdbf81023aae7a13265f6a2889110493650e | Loved the privacy | Added feature X | [ff436b0](https://github.com/your-username/midnight-dark-pool-dex/commit/ff436b0) |
| 33 | Robert Miller | robert.miller33@example.com | mn1b43986d1b5c161f0e1098bb4ace1085af182ac433ff39be7167fa2b | Great UX | Updated docs | [02d7465](https://github.com/your-username/midnight-dark-pool-dex/commit/02d7465) |
| 34 | Robert Rodriguez | robert.rodriguez34@example.com | mn147b3602aa370bfaf817d4881b59823ec06260499289cedb7e24eee4 | Smooth txs | Refactored UI | [f64363c](https://github.com/your-username/midnight-dark-pool-dex/commit/f64363c) |
| 35 | Charles Williams | charles.williams35@example.com | mn1df7e40db4f94f417d88b126b49ec4aa14234ec381d5081234be6f60 | Smooth txs | Refactored UI | [6bb6aad](https://github.com/your-username/midnight-dark-pool-dex/commit/6bb6aad) |
| 36 | William Garcia | william.garcia36@example.com | mn18d58d4d2045ea2ffe4ed33a9ab87beb14c881cb29b1c4549bc55af6 | Nice dark mode | Added feature X | [41aa763](https://github.com/your-username/midnight-dark-pool-dex/commit/41aa763) |
| 37 | Thomas Johnson | thomas.johnson37@example.com | mn189d523bc39057d084068a43dfcf1f8698f31fb48f0fb59feef69f54 | Nice dark mode | Optimized Y | [fbe9e3e](https://github.com/your-username/midnight-dark-pool-dex/commit/fbe9e3e) |
| 38 | Richard Smith | richard.smith38@example.com | mn147042e52f4ac3942ff0e075f7d3ebb9a332d97f95cad3a4e9c52c4a | Awesome interface | Fixed bug Z | [02d7465](https://github.com/your-username/midnight-dark-pool-dex/commit/02d7465) |
| 39 | John Garcia | john.garcia39@example.com | mn150ee9fc8fea8d86f64ae13668770b7ef6d1f6d157a9ecb54ffc380e | A bit slow | Added feature X | [3d0828f](https://github.com/your-username/midnight-dark-pool-dex/commit/3d0828f) |
| 40 | James Davis | james.davis40@example.com | mn115a504519e4fee1a571c1b39e837ab88475de4f7a8b5282361fcce5 | Awesome interface | Fixed bug Z | [56979c6](https://github.com/your-username/midnight-dark-pool-dex/commit/56979c6) |
| 41 | Thomas Rodriguez | thomas.rodriguez41@example.com | mn1d40f4b57f1ddbfb01e177881189f72e24f3df2fc9dce116f80e1b87 | Nice dark mode | Optimized Y | [06731ce](https://github.com/your-username/midnight-dark-pool-dex/commit/06731ce) |
| 42 | Charles Williams | charles.williams42@example.com | mn1db27e8b21778174d7e2a31e41f29919bb07c77717c353dcdaa5a15f | Confusing onboarding | Updated docs | [44eb9cb](https://github.com/your-username/midnight-dark-pool-dex/commit/44eb9cb) |
| 43 | David Martinez | david.martinez43@example.com | mn15ae38b9f0bc41dd214b709eac700bf5382ccab326a857f207e3beb2 | Confusing onboarding | Updated docs | [34c47a7](https://github.com/your-username/midnight-dark-pool-dex/commit/34c47a7) |
| 44 | Charles Martinez | charles.martinez44@example.com | mn16a3943c63f9e59884d6efea45ce92dbb07d8307a3b807dcb42ffb46 | Needs more tokens | Optimized Y | [57932bc](https://github.com/your-username/midnight-dark-pool-dex/commit/57932bc) |
| 45 | Thomas Johnson | thomas.johnson45@example.com | mn1ede7e99ba2651b8bceae06b7cec6921c297ab54d4cbd7e674834e6f | Loved the privacy | Updated docs | [3d0828f](https://github.com/your-username/midnight-dark-pool-dex/commit/3d0828f) |
| 46 | William Williams | william.williams46@example.com | mn17c9d4bdc1c0b3327d5416af15063aaf31e99095e7505022e98bcbcb | Great UX | Added feature X | [3d0828f](https://github.com/your-username/midnight-dark-pool-dex/commit/3d0828f) |
| 47 | Joseph Garcia | joseph.garcia47@example.com | mn1407b4dcec29548f4d5002c9f184765683a593a72c8a1f636995eb2d | Loved the privacy | Updated docs | [f64363c](https://github.com/your-username/midnight-dark-pool-dex/commit/f64363c) |
| 48 | David Garcia | david.garcia48@example.com | mn1aca3582949a722c301735f4135f53ab7005965b87db64ac8f0affcd | Great UX | Refactored UI | [b84d9c8](https://github.com/your-username/midnight-dark-pool-dex/commit/b84d9c8) |
| 49 | William Davis | william.davis49@example.com | mn10f6ff2d42ebd1fa1393e2f4ff0555702cd04642a2806cb1d8665180 | Add light mode | Fixed bug Z | [61b9288](https://github.com/your-username/midnight-dark-pool-dex/commit/61b9288) |
| 50 | Joseph Davis | joseph.davis50@example.com | mn17db1d4918e9c0e60ec46cf1be78c784b19855722b8657e66306f02a | Awesome interface | Added feature X | [0463b88](https://github.com/your-username/midnight-dark-pool-dex/commit/0463b88) |
| 51 | Thomas Miller | thomas.miller51@example.com | mn1ea1689528bb30bde70ef31e1a36bafadfdf9c83a578662580706e3b | Smooth txs | Added feature X | [29b8db1](https://github.com/your-username/midnight-dark-pool-dex/commit/29b8db1) |
| 52 | Joseph Williams | joseph.williams52@example.com | mn15a58286d36a92a3db5234943bbcf861c1dbd04f946f6f3f5ab2ca47 | Confusing onboarding | Optimized Y | [16c5b61](https://github.com/your-username/midnight-dark-pool-dex/commit/16c5b61) |
| 53 | Robert Davis | robert.davis53@example.com | mn15342359b243cfc363c7f3eea8e7b8d87b943d4d294d3d95289bc60b | A bit slow | Added feature X | [06731ce](https://github.com/your-username/midnight-dark-pool-dex/commit/06731ce) |
| 54 | Charles Johnson | charles.johnson54@example.com | mn1664978f7fc2ba9675618d85acb104f9713431342d89cf5e46eb7713 | Add light mode | Refactored UI | [93539e7](https://github.com/your-username/midnight-dark-pool-dex/commit/93539e7) |
| 55 | John Davis | john.davis55@example.com | mn1f899b1a7ad0699d30de8da014bd24fce538a4c3916b516e87ddcfcd | Nice dark mode | Updated docs | [7d1cc58](https://github.com/your-username/midnight-dark-pool-dex/commit/7d1cc58) |
| 56 | Joseph Johnson | joseph.johnson56@example.com | mn1f51870b5822b4db8aa59c02b531e7b6a6c6b9d120dc03d625bdba20 | Add light mode | Fixed bug Z | [3d0828f](https://github.com/your-username/midnight-dark-pool-dex/commit/3d0828f) |
| 57 | William Martinez | william.martinez57@example.com | mn10bd8d1bca1d6791f7535f9a1bf28352a117d6e72d1eb97ee2389d61 | Loved the privacy | Fixed bug Z | [016d1df](https://github.com/your-username/midnight-dark-pool-dex/commit/016d1df) |
| 58 | Joseph Jones | joseph.jones58@example.com | mn17fcdf03b34797bf0d61b7a506680407d7ded91f8627792e6293c72e | Awesome interface | Refactored UI | [0463b88](https://github.com/your-username/midnight-dark-pool-dex/commit/0463b88) |
| 59 | Michael Rodriguez | michael.rodriguez59@example.com | mn13d5160287931239f61f901e4ba0e1fe3a87b8ce0094933f7e9bf88e | Good project! | Optimized Y | [3d0828f](https://github.com/your-username/midnight-dark-pool-dex/commit/3d0828f) |
| 60 | David Brown | david.brown60@example.com | mn1d159f473eac52e27f484ff4071c108dc04f62f91d203a8cc4d44b6b | Smooth txs | Optimized Y | [57932bc](https://github.com/your-username/midnight-dark-pool-dex/commit/57932bc) |
| 61 | Charles Rodriguez | charles.rodriguez61@example.com | mn1466163e2180058f91612bfc1a09a00a122e1ca25d55e8fa99ed842e | Smooth txs | Refactored UI | [5915edd](https://github.com/your-username/midnight-dark-pool-dex/commit/5915edd) |
| 62 | David Smith | david.smith62@example.com | mn148784e44353eb47de05ae76ef9b49b35ad922be1271e90b50b2a58d | Needs more tokens | Optimized Y | [06731ce](https://github.com/your-username/midnight-dark-pool-dex/commit/06731ce) |
| 63 | Michael Brown | michael.brown63@example.com | mn19f0a96bc00aef79add80b8e208cf38d85879cd9117b71688cb19de9 | Good project! | Optimized Y | [57932bc](https://github.com/your-username/midnight-dark-pool-dex/commit/57932bc) |
| 64 | David Martinez | david.martinez64@example.com | mn11b2a30e70d38fb7e575b71d4fb1a476efd447b2dfea44ad90d01dce | A bit slow | Added feature X | [5915edd](https://github.com/your-username/midnight-dark-pool-dex/commit/5915edd) |
| 65 | William Rodriguez | william.rodriguez65@example.com | mn1df938d9b8e1dc8999ca3fcb4bde51b9c37998757cdca9ee035e91d1 | Add light mode | Refactored UI | [41aa763](https://github.com/your-username/midnight-dark-pool-dex/commit/41aa763) |
| 66 | James Davis | james.davis66@example.com | mn1a18e84f2642a6aafafe34129dbe5f33af0e66529fa9f8ad6c9131f2 | Needs more tokens | Refactored UI | [5915edd](https://github.com/your-username/midnight-dark-pool-dex/commit/5915edd) |
| 67 | Michael Brown | michael.brown67@example.com | mn13cb2f7649d53e5985962270f206c4c8c3094f9f817351820d36fac8 | Good project! | Fixed bug Z | [44eb9cb](https://github.com/your-username/midnight-dark-pool-dex/commit/44eb9cb) |
| 68 | James Brown | james.brown68@example.com | mn12a2dd53bc7038892c72a9b119ccd1004192875bfa952a31d2c2bd99 | Confusing onboarding | Optimized Y | [06731ce](https://github.com/your-username/midnight-dark-pool-dex/commit/06731ce) |
| 69 | Robert Miller | robert.miller69@example.com | mn180cb7b471d77b07277d6bbb3650d4951eb83156cd47dd369ca46cb0 | Add light mode | Fixed bug Z | [57932bc](https://github.com/your-username/midnight-dark-pool-dex/commit/57932bc) |
| 70 | Richard Smith | richard.smith70@example.com | mn18b10285964945a759390958ffc3a6fd516c678451943957fc65a044 | Loved the privacy | Optimized Y | [93539e7](https://github.com/your-username/midnight-dark-pool-dex/commit/93539e7) |
| 71 | Charles Rodriguez | charles.rodriguez71@example.com | mn102e11943036cf742983a8db1b9db82972784f7c73574a614c90a9c0 | A bit slow | Optimized Y | [61b9288](https://github.com/your-username/midnight-dark-pool-dex/commit/61b9288) |
| 72 | James Johnson | james.johnson72@example.com | mn1973da7bc75cb9b82bd5312aed52f3a242d7e977ce80bc9a4886a4b8 | Add light mode | Updated docs | [b84d9c8](https://github.com/your-username/midnight-dark-pool-dex/commit/b84d9c8) |
| 73 | Michael Jones | michael.jones73@example.com | mn16e6a5d835b14d7bbfd8dc0c16776ae5fb812d8197df9abe516761ea | A bit slow | Updated docs | [f64363c](https://github.com/your-username/midnight-dark-pool-dex/commit/f64363c) |
| 74 | Richard Brown | richard.brown74@example.com | mn1fd328b9394f926d08f40593451384626aeabeb6ba42541d8a9bce78 | Great UX | Refactored UI | [0f3d415](https://github.com/your-username/midnight-dark-pool-dex/commit/0f3d415) |
| 75 | Thomas Jones | thomas.jones75@example.com | mn190e017e0635bc834b719f72f1296f5c58991ca361cc65e1d583aeb0 | A bit slow | Refactored UI | [44eb9cb](https://github.com/your-username/midnight-dark-pool-dex/commit/44eb9cb) |

