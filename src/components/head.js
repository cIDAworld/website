import React from "react"
import { Helmet } from "react-helmet"
import "@fortawesome/fontawesome-free/css/all.min.css"

export default function Head(props) {
  const title = props.title || "Home"
  return (
    <Helmet>
      <meta charset="UTF-8" />
      <meta name="HandheldFriendly" content="True" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      />
      <title>{`${title} | Centre for Ideology and Discourse Analysis`}</title>
      {props.redirect && (
        <meta http-equiv="refresh" content={`0;URL='${props.redirect}'`} />
      )}
    </Helmet>
  )
}
