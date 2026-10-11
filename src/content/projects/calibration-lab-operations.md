---
title: Calibration lab operations and accounting
description: Operations and accounting for a medical equipment calibration lab, covering the lead-to-cash flow with audit logging throughout.
domain: Medical equipment calibration
role: techLead
year: 2026
order: 2
stack: [FastAPI, PostgreSQL, Celery, Redis, Next.js, TypeScript]
modules:
  - name: Dashboard
    covers: Metrics across sales, clients, work orders, accounting, inventory, certificates and staff
  - name: Clients
    covers: Client records, history, ledgers and analytics, with key-account tagging
  - name: Leads and proposals
    covers: Lead capture and assignment, and proposals with revisions, approvals and win-loss analysis
  - name: Work orders
    covers: A shared pool of work orders, filtered by priority, deadline, department and skills, with fault reports
  - name: Purchase orders
    covers: Vendors, purchase requisitions, maker-checker approval and purchase orders
  - name: Instruments
    covers: The lab's calibration instruments, with their condition, service history, assignment and renewal reminders
  - name: Inventory
    covers: Stock in and out, reorder levels, damage, transfers and adjustments
  - name: Certificates
    covers: Accredited and non-accredited certificates, with audited editing
  - name: Accounting
    covers: Journals, ledgers, sales and purchase transactions, financial statements and tax reports
  - name: Settings
    covers: Document templates, the approval matrix, tax, currency and notification policies
  - name: Security and audit
    covers: Role-based access, user activity logs, approval for out-of-office logins, and alerts on report exports
---

## Design notes

- **Purchasing uses maker-checker approval.** The person who raises a purchase requisition can't approve it.
- **Access control reaches the data.** Roles grant actions per module (view, create, edit, delete and approve), and each role sees either its own records or all of them.
- **Sensitive activity is logged and surfaced.** A login from outside approved locations or hours can require a manager's approval, and every report export is logged and reported to designated roles.
- **Accredited and non-accredited certificates follow different rules.** Each has its own editing permissions, and every edit is recorded in the audit trail.
