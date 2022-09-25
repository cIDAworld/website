import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const TwitterCard = props => {
  return (
    <div className="card is-flex is-flex-direction-column is-flex-grow-1">
      <div className="card-image">
        <figure className="image">
          <GatsbyImage alt="Twitter user's banner image" image={props.image} />
        </figure>
      </div>
      <div className="card-content is-flex-grow-1">
        <div className="media">
          <div className="media-content">
            <p className="subtitle is-6">
              {props.date}
              <br></br>
              by <b>{props.author}</b>
            </p>
          </div>
        </div>
        <div className="content">
          <div className="tweet">{props.text}</div>
        </div>
      </div>
      <div className="card-footer p-2 has-text-centered is-align-self-center">
        <a
          href={props.link}
          target="_blank"
          rel="noreferrer noopener"
          className="has-text-link has-text-weight-bold"
        >
          Read More
        </a>
      </div>
    </div>
  )
}

export default TwitterCard
