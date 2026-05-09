# Jenus Alakere - Portfolio

Component-based static portfolio site built with vanilla JavaScript ES modules and Purpose UI CSS framework. Designed for GitHub Pages deployment with zero build step. Terrible for crawlers so far because its not server side rendered.

## Structure

    .
    ├── app/
    │   ├── app.js              # Application entry point
    │   ├── core/
    │   │   ├── Component.js    # Base component class with lifecycle methods
    │   │   ├── EventBus.js     # Decoupled component communication
    │   │   ├── Renderer.js     # Component registration and rendering
    │   │   ├── SEO.js          # Meta tags, structured data, and favicon management
    │   │   └── Store.js        # Centralized state management
    │   ├── components/
    │   │   ├── Header.js       # Navigation with WhatsApp CTA
    │   │   ├── Hero.js         # Desktop hero section
    │   │   ├── MobileHero.js   # Mobile hero with spotlight background
    │   │   ├── Services.js     # Services cards with skill badges
    │   │   ├── Projects.js     # Project showcase with overlay cards
    │   │   ├── Tools.js        # Tech stack categorized skill cards
    │   │   ├── Features.js     # Client promise and feature highlights
    │   │   ├── Contact.js      # CTA section with email link
    │   │   ├── Footer.js       # Multi-column footer with links and socials
    │   │   └── Clock.js        # Time display widget
    │   └── data/
    │       ├── personal.js     # Name, title, social links, SEO config
    │       ├── services.js     # Services offered
    │       ├── projects.js     # Project portfolio entries
    │       ├── skills.js       # Tech stack organized by category
    │       └── features.js     # Feature highlights and selling points
    ├── assets/
    │   ├── css/                # Purpose UI, custom styles, icon fonts
    │   ├── img/                # Images, logos, project screenshots
    │   ├── js/                 # Purpose UI core, moment.js, typed.js
    │   └── docs/               # Resume PDF
    ├── scripts/
    │   └── server.js           # Local development server with ES module support
    ├── index.html              # Single HTML shell with component containers
    └── package.json            # Project metadata and dev scripts

## Development

### Prerequisites

Node.js 14 or later

### Local Server

No dependencies required. The project includes a custom dev server with MIME type handling for ES modules.

    pnpm dev

The server starts at `http://localhost:3000` and auto-opens in your browser.

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3000 | Server port |
| HOST | localhost | Server host |
| AUTO_OPEN | true | Auto-open browser on start |
| VERBOSE | false | Show all request logs |

    PORT=8080 VERBOSE=true pnpm dev

## Architecture

### Component System

Each component extends a base Component class that provides lifecycle methods, state management with automatic re-render, scoped event handling with cleanup on destroy, scoped DOM queries, and event bus integration for cross-component communication.

### Data Flow

All content lives in `app/data/` as plain JavaScript objects. Components import data files and render HTML from templates. To update content, edit the relevant data file with no HTML changes needed.

### Rendering

The Renderer class manages component registration and ordered rendering. Components render into container divs defined in `index.html`. After all components render, Purpose UI is re-initialized to pick up dynamically added elements.

## Deployment

Push to GitHub and enable GitHub Pages on the repository. No build step required. The site is served as static files.

## Updating Content

### Personal Information

Edit `app/data/personal.js` to update your name, title, social links, resume path, and SEO metadata.

### Projects

Add or modify entries in the projectsData array in `app/data/projects.js`. For private repositories, set privateRepo to true to show a lock icon instead of a GitHub link.

### Services

Edit the servicesData array in `app/data/services.js`. Each service has an icon, title, description, skills list, and color theme.

### Tech Stack

Edit `app/data/skills.js` to modify the categorized skills displayed in the Tech Stack section.

### Adding a New Section

Create a component file in `app/components/` extending the base Component class. Create a data file in `app/data/` if needed. Add a container div with a unique ID in `index.html`. Register the component in `app/app.js` with its container ID and add it to the render order array.

## License

MIT