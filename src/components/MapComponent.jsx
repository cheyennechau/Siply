import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import { useEffect, useState } from 'react';

function MapComponent({ className }) {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("Geolocation not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                console.error(err);
            },
            {
                enableHighAccuracy: true,
            }
        );
    }, []);

    if (!position) return <div style={{ height: 400 }} />;

    return (
        <div className={`h-full w-full flex flex-col`}>
            <div className="flex-1 min-h-0">
                <MapContainer
                    center={position}
                    zoom={14}
                    style={{ height: "100%", width: "100%" }}
                    attributionControl={false}
                    className={`rounded-lg ${className}`}
                >
                    <TileLayer
                        url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />
                    <CircleMarker 
                        center={position}
                        radius={8}
                        pathOptions={{
                            color: "var(--primary)",
                            fillColor: "var(--ring)",
                            fillOpacity: 0.9
                    }}>
                        <Popup>you are here 🎉</Popup>
                    </CircleMarker>

                    {/* <p className="text-xs text-muted-foreground text-right mt-1">
                        © OpenStreetMap contributors · © CARTO
                    </p> */}
                </MapContainer>
            </div>
        </div>
    );
}

export default MapComponent;
