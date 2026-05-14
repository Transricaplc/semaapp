
# Sema full redesign — phased implementation

The attached spec is a 796-line ground-up redesign. It conflicts with several existing decisions (font: SF Pro → Sora/DM Sans, tabs: Nyumbani/Saraka → Tafuta/Orodha, location tables: mikoa/wilaya/kata → keep + alias as regions/districts/wards). I'll keep existing Swahili table names (mikoa/wilaya/kata/vijiji) since they're already populated and route the spec's "regions/districts/wards/places" naming through the data layer — same data, no destructive migration.

I'll ship this in 5 phases. Each phase is independently shippable; I'll pause between phases for your sign-off.

## Phase 1 — Design system + tokens (foundation)
- Swap fonts to **Sora** (display), **DM Sans** (body), **JetBrains Mono** (codes) via Google Fonts in `index.html`.
- Rewrite `index.css` + `tailwind.config.ts` tokens to the spec palette: `--yellow #F5C500`, `--charcoal #1C1C1E`, `--verified-green`, `--gov-blue`, `--map-bg`, etc. (HSL).
- Add 4px-yellow-left-border `OfficialCard` base style.
- Update memory (font change overrides prior SF Pro rule).

## Phase 2 — Schema + map_category system
- Migration: add to `unified_officials` data layer (or new `officials` view) the `map_category`, `verified_by`, `verified_at`, `data_source`, `lat`, `lng` columns where missing. Add region/district/ward FKs aliased to existing `mkoa_id`/`wilaya_id`/`kata_id`.
- Add `data_corrections` already exists; add `saved_contacts` table + RLS.
- Seed `mikoa.lat/lng` from the 26-region centroid table in §7.
- Add `lib/locationHooks.ts` (`resolveMapCategory`, `getMapCoordinates`).
- Add FTS index on officials name/title.

## Phase 3 — Core components
Build the §13 component library:
`OfficialCard`, `OfficialDetailSheet` (bottom sheet 80vh), `CategoryBadge`, `VerificationBadge`, `LocationBreadcrumb`, `LocationSelector` (cascading), `AccountabilityScore`, `DataSourceFooter`, `WhatsAppShareButton`, `WardPostCode`, `FilterChips`, `OfflineBanner`, `MapPin`, `MapSidebar`.

## Phase 4 — 5 screens rewrite
- **Tafuta** (home): instant search, Swahili intent map (F1), quick filter chips, recent searches.
- **Orodha**: hierarchical Region → District → Ward → Officials browser w/ breadcrumb.
- **Ramani**: full-screen react-leaflet + `react-leaflet-cluster`, category filter drawer, pin tap → MapSidebar, Nominatim reverse geocode chip.
- **Ripoti**: two sub-tabs (flag form + transparency dashboard with live counts).
- **Mimi**: language toggle, location, saved contacts, vCard export, PWA notifications.
- Update bottom nav labels to **Tafuta / Orodha / Ramani / Ripoti / Mimi**.

## Phase 5 — Cross-cutting features
- F2 WhatsApp share, F4 vCard export, F5 post-code lookup, F6 accountability score, F7 maps deep-link, F8 source badge, F9 admin CSV export (already partly done), F10 i18n strings audit, F3 PWA caching of officials in IndexedDB.

## Technical details
- Add deps: `react-leaflet`, `leaflet`, `react-leaflet-cluster`, `react-select`.
- Keep existing Swahili-named DB tables (mikoa/wilaya/kata/vijiji) — wrap with TS types `Region/District/Ward/Place` so spec naming holds in code.
- Keep existing AuthContext (phone/SMS OTP) — spec says "no auth required for basic use", which matches.
- Memory updates: override font rule, override tab labels rule.

## Out of scope for this batch
- Importing the full 75k mtaa/HackEAC dataset (requires uploading large JSON/SQL — I'll scaffold the loader, you provide the file).
- Real verified seed contacts beyond what's already in `mp_contacts.ts` and `unified_officials.ts`.

## Decision needed before I start
1. **Confirm font swap**: Sora + DM Sans + JetBrains Mono replaces the SF Pro rule in memory. OK?
2. **Confirm tab rename**: Nyumbani/Saraka/Ripoti/Ramani/Mimi → Tafuta/Orodha/Ramani/Ripoti/Mimi. OK?
3. **Phase cadence**: ship Phase 1 first and pause for review, or rip through Phases 1–3 in one go?
