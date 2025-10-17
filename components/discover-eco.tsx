import React from 'react'
import Image from "next/image"
const Discovereco = () => {

    const features = [
        {
            title: "Playsets",
            icon: "/discover-banner.png",
        },
        {
            title: "Control Toys",
            icon: "/ecofriendly-banner.png",
        },
       
    ];

  return (
    <section id="features" className="w-full py-4 md:py-10 lg:py-4">
                <div className="container px-4 md:px-6">
                   
    
                    <div className="mx-auto grid max-w-7xl  grid-cols-2 gap-1 ">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center space-y-2 rounded-lg ">
                                <div className="p-2">
                                    <Image
                                        src={feature.icon}
                                        alt={feature.title}
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

export default Discovereco