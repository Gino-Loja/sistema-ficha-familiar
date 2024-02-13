// import '../App.css';
"use client";
import React, { Component, useState } from "react";

import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import { saveImagenGenograma } from "@/app/action";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

var genoData;
var diagram;
function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  go.Diagram.licenseKey = "adsfewfwaefasdfdsfs";
  diagram = $(go.Diagram, {
    initialDocumentSpot: go.Spot.Bottom,
    initialViewportSpot: go.Spot.Bottom,
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    initialAutoScale: go.Diagram.Uniform,
    "clickCreatingTool.archetypeNodeData": {
      text: "new node",
      color: "lightblue",
    },
    model: $(go.GraphLinksModel, {
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),

    nodeSelectionAdornmentTemplate: $(
      go.Adornment,
      "Auto",
      { layerName: "Grid" }, // the predefined layer that is behind everything else
      $(go.Shape, "Circle", { fill: "#c1cee3", stroke: null }),
      $(go.Placeholder, { margin: 2 })
    ),
    // use a custom layout, defined below
    layout: $(GenogramLayout, {
      direction: 90,
      layerSpacing: 30,
      columnSpacing: 10,
    }),
  });

  function attrFill(a) {
    switch (a) {
      case "A":
        return "#00af54"; // green
      case "B":
        return "#f27935"; // orange
      case "C":
        return "#d4071c"; // red
      case "D":
        return "#70bdc2"; // cyan
      case "E":
        return "#fcf384"; // gold
      case "F":
        return "#e69aaf"; // pink
      case "G":
        return "#08488f"; // blue
      case "H":
        return "#866310"; // brown
      case "I":
        return "#9270c2"; // purple
      case "J":
        return "#a3cf62"; // chartreuse
      case "K":
        return "#91a4c2"; // lightgray bluish
      case "L":
        return "#af70c2"; // magenta
      case "S":
        return "#000000"; // black

      case "M":
        return "#d4071c"; // red
      default:
        return "transparent";
    }
  }

  var tlsq = go.Geometry.parse("F M1 1 l19 0 0 19 -19 0z");
  var trsq = go.Geometry.parse("F M20 1 l19 0 0 19 -19 0z");
  var brsq = go.Geometry.parse("F M20 20 l19 0 0 19 -19 0z");
  var blsq = go.Geometry.parse("F M1 20 l19 0 0 19 -19 0z");
  var slash = go.Geometry.parse(
    "F M38 0 L40 0 40 2 2 40 0 40 0 38z" + "F M40 38 L40 40 38 40 0 2 0 0 2 0z"
  ); //aqui
  var plus = go.Geometry.parse(
    "F M0 0 L80 0 B-90 90 80 20 20 20 L100 100 20 100 B90 90 20 80 20 20z"
  );
  var flecha = go.Geometry.parse(
    "M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
  );
  function maleGeometry(a) {
    switch (a) {
      case "A":
        return tlsq;
      case "B":
        return tlsq;
      case "C":
        return tlsq;
      case "D":
        return trsq;
      case "E":
        return trsq;
      case "F":
        return trsq;
      case "G":
        return brsq;
      case "H":
        return brsq;
      case "I":
        return brsq;
      case "J":
        return blsq;
      case "K":
        return blsq;
      case "L":
        return blsq;
      case "S":
        return slash;
      case "M":
        return plus;
      default:
        return tlsq;
    }
  }
  var tlarc = go.Geometry.parse("F M20 20 B 180 90 20 20 19 19 z");
  var trarc = go.Geometry.parse("F M20 20 B 270 90 20 20 19 19 z");
  var brarc = go.Geometry.parse("F M20 20 B 0 90 20 20 19 19 z");
  var blarc = go.Geometry.parse("F M20 20 B 90 90 20 20 19 19 z");
  function femaleGeometry(a) {
    switch (a) {
      case "A":
        return tlarc;
      case "B":
        return tlarc;
      case "C":
        return tlarc;
      case "D":
        return trarc;
      case "E":
        return trarc;
      case "F":
        return trarc;
      case "G":
        return brarc;
      case "H":
        return brarc;
      case "I":
        return brarc;
      case "J":
        return blarc;
      case "K":
        return blarc;
      case "L":
        return blarc;
      case "AP":
        return flecha;
      case "M":
        return plus;
      default:
        return tlarc;
    }
  }

  function colorApuntador(a) {
    switch (a) {
      case "AP":
        return "#000000";
      default:
        return "transparent";
    }
  }
  //hombre
  diagram.nodeTemplateMap.add(
    "M",
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },

      $(
        go.Panel,
        "Spot",
        {
          itemTemplate: $(
            go.Panel,
            $(
              go.Shape,
              {
                strokeWidth: 1,
                height: 40,
                width: 30,
                margin: 2,
                angle: -25,
              },

              new go.Binding("stroke", "", colorApuntador),
              new go.Binding("fill", "", colorApuntador),
              new go.Binding("geometry", "", (e) => {
                if (e == "AP") {
                  return flecha;
                } else {
                  return tlarc;
                }
              })
            ),
            { alignment: new go.Spot(0, 1, -40, 0) }
          ),
        },
        new go.Binding("itemArray", "a")
      ),

      $(
        go.Panel,
        "Auto",
        { name: "ICON" },
        $(
          go.Shape,
          "Square",
          {
            width: 40,
            height: 40,
            strokeWidth: 2,
            //background:"red",
            fill: "white",
            stroke: "#919191",
            portId: "",
          },
          new go.Binding("fill", "a", (e) => {
            //console.log(e);
            if (e.includes("NF")) {
              return "#0B9BFE";
            } else {
              return "white";
            }
          })
        ),
        //new go.Binding("itemArray", "a"),

        $(
          go.Panel,
          {
            itemTemplate: $(
              go.Panel,
              $(
                go.Shape,
                { stroke: null, strokeWidth: 0 },
                new go.Binding("fill", "", attrFill),

                new go.Binding("geometry", "", maleGeometry)
              )
            ),
          },
          new go.Binding("itemArray", "a")
        ),

        $(
          go.TextBlock,
          {
            textAlign: "center",
            verticalAlignment: go.Spot.Center,
            maxSize: new go.Size(80, NaN),
            font: "16px serif",
            editable: true,
          },
          new go.Binding("text", "anios")
        )
      ),

      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(80, NaN), editable: true },
        new go.Binding("text", "n")
      ),

      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(100, NaN), editable: true },
        new go.Binding("text", "codigo")
      )
    )
  );
  //mujer
  diagram.nodeTemplateMap.add(
    "F", // female
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },
      //new go.Binding("itemArray", "a"),

      $(
        go.Panel,
        "Spot",
        {
          itemTemplate: $(
            go.Panel,
            $(
              go.Shape,
              {
                strokeWidth: 1,
                height: 40,
                width: 30,
                margin: 2,

                angle: 20,
              },
              new go.Binding("stroke", "", colorApuntador),
              new go.Binding("fill", "", colorApuntador),
              new go.Binding("geometry", "", (e) => {
                if (e == "AP") {
                  return flecha;
                } else {
                  return tlarc;
                }
              })
            ),
            { alignment: new go.Spot(0, 1, 50, 0) }
          ),
        },
        new go.Binding("itemArray", "a")
      ),

      $(
        go.Panel,
        "Auto",
        { name: "ICON" },
        $(
          go.Shape,
          "Circle",
          {
            width: 40,
            height: 40,
            strokeWidth: 2,
            fill: "white",
            stroke: "#a1a1a1",
            portId: "",
          },
          new go.Binding("fill", "a", (e) => {
            console.log(e);
            if (e.includes("NF")) {
              return "#0B9BFE";
            } else {
              return "white";
            }
          })
        ),
        $(
          go.Panel,
          {
            // for each attribute show a Shape at a particular place in the overall circle
            itemTemplate: $(
              go.Panel,
              $(
                go.Shape,
                { stroke: null, strokeWidth: 0 },
                new go.Binding("fill", "", attrFill),
                new go.Binding("geometry", "", maleGeometry)
              )
            ),
            margin: 1,
          },
          new go.Binding("itemArray", "a")
        ),
        $(
          go.TextBlock,
          {
            textAlign: "center",
            verticalAlignment: go.Spot.Center,
            maxSize: new go.Size(80, NaN),
            font: "16px serif",
            editable: true,
          },
          new go.Binding("text", "anios")
        )
      ),
      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(80, NaN), editable: true },
        new go.Binding("text", "n")
      ),
      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(100, NaN), editable: true },
        new go.Binding("text", "codigo")
      )
    )
  );
  //Embarazada
  diagram.nodeTemplateMap.add(
    "embarazada", // Miscarriage
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },
      $(
        go.Panel,
        "Spot",
        {
          itemTemplate: $(
            go.Panel,
            $(
              go.Shape,
              {
                strokeWidth: 1,
                height: 40,
                width: 30,
                margin: 2,
                angle: 25,
              },
              new go.Binding("stroke", "", colorApuntador),
              new go.Binding("fill", "", colorApuntador),
              new go.Binding("geometry", "", (e) => {
                if (e == "AP") {
                  return flecha;
                } else {
                  return tlarc;
                }
              })
            ),

            { alignment: new go.Spot(0, 1, 50, 0) }
          ),
        },
        new go.Binding("itemArray", "a")
      ),

      $(
        go.Panel,
        "Auto",
        { name: "ICON" },
        $(go.Shape, "Triangle", {
          width: 40,
          height: 40,
          strokeWidth: 2,
          fill: "white",
          stroke: "#a1a1a1",
          portId: "",
        }),
        $(
          go.Panel,
          {
            // for each attribute show a Shape at a particular place in the overall circle
            itemTemplate: $(
              go.Panel,
              $(
                go.Shape,
                { stroke: null, strokeWidth: 0 },
                new go.Binding("fill", "", attrFill),
                new go.Binding("geometry", "", maleGeometry)
              )
            ),
            margin: 1,
          },
          new go.Binding("itemArray", "a")
        ),

        $(
          go.TextBlock,
          {
            textAlign: "center",
            verticalAlignment: go.Spot.Center,
            maxSize: new go.Size(80, NaN),
            font: "16px serif",
            editable: true,
          },
          new go.Binding("text", "anios")
        )
      ),

      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(80, NaN), editable: true },
        new go.Binding("text", "n")
      ),
      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(100, NaN), editable: true },
        new go.Binding("text", "codigo")
      )
    )
  );
  //hijastro
  diagram.nodeTemplateMap.add(
    "hijastro", // Miscarriage
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },
      $(
        go.Panel,
        "Spot",
        {
          itemTemplate: $(
            go.Panel,
            $(
              go.Shape,
              {
                strokeWidth: 1,
                height: 40,
                width: 30,
                margin: 2,
                angle: -25,
                //alignment: go.Spot.TopLeft
              },
              new go.Binding("stroke", "", colorApuntador),
              new go.Binding("fill", "", colorApuntador),
              new go.Binding("geometry", "", (e) => {
                if (e == "AP") {
                  return flecha;
                } else {
                  return tlarc;
                }
              })
            ),
            { alignment: new go.Spot(0, 1, -40, 0) }
          ),
          alignment: go.Spot.TopLeft,
        },
        new go.Binding("itemArray", "a")
      ),
      //new go.Binding("itemArray", "a"),

      $(
        go.Panel,
        "Auto",
        { name: "ICON" },

        $(
          go.Shape,
          {
            width: 50,
            height: 50,
            strokeWidth: 1.5,
            fill: "white",
            background: "white",
            portId: "",
            stroke: "#a1a1a1",
            geometryString: `M228.79999 154.8 h106 v78 h-106 Z 
          M210.79999 131.8 v121.99999
          M353.79999 133.33124 v121.46876
          M211.36188 132.79072l24.24744 -0.54752
          M210.36144 253.85543h16.26506
          M353.20314 254.806l-17.98763 -0.40951
          M332.84689 134.31563l20.6875 -0.21875`,
          },
          new go.Binding("fill", "a", (e) => {
            console.log(e);
            if (e.includes("S")) {
              return "#0B9BFE";
            } else {
              return "white";
            }
          })
        ),

        $(
          go.Panel,
          {
            itemTemplate: $(
              go.Panel,
              $(
                go.Shape,
                { stroke: null, strokeWidth: 0 },
                new go.Binding("fill", "", attrFill),
                new go.Binding("geometry", "", maleGeometry)
              )
            ),
          },
          new go.Binding("itemArray", "a")
        ),

        $(
          go.TextBlock,
          {
            textAlign: "center",
            verticalAlignment: go.Spot.Center,
            maxSize: new go.Size(80, NaN),
            font: "16px serif",
            editable: true,
          },
          new go.Binding("text", "anios")
        )
      ),

      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(80, NaN), editable: true },
        new go.Binding("text", "n")
      ),
      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(100, NaN), editable: true },
        new go.Binding("text", "codigo")
      )
    )
  );
  //hijastra
  diagram.nodeTemplateMap.add(
    "hijastra", // Miscarriage
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },
      $(
        go.Panel,
        "Spot",
        {
          itemTemplate: $(
            go.Panel,
            $(
              go.Shape,
              {
                strokeWidth: 1,
                height: 40,
                width: 30,
                margin: 2,
                angle: 25,
              },
              new go.Binding("stroke", "", colorApuntador),
              new go.Binding("fill", "", colorApuntador),
              new go.Binding("geometry", "", (e) => {
                if (e == "AP") {
                  return flecha;
                } else {
                  return tlarc;
                }
              })
            ),
            { alignment: new go.Spot(0, 1, 50, 0) }
          ),
        },
        new go.Binding("itemArray", "a")
      ),
      //aqui
      ///new go.Binding("itemArray", "a"),

      $(
        go.Panel,
        "Auto",
        { name: "ICON" },

        $(
          go.Shape,
          {
            width: 50,
            height: 50,
            strokeWidth: 1.5,
            fill: "white",
            background: "white",
            stroke: "#a1a1a1",

            geometryString: `M210.79999 137.0356 v116.76439
          M353.79999 133.33124 v121.46876
          M210.66501 136.97191l24.24744 -0.54752
          M210.36144 253.85543h16.26506
          M353.20314 254.806l-17.98763 -0.40951
          M332.84689 134.31563l20.6875 -0.21875
          M280 146.77868a48.83721 48.83721 0 1 0 0 97.67442a48.83721 48.83721 0 1 0 0 -97.67442`,
          },
          new go.Binding("fill", "a", (e) => {
            console.log(e);
            if (e.includes("S")) {
              return "#0B9BFE";
            } else {
              return "white";
            }
          })
        ),
        $(
          go.Panel,
          {
            itemTemplate: $(
              go.Panel,
              $(
                go.Shape,
                { stroke: null, strokeWidth: 0 },
                new go.Binding("fill", "", attrFill),
                new go.Binding("geometry", "", maleGeometry)
              )
            ),
          },
          new go.Binding("itemArray", "a")
        ),
        $(
          go.TextBlock,
          {
            textAlign: "center",
            verticalAlignment: go.Spot.Center,
            maxSize: new go.Size(80, NaN),
            font: "16px serif",
            editable: true,
          },
          new go.Binding("text", "anios")
        )
      ),

      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(80, NaN), editable: true },
        new go.Binding("text", "n")
      ),
      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(100, NaN), editable: true },
        new go.Binding("text", "codigo")
      )
    )
  );
  // padre soltero
  diagram.nodeTemplateMap.add(
    "padreSoltero", // Miscarriage
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },
      $(
        go.Panel,
        "Spot",
        {
          itemTemplate: $(
            go.Panel,
            $(
              go.Shape,
              {
                strokeWidth: 1,
                height: 40,
                width: 30,
                margin: 2,
                angle: -25,
              },
              new go.Binding("stroke", "", colorApuntador),
              new go.Binding("fill", "", colorApuntador),
              new go.Binding("geometry", "", (e) => {
                if (e == "AP") {
                  return flecha;
                } else {
                  return tlarc;
                }
              })
            ),
            { alignment: new go.Spot(0, 1, -40, 0) }
          ),
        },
        new go.Binding("itemArray", "a")
      ),
      // new go.Binding("itemArray", "a"),

      $(
        go.Panel,
        "Auto",
        { name: "ICON" },

        $(
          go.Shape,
          {
            width: 50,
            height: 50,
            strokeWidth: 1.5,
            fill: "white",

            stroke: "#a1a1a1",

            geometryString: `M213.64101 146.38252
          l64.61785 -71.9508
          l64.61785 71.9508
          l-64.61785 71.9508
          l-64.61785 -71.9508
          M184.57216 59.57192
          h186.42883
          v171.42881
          h-186.42883
          v-171.42881`,
          },
          new go.Binding("fill", "a", (e) => {
            console.log(e);
            if (e.includes("S")) {
              return "#0B9BFE";
            } else {
              return "white";
            }
          })
        ),
        $(
          go.Panel,
          {
            itemTemplate: $(
              go.Panel,
              $(
                go.Shape,
                { stroke: null, strokeWidth: 0 },
                new go.Binding("fill", "", attrFill),
                new go.Binding("geometry", "", maleGeometry)
              )
            ),
          },
          new go.Binding("itemArray", "a")
        ),

        $(
          go.TextBlock,
          {
            textAlign: "center",
            verticalAlignment: go.Spot.Center,
            maxSize: new go.Size(80, NaN),
            font: "16px serif",
            editable: true,
          },
          new go.Binding("text", "anios")
        )
      ),

      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(80, NaN), editable: true },
        new go.Binding("text", "n")
      ),
      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(100, NaN), editable: true },
        new go.Binding("text", "codigo")
      )
    )
  );
  //madre soltera
  diagram.nodeTemplateMap.add(
    "madreSoltera", // Miscarriage
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },
      $(
        go.Panel,
        "Spot",
        {
          itemTemplate: $(
            go.Panel,
            $(
              go.Shape,
              {
                strokeWidth: 1,
                height: 40,
                width: 30,
                margin: 2,
                angle: 25,
              },
              new go.Binding("stroke", "", colorApuntador),
              new go.Binding("fill", "", colorApuntador),
              new go.Binding("geometry", "", (e) => {
                if (e == "AP") {
                  return flecha;
                } else {
                  return tlarc;
                }
              })
            ),
            { alignment: new go.Spot(0, 1, 50, 0) }
          ),
        },
        new go.Binding("itemArray", "a")
      ),
      //new go.Binding("itemArray", "a"),

      $(
        go.Panel,
        "Auto",
        { name: "ICON" },

        $(
          go.Shape,
          {
            width: 50,
            height: 50,
            strokeWidth: 1.5,
            fill: "white",

            stroke: "#a1a1a1",

            geometryString: `M230.79999 322.29999
          m-109 0
          a109 106.5 0 1 0 218 0
          a109 106.5 0 1 0 -218 0
          M144.98099 322.966
          l83 -95.50001
          l83 95.50001
          l-83 95.50001
          l-83 -95.50001`,
          },
          new go.Binding("fill", "a", (e) => {
            console.log(e);
            if (e.includes("S")) {
              return "#0B9BFE";
            } else {
              return "white";
            }
          })
        ),

        $(
          go.Panel,
          {
            itemTemplate: $(
              go.Panel,
              $(
                go.Shape,
                { stroke: null, strokeWidth: 0 },
                new go.Binding("fill", "", attrFill),
                new go.Binding("geometry", "", maleGeometry)
              )
            ),
          },
          new go.Binding("itemArray", "a")
        ),

        $(
          go.TextBlock,
          {
            textAlign: "center",
            verticalAlignment: go.Spot.Center,
            maxSize: new go.Size(80, NaN),
            font: "16px serif",
            editable: true,
          },
          new go.Binding("text", "anios")
        )
      ),
      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(80, NaN), editable: true },
        new go.Binding("text", "n")
      ),
      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(100, NaN), editable: true },
        new go.Binding("text", "codigo")
      )
    )
  );

  //aborto-espontaneo
  diagram.nodeTemplateMap.add(
    "ESPONTÁNEO", // Miscarriage
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },
      $(
        go.Panel,
        "Auto",
        { name: "ICON" },

        $(go.Shape, "Circle", {
          width: 35,
          height: 35,
          strokeWidth: 1.5,
          fill: "black",

          stroke: "#a1a1a1",
        })
      )
    )
  );
  diagram.nodeTemplateMap.add(
    "INDUCIDO", // Miscarriage
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },
      $(
        go.Panel,
        "Auto",
        { name: "ICON" },

        $(go.Shape, "XLine", {
          width: 25,
          height: 25,
          strokeWidth: 3,
          fill: "white",

          stroke: "black",
        })
      )
    )
  );

  diagram.nodeTemplateMap.add(
    "LinkLabel",
    $(go.Node, {
      selectable: false,
      width: 1,
      height: 1,
      fromEndSegmentLength: 20,
    })
  );

  setupDiagram(diagram, genoData, 4 /* focus on this person */);

  diagram.linkTemplate = // for parent-child relationships
    $(
      go.Link,
      new go.Binding("routing", "routing"),
      {
        corner: 5,
        layerName: "Background",
        selectable: false,
        fromSpot: go.Spot.Bottom,
        toSpot: go.Spot.Top,
      },
      $(go.Shape, { stroke: "#424242", strokeWidth: 2 })
    );
  //console.log("estableciendo casados");
  // let tipo_union;
  // genoData.forEach((persona) => {
  //   if (persona.ec === "CASADO/A" && persona.f !== null) {
  //     // Realizar alguna acción o condición cuando el estado civil es 'CASADO/A'
  //      $(
  //       go.Shape, // the link's path shape
  //       { isPanelMain: true, stroke: "transparent", strokeWidth: 3 },
  //       new go.Binding("pathPattern", () =>
  //         $(go.Shape, {
  //           geometryString: "M0 0 L1 0 M0 3 L1 3",

  //           fill: "transparent",
  //           stroke: "#5d8cc1",
  //           strokeWidth: 1.3,
  //           strokeCap: "square",
  //         })
  //       )
  //     );
  //   }
  // });

  //casados
  diagram.linkTemplateMap.add(
    "CASADO/A", // for marriage relationships
    $(
      go.Link,

      { selectable: false },
      $(
        go.Panel,
        "Vertical", // this whole Panel is a link label
        //$(go.Shape, "Circle", { fill: "yellow", stroke: "gray" }),
        $(
          go.TextBlock,
          {
            //margin: 3 ,

            alignment: go.Spot.Left,
            // segmentOrientation: go.Link.Auto,
          },
          new go.Binding("text", "fu")
        ),
        {
          height: 30,
        }
      ),

      $(
        go.Shape,
        { isPanelMain: true, stroke: "transparent", strokeWidth: 3 },

        {
          strokeWidth: 2.5,
          stroke: "#000000",
          geometryString: "M0 0 L1 0 M0 3 L1 3" /* blue */,
        }

        //new go.Binding("pathPattern", "patt", "M0 0 L1 0 M0 3 L1 3"),
      )
    )
  );
  //separacion
  diagram.linkTemplateMap.add(
    "SEPARACIÓN", // for marriage relationships
    $(
      go.Link,

      { selectable: false },
      $(
        go.Panel,
        "Vertical", // this whole Panel is a link label
        //$(go.Shape, "Circle", { fill: "yellow", stroke: "gray" }),
        $(
          go.TextBlock,
          {
            //margin: 3 ,

            alignment: go.Spot.Left,
            // segmentOrientation: go.Link.Auto,
          },
          new go.Binding("text", "fu")
        ),
        {
          height: 30,
        }
      ),
      $(
        go.Shape,
        {
          strokeWidth: 2.5,
          stroke: "#000000",
          geometryString: "M0 0 L1 0 M0 3 L1 3" /* blue */,
        }

        //new go.Binding("pathPattern", "patt", "M0 0 L1 0 M0 3 L1 3"),
      ),
      //tipo_union,

      $(go.Shape, {
        fill: "black",
        stroke: "black",
        strokeWidth: 2,
        segmentIndex: 0.1,
        segmentFraction: 0.7,

        // geometry:go.Geometry.parse(
        //   "F M20 0 l13 10"+"F M20 0 l13 10"
        // )
        //strokeDashArray: [4, 2] , lienas entrecortadas
        // This SVG-style path creates a thick "+" figure:,

        geometry: go.Geometry.parse("F M0 10 l13 -10"),
      }),
      $(
        go.TextBlock,
        {
          segmentOffset: new go.Point(0, -10),
          font: "16px serif",
          segmentOrientation: go.Link.OrientUpright,
        },
        new go.Binding("text", "fu")
      )
    )
  );
  // divorcio
  diagram.linkTemplateMap.add(
    "DIVORCIO", // for marriage relationships
    $(
      go.Link,

      { selectable: false },
      $(
        go.Panel,
        "Vertical", // this whole Panel is a link label
        //$(go.Shape, "Circle", { fill: "yellow", stroke: "gray" }),
        $(
          go.TextBlock,
          {
            //margin: 3 ,

            alignment: go.Spot.Left,
            // segmentOrientation: go.Link.Auto,
          },
          new go.Binding("text", "fu")
        ),
        {
          height: 30,
        }
      ),
      $(
        go.Shape,
        {
          strokeWidth: 2.5,
          stroke: "#000000",
          geometryString: "M0 0 L1 0 M0 3 L1 3" /* blue */,
        }

        //new go.Binding("pathPattern", "patt", "M0 0 L1 0 M0 3 L1 3"),
      ),
      //tipo_union,

      $(go.Shape, {
        fill: "black",
        stroke: "black",
        strokeWidth: 2,
        segmentIndex: 0.1,
        segmentFraction: 0.7,

        // geometry:go.Geometry.parse(
        //   "F M20 0 l13 10"+"F M20 0 l13 10"
        // )
        //strokeDashArray: [4, 2] , lienas entrecortadas
        // This SVG-style path creates a thick "+" figure:,

        geometry: go.Geometry.parse("F M0 10 l13 -10 M9 10 l13 -10"),
      })
    )
  );
  //union libre
  diagram.linkTemplateMap.add(
    "UNIÓN LIBRE", // for marriage relationships
    $(
      go.Link,

      { selectable: false },

      //tipo_union,
      //$(go.TextBlock, "left", { segmentOffset: new go.Point(0, -10) }),
      //$(go.Shape, { stroke: "transparent", fill: "transparent" }),

      $(
        go.Panel,
        "Vertical", // this whole Panel is a link label
        //$(go.Shape, "Circle", { fill: "yellow", stroke: "gray" }),
        $(
          go.TextBlock,
          {
            //margin: 3 ,

            alignment: go.Spot.Left,
            // segmentOrientation: go.Link.Auto,
          },
          new go.Binding("text", "fu")
        ),
        {
          height: 30,
        }
      ),

      // $(
      //   go.TextBlock,
      //   {
      //     segmentOffset: new go.Point(0, -10),
      //     //font: "16px serif",
      //     //segmentOrientation: go.Link.OrientUpright,
      //     //margin:20
      //   },
      //   new go.Binding("text", "fu"),
      //   new go.Binding("segmentOffset", new go.Point(0, -10)),
      //   new go.Binding("segmentOrientation", go.Link.OrientUpright)
      // ),

      $(
        go.Shape, // the link's path shape
        { isPanelMain: true, stroke: "transparent", strokeWidth: 3 },

        new go.Binding("pathPattern", () =>
          $(go.Shape, {
            geometryString: "M0 0 M4 0 L4.1 0",

            fill: "transparent",
            stroke: "#000000",
            strokeWidth: 1.3,
            strokeCap: "round",
          })
        )
      )
    )
  );

  //separacion libre
  diagram.linkTemplateMap.add(
    "UNION LIBRE SEPARADADOS", // for marriage relationships
    $(
      go.Link,

      { selectable: false },

      //tipo_union,
      $(
        go.Panel,
        "Vertical", // this whole Panel is a link label
        //$(go.Shape, "Circle", { fill: "yellow", stroke: "gray" }),
        $(
          go.TextBlock,
          {
            //margin: 3 ,

            alignment: go.Spot.Left,
            // segmentOrientation: go.Link.Auto,
          },
          new go.Binding("text", "fu")
        ),
        {
          height: 30,
        }
      ),
      $(
        go.Shape, // the link's path shape
        { isPanelMain: true, stroke: "transparent", strokeWidth: 3 },
        new go.Binding("pathPattern", () =>
          $(go.Shape, {
            geometryString: "M0 0 M4 0 L4.1 0",

            fill: "transparent",
            stroke: "#000000",
            strokeWidth: 1.3,
            strokeCap: "round",
          })
        )
      ),

      $(go.Shape, {
        fill: "black",
        stroke: "black",
        strokeWidth: 2,
        segmentIndex: 0.1,
        segmentFraction: 0.7,

        // geometry:go.Geometry.parse(
        //   "F M20 0 l13 10"+"F M20 0 l13 10"
        // )
        //strokeDashArray: [4, 2] , lienas entrecortadas
        // This SVG-style path creates a thick "+" figure:,

        geometry: go.Geometry.parse("F M0 10 l13 -10"),
      }),
      $(
        go.TextBlock,
        {
          segmentOffset: new go.Point(0, -10),
          font: "16px serif",
          segmentOrientation: go.Link.OrientUpright,
        },
        new go.Binding("text", "ec")
      )
    )
  );

  // union consaquinea
  diagram.linkTemplateMap.add(
    "UNIÓN CONSANGUÍNEA", // for marriage relationships
    $(
      go.Link,

      { selectable: false },

      //tipo_union,
      $(
        go.Panel,
        "Vertical", // this whole Panel is a link label
        //$(go.Shape, "Circle", { fill: "yellow", stroke: "gray" }),
        $(
          go.TextBlock,
          {
            //margin: 3 ,

            alignment: go.Spot.Left,
            // segmentOrientation: go.Link.Auto,
          },
          new go.Binding("text", "fu")
        ),
        {
          height: 30,
        }
      ),
      $(
        go.Shape, // the link's path shape
        { isPanelMain: true, stroke: "transparent", strokeWidth: 3 },
        new go.Binding("pathPattern", () =>
          $(go.Shape, {
            geometryString: "M0 0 L1 0 M0 3 L1 3",

            fill: "transparent",
            stroke: "#000000",
            strokeWidth: 1.3,
            strokeCap: "round",
          })
        )
      )
    )
  );

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto", // the Shape will go around the TextBlock
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    $(
      go.Shape,
      "Rectangle",
      { name: "SHAPE", fill: "white", strokeWidth: 0 },
      // Shape.fill is bound to Node.data.color
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      { margin: 8, editable: true }, // some room around the text
      new go.Binding("text").makeTwoWay()
    )
  );

  return diagram;
}

