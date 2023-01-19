import React from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"

const Head = props => {
  const title = props.title || "Home"
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="HandheldFriendly" content="True" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="The official website for the Centre for Ideology and Discourse Analysis at the University of Essex." />
      <meta name="keywords" content="cida, university of essex, academic, phd, research" />
      <title>{`cIDA | ${title}`}</title>
    </>
  )
}

export default Head
