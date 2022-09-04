import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

const EventCard = props => {
  return (
    <div className="card is-flex is-flex-direction-column is-flex-grow-1">
      <Link to={`${props.slug}/#header`}>
        <div className="card-image">
          <figure className="image">
            {props.image ? (
              <GatsbyImage alt="picture of event" image={props.image} />
            ) : (
              <StaticImage
                alt="default event picture as no event picture was specified"
                src="../../static/defaultevent.png"
              />
            )}
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{props.title || "New Event"}</p>
              <p className="subtitle is-6">{props.date || ""}</p>
            </div>
          </div>
          <div className="content"></div>
        </div>
      </Link>
    </div>
  )
}

export default EventCard
