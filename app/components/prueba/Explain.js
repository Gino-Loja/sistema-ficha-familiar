"use client";
import React, { Component } from "react";
import Image from "next/image";

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
  var sLine = go.Geometry.parse("M 100 20 120 0");
  var d1Line = go.Geometry.parse("M 95 20 115 0");
  var d2Line = go.Geometry.parse("M 105 20 125 0");
  var hLine = go.Geometry.parse("M 100 0 160 0");
  var pLine = go.Geometry.parse("M 100 -100 145 -100");

  diagram.add(
    $(
      go.Part,
      "Vertical",
      { locationObjectName: "main", location: new go.Point(0, -50) },
      $(
        go.Panel,
        "Spot",
        $(go.TextBlock, "Símbolos", {
          font: "30px sans-serif",
          position: new go.Point(150, 15),
        })
      )
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(0, 0) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: "black",
          width: 40,
          height: 40,
        })
      ),
      $(go.TextBlock, "Masculino", {
        font: "12px sans-serif",
        position: new go.Point(160, 15),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(0, 50) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: "black",
          width: 40,
          height: 40,
        })
      ),
      $(go.TextBlock, "Femenino", {
        font: "12px sans-serif",
        position: new go.Point(160, 15),
      })
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
          stroke: "black",
          width: 40,
          height: 40,
        }),
        $(go.Shape, {
          geometry: hLine,
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
      { locationObjectName: "main", location: new go.Point(100, 100) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: "black",
          width: 40,
          height: 40,
        })
      ),
      $(go.TextBlock, "Casados", {
        font: "12px sans-serif",
        position: new go.Point(60, 20),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Vertical",
      { locationObjectName: "main", location: new go.Point(0, 150) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: "black",
          width: 40,
          height: 40,
        }),
        $(go.Shape, {
          geometry: hLine,
          strokeWidth: 1,
          fill: null,
          stroke: "black",
        }),
        $(go.Shape, {
          geometry: sLine,
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
      { locationObjectName: "main", location: new go.Point(100, 150) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: "black",
          width: 40,
          height: 40,
        })
      ),
      $(go.TextBlock, "Separados", {
        font: "12px sans-serif",
        position: new go.Point(60, 20),
      })
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
          stroke: "black",
          width: 40,
          height: 40,
        }),
        $(go.Shape, {
          geometry: hLine,
          strokeWidth: 1,
          fill: null,
          stroke: "black",
        }),
        $(go.Shape, {
          geometry: d1Line,
          strokeWidth: 1,
          fill: null,
          stroke: "black",
        }),
        $(go.Shape, {
          geometry: d2Line,
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
      { locationObjectName: "main", location: new go.Point(100, 200) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: "black",
          width: 40,
          height: 40,
        })
      ),
      $(go.TextBlock, "Divorciados", {
        font: "12px sans-serif",
        position: new go.Point(60, 20),
      })
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
          stroke: "black",
          width: 40,
          height: 40,
        }),
        $(go.Shape, "MinusLine", {
          width: 60,
          height: 40,
          margin: 4,
          stroke: "red",
          angle: -45,
        })
      )
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
          stroke: "black",
          width: 40,
          height: 40,
        }),
        $(go.Shape, "MinusLine", {
          width: 60,
          height: 40,
          margin: 4,
          stroke: "red",
          angle: -45,
        })
      ),
      $(go.TextBlock, "Difuntos", {
        font: "12px sans-serif",
        position: new go.Point(80, 30),
      })
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
          stroke: "black",
          width: 40,
          height: 40,
        }),
        $(go.Shape, {
          geometry: lLine,
          strokeWidth: 1,
          fill: null,
          stroke: "black",
        }),
        $(go.Shape, {
          geometry: pLine,
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
      { locationObjectName: "main", location: new go.Point(100, 350) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: "black",
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
        position: new go.Point(90, 70),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Vertical",
      { locationObjectName: "main", location: new go.Point(0, 450) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: "black",
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
      { locationObjectName: "main", location: new go.Point(100, 450) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: "black",
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
      $(go.TextBlock, "Hijos mellizos", {
        font: "12px sans-serif",
        position: new go.Point(90, 70),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Vertical",
      { locationObjectName: "main", location: new go.Point(0, 500) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: "black",
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
      { locationObjectName: "main", location: new go.Point(0, 550) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: "black",
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
      { locationObjectName: "main", location: new go.Point(0, 600) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Rectangle", {
          name: "main",
          fill: "white",
          stroke: "black",
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

  // diagram.add(
  //   $(
  //     go.Part,
  //     "Horizental",
  //     { locationObjectName: "main", location: new go.Point(0, 250) },
  //     $(
  //       go.Panel,
  //       "Spot",
  //       $(go.Shape, "Triangle", {
  //         name: "main",
  //         fill: "white",
  //         stroke: "black",
  //         width: 40,
  //         height: 40,
  //       }),
  //       $(go.Shape, "XLine", { width: 35, height: 35,  fill: null })
  //     ),
  //     $(go.TextBlock, "Divorciados", {
  //       font: "12px sans-serif",
  //       position: new go.Point(150, 15),
  //     })
  //   )
  // );

  // diagram.add(
  //   $(
  //     go.Part,
  //     "Horizental",
  //     { locationObjectName: "main", location: new go.Point(0, 650) },
  //     $(
  //       go.Panel,
  //       "Spot",
  //       $(go.Shape, "Rectangle", {
  //         name: "main",
  //         fill: "white",
  //         stroke: "black",
  //         width: 40,
  //         height: 40,
  //       })
  //     ),
  //     $(go.TextBlock, "Masculino", {
  //       font: "12px sans-serif",
  //       position: new go.Point(150, 15),
  //     })
  //   )
  // );

  // diagram.add(
  //   $(
  //     go.Part,
  //     "Horizental",
  //     { locationObjectName: "main", location: new go.Point(0, 650) },
  //     $(
  //       go.Panel,
  //       "Spot",
  //       $(go.Shape, "Circle", {
  //         name: "main",
  //         fill: "white",
  //         stroke: "black",
  //         width: 40,
  //         height: 40,
  //       })
  //     ),
  //     $(go.TextBlock, "Femenino", {
  //       font: "12px sans-serif",
  //       position: new go.Point(150, 15),
  //     })
  //   )
  // );

  // SEGUNDA COLUMNA
  // diagram.add(
  //   $(
  //     go.Part,
  //     "Horizental",
  //     { locationObjectName: "main", location: new go.Point(100, 0) },
  //     $(
  //       go.Panel,
  //       "Spot",
  //       $(go.Shape, "Circle", {
  //         name: "main",
  //         fill: "white",
  //         stroke: "black",
  //         width: 40,
  //         height: 40,
  //       })
  //     ),
  //     $(go.TextBlock, "No presentan historial", {
  //       font: "12px sans-serif",
  //       position: new go.Point(50, 15),
  //     })
  //   )
  // );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(100, 500) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: "black",
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
      $(go.TextBlock, "Enfermedad de pulmon", {
        font: "12px sans-serif",
        position: new go.Point(50, 10),
      })
    )
  );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(100, 550) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: "black",
          width: 40,
          height: 40,
        }),
        $(go.Shape, {
          geometry: blarc,
          strokeWidth: 0,
          fill: "lightcoral",
          stroke: "black",
          alignment: go.Spot.BottomLeft,
          alignmentFocus: go.Spot.BottomLeft,
        })
      ),
      $(go.TextBlock, "Tumores \n (unilateral)", {
        font: "12px sans-serif",
        position: new go.Point(50, 15),
      })
    )
  );

  // diagram.add(
  //   $(
  //     go.Part,
  //     "Horizental",
  //     { locationObjectName: "main", location: new go.Point(100, 150) },
  //     $(
  //       go.Panel,
  //       "Spot",
  //       $(go.Shape, "Circle", {
  //         name: "main",
  //         fill: "white",
  //         stroke: "black",
  //         width: 40,
  //         height: 40,
  //       }),
  //       $(go.Shape, {
  //         geometry: blarc,
  //         strokeWidth: 1,
  //         fill: "lightcoral",
  //         stroke: "lightcoral",
  //         alignment: go.Spot.BottomLeft,
  //         alignmentFocus: go.Spot.BottomLeft,
  //       }),
  //       $(go.Shape, {
  //         geometry: tlarc,
  //         strokeWidth: 1,
  //         fill: "lightcoral",
  //         stroke: "lightcoral",
  //         alignment: go.Spot.TopLeft,
  //         alignmentFocus: go.Spot.TopLeft,
  //       })
  //     ),
  //     $(go.TextBlock, "Enfermedad en ovarios", {
  //       font: "12px sans-serif",
  //       position: new go.Point(50, 15),
  //     })
  //   )
  // );

  diagram.add(
    $(
      go.Part,
      "Horizental",
      { locationObjectName: "main", location: new go.Point(100, 600) },
      $(
        go.Panel,
        "Spot",
        $(go.Shape, "Circle", {
          name: "main",
          fill: "white",
          stroke: "black",
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

  return diagram;
}

const Explain = () => {
  return (
    <div className="w-100 d-flex justify-content-end p-2">
      {/* <ReactDiagram
        initDiagram={initDiagram}
        divClassName="w-100 bg-body-secondary"
        style={{height:"70vh"}}
        onModelChange={handleModelChange}
      /> */}
      <div>
        <img style={{ height: "70vh" }} src="/panel1.svg"></img>
      </div>
    </div>
  );
};

export default Explain;
