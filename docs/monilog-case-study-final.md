# Case Study — Monilog (FINAL)
**Build-ready. All details confirmed.**
Tier: Full case study · Slot: Featured (16:9, full width)

---

## PORTFOLIO-LEVEL CHANGES

### Homepage Selected Work sub-line
```
BEFORE  Five projects. Real clients, real constraints.
AFTER   Five projects. Client brands, and one product of my own.
```

### Featured slot
Monilog takes it. It's the only project that shows brand, product design, and code in one artefact — which is exactly what your USP claims. Diwa moves to position 2 as the strongest pure-brand story.

### Ordering
```
1  Monilog    Featured 16:9    Brand + product + build
2  Diwa       4:3              Brand identity
3  Pikamgo    4:3              TBC
4  Qiroke     4:3              TBC
5  Ronixe     4:3              TBC
```

### One thing to check
You mentioned Qiroke was the signed-in account on the Monilog site. If Qiroke is also yours rather than a client's, the honest split is three client projects and two of your own — still a strong mix, and worth getting right before the copy is set.

---

## HOMEPAGE CARD

```
Monilog
[Brand] [Product Design] [Flutter] [React]

A finance app that works with no signal and no sign-up.
Designed it, built it, shipped it.

→ View case study
```

**Images:** mobile dashboard → hover reveals the pencil sketch.

---

## THE PAGE

### 01 — HERO
```
Monilog
A finance app that works with no signal and no sign-up.
```
**Image:** phone mockup on the dark teal gradient, full bleed, 70vh.

---

### 02 — META BAR
```
Product     Monilog Finance Tracker
Client      Self-initiated
Role        Brand Identity · Product Design · Mobile & Web Development
Stack       Flutter · Drift (SQLite) · React · Vercel
Platforms   Android · Web
Status      v1.0 in beta — monilog.vercel.app
Year        2026
```

**Status wording matters.** "In beta" is accurate. Don't write "launched" or "on the Play Store" until it is — the first person to check will be someone deciding whether to hire you.

---

### 03 — THE PROBLEM  *(~90 words)*
```
Most personal finance apps assume two things: a stable internet
connection and a bank account. In Cameroon, neither is safe to
assume.

Money moves through MTN MoMo and Orange Money as much as through
banks — but global finance apps treat mobile money as a footnote,
if they support it at all. Connectivity drops. Data is expensive.
And nearly every one of them opens with a sign-up wall demanding
an email address before it will show you anything.

The people who most need to track their money have the least
usable tools for doing it.
```

**Highlight:** *neither is safe to assume.*

---

### 04 — THE CONSTRAINTS  *(~85 words)*
```
Four rules, set before any design work started.

Works with no connection. Not offline mode as a fallback —
local storage as the single source of truth, with sync added
later as a feature rather than a dependency.

No sign-up. No email, no password, no verification code. First
transaction recorded inside two minutes.

Mobile money is a first-class account type, not a spending
category.

Bilingual from day one. Cameroon is officially EN/FR, and
shipping English-only would exclude half the market.
```

---

### 05 — WHAT I DID  *(~45 words)*
```
Everything the user sees and most of what they don't: brand
identity, product design, the Flutter mobile app, the React web
companion, and the marketing site.

Self-initiated. I set the scope, made every call, and shipped
it — which also means every weakness in it is mine.
```

That last clause is worth keeping. Owning the downside of full control reads as confidence, not modesty.

---

### 06 — THE MARK  *(~90 words)*
```
The name gave me an M. The product gave me three other things to
say — tracking, growth, and money — and I wanted the letter to
carry all of them rather than sit beside icons that did.

Three rounded bars make the M. They're also a bar chart: unequal
heights, which is what a month of spending actually looks like.
The arrow rises through the valley of the M, so growth is drawn
by the letterform instead of added to it. And the middle bar
carries a single dot — the wallet clasp, straight from the
sketch.

One shape. Four readings. Nothing bolted on.
```

**Images:**
1. Pencil sketch — `Monilog / M + Wallet + bars + Arrow`, wallet drawn beside it
2. Icon large, flat, on light
3. **Construction diagram — build this.** Four frames, one element highlighted in each: bars, M, arrow, clasp. It's the difference between people seeing a nice logo and people seeing the idea.
4. Icon at favicon size next to icon at full size

---

### 07 — THE SYSTEM  *(~50 words)*
```
Deep teal #0F766E carries structure — bars, headings, the
weight of the mark. Mint #2DD4BF carries movement: the arrow,
every positive number, every primary action.

Two colours, two jobs. On a dark interface that means the eye
learns one accent instead of sorting four.
```

Pull the exact values from your source file when you build — those two are what I read off the artwork.

**Images:** the two swatches with codes, then the mark in both colourways, then the icon reversed to white.

---

### 08 — KEY DECISIONS

