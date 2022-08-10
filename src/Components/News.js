import React, { Component } from "react";
import Newsitem from "../Newsitem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "General",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9eddfefa3274457ab4c811400c341bf&page=1&pageSize=${this.props.PageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handleNextClick = async () => {
    console.log("handleNextClick");
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.PageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=f9eddfefa3274457ab4c811400c341bf&page=${
        this.state.page + 1
      }&pageSize=${this.props.PageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  handlePrevClick = async () => {
    console.log("handlePrevClick");

    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=f9eddfefa3274457ab4c811400c341bf&page=${
      this.state.page - 1
    } &pageSize=${this.props.PageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  render() {
    return (
      <div className="container my-4 text-center">
        <h1 style={{ textShadow: "2px 2px 5px cyan " }}>
          NewsMonkey - Top {``}
          {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title}
                  description={element.description}
                  ImageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between my-4">
          <button
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
            className="btn btn-dark btn-lg"
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.PageSize)
            }
            onClick={this.handleNextClick}
            className="btn btn-dark btn-lg"
          >
            next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
