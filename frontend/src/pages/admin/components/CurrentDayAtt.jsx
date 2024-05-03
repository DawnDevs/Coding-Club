import React from 'react'

const CurrentDayAtt = () => {
  return (
    <div className='p-10 mx-10'>
      <p className=' text-3xl font-semibold'>
        Dashboard
      </p>
      <div className=" pt-10 flex gap-10">
        <div className=" bg-white shadow-xl rounded hover:scale-105 p-4 w-fit h-24">
          <div className=" font-medium"> Present <span className=' text-slate-500 font-light'>| Today</span></div>
          <p className=' flex justify-center text-3xl text-cyan-500 font-medium'>123</p>
        </div>
        <div className=" bg-white shadow-xl rounded hover:scale-105 p-4 w-fit h-24">
          <div className=" font-medium"> Absent <span className=' text-slate-500 font-light'>| Today</span></div>
          <p className=' flex justify-center text-3xl text-cyan-500 font-medium'>2</p>
        </div>
        <div className=" bg-white shadow-xl rounded hover:scale-105 p-4 w-fit h-24">
          <div className=" font-medium"> Attendance <span className=' text-slate-500 font-light'>| This Month</span></div>
          <p className=' flex justify-center text-3xl text-cyan-500 font-medium'>123</p>
        </div>
      </div>
    </div>
  )
}

export default CurrentDayAtt 