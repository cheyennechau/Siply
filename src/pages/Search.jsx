import { useState, useEffect } from "react";
import SearchResultsCard from "@/components/SearchResultsCard";
import { supabase } from "@/lib/supabaseClient";
import { searchPlaces } from "@/api/places";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Map from "@/components/MapComponent";


const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [location, setLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);

    useEffect(() => {
        if (!location) return;

        (async () => {
            const data = await searchPlaces({
            query: query || "matcha",
            ll: `${location.lat},${location.lng}`,
            limit: 10,
            });

            setResults(data.results ?? data);
        })();
    }, [location, query]);


    useEffect(() => {
        const main = document.querySelector("main");
        if (!main) return;

        const prev = main.style.overflowY;
        main.style.overflowY = "hidden";

        return () => {
            main.style.overflowY = prev;
        };
    }, []);

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
            setLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            });
            },
            (err) => {
            console.warn("Location denied:", err.message);
            setLocationError("Location permission denied");
            },
            {
            enableHighAccuracy: true,
            timeout: 10000,
            }
        );
    }, []);

    return (
        <div className="h-full flex flex-col min-h-0">
            {/* Header */}
            <PageHeader
                title="Search"
                caption="find new places"
            />

            {/* Search Bar */}
            <div className="relative mb-10">
                <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent-foreground" />
                <Input
                    placeholder="Search drinks, locations, notes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="h-12 pl-11 pr-24 text-base"
                />
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-2 gap-10">
                {/* Left */}
                <div className="min-h-0">
                    <Map className="h-full w-full border" />
                </div>

                {/* Right */}
                <div className="min-h-0 overflow-y-auto border rounded-lg p-4 bg-white">
                    {/* results list / cards */}
                    {results.map((place) => (
                        <SearchResultsCard key={place.fsq_id ?? place.id ?? place.name} place={place} />
                    ))}
                </div>

            </div>
            {/* <div>Testing Foursquare</div> */}
        </div>
    );
};

export default Search;