function setupDiagram(diagram, array, focusId) {
  diagram.model = go.GraphObject.make(go.GraphLinksModel, {
    // declare support for link label nodes
    linkLabelKeysProperty: "labelKeys",
    // this property determines which template is used
    nodeCategoryProperty: "s",
    // if a node data object is copied, copy its data.a Array
    copiesArrays: true,
    // create all of the nodes for people
    nodeDataArray: array,
    linkKeyProperty: "key",
  });
  setupMarriages(diagram);
  setupParents(diagram);

  var node = diagram.findNodeForKey(focusId);
  if (node !== null) {
    diagram.select(node);
    // remove any spouse for the person under focus:
    //node.linksConnected.each(function(l) {
    //  if (!l.isLabeledLink) return;
    //  l.opacity = 0;
    //  var spouse = l.getOtherNode(node);
    //  spouse.opacity = 0;
    //  spouse.pickable = false;
    //});
  }
}

function findMarriage(diagram, a, b) {
  // A and B are node keys
  var nodeA = diagram.findNodeForKey(a);
  var nodeB = diagram.findNodeForKey(b);
  if (nodeA !== null && nodeB !== null) {
    var it = nodeA.findLinksBetween(nodeB); // in either direction
    while (it.next()) {
      var link = it.value;
      // Link.data.category === "Marriage" means it's a marriage relationship
      if (link.data !== null && link.data.category === "CASADO/A") return link;
      if (link.data !== null && link.data.category === "DIVORCIO") return link;
      if (link.data !== null && link.data.category === "SEPARACIÓN")
        return link;
      if (link.data !== null && link.data.category === "UNIÓN LIBRE")
        return link;
      if (link.data !== null && link.data.category === "UNIÓN CONSANGUÍNEA")
        return link;

      if (
        link.data !== null &&
        link.data.category === "UNION LIBRE SEPARADADOS"
      )
        return link;
    }
  }
  return null;
}

