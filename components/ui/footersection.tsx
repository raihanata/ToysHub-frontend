import React from 'react'

const Footersection = () => {
  return (
   <section id="features" className="w-full py-1 md:py-1 lg:py-1">
          <div className="container px-4 md:px-6">
            
            <div className="mx-auto grid max-w-5xl grid-cols-3 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "About Us",
                  contents: ["who we are?","authenticit","carees","Terms&Services","Blog"]
                 
                 
                },
                {
                  title: "By Catogory",
                  contents: ["Playsets?","Controll Toys","Educational toys","Stuffed toys","eco-friendly toys"]
                
                },
                {
                  title: "Contact Us",
                  contents: ["Nexa Building"," Ground Floor","Calict","987654321","shoyshub@gmail.com"]
                  
                },
              
              ].map((footerfeature, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border border-red-200 p-4">
                  
                  <h3 className="text-xl font-bold pr-7">{footerfeature.title}</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
              {footerfeature.contents.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default Footersection