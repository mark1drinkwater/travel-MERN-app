import React, { useState, useRef, useEffect, useParams } from "react";

import '@tomtom-international/web-sdk-maps/dist/maps.css'
import mapSDK from '@tomtom-international/web-sdk-maps';
import mapServices from '@tomtom-international/web-sdk-services';

import './Map.css';

const Map = props => {
   const {center, zoom} = props;

   //your API key
   const API_KEY = 'pDAdSmmd9XXys0BvF0SOGfUZjnTAoMTj'
   //getting the country's name from the URL
   // let { countryName } = useParams();
   const mapRef = useRef();
   //default coordinates   
   const [countryLongitude, setCountryLongitude] = useState(center.long);
   const [countryLatitude, setCountryLatitude] = useState(center.lat);
   //use this to change the zoom level of the map
   const [zoomLevel, setZoomLevel] = useState(zoom);
   const [ourMap, setMap] = useState({});

    useEffect(() => {
      let ourMap = mapSDK.map({
        key: API_KEY,
        container: mapRef.current,
        center: [countryLongitude, countryLatitude],
        zoom: zoomLevel
      });
      // setMap(ourMap);
      //setting the location marker to help easily identify the target*/

      let locationMarker = new mapSDK.Marker({
        draggable: false
      }).setLngLat([countryLongitude, countryLatitude]).addTo(ourMap);

      return () => ourMap.remove();

      /*values to listen to*/
    }, [countryLongitude, countryLatitude]);

   return <div ref={mapRef} className={`map ${props.className}`} style={props.style}>
   </div>
};

export default Map;