// now process the node data to determine marriages
function setupMarriages(diagram) {
  var model = diagram.model;
  var nodeDataArray = model.nodeDataArray;
  for (var i = 0; i < nodeDataArray.length; i++) {
    var data = nodeDataArray[i];
    var key = data.key;
    var uxs = data.ux;
    var category_data = data.ec;

    if (data.h !== undefined) {
      //nuevos cambios
      var h = data.h;
      data.s = h;
    }

    // if (
    //   data.s == "M" &&
    //   category_data == "SOLTERO/A" &&
    //   data.f === undefined &&
    //   data.m === undefined
    // ) {
    //   data.s = "padreSoltero";
    // }
    // if (
    //   data.s == "F" &&
    //   category_data == "SOLTERO/A" &&
    //   data.f === undefined &&
    //   data.m === undefined
    // ) {
    //   data.s = "madreSoltera";
    // }

    if (uxs !== undefined && uxs !== null) {
      // if (category_data == "SOLTERO/A") {
      //   data.s = "madreSoltera";
      // }
      if (typeof uxs === "number") uxs = [uxs];
      for (var j = 0; j < uxs.length; j++) {
        var wife = uxs[j];
        if (key === wife) {
          // or warn no reflexive marriages
          continue;
        }
        var link = findMarriage(diagram, key, wife);
        if (link === null) {
          // add a label node for the marriage link
          var mlab = { s: "LinkLabel" };
          model.addNodeData(mlab);
          // add the marriage link itself, also referring to the label node
          //console.log(data)
          var mdata = {
            from: key,
            to: wife,
            labelKeys: [mlab.key],
            category: category_data,
            fu: data.fu,
          };
          model.addLinkData(mdata);
        }
      }
    }
    var virs = data.vir;
    if (virs !== undefined) {
      // console.log("llego aqui");
      // if (category_data == "SOLTERO/A") {
      //   data.s = "padreSoltero";
      // }
      if (typeof virs === "number") virs = [virs];
      for (var j = 0; j < virs.length; j++) {
        var husband = virs[j];
        if (key === husband) {
          // or warn no reflexive marriages
          continue;
        }
        var link = findMarriage(diagram, key, husband);

        if (link === null) {
          // add a label node for the marriage link
          var mlab = { s: "LinkLabel" };
          model.addNodeData(mlab);
          // add the marriage link itself, also referring to the label node
          var mdata = {
            from: key,
            to: husband,
            labelKeys: [mlab.key],
            category: category_data,
            fu: data.fu,
          };
          model.addLinkData(mdata);
        }
      }
    }
  }
}

