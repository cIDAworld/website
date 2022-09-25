import React from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"

const Head = props => {
  const title = props.title || "Home"
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="HandheldFriendly" content="True" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <title>{`cIDA | ${title}`}</title>
      {props.redirect && (
        <meta http-equiv="refresh" content={`0;URL='${props.redirect}'`} />
      )}
    </>
  )
}

export default Head
