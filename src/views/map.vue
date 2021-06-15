<template>
  <div class="divMain">
    <Menu
      mode="horizontal"
      theme="light"
      active-name="1"
      class="menuClass"
      @on-select="selectItem"
    >
      <Submenu name="1">
        <template slot="title"> 3D绘制 </template>
        <MenuItem name="3d_point">点</MenuItem>
        <MenuItem name="3d_line">线</MenuItem>
        <MenuItem name="3d_polygon">面</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title"> 2D绘制 </template>
        <MenuItem name="2d_point">点</MenuItem>
        <MenuItem name="2d_line">线</MenuItem>
        <MenuItem name="2d_polygon">面</MenuItem>
      </Submenu>
    </Menu>
    <div id="mapContainer" ref="mapContainer"></div>
    <!-- <div>
      <ul class="ulclass">
        <label>图层选择</label>
        <li class="liclass"><Checkbox checked>天地图</Checkbox></li> -->
        <!-- <li class="liclass"><Checkbox>天地图</Checkbox></li>
    <li class="liclass"><Checkbox>天地图</Checkbox></li> -->
      <!-- </ul>
    </div> -->
  </div>
</template>
<script>
import { loadModules } from "esri-loader";
export default {
  //   name: "Map",
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const option = {
        // 定义一个包含有JS API中js开发包和css样式文件的对象
        url: "http://192.168.30.147/arcgis_api/4.19/init.js",
        css: "http://192.168.30.147/arcgis_api/4.19/esri/themes/light/main.css",
      };
      loadModules(
        [
          "esri/Map",
          "esri/views/MapView",
          "esri/views/SceneView",
           "esri/WebScene",
           "esri/widgets/Editor",
          "esri/layers/WebTileLayer",
          "esri/layers/FeatureLayer",
        ],
        option
      ).then(([Map, MapView, SceneView,WebScene,Editor, WebTileLayer,FeatureLayer]) => {
        const MapTileLayer = new WebTileLayer({
          // 矢量墨卡托图层
          urlTemplate:
            "http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=f5f540e277f65383edab9a2804e7eb2d",
          title: "天地图矢量3D",
          id: "tdtvec",
        });
        const AnoTileLayer = new WebTileLayer({
          // 矢量注记层
          urlTemplate:
            "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=f5f540e277f65383edab9a2804e7eb2d",
          title: "天地图矢量注记3D",
          id: "tdtvecLabel",
        });

        const map = new Map({
          // basemap: "topo-vector"
          //ground: "world-elevation",
        });
       const recreationLayer = new FeatureLayer({
        title: "Recreation",
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/EditableFeatures3D/FeatureServer/1",
        elevationInfo: {
          mode: "absolute-height"
        },
        renderer: {
          type: "unique-value", // autocasts as new UniqueValueRenderer()
          field: "TYPE",
          visualVariables: [{
            // size can be modified with the interactive handle
            type: "size",
            field: "SIZE",
            axis: "height",
            valueUnit: "meters"
          }, {
            // rotation can be modified with the interactive handle
            type: "rotation",
            field: "ROTATION"
          }],
          uniqueValueInfos: [{
            value: "1",
            label: "Slide",
            symbol: {
              type: "point-3d", // autocasts as new PointSymbol3D()
              symbolLayers: [{
                type: "object",
                resource: {
                  href: "https://static.arcgis.com/arcgis/styleItems/Recreation/gltf/resource/Slide.glb"
                }
              }],
              styleOrigin: {
                styleName: "EsriRecreationStyle",
                name: "Slide"
              }
            }
          }, {
            value: "2",
            label: "Swing",
            symbol: {
              type: "point-3d", // autocasts as new PointSymbol3D()
              symbolLayers: [{
                type: "object",
                resource: {
                  href: "https://static.arcgis.com/arcgis/styleItems/Recreation/gltf/resource/Swing.glb"
                }
              }],
              styleOrigin: {
                styleName: "EsriRecreationStyle",
                name: "Swing"
              }
            }
          }]
        }
      });

      //  webscene.add(recreationLayer);

        const view = new SceneView({
          container: this.$refs.mapContainer,
          qualityProfile: "high",
          map: map,
          zoom: 17,
          center: [113.31912702869374, 23.136208653474633],
        });
        

        map.addMany([MapTileLayer, AnoTileLayer,recreationLayer]);
    
        //window.view = view;
        view.when(() => {
          const editor = new Editor({
            view: view
          });
          view.ui.add(editor, "top-right");
        })
        

      });

      const extrudedPolygon = {
          type: "polygon-3d",
          symbolLayers: [
            {
              type: "extrude",
              size: 10, // extrude by 10 meters
              material: {
                color: white
              },
              edges: {
                type: "solid",
                size: "3px",
                color: blue
              }
            }
          ]
      }
      const route = {
          type: "line-3d",
          symbolLayers: [
            {
              type: "line",
              size: "10px",
              material: {
                color: white
              }
            },
            {
              type: "line",
              size: "3px",
              material: {
                color: blue
              }
            }
          ]
        }
        const point = {
          type: "point-3d",
          symbolLayers: [
            {
              type: "icon",
              size: "20px",
              resource: { primitive: "kite" },
              outline: {
                color: blue,
                size: "3px"
              },
              material: {
                color: white
              }
            }
          ]
        }
    
    },
    selectItem(name) {
      if(name.indexOf("3d")>-1){
        debugger
      }else {
        debugger
      }
      
    },
  },
};
</script>
<style scoped>
.divMain {
  width: 100%;
  height: 100%;
}
.menuClass {
  position: absolute;
  right: 40%;
  height: 40px;
  line-height: 40px;
}
.ulclass {
  position: absolute;
  top: 5px;
  right: 60px;
  text-align: center;
  font-size: 17px;
}
.ulclass li {
  list-style-type: none;
  font-size: 15px;
}
</style>