// process parent-child relationships once all marriages are known
function setupParents(diagram) {
  var model = diagram.model;
  var nodeDataArray = model.nodeDataArray;
  for (var i = 0; i < nodeDataArray.length; i++) {
    var data = nodeDataArray[i];

    var key = data.key;
    var mother = data.m;
    var father = data.f;
    var twin = data.t;
    if (mother !== undefined && father !== undefined) {
      var link = findMarriage(diagram, mother, father);
      if (link === null) {
        // or warn no known mother or no known father or no known marriage between them
        if (window.console)
          window.console.log("unknown marriage: " + mother + " & " + father);
        continue;
      }
      var mdata = link.data;

      var mlabkey = mdata.labelKeys[0];
      if (data.h !== undefined) {
        var h = data.h;
        data.s = h;
      }
      if (twin !== undefined) {
        var cdata = { from: mlabkey, to: key, routing: go.Link.Normal };
      } else {
        var cdata = { from: mlabkey, to: key, routing: go.Link.Orthogonal };
      }
      diagram.model.addLinkData(cdata);
      // diagram.model.addLinkDataCollection(cdata);
    }
  }
}

function GenogramLayout() {
  go.LayeredDigraphLayout.call(this);
  this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
  this.spouseSpacing = 30; // minimum space between spouses
}
go.Diagram.inherit(GenogramLayout, go.LayeredDigraphLayout);

