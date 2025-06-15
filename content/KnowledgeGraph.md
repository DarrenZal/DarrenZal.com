---
title: Knowledge Graph
type: :Technology
summary: "A structured representation of facts, entities, and their interrelationships stored in a graph format, prioritizing connections, semantics, and contextual richness over traditional tabular schemas."
aliases: [KG, semantic network, graph-structured knowledge base]
backlinks: true
date: 2024-10-10

relationships:
  - predicate: :relatedTo
    object: DiscourseGraphs.md
    description: "Discourse graphs are a specialized form of knowledge graph"
  - predicate: :relatedTo
    object: SemanticDensityPrinciple.md
    description: "Referenced for ontology and reasoning effectiveness"
  - predicate: :usesTechnology
    object: OpenProtocols.md
    description: "Supports development and evolution of open protocols"
  - predicate: :relatedTo
    object: GraphsForDeSci.md
    description: "Applied in decentralized science contexts"
  - predicate: :relatedTo
    object: BioregionalKnowledgeCommons.md
    description: "Used for bioregional mapping and knowledge commons"

semantic_triples:
  - subject: "wd:Wikidata"
    predicate: :isa
    object: self
  - subject: "wd:Google"
    predicate: :usesTechnology
    object: self
  - subject: DiscourseGraphs.md
    predicate: :leverages
    object: self
  - subject: self
    predicate: :usesTechnology
    object: "RDF"
  - subject: self
    predicate: :usesTechnology
    object: "JSON-LD"
  - subject: self
    predicate: :usesTechnology
    object: "SPARQL"
---

## Overview

A **knowledge graph** is a graph-structured knowledge base used to represent and operate on data by explicitly modeling entities and the relationships between them. Unlike traditional databases, which emphasize discrete entities and tabular schemas, knowledge graphs prioritize **connections**, **semantics**, and **contextual richness**.

> "A knowledge graph is a digital structure that represents knowledge as concepts and the relationships between them (facts). It can include an ontology that allows both humans and machines to understand and reason about its contents." — [Wikipedia](https://en.wikipedia.org/wiki/Knowledge_graph)

## Core Concepts

- **Entities**: Objects, people, places, concepts
    
- **Relationships**: Semantic links between entities (e.g., "livesIn", "foundedBy")
    
- **Triples**: Subject-Predicate-Object statements (e.g., "Ada Lovelace" — "contributedTo" — "Computing")
    
- **Ontologies**: Formal definitions of types and relationships (e.g., RDF, OWL) (see [[SemanticDensityPrinciple|Semantic Density Principle]] for effectiveness)
    
- **Reasoning**: Inferring new knowledge from existing triples via logic (see [[SemanticDensityPrinciple|Semantic Density Principle]] for effectiveness)
    
- **Embedding**: Vector-based representation of nodes/edges for ML applications
    

## Historical Context

Knowledge graphs emerged from semantic network research in the 1970s, evolving through:

- **WordNet** (1985): Lexical graph of semantic word relationships
    
- **Freebase & DBpedia** (2007): Structured knowledge from Wikipedia
    
- **Google Knowledge Graph** (2012): Mainstream adoption for search enhancement
    

## Applications

- **Search & Recommendations** (Google, Amazon, Facebook)
    
- **Scientific Research** (genomics, proteomics)
    
- **Virtual Assistants** (Siri, Alexa)
    
- **Personal Knowledge Management** (Obsidian, Roam Research)
    
- **Decentralized Knowledge Commons** (Wikidata, DeSci)
    
## Discourse Graphs: Civic & Scientific Knowledge Commons

A specialized form of knowledge graph, **discourse graphs** model:

- **Questions**, **claims**, **evidence**, and their logical links
    
- Structured debate and collective intelligence
    
- Used for **civic deliberation**, **scientific inquiry**, and **protocol evolution**
    

Discourse graphs are essential for:

- Mapping **collective knowledge** and **emergent insights**
    
- Supporting **decentralized science (DeSci)** and **civic learning loops**
    
- Creating **open protocol libraries** and evolving governance tools
    

> "Discourse graphs enable protocol implementation to generate evidence and feedback loops that inform new hypotheses and adaptations across regions." — _Discourse Graphs for Civic Knowledge Commons_, Apr 2025

## From Separation to Relationality

Modern relational paradigms (linked data, semantic web, graph DBs) reflect a civilizational shift:

|Paradigm Shift|From|To|
|---|---|---|
|Knowledge Representation|Tables, silos|Graphs, linked data|
|Data Ownership|Centralized extraction|Federated, commons-based|
|Epistemology|Objective fragmentation|Participatory relationality|
|Knowledge Stewardship|Consumption|Co-creation & commoning|

Knowledge graphs support this transition by:

- Structuring semantic relationships
    
- Facilitating cross-domain synthesis
    
- Enabling AI-human collaboration
    
- Anchoring data in **place-based** and **value-aligned** contexts
    

## Technical Highlights

- **Standards**: RDF, OWL, JSON-LD, SPARQL
    
- **Tools**: Neo4j, GraphDB, TerminusDB, OriginTrail
    
- **Use Cases**: Personal wikis, bioregional mapping, protocol development, research synthesis, [[GraphsForDeSci|DeSci]], [[BioregionalKnowledgeCommons|Bioregional Knowledge Commons]]
    
- **Integrations**: Web3, AI agents, semantic search, decentralized storage
    

## References

- [Wikipedia: Knowledge Graph](https://en.wikipedia.org/wiki/Knowledge_graph)
    
- [[DiscourseGraphs|Discourse Graphs for Civic Knowledge Commons]]
    
- [[GraphsForDeSci|Discourse Graphs for DeSci]]
    
- [From Seperation To Connection](FromSeperationToConnection)
