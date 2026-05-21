import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { Button } from "#components/ui/button";
import { ArrowBigUp, ArrowBigDown, Wallet, PersonStandingIcon, BellDot } from "lucide-react";
import { useEffect, useRef } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Analytics() {


    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slider = sliderRef.current;
        
        if (!slider) return;

        let isDown = false;
        let startY = 0; 
        let scrollTop = 0;

        const handleMouseDown = (e: MouseEvent) => {
            isDown = true;
            startY = e.pageY;
            scrollTop = slider.scrollTop;
        };

        const stopDragging = () => {
            isDown = false;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDown) return;

            e.preventDefault();

            const y = e.pageY;
            const walk = (y - startY) * 2;

            slider.scrollTop = scrollTop - walk;
        };

        slider.addEventListener("mousedown", handleMouseDown);
        slider.addEventListener("mouseleave", stopDragging);
        slider.addEventListener("mouseup", stopDragging);
        slider.addEventListener("mousemove", handleMouseMove);

        return () => {
            slider.removeEventListener("mousedown", handleMouseDown);
            slider.removeEventListener("mouseleave", stopDragging);
            slider.removeEventListener("mouseup", stopDragging);
            slider.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const realtors = [
        { name: "Realtor 1", sales: 20 },
        { name: "Realtor 2", sales: 15 },
        { name: "Realtor 3", sales: 10 },
        { name: "Realtor 4", sales: 8 },
        { name: "Realtor 5", sales: 5 },
        { name: "Realtor 6", sales: 3 },
        { name: "Realtor 7", sales: 2 },
        { name: "Realtor 8", sales: 1 },
    ]


    return (
        <div className="p-6 space-y-4 h-full">
            <h1 className="text-2xl font-bold mb-4">Analytics</h1>
            <div className="flex flex-col gap-4 mt-6 md:flex-row lg:flex-row ">
                {/* Analytics cards */}
                <div className="lg:w-4/6 md:w-4/6 w-full">
                    <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-4 ">
                        <div className="bg-card w-full rounded-lg shadow px-4 py-2 h-22 mb-4">
                            <p className="text-[10pt] font-heading items-center flex gap-2"> <PersonStandingIcon size={14}></PersonStandingIcon> Visitors</p>
                            <span className="text-2xl font-bold flex justify-between">1,234
                                <Button className="bg-green-200 text-green-600 hover:bg-green-200"><ArrowBigUp /></Button>
                            </span>
                            <p className="text-green-500  text-[8pt]">+ 2.5% <span className="text-gray-600"> more than last month</span></p>
                        </div>
                        <div className="bg-card w-full rounded-lg shadow px-4 py-2 h-22 mb-4">
                            <p className="text-[10pt] font-heading items-center flex gap-2"> <Wallet size={14}></Wallet> Visitors</p>
                            <span className="text-2xl font-bold flex justify-between">1,234
                                <Button className="bg-green-200 text-green-600 hover:bg-green-200"><ArrowBigUp /></Button>
                            </span>
                            <p className="text-green-500  text-[8pt]">+ 2.5% <span className="text-gray-600"> more than last month</span></p>
                        </div>
                        <div className="bg-card w-full rounded-lg shadow px-4 py-2 h-22 mb-4">
                            <p className="text-[10pt] font-heading items-center flex gap-2"> <Wallet size={14}></Wallet>Sales</p>
                            <span className="text-2xl font-bold flex justify-between">1,234
                                <Button className="bg-red-200 text-red-600 hover:bg-red-200"><ArrowBigDown /></Button>
                            </span>
                            <p className="text-red-500  text-[8pt]">+ 2.5% <span className="text-gray-600"> more than last month</span></p>
                        </div>


                    </div>
                    {/* Charts */}
                    <div className="flex gap-4 flex-col md:flex-row lg:flex-row">
                        {/* Charts */}
                        <div className="bg-card rounded-xl w-full h-90 shadow p-4 border border-border">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Monthly Revenue</p>
                                    <h2 className="text-2xl font-bold">R$ 84.2K</h2>
                                </div>

                                <Button variant="outline" className="rounded-full">
                                    This Year
                                </Button>
                            </div>

                            <ResponsiveContainer width="100%" height="80%">
                                <AreaChart
                                    data={[
                                        { month: "Jan", value: 12000 },
                                        { month: "Feb", value: 18000 },
                                        { month: "Mar", value: 14000 },
                                        { month: "Apr", value: 24000 },
                                        { month: "May", value: 30000 },
                                        { month: "Jun", value: 26000 },
                                        { month: "Jul", value: 38000 },
                                    ]}
                                >
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>

                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                    <YAxis hide />

                                    <Tooltip />

                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3B82F6"
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                        strokeWidth={3}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Properties Chart */}
                        <div className="bg-card rounded-xl w-full h-90 shadow p-4 border border-border">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Properties Status</p>
                                    <h2 className="text-2xl font-bold">248</h2>
                                </div>

                                <Button variant="outline" className="rounded-full">
                                    Updated
                                </Button>
                            </div>

                            <ResponsiveContainer width="100%" height="80%">
                                <BarChart
                                    data={[
                                        { name: "Sold", value: 42 },
                                        { name: "Rent", value: 87 },
                                        { name: "Pending", value: 21 },
                                        { name: "New", value: 58 },
                                    ]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                                    <YAxis hide />

                                    <Tooltip />

                                    <Bar
                                        dataKey="value"
                                        radius={[10, 10, 0, 0]}
                                        fill="#EC4899"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="lg:w-2/6 md:w-1/2 w-full bg-card  shadow rounded-md ">
                    <div className=" rounded-lg p-4 flex flex-col gap-4 ">
                        <h3 className="text-lg text-center font-bold">Top Realtors</h3>
                        <div ref={sliderRef} className="flex flex-col gap-2 h-90 cursor-grab active:cursor-grabbing overflow-x-auto select-none  scrollbar-none  ">
                            {realtors.map((realtor, index) => (
                                <div key={index} className="flex justify-between shadow p-2 gap-3 items-center">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} alt={realtor.name} />
                                        <AvatarFallback>{realtor.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className="w-full">{realtor.name}</p>
                                    <span className="w-full text-end text-sm text-gray-500">{realtor.sales} sales</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 lg:flex-row flex-col">
                {/* Conversion Card */}
                <div className="bg-card rounded-xl w-full h-80 shadow p-6 border border-border">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Lead Conversion</p>
                            <h2 className="text-3xl font-bold mt-1">68%</h2>
                        </div>

                        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                            +12%
                        </div>
                    </div>

                    <div className="mt-10 space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Website Leads</span>
                                <span>82%</span>
                            </div>

                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full w-[82%] bg-blue-500 rounded-full"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Instagram Ads</span>
                                <span>64%</span>
                            </div>

                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full w-[64%] bg-pink-500 rounded-full"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Referral Clients</span>
                                <span>91%</span>
                            </div>

                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full w-[91%] bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card lg:flex-row rounded-xl w-full h-80 shadow p-6 border border-border">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-gray-500 text-sm">Recent Activity</p>
                            <h2 className="text-2xl font-bold">Today</h2>
                        </div>

                        <BellDot className="text-gray-500" />
                    </div>

                    <div className="h-100">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                                <p className="font-medium">New property added</p>
                                <span className="text-sm text-gray-500">
                                    Apartment in São Paulo
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <div>
                                <p className="font-medium">Contract signed</p>
                                <span className="text-sm text-gray-500">
                                    Luxury house sold
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                            <div>
                                <p className="font-medium">New realtor joined</p>
                                <span className="text-sm text-gray-500">
                                    Maria Fernandes
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div>
                                <p className="font-medium">5 new leads generated</p>
                                <span className="text-sm text-gray-500">
                                    Campaign performance increased
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}