

# GreenNest — Premium Indoor Plants Marketplace

A modern, premium e-commerce web app for indoor plants with a botanical aesthetic, dark mode support, and LKR currency.

---

## Design & Theme
- **Botanical premium aesthetic**: sage greens, deep forest accents, neutral whites, subtle glass/blur panels, soft gradients
- **Dark mode** support via `next-themes`
- **Typography hierarchy**: bold hero headlines, clean section headers, refined body text
- **Micro-interactions**: smooth hover states, transitions, and subtle animations
- **Currency**: All prices displayed in **LKR (Rs.)**

---

## State Management — Zustand (No React Context)
- **useProductStore** — products, categories, filters (search, category, price range, sort), filteredProducts selector
- **useCartStore** — cart items, add/remove/update quantity, clear cart, derived totals (subtotal, tax, total)
- **useLeadStore** — consultation requests, contact messages, newsletter subscriptions
- **useOrderStore** — orders array, create order from cart, get order by ID
- **useUIStore** — mobile nav state, dark mode helpers

---

## Pages & Routes

### 1. **Home** (`/`)
- Top nav: logo, centered links (Home, About, Products, Plant Decoration, Contact), right icons (Search, Phone, Cart with badge)
- Hero section with headline "Smart Indoor Plants Market.", CTAs (Add to cart, Learn more), large product image
- Featured categories row: House Plants, Office Plants, Bonsais, Accessories
- Trust badges: Safe Payments, Shop with Confidence, 24/7 Support
- Testimonials carousel (3 cards with avatar placeholders)
- Consultation booking form (name, email, phone, room type, message) — validated with zod
- Footer with links, contact info, newsletter signup

### 2. **About** (`/about`)
- Hero banner with overlay title
- Sections: Who We Are, Vision, Mission, History — alternating image/text layout
- "GreenNest Journey" gallery grid (6 placeholder images)

### 3. **Products** (`/products`)
- Category filter cards row
- Filter & sort bar: search input, category tabs, price range, sort dropdown
- Product grid (12 mocked items): image, name, category, price, rating, quick "Add to cart"
- Click navigates to product detail

### 4. **Product Details** (`/products/:id`)
- Image gallery placeholder
- Title, price, description, care tips accordion
- Quantity selector + Add to cart button
- Related products row

### 5. **Plant Decoration** (`/plant-decoration`)
- Title + "How To Do?" steps
- Upload dropzone for room photo (stored in Zustand with preview)
- Selects: room category, style, preference (low light / pet friendly / air purifier)
- "Generate AI" button → rule-based mock suggestions
- Results panel: suggested plant cards with reason tags + "Add to cart"
- Toast feedback on generation

### 6. **Contact** (`/contact`)
- Hero banner
- Contact form (name, email, phone, message) — validated, stored in Zustand
- Map placeholder + contact info cards

### 7. **Shopping Cart** (`/cart`)
- Cart table: thumbnail, name, unit price, quantity stepper, subtotal, remove
- Order summary: items, subtotal, sales tax, total in LKR
- "Place Order" button → validates, creates order, clears cart, navigates to success

### 8. **Order Success** (`/order-success/:orderId`)
- Success check icon + order ID, date, totals, item list
- "Continue Shopping" CTA → `/products`

---

## Mock Data (`src/data/`)
- **12+ products** with id, name, category, price (LKR), rating, tags, description, care tips, light/pet/room/style fit attributes
- **Testimonials** with names, quotes, avatar placeholders
- **Categories**: House Plants, Office Plants, Bonsais, Accessories

---

## Reusable Components
- AppShell (nav + footer + mobile Sheet nav)
- Hero, CategoryCard, ProductCard, ProductGrid, FilterBar
- CartTable, OrderSummary
- TestimonialCard, ConsultationForm, ContactForm
- UploadDropzone, AiSuggestionsPanel

---

## Technical Details
- **Zustand** for all global state (zero React Context)
- **react-hook-form + zod** for all form validation
- **shadcn/ui** components used extensively
- **lucide-react** icons throughout
- **Responsive**: mobile hamburger Sheet nav, 1/2/4 column product grids
- **Dark mode** toggle in nav
- **Accessibility**: proper labels, focus rings, keyboard support
- **All CTAs functional** — no dead UI

---

## Milestones
1. Project setup, routing, theme, dark mode, Zustand stores, mock data
2. App shell (nav/footer), Home page with all sections
3. Products list + filters + Product details page
4. Cart + Order flow + Order success
5. Plant Decoration with mock AI suggestions
6. About + Contact pages
7. Visual polish, responsiveness, accessibility, final QA

