<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
# BuildForge ERP — Construction ERP Frontend

Frontend-only construction ERP scaffold built with Next.js 15 (App Router), React 19,
TypeScript, Tailwind CSS, Material UI, Redux Toolkit, React Query, ApexCharts and
Framer Motion. No backend, database, or auth logic — everything runs on mock data.

## Design system

- **Palette** — Blueprint navy (`#0F2544`/`#0A1628`) as the structural color, signal
  orange (`#FF6B35`) as the single accent for actions/active states, concrete grays for
  data and secondary text. Status colors (green/amber/red) are reserved strictly for
  state, never decoration.
- **Type** — Space Grotesk for headings (technical, blueprint-adjacent), Inter for body
  copy, JetBrains Mono for figures/currency/codes in tables.
- **Signature** — a faint blueprint grid texture (`bg-blueprint-grid`) marks "site" and
  navigation surfaces (sidebar header, project map), tying the visual language back to
  construction drawings without overusing the motif.
- Light and dark mode are wired through Redux (`theme` slice) and bridged into the MUI
  theme + a `dark` class on `<html>` that Tailwind's `darkMode: "class"` reads.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — it redirects to `/dashboard`.

## What's included in this pass

1. Folder structure (`src/app`, `src/components`, `src/store`, `src/lib`, `src/types`)
2. App shell layout — `src/app/(app)/layout.tsx`
3. Sidebar — collapsible, workspace switcher, grouped navigation, active-route styling
4. Top navbar — global search, notifications, theme toggle, profile menu, mobile trigger
5. Dashboard home — `src/app/(app)/dashboard/page.tsx`
6. Dashboard widgets — project progress, upcoming tasks, recent activity, labour
   attendance, equipment status, weather, purchase orders, project map
7. Charts — portfolio progress (area), cash flow (bar), material stock mix (donut),
   all ApexCharts, dynamically imported client-side
8. Navigation — `src/lib/nav.ts` drives the sidebar; breadcrumbs derive from the route
9. Theme — Redux-driven light/dark mode synced across Tailwind + MUI
10. Mock data — `src/lib/mockData.ts` (projects, tasks, employees, equipment,
    materials, purchase orders, invoices, activity feed, KPI + chart series)

## Not yet built (full page list from the brief)

The sidebar links to all of these routes; only `/dashboard` has a page implemented so
far. Say which module(s) to build next and they'll be added the same way, page by page:

Projects, Project Details, Project Timeline, Gantt Chart, Calendar, Tasks, Kanban Board,
Daily Site Report, Materials, Inventory, Purchase Requests, Purchase Orders, Warehouse,
Equipment, Assets, Vehicle Tracking, Labour Management, Attendance, Payroll, Employees,
Contractors, Vendors, Customers, CRM, Leads, Quotations, Invoices, Expenses, Budget,
BOQ, Tender Management, Documents, Drawing Viewer, Safety, Quality Inspection, Site
Issues, Reports, Analytics, Notifications, Messages, Settings, Company Profile, User
Management, Audit Logs, Help Center.

Reusable pieces still to add: DataGrid table wrapper (search/sort/filter/pagination/
export), Kanban board (drag & drop), Calendar/Gantt view, Modal/Drawer primitives,
Stepper, file/image upload, loading skeletons, empty/error states, toast notifications.

## Notes

- All figures, names, and locations are mock data (`src/lib/mockData.ts`) — swap in
  real data or wire to an API layer whenever the backend is ready.
- ApexCharts components are client components (`"use client"`) and dynamically
  imported with `ssr: false`, since ApexCharts needs `window`.
- `@mui/x-data-grid` is already a dependency for when the data-table pages are built.
<<<<<<< HEAD
=======
=======
# PSB
Builder Developers &amp; Constructions
>>>>>>> 764f262a642e43a3ccebc4e57dbc42e99c1db586
>>>>>>> 150c580c8ad7708d76456ad4b3d8b7f8ffa67035
