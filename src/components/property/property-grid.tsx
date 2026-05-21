import PropertyCard from "./property-card";




export default function PropertyGrid() {

    const properties = 8;

    return (
        <div className="w-full px-6 mb-9 flex items-center justify-center">
            <div className="w-full place-items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-12">
                {Array.from({ length: properties }).map((_, index) => (
                    <PropertyCard key={index} />
                ))}
            </div>
        </div>
        
    )
}