GenogramLayout.prototype.makeNetwork = function (coll) {
  // generate LayoutEdges for each parent-child Link
  var net = this.createNetwork();
  if (coll instanceof go.Diagram) {
    this.add(net, coll.nodes, true);
    this.add(net, coll.links, true);
  } else if (coll instanceof go.Group) {
    this.add(net, coll.memberParts, false);
  } else if (coll.iterator) {
    this.add(net, coll.iterator, false);
  }
  return net;
};

// internal method for creating LayeredDigraphNetwork where husband/wife pairs are represented
// by a single LayeredDigraphVertex corresponding to the label Node on the marriage Link
GenogramLayout.prototype.add = function (net, coll, nonmemberonly) {
  var multiSpousePeople = new go.Set();
  // consider all Nodes in the given collection
  var it = coll.iterator;
  while (it.next()) {
    var node = it.value;
    if (!(node instanceof go.Node)) continue;
    if (!node.isLayoutPositioned || !node.isVisible()) continue;
    if (nonmemberonly && node.containingGroup !== null) continue;
    // if it's an unmarried Node, or if it's a Link Label Node, create a LayoutVertex for it
    if (node.isLinkLabel) {
      // get marriage Link
      var link = node.labeledLink;
      var spouseA = link.fromNode;
      var spouseB = link.toNode;
      // create vertex representing both husband and wife
      var vertex = net.addNode(node);
      // now define the vertex size to be big enough to hold both spouses
      vertex.width =
        spouseA.actualBounds.width +
        this.spouseSpacing +
        spouseB.actualBounds.width;
      vertex.height = Math.max(
        spouseA.actualBounds.height,
        spouseB.actualBounds.height
      );
      vertex.focus = new go.Point(
        spouseA.actualBounds.width + this.spouseSpacing / 2,
        vertex.height / 2
      );
    } else {
      // don't add a vertex for any married person!
      // instead, code above adds label node for marriage link
      // assume a marriage Link has a label Node
      var marriages = 0;
      node.linksConnected.each(function (l) {
        if (l.isLabeledLink) marriages++;
      });
      if (marriages === 0) {
        var vertex = net.addNode(node);
      } else if (marriages > 1) {
        multiSpousePeople.add(node);
      }
    }
  }
  // now do all Links
  it.reset();
  while (it.next()) {
    var link = it.value;
    if (!(link instanceof go.Link)) continue;
    if (!link.isLayoutPositioned || !link.isVisible()) continue;
    if (nonmemberonly && link.containingGroup !== null) continue;
    // if it's a parent-child link, add a LayoutEdge for it
    if (!link.isLabeledLink) {
      var parent = net.findVertex(link.fromNode); // should be a label node
      var child = net.findVertex(link.toNode);
      if (child !== null) {
        // an unmarried child
        net.linkVertexes(parent, child, link);
      } else {
        // a married child
        link.toNode.linksConnected.each(function (l) {
          if (!l.isLabeledLink) return; // if it has no label node, it's a parent-child link
          // found the Marriage Link, now get its label Node
          var mlab = l.labelNodes.first();
          // parent-child link should connect with the label node,
          // so the LayoutEdge should connect with the LayoutVertex representing the label node
          var mlabvert = net.findVertex(mlab);
          if (mlabvert !== null) {
            net.linkVertexes(parent, mlabvert, link);
          }
        });
      }
    }
  }

  while (multiSpousePeople.count > 0) {
    // find all collections of people that are indirectly married to each other
    var node = multiSpousePeople.first();
    var cohort = new go.Set();
    this.extendCohort(cohort, node);
    // then encourage them all to be the same generation by connecting them all with a common vertex
    var dummyvert = net.createVertex();
    net.addVertex(dummyvert);
    var marriages = new go.Set();
    cohort.each(function (n) {
      n.linksConnected.each(function (l) {
        marriages.add(l);
      });
    });
    marriages.each(function (link) {
      // find the vertex for the marriage link (i.e. for the label node)
      var mlab = link.labelNodes.first();
      var v = net.findVertex(mlab);
      if (v !== null) {
        net.linkVertexes(dummyvert, v, null);
      }
    });
    // done with these people, now see if there are any other multiple-married people
    multiSpousePeople.removeAll(cohort);
  }
};

