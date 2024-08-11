import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    name: 'in',
    pageSize: 6,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }

   capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1

    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsOwl`;
  }

  async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0ea86844656415ab189dab9ac8cd009&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({articles: parseddata.articles,
       totalResults: parseddata.totalResults,
       loading: false
      })

  }

  async componentDidMount(){
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0ea86844656415ab189dab9ac8cd009&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parseddata = await data.json();
    // console.log(parseddata);
    // this.setState({
    //    articles: parseddata.articles,
    //    totalResults: parseddata.totalResults,
    //    loading: false
    //   })
    this.updateNews();


  }

   handlePrevClick=async ()=>{
    // console.log("previous");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0ea86844656415ab189dab9ac8cd009&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parseddata = await data.json();
    // console.log(parseddata);

    // this.setState({
    //   page: this.state.page+1,
    //   articles: parseddata.articles,
    //   loading: false

    // })

    this.setState({page: this.state.page - 1});
    this.updateNews();

  }

   handleNextClick=async ()=>{
    // console.log("Next");
    // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a0ea86844656415ab189dab9ac8cd009&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parseddata = await data.json();
    // console.log(parseddata);
    
    // this.setState({
    //     page: this.state.page+1,
    //     articles: parseddata.articles,
    //     loading: false
    //   })
    // }
    this.setState({page: this.state.page + 1});
    this.updateNews();

  }


  render() {

    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px'}}>NewsOwls - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
                <Newsitems  title={element.title?element.title:" "} description={element.description?element.description:" "} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
        </div>

        {this.state.loading && <Spinner/>}

        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-outline-dark"onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>

      </div>
    )
  }
}

export default News
