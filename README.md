# Chapamaji Ops Hub

desing the full front end only,BUILD: CHAPAMAJI COMMAND CENTER / CONTROL PLANE

You are working on the Chapamaji ecosystem.

I want you to build a completely separate web application called:

Chapamaji Command Center

This is NOT a redesign of the Chapamaji mobile application.

The architecture must be:

CHAPAMAJI MOBILE APP
        |
        |\
        | \
        |  \
        |   \
        v    v
   SUPABASE DATABASE
        ^
        |
        |
CHAPAMAJI COMMAND CENTER


The mobile app and Command Center are two independent applications that share the same backend/database.

The Command Center is the privileged administrative/control system for the entire Chapamaji platform.

1. FIRST: INSPECT THE EXISTING PROJECT

Before writing significant code:

Inspect the existing Chapamaji mobile application.

Inspect the backend.

Inspect Supabase/database structure.

Inspect existing authentication.

Inspect existing tables, relationships, RLS policies and enums.

Inspect rider GPS/location functionality.

Inspect vendor/branch functionality.

Inspect orders.

Inspect subscriptions if they already exist.

Inspect payment-related tables and KCB Buni integration.

Inspect existing notifications.

Inspect existing user roles.

Do NOT blindly create duplicate tables or systems.

Reuse the existing architecture wherever appropriate.

Do not replace existing mobile functionality.

The Command Center must integrate with the existing ecosystem.

2. CORE PRINCIPLE

The Command Center is the control plane.

The mobile application is the product/client.

The Command Center should be able to control configurable aspects of the mobile application without requiring a new mobile app release.

Example:

ADMIN
  ↓
Command Center
  ↓
Feature Flag / Configuration
  ↓
Supabase / Backend
  ↓
Chapamaji Mobile App
  ↓
Feature changes behavior


For example, an administrator should be able to disable:

Gas ordering

Water ordering

Live tracking

Promotions

New registrations

Payments

Vendor onboarding

Rider onboarding

Specific features

without modifying the mobile application code.

The mobile app should read these configurations from the backend.

3. COMMAND CENTER UI

Build a modern professional operations-control interface.

Do NOT make it look like a generic SaaS template.

It should feel like a real technology operations center.

Design language:

Modern

Professional

Clean

Dark-first

High information density

Smooth animations

Responsive

Desktop optimized

Minimal unnecessary decoration

Strong visual hierarchy

Real-time indicators

Maps

Charts

Tables

Command-center style panels

Use the Chapamaji visual identity where appropriate:

Navy:
#0A1F3D

Cyan:
#00BCD4

Orange:
#FF6B00


Do not overuse neon effects.

Avoid "AI-generated dashboard" aesthetics.

Keep the interface practical and operational.

4. MAIN SIDEBAR

Create navigation similar to:

COMMAND CENTER

Overview

Operations
  Live Map
  Orders
  Deliveries

Users
  Customers
  Riders
  Vendors
  Branches
  Staff

Verification
  Rider Verification
  Vendor Verification
  Documents

Platform
  Features
  Subscriptions
  System Settings
  Notifications

Finance
  Payments
  Transactions
  Settlements

Analytics
  Users
  Orders
  Riders
  Vendors
  Revenue

Security
  Restrictions
  Suspensions
  Audit Logs

System
  Alerts
  System Health
  Emergency Controls


The exact navigation can be adjusted after inspecting the existing project.

5. OVERVIEW DASHBOARD

Create a real-time command dashboard.

Show actual database information.

NEVER use fake/mock statistics in production UI.

Cards should include things such as:

Total Users
Active Users
Online Riders
Active Vendors
Active Branches
Orders Today
Active Deliveries
Pending Verifications
Failed Payments
System Alerts


Example:

12,842
TOTAL USERS

428
ACTIVE NOW

83
RIDERS ONLINE

214
ACTIVE VENDORS


Use real queries.

If there is no data, show:

0


rather than fake numbers.

6. ACTIVE USERS

Create a real-time "Active Users" system.

Show users who are currently active according to actual available presence/session/activity data.

Display:

Total active users

Customers

Riders

Vendors

Staff

Last activity

Online/offline status

Do not claim a user is online simply because their account exists.

Use appropriate presence/activity signals.

7. LIVE OPERATIONS MAP

Create a dedicated full-screen map.

The map should display real Chapamaji operational entities.

Layers:

