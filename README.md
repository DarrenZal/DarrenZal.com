# Darren's Knowledge Garden

A unique interactive website that combines [Quartz](https://quartz.jzhao.xyz/) static site generation with a physics-enabled tldraw canvas, creating an innovative way to explore interconnected knowledge.

## Features

- **Quartz Integration**: Embeds a complete Quartz-generated knowledge garden with interactive graph views, backlinks, and semantic connections
- **Interactive Canvas**: Toggle between traditional web view and a physics-enabled canvas mode using tldraw
- **Physics Simulation**: Website elements become physics objects that can be manipulated and interact with each other
- **Dual Navigation**: Seamless navigation between normal web browsing and spatial canvas exploration
- **Graph Visualization**: Dynamic D3.js-powered knowledge graphs showing content relationships

## Development

```bash
yarn dev
```

## Architecture

- **Frontend**: React + TypeScript + Vite
- **Canvas**: tldraw with custom HTML shape utilities
- **Physics**: Rapier2D physics engine
- **Content**: Quartz static site generator processing Markdown files
- **Styling**: CSS with Biome formatting

The site demonstrates how traditional web content can be reimagined as interactive, spatial experiences while maintaining full functionality and accessibility.
