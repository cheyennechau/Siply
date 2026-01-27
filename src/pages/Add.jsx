import DefaultCard from "@/components/DefaultCard";
import { Upload, Calendar, Star } from "lucide-react";
import StarRating from "@/components/StarRating";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const Add = () => {

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
                                            duration-300 ease-in-out justify-center items-center rounded-lg bg-primary/10 text-sm">
                            <div className="flex flex-col justify-center items-center">
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
                                    <p className="mb-2">Location</p>
                                    <Input
                                        type="text"
                                        placeholder="Where did you get it?"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <p className="mb-2">Drink Name</p>
                                    <Input
                                        type="text"
                                        placeholder="What did you order?"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col">
                                        <p className="mb-2">Price</p>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                            <Input
                                                type="text"
                                                placeholder="0.00"
                                                className="pl-7"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="mb-2">Date</p>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                <Calendar size={16} />
                                            </span>
                                            <Input
                                                type="text"
                                                className="pl-7"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <p className="mb-2">Rating</p>
                                    <div className="flex grid-cols-5 gap-2">
                                        <StarRating rating={5} />
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
                        className="w-full h-50 p-3 mt-2 outline-1 rounded-lg 
                                    resize-none focus:ring-3 focus:ring-primary text-sm"
                    />
                </DefaultCard>

                <div className="w-full flex justify-center items-center">
                    <Button className="ml-auto px-5">Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default Add;