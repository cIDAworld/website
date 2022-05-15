import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const MemberCard = props => {
  return (
    <div className="card is-flex is-flex-direction-column is-flex-grow-1">
      <div className="card-image">
        <figure className="image">
          <GatsbyImage alt="picture of cida member" image={props.image} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{props.name}</p>
            <p className="subtitle is-6">{props.role}</p>
          </div>
        </div>
        <div className="content">{props.intro}</div>
      </div>
    </div>
  )
}

export default MemberCard