☑ Active Riders
☑ Active Deliveries
☑ Vendors
☑ Branches
☑ Rider Locations
☐ Offline Riders
☐ Suspended Accounts


Use the existing rider location infrastructure if available.

If the project already has:

rider_locations
delivery_tracking


reuse it.

Use Supabase Realtime where appropriate.

Clicking a rider should open a panel:

RIDER

Name
Phone
Status
Vehicle
Current delivery
Current order
Last location update
Current coordinates
Speed if available

[VIEW RIDER]
[VIEW ORDER]
[RESTRICT ACCOUNT]


Clicking a branch:

BRANCH

Vendor
Branch name
Status
Location
Active staff
Active riders
Current orders

[VIEW BRANCH]
[SUSPEND BRANCH]


8. USER MANAGEMENT

Build a powerful user-management system.

Support:

Customers
Riders
Vendors
Branch staff
Administrators


Search by:

Name

Phone

Email

Account ID

Role

Filters:

Active

Offline

Suspended

Banned

Pending verification

Verified

Rejected

User profile page should show:

PROFILE

Name
Phone
Email
Role
Account status
Verification status
Created date
Last activity

Orders
Payments
Activity
Locations where appropriate
Verification documents where appropriate
Restrictions


9. BAN / UNBAN / SUSPEND

Administrators must be able to control accounts.

Actions:

Suspend
Unsuspend
Ban
Unban
Force logout


Do not immediately permanently delete records.

Prefer soft deletion / archival where possible.

Every sensitive action must require confirmation.

Example:

BAN USER

User:
John Doe

Reason:
[________________________]

This will prevent the account from using Chapamaji.

[Cancel]
[Confirm Ban]


Store:

admin_id
target_user_id
action
reason
timestamp
metadata


in the audit system.

10. RIDER VERIFICATION

Build a dedicated verification center.

Dashboard:

Pending
Under Review
Approved
Rejected
Suspended


Example rider:

JOHN KAMAU

Phone
✓ Verified

Profile
✓ Submitted

National ID
✓ Submitted

Driving Licence
✓ Submitted

Vehicle Registration
✓ Submitted

Insurance
✓ Submitted


The admin must be able to:

View document
Approve
Reject
Request resubmission


When rejecting:

Reason required


Every verification decision must be logged.

Do not expose sensitive documents unnecessarily.

Restrict document access to authorized admin roles.

11. VENDOR VERIFICATION

Create the same type of workflow for vendors.

Vendor status:

Pending
Under Review
Verified
Rejected
Suspended
Banned


Show:

Business information

Owner

Branches

Staff

Payment destination

Verification status

Orders

Activity

Allow authorized administrators to approve/reject/suspend.

12. BRANCH MANAGEMENT

Create a branch-management section.

Show:

Branch
Vendor
Location
Status
Staff
Riders
Orders
Payment configuration


Actions:

View
Suspend
Unsuspend
Restrict


Do not allow an administrator to accidentally delete a branch containing historical transactional data.

Use archival/soft deletion where appropriate.

13. FEATURE CONTROL CENTER

This is one of the most important modules.

Create:

FEATURE CONTROL


Examples:

Water Ordering              ON
Gas Ordering                ON
Live Rider Tracking         ON
Push Notifications          ON
Vendor Registration         ON
Rider Registration          ON
Customer Registration       ON
Promotions                  OFF
Payments                    ON


Each feature should have:

Key
Name
Description
Enabled
Target audience
Updated by
Updated at


Allow:

Enable
Disable


If practical, support targeting:

Everyone
Customers
Riders
Vendors
Branches
Specific user


The Command Center should modify configuration only through secure backend operations.

14. SUBSCRIPTION MANAGEMENT

Create a subscription/plan management system.

Show:

Plans
Subscribers
Expiring
Expired
Suspended


Plan configuration may include:

Plan name
Price
Billing period
Maximum branches
Maximum staff
Maximum riders
Available features
Status


Administrators should be able to modify plans through the Command Center.

Do not hard-code subscription rules into the UI.

15. PAYMENTS

Use the existing Chapamaji payment architecture.

The project uses KCB Buni for payment integration.

Do NOT expose KCB credentials in the frontend.

The Command Center should be able to monitor:

Payment status
Pending
Successful
Failed
Cancelled
Timeout
Refund where supported


Show relevant transaction identifiers.

Do not create a wallet system unless the existing architecture explicitly requires one.

Remember the Chapamaji model:

Customer
   ↓
pays
   ↓
Vendor / Branch


