// import './style.css';
// import {Map, View} from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';

// const map = new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     })
//   ],
//   view: new View({
//     center: [0, 0],
//     zoom: 2
//   })
// });

// var markers = new ol.layer.Vector({
//   source: new ol.source.Vector(),
//   style: new ol.style.Style({
//     image: new ol.style.Icon({
//       anchor: [0.5, 1],
//       src: 'marker.png'
//     })
//   })
// });
// map.addLayer(markers);

// var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([106.8478695, -6.1568562])));
// markers.getSource().addFeature(marker);

// import Feature from 'ol/Feature';
// import Map from 'ol/Map';
// import Point from 'ol/geom/Point';
// import Select from 'ol/interaction/Select';
// import Stamen from 'ol/source/Stamen';
// import VectorSource from 'ol/source/Vector';
// import View from 'ol/View';
// import {Icon, Style} from 'ol/style';
// import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

// function createStyle(src, img) {
//   return new Style({
//     image: new Icon({
//       anchor: [0.5, 0.96],
//       crossOrigin: 'anonymous',
//       src: src,
//       img: img,
//       imgSize: img ? [img.width, img.height] : undefined,
//     }),
//   });
// }

// const iconFeature = new Feature(new Point([0, 0]));
// iconFeature.set('style', createStyle('data/icon.png', undefined));

// const map = new Map({
//   layers: [
//     new TileLayer({
//       source: new Stamen({layer: 'watercolor'}),
//     }),
//     new VectorLayer({
//       style: function (feature) {
//         return feature.get('style');
//       },
//       source: new VectorSource({features: [iconFeature]}),
//     }),
//   ],
//   target: document.getElementById('map'),
//   view: new View({
//     center: [0, 0],
//     zoom: 3,
//   }),
// });

// const selectStyle = {};
// const select = new Select({
//   style: function (feature) {
//     const image = feature.get('style').getImage().getImage();
//     if (!selectStyle[image.src]) {
//       const canvas = document.createElement('canvas');
//       const context = canvas.getContext('2d');
//       canvas.width = image.width;
//       canvas.height = image.height;
//       context.drawImage(image, 0, 0, image.width, image.height);
//       const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//       const data = imageData.data;
//       for (let i = 0, ii = data.length; i < ii; i = i + (i % 4 == 2 ? 2 : 1)) {
//         data[i] = 255 - data[i];
//       }
//       context.putImageData(imageData, 0, 0);
//       selectStyle[image.src] = createStyle(undefined, canvas);
//     }
//     return selectStyle[image.src];
//   },
// });
// map.addInteraction(select);

// map.on('pointermove', function (evt) {
//   map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel)
//     ? 'pointer'
//     : '';
// });

var lat = 42;
var lng = -75;

var iconFeature = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
  name: 'The icon',
  population: 4000,
  rainfall: 500
});

var iconStyle = new ol.style.Style({
  image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
  }))
});

iconFeature.setStyle(iconStyle);

var vectorSource = new ol.source.Vector({
  features: [iconFeature]
});

var vectorLayer = new ol.layer.Vector({
  source: vectorSource
});

var rasterLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var map = new ol.Map({
  layers: [rasterLayer, vectorLayer],
  target: 'Map',
  controls: ol.control.defaults({
    attributionOptions: {
      collapsible: false
    }
  }),
  view: new ol.View({
    center: ol.proj.fromLonLat([lng, lat]),
    zoom: 5
  })
});
