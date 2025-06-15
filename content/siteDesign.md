---
title: About This Site
type: :Technology
summary: "Details the design principles and technical architecture of this knowledge garden, built using open-source tools like Quartz and Obsidian to demonstrate decentralized knowledge systems in practice."
aliases: [site architecture, knowledge garden setup, knowledge graph implementation]
backlinks: true
date: 2024-08-05

relationships:
  - predicate: :usesTechnology
    object: KnowledgeGraph.md
    description: "Implements knowledge graph principles through bidirectional links"
  - predicate: :relatedTo
    object: BioregionalKnowledgeCommons.md
    description: "Serves as template for specialized knowledge systems"
  - predicate: :relatedTo
    object: OpenProtocols.md
    description: "Uses open protocols for knowledge sharing"
  - predicate: :exploresConcept
    object: KnowledgeGarden.md
    description: "Explains the philosophy and practice of knowledge gardens"
  - predicate: :usesTechnology
    object: "Quartz"
    description: "Publishing framework for converting knowledge graph to website"
  - predicate: :usesTechnology
    object: "Obsidian"
    description: "Tool for networked thought and visual graph exploration"
  - predicate: :leverages
    object: "decentralized tools"
    description: "Built using open-source, decentralized architecture"

semantic_triples:
  - subject: self
    predicate: :isa
    object: "knowledge garden"
  - subject: self
    predicate: :demonstrates
    object: "decentralized knowledge principles"
  - subject: self
    predicate: :uses
    object: "markdown files"
  - subject: self
    predicate: :enables
    object: "distributed contribution"
  - subject: "Quartz"
    predicate: :converts
    object: "knowledge graph to website"
  - subject: self
    predicate: :supports
    object: "organic linking"
  - subject: self
    predicate: :embodies
    object: "open source principles"
  - subject: self
    predicate: :provides
    object: "template for knowledge graphs"
---

This site itself is an example of the principles it discusses - it's built as a [[KnowledgeGarden|knowledge garden]] and knowledge graph using open-source, decentralized tools:

- **Content Creation**: Markdown files edited with tools like Obsidian (for networked thought) and VS Code
- **Publishing**: [Quartz](https://quartz.jzhao.xyz/) for converting the knowledge graph into a browsable website
- **Version Control**: GitHub as a repository for content and collaboration
- **Knowledge Graph**: Bidirectional links and backlinks enable exploration of connected concepts

This architecture was chosen intentionally to align with the site's focus on decentralized knowledge systems and reflects key principles:

- **Open Source**: All tools and content are open source and freely available
- **Decentralized**: Content can be edited locally and synced when needed
- **Composable**: Each tool serves a specific function and can be replaced or upgraded
- **Interoperable**: Standard formats (Markdown) ensure content portability
- **Version Controlled**: Changes are tracked and can be collaborated on
- **Network Structure**: Content is interconnected rather than hierarchical

## A Template for Knowledge Graphs

This setup serves as a practical example of how discourse and knowledge graphs can be implemented. Other projects can use this same framework to create their own networked knowledge bases:

1. **Local Editing**
   - Use Obsidian for visual graph exploration and linking
   - Use VS Code for technical editing and git integration
   - Any text editor can work with the Markdown files

2. **Publishing Options**
   - Quartz provides a clean, searchable interface
   - Other static site generators can be used
   - Content remains portable due to standard formats

3. **Collaboration Workflow**
   - Git/GitHub enables distributed contribution
   - Pull requests for suggested changes
   - Issue tracking for discussions
   - Version history for transparency

4. **Knowledge Organization**
   - Bidirectional links create organic connection
   - Tags and categories for flexible organization
   - Full-text search capability
   - Visual graph exploration

This approach is particularly relevant for developing specialized knowledge systems, such as a [[BioregionalKnowledgeCommons|Bioregional Knowledge Commons]], which aims to integrate diverse, place-based information.

## Relevance to Broader Themes

This architecture embodies many of the principles discussed on this site:
- Decentralized yet coordinated information management
- Open protocols for knowledge sharing
- Bottom-up organization through organic linking
- Composable tools that can evolve with needs
- Balance of local autonomy and global connectivity

For technical details on setting up a similar system, see:
- [Quartz Documentation](https://quartz.jzhao.xyz/)
- [GitHub Repository for this site](https://github.com/DarrenZal)
