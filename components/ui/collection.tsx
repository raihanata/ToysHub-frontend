import React from 'react'
import Image from "next/image"
const Collection = () => {
     const collectionData = [
        {
            title: "Playsets",
            icon: "/collection1.png",
             price: "price",
        },
        {
            title: "Control Toys",
           icon: "/collection2.png",
             price: "price",
        },
        {
            title: "Educational Toys",
             icon: "/collection3.png",
             price: "price",
        },
        {
            title: "Eco-Friendly Toys",
          icon: "/collection4.png",
             price: "price",
        },
        {
            title: "Stuffed Toys",
           icon: "/collection5.png",
            price: "price",
        },
       {
            title: "Stuffed Toys",
           icon: "/collection6.png",
            price: "price",
        },
       
        {
            title: "Stuffed Toys",
           icon: "/collection7.png",
            price: "price",
        },
        {
            title: "Stuffed Toys",
           icon: "/collection8.png",
            price: "price",
        },
        {
            title: "Stuffed Toys",
           icon: "/collection9.png",
            price: "price",
        },
        {
            title: "Stuffed Toys",
           icon: "/collection10.png",
            price: "price",
        },
        
     {
            title: "Stuffed Toys",
           icon: "/collection11.png",
            price: "price",
        },
        {
            title: "Stuffed Toys",
           icon: "/collection12.png",
            price: "price",
        },

    ];
    return (
        <section id="features" className="w-full py-12 md:py-12 lg:py-12">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight {chelseaMarket.className}">
                            Top picks For your Little ones
                        </h2>
                        <div className="flex items-center gap-2 justify-center">
                            <div className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white dark:text-red-400">
                                New Arrivals
                            </div>
                            <div className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white dark:text-red-400">
                                Best Seller
                            </div>
                        </div>



                    </div>
                </div>
              <div className="mx-auto grid max-w-5xl  grid-cols-4 grid-rows-3 gap-1 py-8 px-15 ">
                                {collectionData.map((data, index) => (
                                    <div key={index} className="flex flex-col  space-y-2 rounded-lg  p-1 pb-3">
                                        <div className="">
                                            <Image
                                                src={data.icon}
                                                alt={data.title}
                                                width={130}
                                                height={130}
                                                className=" object-contain w-full"
                                            />
                                        </div>
                                        <h3 className="text-m font-normal pl-3">{data.title}</h3>
                                        <p className="text-m font-normal pl-3">{data.price}</p>
            
                                    </div>
                                ))}
                            </div>
            
            </div>
        </section>
    )
}

export default Collection