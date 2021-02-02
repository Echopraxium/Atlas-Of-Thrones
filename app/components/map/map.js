import './map.scss'
import L from 'leaflet'
import { Component } from '../component'

import city_labels from '../../../i18n/fr/city_labels.json'

const template = '<div ref="mapContainer" class="map-container"></div>'

/**
 * Leaflet Map Component
 * Render GoT map items, and provide user interactivity.
 * @extends Component
 */
export class Map extends Component {
  /** Map Component Constructor
   * @param { String } placeholderId Element ID to inflate the map into
   * @param { Object } props.events.click Map item click listener
   */
  constructor (mapPlaceholderId, props) {
    super(mapPlaceholderId, props, template)

    // Initialize Leaflet map
    this.map = L.map(this.refs.mapContainer, {
      center: [ 5, 20 ],
      zoom: 4,
      maxZoom: 8,
      minZoom: 4,
      maxBounds: [ [ 50, -30 ], [ -45, 100 ] ]
    })

    this.map.zoomControl.setPosition('bottomright') // Position zoom control
    this.layers = {} // Map layer dict (key/value = title/layer)
    this.selectedRegion = null // Store currently selected region

    // Render Carto GoT tile baselayer
	// https://carto.com/blog/game-of-thrones-basemap/
	
	//let basemap_publisher = '/ramirocartodb' // With Labels
	let basemap_publisher = 'public' // Without Labels
		
	let carto_basemap_url = 'https://cartocdn-gusc.global.ssl.fastly.net/' + basemap_publisher
		
	// let aot_basemap = 'tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf' // With Labels
	let aot_basemap = 'tpl_d6e601f7_409f_43fb_9015_76d5fd978dea'    // Without Labels
		
	let map_url = carto_basemap_url + '/api/v1/map/named/' + aot_basemap + '/all/{z}/{x}/{y}.png'
	console.log(map_url)
		
	// https://cartocdn-gusc.global.ssl.fastly.net/public/api/v1/map/static/named/tpl_d6e601f7_409f_43fb_9015_76d5fd978dea/1200/800.png
    L.tileLayer(
        map_url,
        { crs: L.CRS.EPSG4326 }).addTo(this.map);
  } // constuctor
  
  /* Add location geojson to the leaflet instance */
  addLocationGeojson (layerTitle, geojson, icon_url_arg) {
    // Initialize new geojson layer
    this.layers[layerTitle] = L.geoJSON(geojson, {
      // Show marker on location
      pointToLayer: (feature, latlng) => {
		  
		/*
        var label = new L.Label()
        label.setContent("test")
        label.setLatLng(latlng.getCenter())
        this.map.showLabel(label);
		//return label;
		*/
		
		  let label_class = city_labels[0][feature.properties.name] != undefined ? 'default-label' : 'no_french_label';
		  
		  let label_text = city_labels[0][feature.properties.name] != undefined ? 
					       city_labels[0][feature.properties.name] : feature.properties.name;
		  
		  // *** Custom Labels ***
		  // https://gis.stackexchange.com/questions/59571/how-to-add-text-only-labels-on-leaflet-map-with-no-icon
		  return L.marker(latlng,
                 { opacity: 0.99,
				   /*
				   icon: L.icon(
				       { icon_url_arg, iconSize: [ 24, 56 ],
					   }),
					   */
					   
					icon: L.divIcon({
                       className: label_class,
                       html: "<img width=24 height=24 src=\"" + icon_url_arg + "\"/>" + label_text ,
                       iconSize: [ 24, 24 ]
                    }),
					
					//html: feature.properties.name + "<img width=24 height=56 src=\"" + icon_url_arg +"\">",
					
                   title: feature.properties.name
                 })		
          
				 
		  /*
		       { opacity: 0.01, noHide: true, className: "my-label", offset: [0, 0],
			     icon: L.icon({ icon_url_arg, iconSize: [ 24, 56 ],
				 title: feature.properties.name
			   } );*/
		  // *** Custom Labels ***
        
		  /*
        return L.marker(latlng, {
          icon: L.icon({ icon_url_arg, iconSize: [ 24, 56 ] }),
          title: feature.properties.name })
		  */
      },
      onEachFeature: this.onEachLocation.bind(this)
    })
  } // addLocationGeojson

  /* Assign Popup and click listener for each location point */
  onEachLocation (feature, layer) {
    // Bind popup to marker
    layer.bindPopup(feature.properties.name, { closeButton: false })
    layer.on({ click: (e) => {
      this.setHighlightedRegion(null) // Deselect highlighed region
      const { name, id, type } = feature.properties
      this.triggerEvent('locationSelected', { name, id, type })
    }})
  } // onEachLocation
  
  /** Add boundary (kingdom) geojson to the leaflet instance */
  addKingdomGeojson (geojson) {
    // Initialize new geojson layer
    this.layers.kingdom = L.geoJSON(geojson, {
      // Set layer style
      style: {
        'color': '#222',
        'weight': 1,
        'opacity': 0.65
      },
      onEachFeature: this.onEachKingdom.bind(this)
    })
  } // addKingdomGeojson

  /** Assign click listener for each kingdom GeoJSON item  */
  onEachKingdom (feature, layer) {
    layer.on({ click: (e) => {
      const { name, id } = feature.properties
      this.map.closePopup() // Deselect selected location marker
      this.setHighlightedRegion(layer) // Highlight kingdom polygon
      this.triggerEvent('locationSelected', { name, id, type: 'kingdom' })
    }})
  } // onEachKingdom

  /** Highlight the selected region */
  setHighlightedRegion (layer) {
    // If a layer is currently selected, deselect it
    if (this.selected) { this.layers.kingdom.resetStyle(this.selected) }

    // Select the provided region layer
    this.selected = layer
    if (this.selected) {
      this.selected.bringToFront()
      this.selected.setStyle({ color: 'blue' })
    }
  } // setHighlightedRegion
  
  /** Toggle map layer visibility */
  toggleLayer (layerName) {
    const layer = this.layers[layerName]
    if (this.map.hasLayer(layer)) {
      this.map.removeLayer(layer)
    } else {
      this.map.addLayer(layer)
    }
  } // toggleLayer
} // Map class