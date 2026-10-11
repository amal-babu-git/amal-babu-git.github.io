---
title: Home services and jobs marketplace
description: A marketplace that connects households and businesses with verified service providers such as drivers, plumbers and housemaids, with a jobs marketplace on the same platform.
domain: Service marketplace
role: techLeadCore
year: 2025
order: 1
stack: [FastAPI, PostgreSQL, Celery, Redis, Next.js, PayU]
---

## Scope

- **Customers,** both individuals and businesses, find providers, request and book services, and pay online.
- **Service providers** publish their availability, take bookings, and track their work and earnings.
- **Administrators** verify providers and manage bookings, payments and payouts.
- **Jobs:** job seekers and employers have their own marketplace on the same platform, alongside a referral programme.

## Design notes

- **Billing runs by the week.** Longer bookings are billed and paid week by week, so attendance, provider payouts, cancellations and refunds are all settled per week.
- **Money rules are explicit.** A week that has been worked and paid can't be voided, finished bookings are locked, and refunds draw on credits in a fixed order so a customer can't be refunded twice.
- **Attendance drives payouts.** Leave and absence deductions are tracked, and the system warns when a deduction would leave a week unable to pay the provider.
- **Payments go through PayU,** with a sandbox that exercises the full payment flow in testing.
