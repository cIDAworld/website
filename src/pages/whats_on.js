import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import ContentPage from "../components/content_page"
import EventPage from "../components/event_page"
import EventCard from "../components/event_card"

const WhatsOn = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fields: { category: { eq: "whatson" } } }
        sort: { fields: frontmatter___date }
      ) {
        nodes {
          id
          html
          frontmatter {
            slug
            title
            date(formatString: "dddd, D MMMM yyyy")
            time
            place
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1)
              }
            }
          }
        }
      }
    }
  `)

  const nothingNew = (
    <h1 className="is-size-2">There currently isn't anything coming up.</h1>
  )

  const news = !data.allMarkdownRemark ? (
    <h1 className="is-size-2">There currently isn't anything coming up.</h1>
  ) : (
    <>
      <EventPage
        title={data.allMarkdownRemark.nodes[0].frontmatter.title}
        date={data.allMarkdownRemark.nodes[0].frontmatter.date}
        time={data.allMarkdownRemark.nodes[0].frontmatter.time}
        place={data.allMarkdownRemark.nodes[0].frontmatter.place}
        text={data.allMarkdownRemark.nodes[0].html}
        image={
          data.allMarkdownRemark.nodes[0].frontmatter.image.childImageSharp
            .gatsbyImageData
        }
      />
      <h1 className="title is-medium mt-6">What's more...</h1>
      <div className="columns">
        {data.allMarkdownRemark.nodes.map((element, i) => {
          if (i === 0) {
            return ""
          }

          return (
            <div
              className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile is-flex"
              key={element.id}
            >
              <EventCard
                slug={element.frontmatter.slug}
                title={element.frontmatter.title}
                date={element.frontmatter.date}
                text={element.html}
                image={
                  element.frontmatter.image.childImageSharp.gatsbyImageData
                }
              />
            </div>
          )
        })}
      </div>
    </>
  )

  return (
    <ContentPage pageTitle="What's on">
      <div className="container">
        {news}

        <div className="columns">
          <div className="column is-full is-size-5">
            <p>
              You can find more about current affairs on&nbsp;
              <a href="https://twitter.com/cida_essex?lang=en" target="_blank">
                Twitter
              </a>
              &nbsp;or&nbsp;
              <a href="https://www.facebook.com/cIDA.essex/" target="_blank">
                Facebook
              </a>
            </p>
          </div>
        </div>
      </div>
    </ContentPage>
  )
}

export default WhatsOn
