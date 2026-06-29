# motion-app

A React + Vite app for small business service providers. Tailwind CSS for styling.

## Project Structure

- `src/` — Application source
  - `bizConfigs.js` — Business config data (8 businesses, images, content)
  - `components/` — React components
    - `BizProServices.jsx` — Group A template (lawyer, auto repair, builder, realtor)
    - `BizLifestyle.jsx` — Group B template (barber, salon, bakery, landscaper)
  - `App.jsx` — Root component, routes businesses to templates
- `dist/` — Build output (Vite)
- `public/` — Static assets

## Business Groups

Group A (BizProServices): Professional service-oriented layout
- Law Offices of Sarah Chen (law)
- Apex Auto Repair (auto repair)
- Stonewood Custom Builders (builder)
- Horizon Realty Group (realtor)

Group B (BizLifestyle): Lifestyle-oriented layout
- The Grooming Lounge (barber)
- Luxe Salon & Spa (salon)
- Golden Crust Bakery (bakery)
- GreenScape Landscaping (landscaper)

## Build
- `npm run build` — Vite production build
- `npm run dev` — Vite dev server
- `npm run preview` — Preview production build
