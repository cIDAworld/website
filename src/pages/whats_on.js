import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import ContentPage from "../components/content_page"
import EventPage from "../components/event_page"
import EventCard from "../components/event_card"
import TwitterCard from "../components/twitter_card"

const WhatsOn = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          fields: { category: { eq: "projects" }, hasPassed: { eq: false } }
        }
        sort: { fields: frontmatter___date }
      ) {
        nodes {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "dddd, D MMMM yyyy")
            time
            place
            highlight
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1)
              }
            }
          }
        }
      }
      allTwitterStatusesUserTimelineTimeline(
        sort: { fields: fields___date, order: DESC }
        limit: 12
      ) {
        nodes {
          full_text
          created_at
          id_str
          image {
            childImageSharp {
              gatsbyImageData(height: 200, width: 600)
            }
          }
          retweeted_status {
            user {
              name
              profile_banner_url
            }
          }
        }
      }
    }
  `)

  let highlightIndex = null

  const events = !data.allMarkdownRemark ? (
    <h1 className="is-size-2">There currently isn't anything coming up.</h1>
  ) : (
    <div className="columns is-multiline is-mobile">
      {data.allMarkdownRemark.nodes.map((element, i) => {
        if (!highlightIndex && element.frontmatter.highlight) {
          highlightIndex = i
          return ""
        }

        return (
          <div
            className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile is-flex"
            key={element.id}
          >
            <EventCard
              slug={element.fields.slug}
              title={element.frontmatter.title}
              date={element.frontmatter.date}
              text={element.html}
              image={element.frontmatter.image?.childImageSharp.gatsbyImageData}
            />
          </div>
        )
      })}
    </div>
  )

  const highlight = highlightIndex ? (
    <>
      {" "}
      <EventPage
        title={data.allMarkdownRemark.nodes[highlightIndex].frontmatter.title}
        date={data.allMarkdownRemark.nodes[highlightIndex].frontmatter.date}
        time={data.allMarkdownRemark.nodes[highlightIndex].frontmatter.time}
        place={data.allMarkdownRemark.nodes[highlightIndex].frontmatter.place}
        text={data.allMarkdownRemark.nodes[highlightIndex].html}
        image={
          data.allMarkdownRemark.nodes[highlightIndex].frontmatter.image
            ?.childImageSharp.gatsbyImageData
        }
      />
    </>
  ) : (
    ""
  )

  const twitterNews = (
    <>
      <h1 className="title is-medium mt-6">News</h1>
      <div className="columns is-multiline is-mobile">
        {data.allTwitterStatusesUserTimelineTimeline.nodes.map((element, i) => (
          <div
            className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile is-flex"
            key={element.id_str}
          >
            <TwitterCard
              author={element.retweeted_status?.user.name || "cIDA"}
              date={new Date(element.created_at).toDateString()}
              text={element.full_text}
              image={element.image.childImageSharp.gatsbyImageData}
              link={`https://www.twitter.com/cIDA_essex/status/${element.id_str}`}
            />
          </div>
        ))}
      </div>
    </>
  )

  return (
    <ContentPage pageTitle="What's on">
      <div className="container">
        {highlight}
        {events}
        {twitterNews}
      </div>
    </ContentPage>
  )
}

export default WhatsOn