```
CHOSE       Local database as the source of truth
REJECTED    Cloud-first with an offline cache
WHY         Offline-as-fallback breaks in exactly the conditions
            it's meant for — the app opens, waits on a request,
            and hangs. Building on Drift over SQLite means there
            is no network call in the critical path at all. Sync
            arrives in v2 as an addition, not a repair.
```

```
CHOSE       No account, no email, no password
REJECTED    Standard registration
WHY         Every sign-up field is a place people leave. For a
            finance app the objection is sharper — you're asking
            for an email before showing any value, in a category
            where people are already wary about who sees their
            money. No account also means nothing to breach.
```

```
CHOSE       Mobile money as an account type
REJECTED    Mobile money as a transaction category
WHY         MoMo isn't a kind of spending, it's where the money
            lives. As a category, users couldn't see a MoMo
            balance — which is the number most of them check
            most often.
```

```
CHOSE       Dark-first with a single bright accent
REJECTED    Light-first
WHY         The app gets opened at the counter, in the market, in
            the evening. Dark reads better in low light and costs
            less battery on OLED. One accent means every positive
            number and every primary action share a colour, so
            there's one thing to learn instead of four.
```

**Images:** architecture sketch (device → local DB, no server) for row 1, onboarding screens for row 2, accounts list showing MoMo alongside cash and bank for row 3, dashboard for row 4.

---

### 09 — THE INTERFACE  *(~80 words)*
```
The dashboard answers one question first: how much do I have
right now? Balance at the top, income and expenses beneath it,
then four cards — total in, total out, today's spending, month
balance.

Below that, accounts. Cash, bank, MoMo, savings, each with its
own balance, because one combined number hides the thing people
actually need to see.

Five items in the bottom bar, Add Transaction raised in the
centre. Recording money is the daily action. Everything else is
occasional.
```

**Images:** dashboard, add-transaction, accounts, analytics. Call out the recently-used category and account pills on the add screen — that's a real friction fix and it deserves naming.

---

### 10 — BUILT, NOT JUST DESIGNED  *(~75 words)*
```
Flutter for mobile, with Drift over SQLite as the local store.
React for the web companion. Both run on the same brand system —
same tokens, same type scale, same components — so the phone and
the browser feel like one product rather than two builds that
happen to share a logo.

Import and export in CSV, JSON, and XLSX, because data you can't
take out isn't really yours. Local backup. Daily reminders. No
backend at all in v1.
```

**Image:** web dashboard beside mobile dashboard, same data, same system, side by side.

**This block is the point of the case study.** It's where the USP stops being a claim.

---

### 11 — IN USE
```
1  monilog.vercel.app — marketing site hero
2  Mobile dashboard, real data
3  Web app dashboard
4  Add transaction flow
5  Screenshot carousel from the site
```

**Caption:**
```
v1.0 is in beta at monilog.vercel.app. Android app and web
companion, both live.
```

---

### 12 — WHERE IT IS NOW  *(~55 words)*
```
v1.0 is in beta — offline Flutter app, React web companion, and
marketing site, all live. Play Store release is next.

v2 adds cloud sync through Supabase and PowerSync, so the
offline-first architecture gains sync without giving up local
storage as the source of truth. v3 is the one I'm most interested
in: recording a transaction by sending a WhatsApp message.
```

**Nothing about users, revenue, or projections.** Those live in a confidential document and publishing them only gives people a number to measure you against later.

---

### 13 — WHAT I'D DO DIFFERENTLY  *(~50 words)*
```
[ Replace with a real beta finding. ]

Placeholder: I designed the full account model before testing
whether anyone wanted six account types. If beta shows most
people use two or three, the extra options add setup friction at
exactly the moment I was trying to remove it.
```

Once beta feedback arrives, use something real. A specific finding beats a plausible one, and readers can tell the difference.

---

### 14 — NEXT PROJECT
```
Next project · Diwa →      1 of 5
```

---

## WORD COUNT
~620 across written blocks. Right for the depth.

---

## IMAGE CHECKLIST

| # | Image | Block | Status |
|---|---|---|---|
| 1 | Phone mockup, teal gradient | Hero | ✓ |
| 2 | Pencil sketch | 06 | ✓ |
| 3 | Icon large, flat | 06 | ✓ |
| 4 | **Construction diagram, 4 frames** | 06 | **Make** |
| 5 | Favicon vs full size | 06 | Quick |
| 6 | Colour swatches + codes | 07 | Quick |
| 7 | Mobile dashboard | 09 | ✓ |
| 8 | Add transaction screen | 09 | Need |
| 9 | Accounts list | 08 | Need |
| 10 | Web dashboard | 10 | ✓ |
| 11 | Web + mobile side by side | 10 | Compose |
| 12 | monilog.vercel.app hero | 11 | ✓ |

**Crop all browser captures** — chrome, bookmarks bar, taskbar, and clock are visible in every one.

---

## OPEN

- [ ] Construction diagram
- [ ] Add-transaction and accounts screenshots
- [ ] Real beta finding for block 13
- [ ] Confirm whether Qiroke is also self-initiated
- [ ] Update Play Store status when it changes