// collect all of the people indirectly married with a person
GenogramLayout.prototype.extendCohort = function (coll, node) {
  if (coll.has(node)) return;
  coll.add(node);
  var lay = this;
  node.linksConnected.each(function (l) {
    if (l.isLabeledLink) {
      // if it's a marriage link, continue with both spouses
      lay.extendCohort(coll, l.fromNode);
      lay.extendCohort(coll, l.toNode);
    }
  });
};

GenogramLayout.prototype.assignLayers = function () {
  go.LayeredDigraphLayout.prototype.assignLayers.call(this);
  var horiz = this.direction === 0.0 || this.direction === 180.0;
  // for every vertex, record the maximum vertex width or height for the vertex's layer
  var maxsizes = [];
  this.network.vertexes.each(function (v) {
    var lay = v.layer;
    var max = maxsizes[lay];
    if (max === undefined) max = 0;
    var sz = horiz ? v.width : v.height;
    if (sz > max) maxsizes[lay] = sz;
  });
  // now make sure every vertex has the maximum width or height according to which layer it is in,
  // and aligned on the left (if horizontal) or the top (if vertical)
  this.network.vertexes.each(function (v) {
    var lay = v.layer;
    var max = maxsizes[lay];
    if (horiz) {
      v.focus = new go.Point(0, v.height / 2);
      v.width = max;
    } else {
      v.focus = new go.Point(v.width / 2, 0);
      v.height = max;
    }
  });
  // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is
  // (other than the ones that are the widest or tallest in their respective layer).
};

