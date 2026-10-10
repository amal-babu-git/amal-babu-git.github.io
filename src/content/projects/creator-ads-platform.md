---
title: Creator ads platform
description: A platform where brands and agencies run ad campaigns with creators.
domain: Influencer marketing
role: techLead
year: 2026
order: 6
stack: [FastAPI, PostgreSQL, Celery, Redis, Next.js, TypeScript]
---

## Scope

The platform serves three kinds of user, each with its own surface.

- **Brands and agencies** use a web console to verify their business, set up a workspace for each brand, fund a campaign wallet, and find and invite creators.
- **Creators** work from a mobile-first web app that installs like a native one.
- **Administrators** verify accounts, review campaigns, handle disputes and move money.

## Design notes

- **Money goes through a double-entry ledger.** Every movement is a transaction whose entries sum to zero, whether it's a top-up, a campaign hold, a creator's earnings, commission or tax. No balance is stored. A balance is computed from the entries, so it can't drift from the history that produced it.
- **Budgets are reserved before they're spent.** A campaign places a hold on the brand's funds, and the ledger records what becomes of the held money: moved, consumed or returned.
- **Top-ups are idempotent.** Each carries a unique key, so a retried payment can't credit a wallet twice.
- **What a user signed up as is separate from what they're allowed to do.** The account type, brand or creator, is fixed at sign-up. Roles are assigned and can change. Business logic branches on the account type, never on a role name.
- **One web frontend in the first phase.** The creator app ships as a progressive web app rather than a native app, which keeps a single codebase. A native app is planned for a later phase.
