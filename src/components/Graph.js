import React, {Component} from 'react';
import ReactCytoscape from './ReactCytoscape';
import graphConfig from '../config/graphConfig';
import '../style.css';

class Graph extends Component {
  
  getElements() {
    return {

      
      nodes: [
        // { data: { id: 'n0' } },
        // { data: { id: 'n1' } },
        // { data: { id: 'n2' } },
        // { data: { id: 'n3' } },
        // { data: { id: 'n4' } },
        // { data: { id: 'n5' } },
        // { data: { id: 'n6' } },
        // { data: { id: 'n7' } },
        // { data: { id: 'n8' } },
        // { data: { id: 'n9' } },
        // { data: { id: 'n10' } }
      ],
      edges: [
        // { data: { source: 'n0', target: 'n1' } },
        // { data: { source: 'n1', target: 'n2' } },
        // { data: { source: 'n1', target: 'n3' } },
        // { data: { source: 'n4', target: 'n5' } },
        // { data: { source: 'n4', target: 'n6' } },
        // { data: { source: 'n6', target: 'n7' } },
        // { data: { source: 'n6', target: 'n8' } },
        // { data: { source: 'n8', target: 'n9' } },
        // { data: { source: 'n8', target: 'n10' } }
      ]
    }
  }

  customEventHandlers(cy) {
    /// access the cy core from this function
    this.cy = cy;
    
    let selectedNodeId;

    //init settings for edgehandle extendtion
    cy.edgehandles({
      toggleOffOnLeave: true,
      handleNodes: "node",
      handleSize: 10,
      handlePosition: "middle middle",
      edgeType: function() {
        return 'flat';
      }
    });

    // create node at mouse location if shift is pressed
    cy.on('click', function(event) {
      let shiftPressed = event.originalEvent.shiftKey
      let mousePos = event.renderedPosition
      let idNum = event.target.nodes().size();
      let idString = idNum.toString();

      if (event.target === cy && shiftPressed) {
        cy.add([
          { group: "nodes", data: { id: "n" + idString }, renderedPosition: mousePos },
        ]);
      }
    });

    // Node select handler - should emit event here 
    cy.on('select', 'node', function(event) {
      console.log('node selected', event.target._private.data);
    })

    cy.on('free', 'node', function(event) {
      console.log('node moved!')
      let graphElements = cy._private.elements;
      console.log(graphElements);
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
        layout={graphConfig.layout}
        style={graphConfig.style}
      />
    )
  }
}

export default Graph;