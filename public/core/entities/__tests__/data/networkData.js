module.exports = {
  sourceNetMermaidString: `\`\`\`mermaid
flowchart LR
A --- B
B --- C
C --- D
E --- F
F --- G
G --- H
A --- F
G --- D
I --- J
K --- L
M
\`\`\``,
  removeEdges1: `\`\`\`mermaid
flowchart LR
A --- B
B --- C
C --- D
E --- F
F --- G
G --- H
A --- F
G --- D
K --- L
M
\`\`\``,
  removeEdges2: `\`\`\`mermaid
flowchart LR
A --- B
B --- C
C --- D
E --- F
F --- G
G --- H
A --- F
G --- D
K --- L
I
J
M
\`\`\``,
  removeNodes1: `\`\`\`mermaid
flowchart LR
C --- D
E --- F
F --- G
G --- H
A --- F
G --- D
I --- J
K --- L
M
\`\`\``,
  removeNodes2: `\`\`\`mermaid
flowchart LR
A --- B
B --- C
C --- D
E --- F
F --- G
G --- H
A --- F
G --- D
I --- J
K --- L
M
\`\`\``,
  moveEdge1: `\`\`\`mermaid
flowchart LR
A --- B
I --- J

\`\`\``,
};
