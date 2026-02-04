import DefaultCard from "@/components/DefaultCard";
import { Upload, Calendar, Star } from "lucide-react";
import StarRating from "@/components/StarRating";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";


const Add = () => {
    const [shopName, setShopName] = useState("");
    const [address, setAddress] = useState("");
    const [drinkName, setDrinkName] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState(""); // keep as text for now (MVP)
    const [rating, setRating] = useState(0);
    const [notes, setNotes] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async () => {
        try {
        setSaving(true);

        if (!shopName.trim()) return alert("Please enter a location.");
        if (!drinkName.trim()) return alert("Please enter a drink name.");

        const { data: existingLocs, error: locSelectErr } = await supabase
            .from("locations")
            .select("id")
            .eq("shop_name", shopName.trim())
            .limit(1);

        if (locSelectErr) return alert(locSelectErr.message);

        let locationId = existingLocs?.[0]?.id;

        if (!locationId) {
            const { data: newLoc, error: locInsertErr } = await supabase
            .from("locations")
            .insert({ address: address.trim() })
            .select("id")
            .single();

            if (locInsertErr) return alert(locInsertErr.message);
            locationId = newLoc.id;
        }

        const { error: purchaseErr } = await supabase.from("purchases").insert({
            location_id: locationId,
            drink_name: drinkName.trim(),
            price: price ? Number(price) : null,
            rating,
            notes: notes.trim() || null,
            // purchased_at: date ? new Date(date).toISOString() : undefined,
        });

        if (purchaseErr) return alert(purchaseErr.message);

        alert("Saved!");

        // reset (optional)
        setShopName("");
        setDrinkName("");
        setPrice("");
        setDate("");
        setRating(5);
        setNotes("");
        } finally {
        setSaving(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <PageHeader
                title="Add Entry"
                caption="log an experience"
            />

            <div className="grid gap-10">
                <div className="grid grid-cols-3 gap-10">

                    {/* Upload photos */}
                    <DefaultCard>
                        <p className="geist-500 text-md mb-3">Photos</p>
                        <label className="flex h-32 w-full border-2 border-dashed border-primary cursor-pointer mt-2 hover:bg-primary/30 transition-all 
                                            duration-300 ease-in-out justify-center items-center rounded-lg text-sm bg-accent-light text-accent-foreground/60">
                            <div className="flex flex-col justify-center items-center ">
                                <Upload />
                                <span>Upload photos here</span>
                            </div>
                            <input
                                type="file"
                                multiple
                                className="hidden"
                            />
                        </label>
                    </DefaultCard>

                    {/* Details */}
                    <div className="col-span-2">
                        <DefaultCard>
                            <p className="geist-500 text-md mb-3">Details</p>
                            
                            <div className="text-sm grid gap-5 w-full">
                                <div className="flex flex-col">
                                    <p className="mb-2">Shop Name</p>
                                    <Input
                                        type="text"
                                        placeholder="Where did you get it?"
                                        value={shopName}
                                        onChange={(e) => setShopName(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <p className="mb-2">Location</p>
                                    <Input
                                        type="text"
                                        placeholder="Where was the shop?"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <p className="mb-2">Drink Name</p>
                                    <Input
                                        type="text"
                                        placeholder="What did you order?"
                                        value={drinkName}
                                        onChange={(e) => setDrinkName(e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col">
                                        <p className="mb-2">Price</p>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-foreground">$</span>
                                            <Input
                                                type="text"
                                                placeholder="0.00"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="pl-7"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="mb-2">Date</p>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-foreground">
                                                <Calendar size={16} />
                                            </span>
                                            <Input
                                                type="text"
                                                className="pl-7"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <p className="mb-2">Rating</p>
                                    <div className="flex grid-cols-5 gap-2">
                                        <StarRating rating={rating} onChange={setRating} readOnly={false} />
                                    </div>
                                </div>
                            </div>
                        </DefaultCard>
                    </div>
                </div>

                <DefaultCard>
                    <p className="geist-500 text-md mb-2">Notes</p>
                    <textarea
                        placeholder="Flavor notes, anything special..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full h-50 p-3 mt-2 outline-1 rounded-lg 
                                    resize-none focus:ring-2 focus:ring-primary text-sm
                                    bg-accent-light text-accent-foreground placeholder:text-accent-foreground/60
                                    shadow-xs transition-[color,box-shadow]"
                    />
                </DefaultCard>

                <div className="w-full flex justify-center items-center">
                    <Button onClick={handleSubmit} disabled={saving} className="ml-auto px-5">
                        {saving ? "Saving..." : "Submit"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Add;