export const draw_style_3d={
    polygon:{
        type: "polygon-3d",
        symbolLayers: [
        {
            type: "extrude",
            size: 10, // extrude by 10 meters
            material: {
            color: [255, 255, 255, 0.8]
            },
            edges: {
            type: "solid",
            size: "3px",
            color: [82, 82, 122, 0.9]
            }
        }
        ]
    },
    line :{
        type: "line-3d",
        symbolLayers: [{
          type: "path",  
          profile: "circle",  
          width: 6,  
          height: 6, 
          material: { color: "#ff7380" },
          anchor: "bottom",
          cap: "square",
          profileRotation: "heading"
        }]
    },

    point : {
      type: "point-3d", 
      symbolLayers: [{
        type: "object",
        width: 10,
        height: 10,
        // depth: 15,
        resource: { primitive: "cone" },
        material: { color: "red" }
      }]
    }
}
export const draw_style_2d={
  polygon:{
    type: "polygon-3d", 
    symbolLayers: [{
      type: "fill",
      material: { color: "red" }
    }]
  },
  line:{
        type: "line-3d",
        symbolLayers: [
          {
            type: "line",
            size: "2px",
            material: {
              color: "red"
            }
          }
        ]
    },
    point : {
      type: "point-3d",
      symbolLayers: [{
        type: "icon",
        size: 2,
        resource: { primitive: "circle" },
        material: { color: "red" }
      }]
    }
}

export const sketViewModel_model={
  glb: {
    type: "point-3d", 
    symbolLayers: [{
      type: "object",
      resource: {
        href: "/data/glb/car.glb"
      },
      width:20,
      height: 20,
    }]
  },
  gltf: {
    type: "point-3d", 
    symbolLayers: [{
      type: "object",
      resource: {
        href: "/data/gltf/ship_wreck.gltf"
      },
      width:20,
      // height: 20,
      // material: {
      //   color: "red"
      // }
    }]
  },
  obj: {
    type: "point-3d", 
    symbolLayers: [{
      type: "object",
      resource: {
        href: "/data/obj/taxi.obj"
      },
      width:20,
      height: 20,
      // material: {
      //   color: "red"
      // },
      anchor: "bottom"
    }]
  },
  json: {
    type: "point-3d", 
    symbolLayers: [{
      type: "object",
      resource: {
        href: "/data/json/tree.json"
      },
      height: 30,
      anchor: "bottom"
    }]
  }


  
}
