import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import ContentPage from "../components/content_page"
import EventCard from "../components/event_card"

const groupByYear = array => {
  const elementsByYear = array.reduce((elementsByYear, element) => {
    // Extract year from date with regex (regex looks for last number in string)
    const year = `${element.frontmatter.date}`.match(/(\d+)(?!.*\d)/g)
    if (year != null) {
      const content = (
        <div
          className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile is-flex"
          key={element.id}
        >
          <EventCard
            slug={element.fields.slug}
            title={element.frontmatter.title}
            date={element.frontmatter.date}
            text={element.html}
            image={element.frontmatter.image.childImageSharp.gatsbyImageData}
          />
        </div>
      )
      elementsByYear[year[0]] = (elementsByYear[year[0]] || []).concat(content)
    }
    return elementsByYear
  }, {})

  // Now create rows sorted by year (descending) from the grouped array
  const sortedYears = Object.keys(elementsByYear)
  sortedYears.sort()
  sortedYears.reverse()

  const content = sortedYears.map(year => (
    <div key={year}>
      <h1 className="title is-medium mt-6">{year}</h1>
      <hr className="has-background-grey"></hr>
      <div className="columns">{elementsByYear[year]}</div>
    </div>
  ))

  return content
}

const PastProjects = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          fields: { category: { eq: "projects" }, hasPassed: { eq: true } }
        }
        sort: { fields: frontmatter___date, order: DESC }
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

  const content = !data.allMarkdownRemark ? (
    <h1 className="is-size-2">There are no entries to the archive yet.</h1>
  ) : (
    <>{groupByYear(data.allMarkdownRemark.nodes)}</>
  )

  return (
    <ContentPage pageTitle="Archive">
      <div className="container">{content}</div>
    </ContentPage>
  )
}

export default PastProjects
