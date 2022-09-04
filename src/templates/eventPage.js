import React from "react"
import { graphql, Link } from "gatsby"
import ContentPage from "../components/content_page"
import EventPage from "../components/event_page"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark

  return (
    <ContentPage pageTitle="What's on" sectionId="header">
      <div className="container">
        <EventPage
          title={frontmatter.title || "New Event"}
          date={frontmatter.date}
          time={frontmatter.time}
          place={frontmatter.place}
          image={frontmatter.image?.childImageSharp.gatsbyImageData}
          text={html}
        />
      </div>
    </ContentPage>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
        date(formatString: "dddd, D MMMM yyyy")
        time
        place
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.0)
          }
        }
      }
    }
  }
`
