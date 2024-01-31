"use client";
import React, { Component } from "react";

import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

function handleModelChange(e) {
  console.log(e);
}

function initDiagram() {
  const $ = go.GraphObject.make;
  go.Diagram.licenseKey = "adsfewfwaefasdfdsfs";
  const diagram = $(
    go.Diagram,

    {
      "undoManager.isEnabled": true,
      initialAutoScale: go.Diagram.Uniform,
      ChangingSelection: false,
      model: $(go.GraphLinksModel, {
        linkKeyProperty: "key",
      }),
    }
  );

  var tlarc = go.Geometry.parse("F M20 20 B 180 90 20 20 19 19 z");
  var trarc = go.Geometry.parse("F M20 20 B 270 90 20 20 19 19 z");
  var blarc = go.Geometry.parse("F M20 20 B 90 90 20 20 19 19 z");

  var rLine = go.Geometry.parse("M -50 -95 l -50 -55");
  var lLine = go.Geometry.parse("M 50 -95 l 50 -55");

  diagram.add(
    $(
      go.Part,
      "Vertical",
      { locationObjectName: "main", location: new go.Point(0, -50) },
      $(
        go.Panel,
        "Spot",
        $(go.TextBlock, "Definicion de simbolos", {
          font: "30px sans-serif",
          position: new go.Point(150, 15),
        })
      )
    )
  );

  diagram.add(
    $(
      go.Part,
      "Vertical",
      { locationObjectName: "main", location: new go.Point(0, 0) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        })
      )
    )
  );

  diagram.add(
    $(
      go.Part,
      "Vertical",
      { locationObjectName: "main", location: new go.Point(0, 50) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, "Rectangle", {
          fill: "lightcoral",
          stroke: null,
          width: 20,
          height: 20,
          alignment: go.Spot.TopRight,
          alignmentFocus: go.Spot.TopRight,
        })
      )
    )
  );

  diagram.add(
    $(
      go.Part,
      "Vertical",
      { locationObjectName: "main", location: new go.Point(0, 100) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, "Rectangle", {
          fill: "lightcoral",
          stroke: null,
          width: 20,
          height: 20,
          alignment: go.Spot.BottomLeft,
          alignmentFocus: go.Spot.BottomLeft,
        })
      )
    )
  );
  diagram.add(
    $(
      go.Part,
      "Vertical",
      { locationObjectName: "main", location: new go.Point(0, 200) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, "PlusLine", {
          width: 40,
          height: 40,
   
          fill: null,
          stroke: "red",
        })
      )
    )
  );

  diagram.add(
    $(
      go.Part,
      "Vertical",
      { locationObjectName: "main", location: new go.Point(0, 250) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, "XLine", { width: 40, height: 40, fill: null })
      )
    )
  );

  diagram.add(
    $(
      go.Part,
      "Vertical",
      { locationObjectName: "main", location: new go.Point(0, 350) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, {
          geometry: lLine,
          strokeWidth: 1,
          fill: null,
          stroke: "black",
        })
      )
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(0, 400) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Triangle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, "XLine", { width: 35, height: 35,  fill: null })
      ),
      $(go.TextBlock, "Divorciados", {
        font: "12px sans-serif",
        position: new go.Point(150, 15),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(0, 450) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        })
      ),
      $(go.TextBlock, "Masculino", {
        font: "12px sans-serif",
        position: new go.Point(150, 15),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(0, 500) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        })
      ),
      $(go.TextBlock, "Femenino", {
        font: "12px sans-serif",
        position: new go.Point(150, 15),
      })
    )
  );

  // second column
  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(100, 0) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        })
      ),
      $(go.TextBlock, "No presentan historial", {
        font: "12px sans-serif",
        position: new go.Point(50, 15),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(100, 50) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, {
          geometry: trarc,
          strokeWidth: 0,
          fill: "lightcoral",
          stroke: null,
          alignment: go.Spot.TopRight,
          alignmentFocus: go.Spot.TopRight,
        })
      ),
      $(go.TextBlock, "Tumores \n (unilateral)", {
        font: "12px sans-serif",
        position: new go.Point(50, 10),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(100, 100) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, {
          geometry: blarc,
          strokeWidth: 0,
          fill: "lightcoral",
          stroke: null,
          alignment: go.Spot.BottomLeft,
          alignmentFocus: go.Spot.BottomLeft,
        })
      ),
      $(go.TextBlock, "Enfermedad de pulmon", {
        font: "12px sans-serif",
        position: new go.Point(50, 15),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(100, 150) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, {
          geometry: blarc,
          strokeWidth: 1,
          fill: "lightcoral",
          stroke: "lightcoral",
          alignment: go.Spot.BottomLeft,
          alignmentFocus: go.Spot.BottomLeft,
        }),
        $(go.Shape, {
          geometry: tlarc,
          strokeWidth: 1,
          fill: "lightcoral",
          stroke: "lightcoral",
          alignment: go.Spot.TopLeft,
          alignmentFocus: go.Spot.TopLeft,
        })
      ),
      $(go.TextBlock, "Enfermedad en ovarios", {
        font: "12px sans-serif",
        position: new go.Point(50, 15),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(100, 200) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, "PlusLine", {
          width: 40,
          height: 40,
          fill: null,
          stroke: "red",
        })
      ),
      $(go.TextBlock, "Limphoma / leucemia", {
        font: "12px sans-serif",
        position: new go.Point(55, 18),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(100, 250) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, "XLine", { width: 30, height: 30,  fill: null })
      ),
      $(go.TextBlock, "Difuntos", {
        font: "12px sans-serif",
        position: new go.Point(50, 18),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(100, 350) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: null,
          width: 40,
          height: 40,
        }),
        $(go.Shape, {
          geometry: rLine,
          strokeWidth: 1,
          fill: null,
          stroke: "black",
        })
      ),
      $(go.TextBlock, "Hijos gemelos", {
        font: "12px sans-serif",
        position: new go.Point(75, 70),
      })
    )
  );

  return diagram;
}

const Explain = () => {
  return (
    <div className="w-100" >
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="w-100 bg-body-secondary"
        style={{height:"85vh"}}
        onModelChange={handleModelChange}
      />
    </div>
  );
};

export default Explain;
