import React from 'react'
import {X} from "lucide-react"
const NewPage = ({image,title,desc}) => {
  return (
    <div className="flex h-[100vh] w-[100vw] justify-center items-center box-border">
      <div className="site gap-4 w-[95vw] h-[90vh] shadow-2xl rounded-lg border-2 border-gray-400 p-5 flex ">
       
          <div className="relative inline w-1/2">
            <img
              src={image}
              alt="Uploaded"
              className=" h-full object-cover rounded-xl"
            />
            <X className="absolute top-3 right-3 bg-gray-400 bg-opacity-50 rounded-full hover:scale-90 cursor-pointer duration-300 text-white p-3" size={60}/>
          </div>
    <div className="w-1/2 p-[50px]">
      <h1 className='text-[4rem] font-bold'>{title}</h1>
      <p className='text-[2rem] '>{desc}</p>
    </div>
      </div>
    </div>
  )
}

export default NewPage