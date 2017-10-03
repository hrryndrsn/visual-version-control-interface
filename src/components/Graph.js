import React, {Component} from 'react';
import ReactCytoscape from './ReactCytoscape';
import Mousetrap from 'mousetrap';
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

    //id generating function
    const stringGen = function(len) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < len; i++ )
            text += charset.charAt(Math.floor(Math.random() * charset.length)
        );
        return text;
    }

    // create node at mouse location if shift is pressed
    cy.on('click', function(event) {
      let shiftPressed = event.originalEvent.shiftKey
      let mousePos = event.renderedPosition
      

      if (event.target === cy && shiftPressed) {
        cy.add([
          { group: "nodes", data: { id: stringGen(4) }, renderedPosition: mousePos },
        ]);

        console.log(cy.elements().jsons());
      }
    });

    // Node select handler - should emit event here 
    cy.on('select', 'node', function(event) {
      console.log('node selected', event.target._private.data);
    })

    // Node 'freed', on drag stopped   
    cy.on('free', 'node', function(event) {
      console.log(cy.elements().jsons());
    })

    //Delete selected node with backspace
    Mousetrap.bind('backspace', function() {
        cy.remove(':selected');
        console.log(cy.elements().jsons());
    });
    
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