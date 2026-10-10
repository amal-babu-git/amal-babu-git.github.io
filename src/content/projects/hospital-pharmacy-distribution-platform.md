---
title: Hospital, pharmacy and distribution platform
description: One system for a hospital, its pharmacy, and its retail and distribution business, where every sale flows through to stock and the accounts in a single step.
domain: Healthcare
role: techLeadCore
year: 2026
order: 5
stack: [FastAPI, PostgreSQL, Celery, Redis, Next.js, TypeScript]
modules:
  - name: Hospital
    covers: Patient bookings, reception tokens, the doctor's queue, consultations and prescriptions
  - name: Pharmacy
    covers: Dispensing prescriptions straight to an invoice
  - name: Sales
    covers: Orders, invoices, payments, returns and the receivables ledger
  - name: CRM
    covers: Leads, customers, follow-ups and sales calls
  - name: Purchase
    covers: Requisitions, purchase orders, supplier bills, payments, returns and the payables ledger
  - name: Suppliers
    covers: Supplier records
  - name: Products
    covers: The product catalogue and its master data
  - name: Stock
    covers: The inventory ledger and stock adjustments, by location
  - name: Logistics
    covers: Goods receipt with quality checks, and stock transfers between locations
  - name: Inventory valuation
    covers: FIFO stock costing for the profit and loss statement
  - name: Accounting
    covers: Double-entry books, vouchers, fiscal years and financial reports
  - name: HR and payroll
    covers: Employees, attendance, leave and salary
  - name: Reports
    covers: Configurable reports with export
  - name: Support tickets
    covers: Internal support requests
  - name: Administration
    covers: Users, roles and scoped permissions, locations, tax rates, bank accounts and the audit log
---

## Design notes

- **One transaction, recorded everywhere.** Dispensing a prescription or invoicing a sale reduces stock, updates the customer's balance and posts the accounting voucher in one all-or-nothing database transaction. There's no separate posting step to forget.
- **Two sales channels share one invoicing engine.** Tax, totals and stock behave the same whether a sale starts from a prescription or a retail order, while each channel keeps its own workflow.
- **Location is part of access control.** Stock, sales and visibility are scoped by location, and staff see only the locations they belong to.
- **Indian tax rules are built in.** GST (CGST, SGST and IGST), HSN codes, batch numbers and expiry dates are first-class data, not add-ons.
- **Every change is audited.** An append-only activity log records who did what, with before-and-after snapshots for sensitive edits such as corrections to posted entries.
