import React from 'react'

const Abouthero = () => {
  return (
    <div className='w-full h-[600px] relative'>
        <div className='absolute h-full w-full'>

        <img className='absolute h-full w-full object-cover' src="/Aboutbg/contactbg.jpeg" alt="" />
        <p className='absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10  text-white text-4xl font-black'><span className='text-red-600'>Hack</span> Your Future. Connect with <span className='text-red-600'>NIHACS</span>.</p>
        </div>
        <div className=' absolute inset-0 bg-black opacity-50'></div>
      
    </div>
  )
}

export default Abouthero
