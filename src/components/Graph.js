import React, {Component} from 'react';
import ReactCytoscape from './ReactCytoscape';
import '../style.css';

class Graph extends Component {
  
  getElements() {
    return {
			nodes: [
				{ data: { id: 'a', parent: 'b' }, position: { x: 215, y: 85 } },
				{ data: { id: 'b' } },
				{ data: { id: 'c', parent: 'b' }, position: { x: 300, y: 85 } },
				{ data: { id: 'd' }, position: { x: 215, y: 175 } },
				{ data: { id: 'e' } },
				{ data: { id: 'f', parent: 'e' }, position: { x: 300, y: 175 } }
			],
			edges: [
				{ data: { id: 'ad', source: 'a', target: 'd' } },
				{ data: { id: 'eb', source: 'e', target: 'b' } }
			]
		};
  }

  customEventHandlers(cy) {
    /// access the cy core from this function
    this.cy = cy;

    cy.edgehandles({
      toggleOffOnLeave: true,
      handleNodes: "node",
      handleSize: 10,
      edgeType: function() {
        return 'flat';
      }
    });

    cy.on('click', function(event) {
      let shiftPressed = event.originalEvent.shiftKey
      let mousePos = event.renderedPosition
      let idNum = event.target.nodes().size();
      let idString = idNum.toString();

      if (event.target === cy && shiftPressed) {
        cy.add([
          { group: "nodes", data: { id: idString }, renderedPosition: mousePos },
        ]);
      }
    })
  } 

  render() {
    return (
      <ReactCytoscape 
        containerID="cy" 
        elements={this.getElements()} 
        cyRef={(cy) => {
          this.cy = cy; 
          console.log(this.cy);
          this.customEventHandlers(cy);
        }}
      />
    )
  }
}

export default Graph;