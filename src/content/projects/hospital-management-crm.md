---
title: Hospital management and CRM
description: Hospital management with a built-in CRM, covering the path from a first enquiry to a patient's visits, prescriptions and pharmacy.
domain: Healthcare
role: techLeadCore
year: 2026
order: 3
stack: [FastAPI, PostgreSQL, Celery, Redis, Next.js, TypeScript]
modules:
  - name: Patients
    covers: Patient records and visit history
  - name: Bookings and tokens
    covers: Appointments by doctor and location, reception tokens, and payments, including split cash and digital payments
  - name: Consultations and prescriptions
    covers: Consultation records, prescriptions, prescription packages and renewals
  - name: Pharmacy
    covers: Dispatching prescriptions, with payment reports by method
  - name: CRM
    covers: Leads by source and life stage, follow-ups, assignment to staff, conversion to customers, and after-sales calls
  - name: HR
    covers: Employees, teams, shifts, attendance with weekly and monthly summaries, leave, holidays and salary
  - name: Dashboard
    covers: Revenue and activity by period
  - name: Administration
    covers: Users, roles, record-level access, settings and the audit log
---

## Design notes

- **Two layers of access control.** Permissions decide what a user can do, and a separate row-scope layer decides which records they can see. Wider visibility is an explicit permission, not a special case in the code.
- **Clinic workflow rules live in the service layer.** A prescription's renewal date creates the follow-up booking automatically, and a free-revisit window applies unless reception overrides it.
- **Data fixes are scripted and reviewed.** When existing records need correcting, the fix ships as a remediation script with a report of what it changed, not as manual edits in production.
