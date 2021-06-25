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
        <MenuItem name="3d_polyline">线</MenuItem>
        <MenuItem name="3d_polyline_cz">垂直线</MenuItem>
        <MenuItem name="3d_polygon">面</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title"> 2D绘制 </template>
        <MenuItem name="2d_point">点</MenuItem>
        <MenuItem name="2d_polyline">线</MenuItem>
        <MenuItem name="2d_polygon">面</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">数据导入 </template>
        <MenuItem name="gltf">glTF</MenuItem>
        <MenuItem name="json">json</MenuItem>
        <MenuItem name="glb">glb</MenuItem>
        <MenuItem name="obj">obj</MenuItem>
        <MenuItem name="drag">拖入</MenuItem>
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
  <Modal v-model="uploadFalg">
    <input  type="file" name="" value=""  title="点击选择文件" id="h5Input1" multiple="" accept="*/*" @change="fileData($event)" />
  </Modal>
  </div>
  
</template>
<script>
import { loadModules } from "esri-loader";
import { draw_style_3d,draw_style_2d,sketViewModel_model } from "@/symbol/style"
export default {
  //   name: "Map",
  data() {
    return {
      uploadFalg:false,
      sketViewModel_3d:null,
      sketViewModel_2d:null,
      sketViewModel_model:null
    };
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
          "esri/Ground",
          "esri/views/MapView",
          "esri/views/SceneView",
          "esri/WebScene",
          "esri/widgets/Editor",
          "esri/layers/WebTileLayer",
          "esri/layers/FeatureLayer",
          "esri/layers/GraphicsLayer",
          "esri/widgets/Sketch/SketchViewModel",
          "esri/geometry/support/MeshMaterial",
          "esri/geometry/support/MeshTexture",
          "esri/geometry/support/MeshMaterialMetallicRoughness"
        ],
        option
      ).then(([Map, Ground, MapView, SceneView,WebScene,Editor, WebTileLayer,FeatureLayer,GraphicsLayer,SketchViewModel,MeshMaterial,MeshTexture,MeshMaterialMetallicRoughness]) => {
        let vm = this
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
        const drawGraphic_2d=new GraphicsLayer({
          id:"drawGraphic_2d",
           elevationInfo: {
               //mode: "relative-to-ground",
               mode:"on-the-ground",
              //offset: 1
            },
          })
       
        const drawGraphic_3d=new GraphicsLayer({
              id:"drawGraphic_3d",
              elevationInfo:{mode:"absolute-height"
           }
        })
        const featureLayer_3d=new FeatureLayer({
              id:"featureLayer_3d",
              elevationInfo:{mode:"absolute-height"}
        })
       const drawLayer = new FeatureLayer({
         id:"drawLayer",
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
              field: "高度/大小",
              axis: "height",
              valueUnit: "meters"
            }, {
              // rotation can be modified with the interactive handle
              type: "rotation",
              field: "旋转"
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
      const map = new Map({
      // basemap: "topo-vector"

        layers:[drawLayer,drawGraphic_3d,drawGraphic_2d],
        ground: new Ground({
          layers: [MapTileLayer, AnoTileLayer]
        }),
        //  ground: "world-elevation"
      });

        const view = new SceneView({
          container: this.$refs.mapContainer,
          qualityProfile: "high",
          map: map,
          zoom: 17,
          center: [113.31912702869374, 23.136208653474633],
        });
        //map.addMany([drawGraphic_3d]);
        view.on('click',(event)=>{
          debugger
        })
    
        window.view = view;
        view.when(() => {
          /**Editor对图层编辑 */
 
          const editor = new Editor({
            view: view
          });
          view.ui.add(editor, "top-right");

          /**SketchViewModel针对graphic */
          vm.sketViewModel_3d=new SketchViewModel({
            layer:drawGraphic_3d,
            view:view,
            pointSymbol:draw_style_3d.point,
            polylineSymbol:draw_style_3d.line,
            polygonSymbol:draw_style_3d.polygon,
            snappingOptions:{
              enabled:true,
              featureEnabled:true,
              selfEnabled:true,
              featureSources:[
                { layer: drawGraphic_3d }
              ]
            }
          })
          vm.sketViewModel_2d=new SketchViewModel({
            layer:drawGraphic_2d,
            view:view,
            pointSymbol:draw_style_2d.point,
            polylineSymbol:draw_style_2d.line,
            polygonSymbol:draw_style_2d.polygon,
            snappingOptions:{
              enabled:true,
              featureEnabled:true,
              selfEnabled:true,
              featureSources:[
                { layer: drawGraphic_2d }
              ]
            }
          })
          vm.sketViewModel_model=new SketchViewModel({
            layer:drawGraphic_3d,
            // layer: featureLayer_3d,
            view:view,
            snappingOptions:{
              enabled:true,
              featureEnabled:true,
              selfEnabled:true,
              featureSources:[
                { layer: drawGraphic_3d }
              ]
            }

          })
          /**更新取消 */
          //  let updatebackupgraphic
          vm.sketViewModel_3d.on("update", function (event) {
            // if (event.state === "active") {
            //   vm.sketViewModel_3d.delete();
            // }
            let updatebackupgraphic
              if (event.state === "start") {
                updatebackupgraphic = event.graphics[0].clone();
              }
              if (event.state === "complete") {
                debugger
                if (event.aborted) {
                  graphicsLayer.remove(event.graphics[0]);
                  graphicsLayer.add(updatebackupgraphic);
                }
            }
          })

        })
      });
    },
    selectItem(name) {
      if(name.indexOf("3d")>-1){
        if (name==="3d_polyline_cz"){

        }else{
            this.sketViewModel_3d.create(name.slice(3))
        }
        
       
      }else if(name.indexOf("2d")>-1) {
        this.sketViewModel_2d.create(name.slice(3))
      }else if(name==="drag"){
        this.uploadFalg=true
        debugger
      }else{
        this.sketViewModel_model.pointSymbol=sketViewModel_model[name]
        this.sketViewModel_model.create("point")
      }
    },
    fileData(e){
       debugger
       let file = e.target.files[0]
       let c=typeof FileReader
       let reader = new FileReader();
       reader.readAsText(file)
       reader.onload =  (e)=>{
         debugger
        let data = this.result;
      };
    },
    createLeafCanvas() {
      debugger
          const canvas = document.createElement("canvas");
          canvas.width = 32;
          canvas.height = 32;

          const ctx = canvas.getContext("2d");

          // Create the linear gradient with which to fill the canvas
          const gradient = ctx.createLinearGradient(0, 0, 0, 32);
          gradient.addColorStop(0, "#00ff00");
          gradient.addColorStop(1, "#009900");

          // Fill the canvas with the gradient pattern
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 32, 32);

          return canvas;
    }
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
