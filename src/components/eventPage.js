import React, {useState} from "react"
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
  const [showParagraph, setShowParagraph] = useState(props.highlighted?false:true)
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
          <div className="card-image">
            {props.image ? (
              <GatsbyImage
                alt={`Image of ${props.title}`}
                image={props.image}
              />
            ) : (
              <StaticImage
                alt="default event picture as no event picture was specified"
                src="../../static/defaultevent.png"
              />
            )}
            <div className="tags is-overlay is-align-items-start is-justify-content-left p-3">
              {props.category?.map(e => (
                <span
                  key={`${e}-category`}
                  className="tag is-capitalized is-white has-shadow"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
          <aside>
            {date}
            {time}
            {where}
          </aside>
        </div>
        <div className="column is-two-thirds text-content">
          <div
            className={showParagraph ? undefined : "only-show-beginning"}
            dangerouslySetInnerHTML={{ __html: props.text }}
          ></div>
          {props.highlighted ? (
            <>
              <button
                className="looks-like-link"
                onClick={() => setShowParagraph(!showParagraph)}
              >
                {showParagraph ? "Show less" : "Read more"}
              </button>
              <br />
            </>
          ) : undefined}
          <br />
          {pdf}
        </div>
      </div>
    </>
  )
}

export default EventPage
