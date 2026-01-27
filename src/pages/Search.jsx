import { useState, useEffect } from "react";
import SearchResultsCard from "@/components/SearchResultsCard";
import { supabase } from "@/lib/supabaseClient";
import { searchPlaces } from "@/api/places";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Map from "@/components/Map";


const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await searchPlaces({
            query: "matcha",
            ll: "34.0522,-118.2437",
            limit: 5,
            });
            setResults(data.results ?? data);
        })();
    }, []);

    useEffect(() => {
        const main = document.querySelector("main");
        if (!main) return;

        const prev = main.style.overflowY;
        main.style.overflowY = "hidden";

        return () => {
            main.style.overflowY = prev;
        };
    }, []);


    return (
        <div className="h-full flex flex-col min-h-0">
            {/* Header */}
            <PageHeader
                title="Search"
                caption="find new places"
            />

            {/* Search Bar */}
            <div className="relative bg-white mb-10">
                <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                placeholder="Search drinks, locations, notes..."
                value={query}
                // onChange={(e) => setSearchQuery(e.target.value)}
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