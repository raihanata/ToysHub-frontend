import React from 'react'
import Image from "next/image"
const Categories = () => {
    const features = [
        {
            title: "Playsets",
            icon: "/playset.png",
        },
        {
            title: "Control Toys",
            icon: "/controll-tos.png",
        },
        {
            title: "Educational Toys",
            icon: "/education-toys.png",
        },
        {
            title: "Eco-Friendly Toys",
            icon: "/eco-friendly-toys.png",
        },
        {
            title: "Stuffed Toys",
            icon: "/stuffed-toys.png",
        },
    ];


    return (
        <section id="features" className="w-full pb-1 md:py-1 lg:py-1 px-5">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight {chelseaMarket.className}">
                            Find The perfect Toy
                        </h2>
                        <div className="inline-block rounded-lg bg-red-600 px-3 py-1 text-sm text-white dark:text-red-400">
                            Our collections
                        </div>


                    </div>
                </div>

                <div className="mx-auto grid max-w-5xl  grid-cols-5 gap-3 py-12 ">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                            <div className="p-2">
                                <Image
                                    src={feature.icon}
                                    alt={feature.title}
                                    width={130}
                                    height={130}
                                    className="rounded-md object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold">{feature.title}</h3>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Categories