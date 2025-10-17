import React from 'react'
import Image from "next/image"
const Gallery = () => {
    const gallerypics = [
        {
            title: "gallery1",
            icon: "/gallery1.png",
        },
        {
            title: "gallery2",
            icon: "/gallery2.png",
        },
        {
            title: "gallery3",
            icon: "/gallery3.png",
        },
        {
            title: "gallery4",
            icon: "/gallery4.png",
        },
        {
            title: " gallery5",
            icon: "/gallery1.png",
        },
    ];


  return (
      <section id="features" className="w-full py-10 md:py-10 lg:py-10">
         <div className="container px-4 md:px-6">
                   
               <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight {chelseaMarket.className}">
                           Recent Photoshotes
                        </h2>
                        <div className="inline-block rounded-lg bg-red-600 px-3 py-1 text-sm text-white dark:text-red-400">
                           Ckeck Our Gallery
                        </div>


                    </div>
                </div>
                   <div className="mx-auto grid max-w-7xl  grid-cols-5 gap-0   ">
                       {gallerypics.map((gallerypic, index) => (
                           <div key={index} className="flex flex-col items-center space-y-2 rounded-lg ">
                               <div className="p-0">
                                   <Image
                                       src={gallerypic.icon}
                                       alt={gallerypic.title}
                                       width={130}
                                       height={130}
                                       className="rounded-md object-contain w-full"
                                   />
                               </div>
                              
   
                           </div>
                       ))}
                   </div>
   
               </div>
           </section>
  )
}

export default Gallery