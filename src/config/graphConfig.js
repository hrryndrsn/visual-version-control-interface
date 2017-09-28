module.exports = {
  layout: {
    name: 'dagre',
    rankDir: 'LR',
    padding: 50,
  },
  style: [
    {
      selector: 'node',
      style: {
        'content': 'data(id)',
        'text-opacity': 0.5,
        'text-valign': 'bottom',
        'text-halign': 'center',
        'background-color': '#11479e'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 4,
        'target-arrow-shape': 'triangle',
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
        'curve-style': 'bezier'
      }
    }
  ],
}