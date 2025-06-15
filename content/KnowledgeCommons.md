---
title: Knowledge Commons
type: :Concept
summary: "Shared resources of information, data, and content that are collectively owned and managed by a community of users, characterized by non-subtractible access and collaborative governance frameworks."
aliases: [knowledge commons, commons, knowledge sharing, collective intelligence]
date: 2024-10-15

relationships:
  - predicate: :relatedTo
    object: OpenProtocols.md
    description: "Relies on enabling institutions like open protocols"
  - predicate: :leverages
    object: SemanticDensityPrinciple.md
    description: "Benefits from effective representation for accessibility"
  - predicate: :relatedTo
    object: PercolationFunding.md
    description: "May use percolation funding for sustainability"
  - predicate: :relatedTo
    object: BioregionalKnowledgeCommonsSummary.md
    description: "Implemented in place-based and bioregional contexts"
  - predicate: :relatedTo
    object: KnowledgeGraph.md
    description: "Knowledge graphs serve as infrastructure for commons"
  - predicate: :relatedTo
    object: DiscourseGraphs.md
    description: "Discourse graphs map collective understanding"
  - predicate: :relatedTo
    object: GraphsForDeSci.md
    description: "DeSci initiatives build knowledge commons for research"
  - predicate: :relatedTo
    object: cosmolocalism.md
    description: "Intersects through globally shared knowledge"

semantic_triples:
  - subject: self
    predicate: :isa
    object: "shared resource"
  - subject: self
    predicate: :isCharacterizedBy
    object: "non-subtractible access"
  - subject: self
    predicate: :requires
    object: "community governance"
  - subject: self
    predicate: :enables
    object: "collaborative creation"
  - subject: self
    predicate: :promotes
    object: "equitable access"
  - subject: "Wikipedia"
    predicate: :isa
    object: self
  - subject: "open-source software"
    predicate: :isa
    object: self
  - subject: self
    predicate: :faces
    object: "enclosure challenges"
  - subject: self
    predicate: :requires
    object: "sustainable governance models"
---

A **Knowledge Commons** refers to shared resources of information, data, and content that are collectively owned and managed by a community of users. A key characteristic, particularly for digital resources, is that they are **non-subtractible** (or non-rivalrous), meaning multiple users can access the same resources without affecting their quantity or quality[^wiki]. The concept builds upon the traditional idea of the commons (like shared land or water resources) but applies it to the realm of intellectual and cultural works.

Some perspectives, like Simon Grant's, emphasize that a true knowledge commons is deeply connected to a **community of practice** – a group that actively *uses* and governs the knowledge they curate, rather than simply being a repository[^grant].

## Core Principles

Knowledge commons are often characterized by several core principles, drawing from various definitions [^opencivics][^wiki]:

1.  **Shared Resources:** The core element is a body of knowledge or information (data, research, literature, code, designs, etc.).
2.  **Community:** A community of users and contributors who collaboratively create, share, manage, and *use* the resource.
3.  **Governance & Management:** Rules, norms, and processes (formal or informal) that govern the creation, management, access, and use of the knowledge resources. This involves shared governance, community involvement, and often relies on enabling institutions like [[OpenProtocols|Open Protocols]] or specific licensing frameworks (e.g., Creative Commons, Copyleft licenses like GPL) to prevent enclosure and ensure openness[^wiki]. Key design principles often include [^opencivics]:
    *   **Accessibility:** Ensuring resources are easily accessible (see [[SemanticDensityPrinciple|Semantic Density Principle]] regarding effective representation).
    *   **Participation:** Encouraging active community involvement.
    *   **Collaboration:** Fostering a cooperative environment.
    *   **Sustainability:** Ensuring long-term viability.
    *   **Equity:** Promoting fair access and representation.
4.  **Sustainability:** Mechanisms to ensure the long-term viability and health of the commons, addressing both resource maintenance and community engagement. This could relate to funding models like [[PercolationFunding|Percolation Funding]] or strategies tailored to whether the commons operates in a commercial or non-commercial context[^grant].

## Types of Knowledge Commons

Knowledge commons can take many forms, including:

*   **Digital Commons:** Online repositories, open-source software projects, open data initiatives, platforms like Wikipedia.
*   **Academic Commons:** Open access journals, institutional repositories, shared research data.
*   **Cultural Commons:** Digital libraries, archives of traditional knowledge, collaborative art projects.
*   **Design Commons:** Open-source hardware designs, shared fabrication spaces (makerspaces).
*   **Place-Based or Bioregional Commons:** Knowledge commons focused on specific geographical areas, integrating ecological, social, and cultural knowledge, such as a [[BioregionalKnowledgeCommons]].
*   **Implementation Examples:** Can range from large platforms like Wikipedia to specific approaches like federated wikis or open-source markdown libraries managed via version control (e.g., Git) [^opencivics].

## Relationship to Other Concepts

*   **[[KnowledgeGraph|Knowledge Graph]]**: Can be seen as a specific type of knowledge commons infrastructure, organizing shared knowledge in a structured way.
*   **[[DiscourseGraphs|Discourse Graphs]]**: May be used within a knowledge commons to map conversations and collective understanding around the shared knowledge.
*   **[[GraphsForDeSci|Graphs for DeSci]]**: DeSci initiatives often aim to build knowledge commons for scientific research, leveraging graph structures.
*   **[[cosmolocalism|Cosmolocalism]]**: This concept intersects with knowledge commons by advocating for globally shared knowledge combined with local production capabilities.

## Challenges

Managing a knowledge commons involves addressing challenges such as:

*   Ensuring equitable access and contribution.
*   Preventing enclosure or privatization of the shared resources (a challenge particularly noted in commercial contexts)[^grant].
*   Developing sustainable governance and funding models, which may differ significantly between non-commercial domains and areas competing with established commercial interests[^grant].
*   Maintaining the quality, integrity, and coherence of the knowledge, especially in distributed or rapidly evolving commons.
*   Addressing potential free-rider problems or exploitation, particularly where commercial entities might profit from community-created resources without contributing back[^grant].

The development and stewardship of knowledge commons are crucial for fostering innovation, collaboration, democratizing knowledge, and ensuring equitable access to information in the digital age[^opencivics].

---

[^grant]: Grant, Simon. (2023). *What IS a knowledge commons? My vision …* Retrieved from https://wiki.simongrant.org/doku.php/d:2023-09-09:
[^opencivics]: OpenCivics Wiki. *Knowledge Commons*. Retrieved from https://wiki.opencivics.co/OpenCivics+Concepts/Knowledge+Commons
[^wiki]: Wikipedia contributors. (n.d.). *Knowledge commons*. Wikipedia. Retrieved April 30, 2025, from https://en.wikipedia.org/wiki/Knowledge_commons
