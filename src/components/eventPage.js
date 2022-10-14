import React from "react"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

const getDateJsx = (date, endDate) => {
  if (date && endDate) {
    return (
      <>
        <b>Date: </b>
        from {date} to {endDate}
        <br />
      </>
    )
  } else if (date && !endDate) {
    return (
      <>
        <b>Date: </b>
        {date}
        <br />
      </>
    )
  } else return null
}

const EventPage = props => {
  const date = getDateJsx(props.date, props.endDate)

  const time = props.time ? (
    <>
      <b>Time: </b>
      {props.time}h
      <br />
    </>
  ) : undefined

  const where = props.place ? (
    <>
      <b>Where: </b>
      {props.place} <br />
    </>
  ) : undefined

  const pdf = props.pdfURL ? (
    <a href={props.pdfURL} target="_blank" rel="noopener noreferrer">
      Download pdf
    </a>
  ) : undefined

  return (
    <>
      <div className="columns">
        <div className="column is-full">
          <h1 className="title is-large">{props.title}</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column is-one-third">
          {props.image ? (
            <GatsbyImage alt={`Image of ${props.title}`} image={props.image} />
          ) : (
            <StaticImage
              alt="default event picture as no event picture was specified"
              src="../../static/defaultevent.png"
            />
          )}
          <aside>
            {date}
            {time}
            {where}
          </aside>
        </div>
        <div className="column is-two-thirds text-content">
          <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
          {pdf}
        </div>
      </div>
    </>
  )
}

export default EventPage
