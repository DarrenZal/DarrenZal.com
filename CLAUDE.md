# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build for production (runs TypeScript compilation then Vite build)
- `yarn preview` - Build and serve production preview locally

## Code Quality

The project uses Biome for linting and formatting. Run:
- `npx @biomejs/biome check .` - Check all files
- `npx @biomejs/biome check . --apply` - Fix auto-fixable issues

## Architecture Overview

This is Orion Reed's personal website built with React, TypeScript, and Vite. The site features:

### Core Structure
- **React Router** handles navigation between home (`/`), contact (`/card/contact`), and post (`/posts/:slug`) pages
- **Vite** with custom markdown plugin for build process
- **TypeScript** with strict mode enabled

### Physics Integration
The site integrates **Rapier2D** physics engine with **tldraw** canvas:
- `PhysicsWorld` class in `src/physics/simulation.ts` manages physics simulation
- Shapes can be physics-enabled based on color properties (see `src/physics/config.ts`)
- Character controller supports arrow key movement and jumping
- Physics simulation runs at 60fps using `requestAnimationFrame`

### Canvas System
- **tldraw** provides the interactive canvas interface
- Custom `HTMLShapeUtil` enables HTML content within canvas shapes  
- Physics shapes are created from canvas geometry using convex hull or cuboid colliders
- Toggle system switches between default view and physics-enabled canvas

### Content Management
- **Markdown posts** are processed at build time via custom Vite plugin
- Posts support frontmatter, LaTeX rendering, and embedded videos
- Media files (videos/images) are automatically resolved to post subdirectories
- Gray-matter parses frontmatter, markdown-it handles HTML conversion

### Key Integration Points
- `useCanvas` hook manages canvas state and element detection
- `createShapes` utility converts DOM elements to tldraw shapes for physics
- Canvas and physics systems communicate through shape data structures
- Editor mounting triggers physics world initialization

## Import Paths

Use `@/` prefix for src imports (configured in both Vite and TypeScript):
```typescript
import { useCanvas } from "@/hooks/useCanvas"
import { PhysicsWorld } from "@/physics/simulation"
```

## Physics Configuration

Shape colors determine physics properties:
- **Violet shapes** become character controllers (player-controlled)
- **Color-based materials** affect friction and restitution
- **Fixed shapes** (`meta.fixed = true`) become static colliders
- **Groups** create compound rigidbodies with multiple colliders

## Post Structure

Posts live in `src/posts/` with:
- Markdown file (e.g., `scoped-propagators.md`)
- Asset folder with same name containing videos/images
- Frontmatter with `title` field
- Assets referenced relatively get resolved to `/posts/{slug}/{asset}`