# Agnos - Project Documentation Report

## 1. Project Overview
**Agnos** is a comprehensive, next-generation Farm Management and Logistics Platform (Agriculture OS). It is designed to empower modern farmers with real-time operational tracking, a global marketplace, advanced market intelligence, and AI-driven advisory services. The platform features a high-contrast, modern "Neo-Brutalist" UI with an emphasis on bold typography, italic accents, and high-impact visual feedback.

---

## 2. Core Modules & Features

### 2.1 Dashboard (Farm Command Center)
The central nervous system of the farm operation.
- **AI Advisory Bar**: Real-time insights powered by Kiwi AI (e.g., transport cost reduction tips).
- **Metric Cards (Smart Cards)**: High-level tracking for:
  - Net Revenue (with interactive sparklines).
  - Daily Production units.
  - Operational Efficiency percentages.
- **Quick Action Menu**: Emergency triggers for "Panic Mode", "Log Logistics", "Ventilation Control", and "New Listing".
- **Farm Schedule**: Integrated calendar for task management (e.g., Morning Feeding, Logistical Review).
- **Operational Pulse**: Visual resource tracking for Water, Feed, Fuel, and Fertilizer.
- **Live Monitor**: Real-time status tracking for individual livestock groups.

### 2.2 Agnos Marketplace
A peer-to-peer trade hub for farm produce and inputs.
- **Product Grid**: Dynamic listing of products with price, rating, and stock status.
- **Advanced Filtering**: Categorized search system covering Food & Produce, Agri-Cosmetics, Bio-Energy, Industrial Fiber, and more.
- **Product Detail Dialog**: Full-screen overview with image galleries, seller verification badges, detailed specifications, and customer reviews.
- **Cart System**: Real-time shopping cart with toast notifications and direct navigation to checkout.
- **Buy Now Flow**: Streamlined path for immediate purchasing.

### 2.3 Commodity Exchange (Market Analysis)
A high-frequency market intelligence suite.
- **Live Price Ticker**: A scrolling marquee of global commodity pairs (e.g., MAIZE/TOMATO).
- **Interactive Exchange Charts**: Real-time candlestick/bar visualizations with timeframe toggles (1H, 4H, 1D, 1W).
- **Regional Price Index**: Table-based comparison of average prices and demand levels across different countries/regions.
- **Quick Trade Panel**: Instant execution panel for Buy/Sell orders with estimated total calculation.
- **Market Sentiment Gauge**: A "Bullish vs. Bearish" indicator based on real-time market volatility.
- **Recent Activity Log**: A streaming feed of live trades (Price, Size, Time).

### 2.4 Farm Manager (ERP/Operations)
Comprehensive resource and staff management.
- **Unit Management**: CRUD operations for crop plots and livestock flocks.
- **Interactive Plot Cards**: Tracking execution progress, lead supervisor, and due dates.
- **Workspace Toggles**: Seamless switching between Operations, Team/Staff, Clients/CRM, Inventory, Projects, and Archives.
- **Staff/CRM Management**: Detailed directories for employees and clients with contact and performance tracking.
- **Inventory Ledger**: Threshold-based stock monitoring with "Issue Supplies" and "Log Intake" functionality.
- **Incident Logging**: Emergency reporting system for operational disruptions.

### 2.5 Learning Hub (Lessons)
An educational platform for sustainable farming mastery.
- **Course Library**: Categorized courses (Soil Science, Livestock, etc.) with level indicators and ratings.
- **Interactive Player**: A multi-column course interface with module navigation, progress tracking, and video simulation.
- **Certification System**: Modules can be marked as complete to track progress toward course mastery.
- **Enrollment Flow**: One-click enrollment into any course in the hub.

### 2.6 Agnos Gazette (News)
A premium news hub for global agriculture.
- **Editorial Layout**: A classic newspaper-style grid with featured stories and deep-dive analysis.
- **Category Navigation**: Quick filters for Market News, Tech, Sustainability, and Policy.
- **Engagement Features**: Like/Unlike articles, bookmarking, and native sharing.
- **Comment System**: Community discussions on news articles with liking and reporting capabilities.
- **Newsletter Subscription**: Integrated sign-up for daily agriculture insights.

### 2.7 Agnos Social (Feed & Channels)
Community building and peer-to-peer knowledge sharing.
- **Social Feed**: An X-style feed for sharing farm updates, images, and locations.
- **Community Channels**: Dedicated spaces (e.g., "Poultry Pros", "Crop Logistics") with unique banners, icons, rules, and guidelines.
- **Real-time Interaction**: Posting, replying, reposting, and liking with animated feedback.
- **Discovery Sidebar**: Trending hashtags and "Who to follow" suggestions.

### 2.8 Tools & Communication
- **Kiwi AI (Neural Chat)**: A specialized AI assistant for farm-specific queries and data analysis.
- **Messenger**: A Telegram-style chat interface with read receipts, online status, and multi-conversation support.
- **Notifications**: Centralized hub for order updates, market alerts, social interactions, and system notifications.
- **Profile & Settings**: Comprehensive user profile with editable bios, location, and farm statistics. Includes theme toggles and account security preferences.

---

## 3. Navigation & UI Components

### 3.1 Global Navigation
- **Collapsible Sidebar**: Unified navigation across Platform (Dashboard, Feed, Marketplace, etc.) and Tools (Messages, Kiwi AI, Profile).
- **Neo-Brutalist Design**: High-impact borders, bold shadows (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`), and high-contrast color schemes.

### 3.2 Key UI Components
- **Buttons**: Variant-based (Default, Outline, Ghost, Destructive) with custom shadow transitions.
- **Badges**: Status indicators (Verified, In Stock, High Priority) using brand-consistent styling.
- **Dialogs/Modals**: Custom-styled overlays for detailed views (Product details, Course player, Gazette articles).
- **Progress Bars**: Used extensively for resource levels, course progress, and project execution.
- **Tabs**: Used for content categorization across almost every module (Marketplace, Farm, Profile, etc.).

---

## 4. Technical Architecture
- **Frontend**: React (Vite) with TypeScript.
- **Styling**: Tailwind CSS with custom theme extensions (e.g., `bg-surface`, `bg-gradient-primary`).
- **Animations**: Framer Motion for stagger transitions, layout changes, and interactive feedback.
- **State Management**: React Query (TanStack) for data fetching and local state hooks for UI interaction.
- **Icons**: Lucide React.
- **Charts**: Recharts for complex data visualization and custom SVG sparklines for metrics.
- **Notifications**: Sonner for toast-based user feedback.
