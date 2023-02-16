import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import React, { Component } from "react";
import Newsitems from "./Newsitems";
import axios from "axios";
import Spinner from "./Spinner";
import propTypes  from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class Dashboard extends Component {
  
  static defaultProps = {
    country: 'in',
    pageSize:10,
    category:'general'
  }

  static propTypes = {
    country : propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles:[],
      loading: false,
      page:1,
      totalResults:0
    };
  }

  async Update_news(){
    this.setState({
      loading: true
    })
    axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=344b8b1ab8274790b89e94f57c24a557&page=1&pageSize=${this.props.pageSize}`)
    .then((response)=>{
      this.setState({
        articles: response.data.articles,
        totalResults: response.data.totalResults,
        loading: false})
    }) 
  }
  
  async componentDidMount(){
    this.Update_news()
  }

  handlePrevClick = async()=>{
    this.setState({ 
      page: this.state.page - 1,
    })
    this.Update_news()
  }

  handleNextClick = async()=>{
    // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
      this.setState({ 
        page: this.state.page + 1,
      })
      this.Update_news()
      
    }

    fetchMoreData = async() => {
      // this.setState({
      //   loading: true
      // })
      axios.get(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=344b8b1ab8274790b89e94f57c24a557&page=${this.state.page}&pageSize=${this.props.pageSize}`)
      .then((response)=>{
        this.setState({
          articles: this.state.articles.concat(response.data.articles),
          totalResults: response.data.totalResults,
          loading: false,
          page:this.state.page + 1
        })
      }) 
    }

  render() {
    return (
      <>
        <header className="bg-[#301E67]">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              News-Monkey Top headlines
            </h1>
          </div>
        </header>
        <div className="flex justify-center bg-[#ECECEC] mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {this.state.loading && <Spinner/>}
        </div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-[#ECECEC] flex-auto grid grid-cols-3 gap-5 md:max-lg:grid-cols-2 gap-2 max-md:grid-cols-1 gap-3">
          {!this.state.loading && this.state.articles.map((element)=>{
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
}

export default Dashboard;
