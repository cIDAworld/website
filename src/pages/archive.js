import React, { useState, useMemo, useCallback } from "react"
import { graphql, useStaticQuery } from "gatsby"

import ContentPage from "../components/contentPage"
import EventCard from "../components/eventCard"
import FilterBar from "../components/filterBar"

// Create an object where the keys are the year of the archived element
// and the values is the remarkdata for that year
const groupByYear = array => {
  return array.reduce((elementsByYear, element) => {
    // Extract year from date with regex (regex looks for last number in string)
    const year = `${element.frontmatter.date}`.match(/(\d+)(?!.*\d)/g)
    if (year != null) {
      elementsByYear[year[0]] = (elementsByYear[year[0]] || []).concat(element)
    }
    return elementsByYear
  }, {})
}

// Return archived EventCards sorted by year and filtered, if filter is set of course ;)
const getCardsByYear = (elementsByYear, filterCategory) => {
  // Sort by descending order
  const sortedYears = Object.keys(elementsByYear)
  sortedYears.sort()
  sortedYears.reverse()

  const cardsByYear = sortedYears.map(year => {
    // Filter content
    const filteredContent = filterCategory
      ? elementsByYear[year].filter(element =>
          element.frontmatter.category?.includes(filterCategory)
        )
      : elementsByYear[year]

    // Return EventCards or undefined if no content exists for this year
    return filteredContent.length > 0 ? (
      <>
        <h1 className="title is-medium mt-6">{year}</h1>
        <hr className="has-background-grey"></hr>

        <div className="columns">
          {filteredContent.map(element => (
            <div
              className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile is-flex"
              key={element.id}
            >
              <EventCard
                slug={element.fields.slug}
                title={element.frontmatter.title}
                date={element.frontmatter.date}
                endDate={element.frontmatter.endDate}
                text={element.html}
                category={element.frontmatter.category}
                image={
                  element.frontmatter.image?.childImageSharp.gatsbyImageData
                }
              />
            </div>
          ))}
        </div>
      </>
    ) : undefined
  })

  // If there is no content for the filter category at all, return a message
  return !cardsByYear.every(e => e == undefined) ? (
    cardsByYear
  ) : (
    <p className="is-size-4">
      Sorry, there is no archived content for this category yet.
    </p>
  )
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
            date(formatString: "ddd DD MMM yy")
            endDate(formatString: "ddd DD MMM yy")
            time
            place
            category
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

  const [filterCategory, setFilterCategory] = useState(undefined)

  const selectCategory = useCallback(category => setFilterCategory(category), [
    setFilterCategory,
  ])
  const elementsByYear = useMemo(
    () => groupByYear(data.allMarkdownRemark.nodes),
    [data]
  )

  const content = !data.allMarkdownRemark ? (
    <h1 className="is-size-2">There are no entries to the archive yet.</h1>
  ) : (
    <>{getCardsByYear(elementsByYear, filterCategory)}</>
  )

  return (
    <ContentPage pageTitle="Archive">
      <div className="container">
        <FilterBar callback={selectCategory} activeCategory={filterCategory} />
        {content}
      </div>
    </ContentPage>
  )
}

export default PastProjects
