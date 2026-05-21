import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { AreaChart, Bath, BedDouble, Heart, MapPin } from "lucide-react";
import { Separator } from "#components/ui/separator";


export default function PropertyCard() {

    const imagem = "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80";

    return (
        <div className="shadow-2xl bg-card flex flex-col justify-between rounded-2xl w-[90%] h-full min-w-70 min-h-95">
            {/* imagem */}
            <div className="relative overflow-hidden rounded-tl-2xl rounded-tr-2xl">
                {/* link de imagem de casa aleatoria */}
                <Badge className="absolute top-8 left-4 bg-text-primary w-16 h-6 rounded-md">Novo</Badge>
                <Button className="absolute top-6 right-4 rounded-full bg-foreground"><Heart></Heart></Button>
                <img className="w-full h-52 object-cover object-top" src={imagem} alt="imagem casa" />
            </div>

            {/* informações */}
            <div className="px-4 py-3">
                <p className="text-h text-[10pt] flex items-center gap-2"><MapPin size={14}></MapPin>Alphaville, São Paulo</p>
                <h2 className="text-md font-bold mt-2 tracking-tight">Casa moderna com piscina</h2>
                <div className="w-full mt-2 justify-around flex flex-col text-sm">
                    <p className="flex items-center gap-2"><BedDouble size={18}></BedDouble> 3 quartos </p>
                    <p className="flex items-center gap-2"><Bath size={18}></Bath> 2 banheiros</p>
                    <p className="flex items-center gap-2"><AreaChart size={18}></AreaChart> 120m2</p>
                </div>
            </div>
            <Separator></Separator>
            {/* ações */}
            <div className="flex px-4 py-3 items-center">
                <div>
                    <p className="text-xl text-blue-900 dark:text-blue-500 font-bold">R$ 1.500.000</p>
                </div>
                <Button className="ml-auto bg-blue-900 dark:bg-blue-500 hover:bg-blue-800">Ver Detalhes</Button>
            </div>
        </div>
    )
}