The platform should not unnecessarily become the holder of customer funds.

The Command Center should primarily provide visibility, configuration and operational controls.

16. RIDER SETTLEMENTS / DUES

If the existing backend contains rider earnings, dues or settlement functionality, expose it in the Command Center.

Show:

Rider
Orders completed
Earnings
Amount due
Amount paid
Outstanding balance
Status


If an existing business rule prevents riders/vendors with outstanding dues from receiving new orders, expose that status clearly.

Example:

● ELIGIBLE

or

● RESTRICTED
Outstanding dues: KSh XXXX


Do not invent a new wallet architecture.

17. ORDERS

Create an operations order center.

Show:

Order ID
Customer
Vendor
Branch
Rider
Items
Amount
Payment status
Order status
Created
Updated


Filters:

Pending
Accepted
Preparing
Assigned
Picked up
Delivering
Completed
Cancelled


Allow authorized administrators to inspect orders.

Dangerous actions such as cancelling or modifying an order should require confirmation and audit logging.

18. DELIVERY MONITORING

Create a delivery operations page.

Show:

Active deliveries
Delayed deliveries
Unassigned deliveries
Completed
Cancelled


For each delivery:

Order
Customer
Vendor
Branch
Rider
Current status
Last GPS update
ETA if available


Link directly to the live map.

19. NOTIFICATION CENTER

Create a system notification center.

Show:

Push notifications
System announcements
Operational alerts
Verification notifications
Payment notifications


If the existing notification infrastructure can be reused, integrate with it.

Do not build a second unrelated notification system.

20. SECURITY / AUDIT LOG

This is mandatory.

Create:

AUDIT LOG


Every privileged action should be recorded.

Examples:

Admin approved rider
Admin rejected document
Admin banned user
Admin unbanned user
Admin suspended vendor
Admin changed subscription
Admin enabled feature
Admin disabled feature
Admin changed system setting
Admin cancelled order


Store:

admin_id
action
target_type
target_id
old_value
new_value
reason
timestamp
metadata


Where possible also record:

IP
user agent
request ID


Do not log passwords, tokens, KCB secrets, or other credentials.

21. ADMIN ROLES

Do NOT make every administrator a super admin.

Create role-based permissions.

Possible roles:

SUPER_ADMIN

OPERATIONS_ADMIN

VERIFICATION_ADMIN

FINANCE_ADMIN

SUPPORT_ADMIN

ANALYTICS_ADMIN


Example permissions:

users.view
users.ban
users.unban

riders.view
riders.verify
riders.suspend

vendors.view
vendors.verify
vendors.suspend

orders.view
orders.cancel

features.view
features.update

subscriptions.view
subscriptions.update

payments.view

audit.view

system.maintenance
system.emergency


Use the least-privilege principle.

22. SYSTEM HEALTH

Create a system-health page.

Monitor available infrastructure signals such as:

API
Database
Authentication
Realtime
Storage
Notifications
Payment integration
GPS/location pipeline


Show:

● Operational
● Degraded
● Down


Do not fake health information.

Only display metrics that can actually be measured.

23. EMERGENCY CONTROLS

Create a protected emergency-control section.

Potential controls:

Disable new orders
Disable customer registration
Disable rider registration
Disable vendor registration
Disable payments
Disable rider assignments
Maintenance mode
Platform lockdown


These must be heavily protected.

Require:

Admin confirmation
Reason
Audit log


Potentially require Super Admin permission.

Do not put a one-click "destroy everything" button.

24. DATABASE DESIGN

Before creating tables, inspect the current schema.

Reuse existing tables where possible.

Only create missing infrastructure.

Potential additional tables:

admin_users
admin_roles
admin_permissions
admin_audit_logs

feature_flags
system_settings

user_restrictions

rider_verifications
verification_documents

subscription_plans
user_subscriptions

admin_alerts


Adapt names to the existing schema.

Do not create duplicates such as another users table if one already exists.

25. SECURITY ARCHITECTURE

Security is critical.

The browser must NEVER contain:

Supabase service_role key
KCB credentials
private API secrets
Cloudinary secrets
Redis secrets


Use:

Command Center
      ↓
Authenticated admin request
      ↓
Secure backend / Edge Function
      ↓
Permission check
      ↓
Database operation


Implement proper RLS.

Do not solve authorization by simply hiding buttons in React.

Even if the button is hidden, unauthorized requests must fail server-side.

26. REAL-TIME

