import React from 'react'

const Newsitems = (props)=>{
      let {title,description,imageurl,newsurl,author,publishedAt,source} = props;
    return (
        <>
        <div className='flex-column mt-3'>
            <div className='animate-bounce h-auto flex-auto mb-2'>
            <span className=" h-auto py-2 px-4 shadow-md no-underline rounded-full bg-red-700 text-white font-sans font-semibold text-sm border-red hover:text-white hover:bg-red-light focus:outline-none active:shadow-none z-0">{source}</span>	
            </div>
        <div className="border border-[#DDDDDD] h-auto w-80 bg-white rounded-lg flex-row content-between">
            <div className='h-44 flex-auto'>
            <img className='object-cover h-44 w-80 bg-center rounded-lg flex-auto' src={imageurl} alt="" />
            </div>
            <div className='title h-16 flex-auto mx-2 my-2'>
            <h6 className='h-16 overflow-hidden text-2xl font-semibold text-[#434242] font-sans'>{title}</h6>
            </div>

            <div className='description h-20 mx-2'>
            <p className='h-20 overflow-hidden text-1xl text-[#B2B2B2] font-medium font-sans'>{description}</p>
            </div>
            <div className='author h-11 mx-2'>
            <p className='h-20 overflow-hidden text-xs text-[#B2B2B2] font-medium font-sans'>By - {author} on {new Date(publishedAt).toGMTString()}</p>
            </div>
            <div className='btn flex justify-center items-end mb-4'>
            
            <a href={newsurl}>
              <button className="relative group overflow-hidden px-6 h-12 rounded-full flex space-x-2 items-center bg-[#301E67] hover:bg-[#472183] z-0">
              <span className="relative text-sm text-white">Read more</span>
              <div className="flex items-center -space-x-3 translate-x-3">
              <div className="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              </div>
              </button>
          </a>
            </div>
        </div>
        </div>
        </>
    )
}

export default Newsitems