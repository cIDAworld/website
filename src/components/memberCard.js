import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

const MemberCard = props => {
  return (
    <div className="card is-flex is-flex-direction-column is-flex-grow-1">
      <Link to={`${props.slug}/#header`}>
        <div className="card-image">
          <figure className="image">
            {props.image ? (
              <GatsbyImage alt="picture of cida member" image={props.image} />
            ) : (
              <StaticImage
                alt="default profile picture as no profile picture was specified"
                src="../../static/defaultprofile.png"
              />
            )}
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
      </Link>
    </div>
  )
}

export default MemberCard