GenogramLayout.prototype.commitNodes = function () {
  go.LayeredDigraphLayout.prototype.commitNodes.call(this);
  // position regular nodes
  this.network.vertexes.each(function (v) {
    if (v.node !== null && !v.node.isLinkLabel) {
      v.node.position = new go.Point(v.x, v.y);
    }
  });
  // position the spouses of each marriage vertex
  var layout = this;
  this.network.vertexes.each(function (v) {
    if (v.node === null) return;
    if (!v.node.isLinkLabel) return;
    var labnode = v.node;
    var lablink = labnode.labeledLink;
    // In case the spouses are not actually moved, we need to have the marriage link
    // position the label node, because LayoutVertex.commit() was called above on these vertexes.
    // Alternatively we could override LayoutVetex.commit to be a no-op for label node vertexes.
    lablink.invalidateRoute();
    var spouseA = lablink.fromNode;
    var spouseB = lablink.toNode;
    // prefer fathers on the left, mothers on the right
    if (spouseA.data.s === "F") {
      // sex is female
      var temp = spouseA;
      spouseA = spouseB;
      spouseB = temp;
    }
    // see if the parents are on the desired sides, to avoid a link crossing
    var aParentsNode = layout.findParentsMarriageLabelNode(spouseA);
    var bParentsNode = layout.findParentsMarriageLabelNode(spouseB);
    if (
      aParentsNode !== null &&
      bParentsNode !== null &&
      aParentsNode.position.x > bParentsNode.position.x
    ) {
      // swap the spouses
      var temp = spouseA;
      spouseA = spouseB;
      spouseB = temp;
    }
    spouseA.position = new go.Point(v.x, v.y);
    spouseB.position = new go.Point(
      v.x + spouseA.actualBounds.width + layout.spouseSpacing,
      v.y
    );
    if (spouseA.opacity === 0) {
      var pos = new go.Point(v.centerX - spouseA.actualBounds.width / 2, v.y);
      spouseA.position = pos;
      spouseB.position = pos;
    } else if (spouseB.opacity === 0) {
      var pos = new go.Point(v.centerX - spouseB.actualBounds.width / 2, v.y);
      spouseA.position = pos;
      spouseB.position = pos;
    }
  });
  // position only-child nodes to be under the marriage label node
  this.network.vertexes.each(function (v) {
    if (v.node === null || v.node.linksConnected.count > 1) return;
    var mnode = layout.findParentsMarriageLabelNode(v.node);
    if (mnode !== null && mnode.linksConnected.count === 1) {
      // if only one child
      var mvert = layout.network.findVertex(mnode);
      var newbnds = v.node.actualBounds.copy();
      newbnds.x = mvert.centerX - v.node.actualBounds.width / 2;
      // see if there's any empty space at the horizontal mid-point in that layer
      var overlaps = layout.diagram.findObjectsIn(
        newbnds,
        function (x) {
          return x.part;
        },
        function (p) {
          return p !== v.node;
        },
        true
      );
      if (overlaps.count === 0) {
        v.node.move(newbnds.position);
      }
    }
  });
};

