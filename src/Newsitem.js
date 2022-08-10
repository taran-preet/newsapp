import { getByTitle } from "@testing-library/react";
import React, { Component } from "react";
// f9eddfefa3274457ab4c811400c341bf

export class Newsitem extends Component {
  render() {
    let { title, description, ImageUrl, newsUrl, author, date, source } =
      this.props; //These are props that are send to news.js file
    return (
      <div className="my-3">
        <span
          className="badge  badge-pill badge-danger"
          style={{ marginLeft: " 240px" }}
        >
          {source}
        </span>
        <div className="card">
          <img
            className="card-img-top"
            src={
              ImageUrl
                ? ImageUrl
                : "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202208/air_strike-647x363.jpeg?d7H3cOSh1Ewp76nO0DaQYLGevP6B.AqB"
            }
            alt="Card image cap"
          />

          <div className="card-body">
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}....</p>
            <p className="card-text ">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target={"_blank"} className="btn btn-dark btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
