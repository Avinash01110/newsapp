import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import React, { useEffect,useState } from "react";
import Newsitems from "./Newsitems";
import axios from "axios";
import Spinner from "./Spinner";
import propTypes  from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const Dashboard = (props) =>{
  const [articles , setarticles]= useState([])
  const [loading , setloading]= useState(false)
  const [page , setpage]= useState(1)
  const [totalResults , settotalResults]= useState(0)

  const Update_news = async()=>{
    props.setProgress(10)
    setloading(true)
    await(axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`)
    .then((response)=>{
      setarticles(response.data.articles)
      settotalResults(response.data.totalResults)
      setloading(false)
    }))
    await(props.setProgress(60))
    await(props.setProgress(100))
  }
  
  useEffect(() => {
    Update_news()
  }, [])
  

  const handlePrevClick = async()=>{
    setpage(page - 1)
    Update_news()
  }

  const handleNextClick = async()=>{
    // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
      setpage(page + 1)
      Update_news()
    }

  const  fetchMoreData = async() => {
      props.setProgress(10)
      await(axios.get(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`)
      .then((response)=>{
        setarticles(articles.concat(response.data.articles))
        settotalResults(response.data.totalResults)
        setloading(false)
        setpage(page+1)
      }))
      await(props.setProgress(60))
      await(props.setProgress(100))

    }
    return (
      <>
        <header className="bg-[#301E67] sticky top-16 z-10">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              News-Monkey Top headlines
            </h1>
          </div>
        </header>
        {/* option for selecting the country */}
        {/* <div className="bg-[#ECECEC] mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="relative w-full lg:max-w-sm">
            <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                <option>ReactJS Dropdown</option>
                <option>Laravel 9 with React</option>
                <option>React with Tailwind CSS</option>
                <option>React With Headless UI</option>
            </select>
        </div>
        </div> */}
        <div className="flex justify-center bg-[#ECECEC] mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {loading && <Spinner/>}
        </div>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-[#ECECEC] flex-auto grid grid-cols-3 gap-5 md:max-lg:grid-cols-2 gap-2 max-md:grid-cols-1 gap-3">
          {!loading && articles.map((element)=>{
            return <Newsitems
            key={element.url}
            title={element.title?element.title:""}
            description={element.description?element.description:""}
            imageurl={element.urlToImage}
            newsurl={element.url?element.url:"/"}
            author={!element.author?"Unknown":element.author}
            publishedAt={!element.publishedAt?"":element.publishedAt}
            source={!element.source.name?"":element.source.name}
          />  
          })}
          </div>
        </InfiniteScroll>

        {/* <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-[#ECECEC] flex justify-between">
          <button disabled={this.state.page<=1} type="button" className="border-2 rounded-lg p-2 bg-[#301E67] text-white hover:bg-[#3D1766] focus:ring focus:ring-[#301E67]" onClick={this.handlePrevClick}>	&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="border-2 rounded-lg p-2 px- bg-[#301E67] text-white hover:bg-[#3D1766] focus:ring focus:ring-[#301E67]" onClick={this.handleNextClick}>Next	&rarr;</button>
        </div> */}
      </>
    );
}

Dashboard.defaultProps = {
  country: 'in',
  pageSize:10,
  category:'general'
}

Dashboard.propTypes = {
  country : propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string
}

export default Dashboard;
