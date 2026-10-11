---
title: Construction project management and CRM
description: Project management and CRM for a construction company, following each project from lead and quotation through execution to billing, accounting and payroll.
domain: Construction
role: techLeadCore
year: 2026
order: 4
stack: [FastAPI, PostgreSQL, Celery, Redis, Next.js, TypeScript]
modules:
  - name: Leads and sales
    covers: Leads, follow-ups, quotations, design quotations with stage-based payments, and deals. A won deal becomes a project automatically.
  - name: Projects
    covers: The core module. Each project brings together its labour, vendors, purchases, documents, billing, subcontracts, finance and meetings.
  - name: Labour
    covers: Trades with skill-based daily and overtime rates, a worker registry, project assignments, daily attendance and wage payments
  - name: Vendors
    covers: A vendor registry, assignment to projects, and payments
  - name: Materials
    covers: A material master, stock movements on each site, and transfers between sites
  - name: Purchase
    covers: Purchase requests with approval, purchase orders, goods receipt, payments and delivery challans
  - name: Bill of quantities
    covers: A reusable library of priced work items used to build quotations
  - name: Billing and finance
    covers: Work logs, client invoices, expenses and settlements, and a finance summary for each project
  - name: Accounting
    covers: Chart of accounts, vouchers, trial balance, profit and loss, balance sheet, general ledger and cash flow
  - name: HR and payroll
    covers: Departments, employees, shifts, attendance, leave, holidays and salary
  - name: Subcontracts
    covers: Work packages with advance, running-bill, retention and final payments
  - name: Administration
    covers: Partner companies, bank accounts, users, roles and permissions
---

## Design notes

- **Labour is modelled around assignments.** A worker is assigned to a project for a date range, and attendance and wages belong to that assignment. Pay rates are copied onto the assignment when it's created, so a later rate change doesn't rewrite past wages.
- **Derived values aren't stored.** Project progress is computed from its dates when it's read, so it can't go stale.
- **Access follows project membership.** Five roles, from site supervisor to client, each get their own dashboard, and users see only the projects they're assigned to.
- **Services own transactions.** Routes stay thin, services validate and commit, and data-access code never commits, so one use case is one transaction.
