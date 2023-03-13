const { expect } = require('chai');
const generateTestNetwork = require('..');

describe('generateTestNetwork', () => {
  it(`Works`, () => {
    const network = generateTestNetwork();
    expect(network.mermaidString).to.equal(
      `\`\`\`mermaid
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
    );
  });
});