GenogramLayout.prototype.findParentsMarriageLabelNode = function (node) {
  var it = node.findNodesInto();
  while (it.next()) {
    var n = it.value;

    if (n.isLinkLabel) return n;
  }
  return null;
};

function handleModelChange(e) {
  console.log(e);
}

const Genogram = (props) => {
  genoData = props.Genogram;

  //console.log(genoData);
  const idFamilia = props.idFamilia;
  //console.log(genoData);
  const [show, setShow] = useState(false);

  return (
    <div className="w-100">
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="w-100"
        style={{ height: "70vh" }}
        onModelChange={handleModelChange}
      />

      <button
        className="btn btn-primary"
        onClick={async () => {
          var svg = diagram.makeSvg();

          //console.log(img)
          var serializer = new XMLSerializer();
          var svgString = serializer.serializeToString(svg);
          // Crear un objeto Blob con los datos del SVG y el tipo MIME
          //var blob = new Blob([svgString], { type: "image/svg+xml" });
          // Crear una URL temporal que apunte al objeto Blob
          //var url = URL.createObjectURL(blob);

          await saveImagenGenograma(svgString, idFamilia).then((data) => {
            setShow(true);
          });

          //console.log(img);
          // var newWindow = window.open("", "newWindow");
          // if (!newWindow) return;
          // var newDocument = newWindow.document;
          // var svg = diagram.makeSvg({
          //   document: newDocument, // create SVG DOM in new document context
          //   //scale: 9,
          //   //size: new go.Size(10000,NaN)

          // });
          // newDocument.body.appendChild(svg);
        }}
      >
        Guardar Genograma
      </button>

      <Toast
        className="z-0 position-absolute bg-light m-10"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        position={"bottom-end"}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Aviso</strong>
          <small>hace 1 segundo</small>
        </Toast.Header>
        <Toast.Body>El genograma ha sido guardado!</Toast.Body>
      </Toast>
    </div>
  );
};

export default Genogram;
