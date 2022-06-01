import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const EventPage = props => {
  const date = props.date ? (
    <>
      <b>Date: </b>
      {props.date}
      <br />
    </>
  ) : (
    ""
  )

  const time = props.time ? (
    <>
      <b>Time: </b>
      {props.time}h
      <br />
    </>
  ) : (
    ""
  )

  const where = props.place ? (
    <>
      <b>Where: </b>
      {props.place} <br />
    </>
  ) : (
    ""
  )
  return (
    <>
      <div className="columns">
        <div className="column is-full">
          <h1 className="title is-large">{props.title}</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-third">
          <GatsbyImage alt="event image" image={props.image} />
          <aside>
            {date}
            {time}
            {where}
          </aside>
        </div>
        <div className="column is-two-thirds text-content">
          <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
        </div>
      </div>
    </>
  )
}

export default EventPage