Where useful, use Supabase Realtime for:

Live rider locations
Order changes
Verification queue
Alerts
System events
Active user presence


Avoid aggressive polling if realtime subscriptions are appropriate.

Clean up subscriptions correctly when components unmount.

27. PERFORMANCE

This Command Center may eventually manage a large number of:

Users
Orders
Riders
Locations
Branches
Events


Do not load thousands of rows into the browser.

Use:

Pagination
Server-side filtering
Indexed queries
Debounced search
Virtualized tables where necessary
Realtime only where useful


For maps, do not render thousands of DOM markers if clustering is appropriate.

28. NO MOCK DATA

This is extremely important.

Do NOT create:

John Doe
1234 users
83 riders
KSh 1,200,000


as fake dashboard data.

Every statistic must come from the actual database/API.

If data does not exist:

0
No data
No active users
No pending verification


is acceptable.

29. ERROR STATES

Every major page needs:

Loading
Empty
Error
Unauthorized
Offline/degraded


Do not show infinite loading spinners.

Give useful error messages.

30. RESPONSIVE DESIGN

Desktop is the primary target because this is an operations center.

But it should still work on:

Desktop
Laptop
Tablet


Mobile is secondary.

Do not compromise the desktop operations experience just to make it look like a mobile dashboard.

31. CODE QUALITY

Use:

TypeScript
Reusable components
Strong typing
Centralized API/query logic
Reusable permission checks
Reusable table components
Reusable confirmation dialogs
Reusable status badges


Avoid giant components.

Separate:

UI
Data fetching
Business logic
Authorization
Database operations


32. IMPORTANT: PRESERVE THE MOBILE APP

Do not break existing Chapamaji mobile functionality.

Do not randomly modify:

Expo Router
Zustand
TanStack Query
Supabase
Maps
Orders
Rider tracking
Authentication
Payments


unless required for Command Center integration.

If a mobile-app change is necessary to support feature flags/configuration, make the smallest safe change and explain it.

33. IMPLEMENTATION ORDER

Build in this order:

Phase 1

Inspect existing architecture.

Then implement:

Admin authentication
Admin authorization
Command Center shell
Sidebar
Overview


Phase 2

Implement:

Users
Riders
Vendors
Branches
Verification


Phase 3

Implement:

Live map
Orders
Deliveries
Realtime events


Phase 4

Implement:

Feature flags
Subscriptions
System settings
Notifications


Phase 5

Implement:

Payments
Settlements
Analytics


Phase 6

Implement:

Audit logs
Security
System health
Emergency controls


34. VERY IMPORTANT DEVELOPMENT RULE

Do not stop at creating attractive frontend screens.

The goal is a FUNCTIONAL Command Center.

For every page ask:

Where does this data come from?

What database table provides it?

What API/query retrieves it?

What happens when the admin changes something?

How does the mobile application receive that change?

Is the action authorized?

Is the action logged?


If a feature cannot actually work with the current backend, identify the missing backend/database requirement and implement the required secure infrastructure rather than filling the screen with fake data.

35. FINAL PRODUCT

The final ecosystem should look like:

                  CHAPAMAJI ECOSYSTEM
                         |
          ┌──────────────┴──────────────┐
          |                             |
          v                             v
 CHAPAMAJI MOBILE              COMMAND CENTER
      APP                           WEB
          |                             |
          |                             |
          └──────────┬──────────────────┘
                     |
                     v
                BACKEND/API
                     |
                     v
                 SUPABASE
                     |
        ┌────────────┼────────────┐
        |            |            |
      Auth        Database     Realtime
        |            |            |
        └────────────┴────────────┘


The Command Center should become the operational brain of Chapamaji.

It should allow authorized administrators to:

Monitor the entire platform

See active users

Monitor riders live on a map

Monitor vendors and branches

Review rider documents

Approve/reject riders

Approve/reject vendors

Ban/unban users

Suspend/unsuspend riders

Suspend/unsuspend vendors

Manage branches

Monitor orders

Monitor deliveries

Monitor payments

Manage subscriptions

Enable/disable mobile-app features

Manage platform configuration

View analytics

Receive operational alerts

Review audit logs

Manage administrator permissions

Perform emergency platform controls

Build this as a serious production control plane, not a mock admin dashboard.

Start by inspecting the existing Chapamaji project and database, then create a clear implementation plan based on what actually exists before making destructive architectural changes.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/be7ff4cc-373e-4262-81b5-ba9f625f4364).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
