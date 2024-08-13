"use client";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map(restaurantAddress, studentAddress, onEstimatedTimeChange) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      const geocoder = new google.maps.Geocoder();
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      geocoder.geocode({ address: restaurantAddress }, (results, status) => {
        if (status === "OK") {
          const restaurantLocation = results[0].geometry.location;

          geocoder.geocode({ address: studentAddress }, (results, status) => {
            if (status === "OK") {
              const studentLocation = results[0].geometry.location;

              const newMap = new google.maps.Map(mapRef.current, {
                center: restaurantLocation,
                zoom: 10,
              });

              directionsRenderer.setMap(newMap);
              setMap(newMap);

              directionsService.route(
                {
                  origin: studentLocation,
                  destination: restaurantLocation,
                  travelMode: google.maps.TravelMode.DRIVING, // You can change this to WALKING, BICYCLING, etc.
                },
                (result, status) => {
                  if (status === "OK") {
                    directionsRenderer.setDirections(result);
                    const duration = result.routes[0].legs[0].duration.text;
                    if (onEstimatedTimeChange) {
                      onEstimatedTimeChange(duration);
                    }
                  } else {
                    console.error(`Directions request failed due to ${status}`);
                  }
                }
              );
            } else {
              console.error(
                `Geocode was not successful for the student address: ${status}`
              );
            }
          });
        } else {
          console.error(
            `Geocode was not successful for the restaurant address: ${status}`
          );
        }
      });
    });
  }, [restaurantAddress, studentAddress, onEstimatedTimeChange]);

  return <div style={{ height: "255px" }} ref={mapRef} />;
}

export default Map;
