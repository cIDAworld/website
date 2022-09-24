import React, { useCallback, useMemo, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import ContentPage from "../components/content_page"
import EventPage from "../components/event_page"
import EventCard from "../components/event_card"
import TwitterCard from "../components/twitter_card"
import FilterBar from "../components/filterBar"

const getEventCards = (markdown, filterCategory, selectCategory) => {
  if (markdown.length) {
    const filteredContent = filterCategory
      ? markdown.filter(element =>
          element.frontmatter.category?.includes(filterCategory)
        )
      : markdown

    return (
      <>
        <h1 className="title is-medium mt-6">What's more</h1>
        <FilterBar callback={selectCategory} activeCategory={filterCategory} />
        <div className="columns is-multiline is-mobile">
          {filteredContent.length ? (
            filteredContent.map(element => {
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
                    category={element.frontmatter.category}
                    callback={selectCategory}
                    image={
                      element.frontmatter.image?.childImageSharp.gatsbyImageData
                    }
                  />
                </div>
              )
            })
          ) : (
            <div className="column is-full">
              <p className="is-size-4">
                Sorry, there is no content in this category at the moment.
              </p>
            </div>
          )}
        </div>
      </>
    )
  }
  return undefined
}

const WhatsOn = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: {
          fields: { category: { eq: "projects" }, hasPassed: { eq: false } }
        }
        sort: { fields: [frontmatter___highlight, frontmatter___date] }
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
            time
            place
            category
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

  const [filterCategory, setFilterCategory] = useState(undefined)

  const selectCategory = useCallback(category => setFilterCategory(category), [
    setFilterCategory,
  ])

  const highlightPage = useMemo(() => {
    /* markdown remark is sorted first by highlight flag and then by date,
          so the first entry will either be a highlighted entry or, 
          if no entry was highlighted, the most recent one */
    const highlight = data.allMarkdownRemark.nodes[0]

    return highlight ? (
      <EventPage
        title={highlight.frontmatter.title}
        date={highlight.frontmatter.date}
        time={highlight.frontmatter.time}
        place={highlight.frontmatter.place}
        text={highlight.html}
        image={highlight.frontmatter.image?.childImageSharp.gatsbyImageData}
        key={highlight.id}
      />
    ) : undefined
  }, [data])

  const twitterNews = useMemo(
    () => (
      <>
        <h1 className="title is-medium mt-6">News</h1>
        <div className="columns is-multiline is-mobile">
          {data.allTwitterStatusesUserTimelineTimeline.nodes.map(
            (element, i) => (
              <div
                className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile is-flex"
                key={element.id_str}
              >
                <TwitterCard
                  author={element.retweeted_status?.user.name || "cIDA"}
                  date={new Date(element.created_at).toDateString()}
                  text={element.full_text}
                  image={element.image.childImageSharp?.gatsbyImageData}
                  link={`https://www.twitter.com/cIDA_essex/status/${element.id_str}`}
                />
              </div>
            )
          )}
        </div>
      </>
    ),
    [data]
  )

  return (
    <ContentPage pageTitle="What's on">
      <div className="container">
        {highlightPage}
        {getEventCards(
          data.allMarkdownRemark.nodes.slice(1),
          filterCategory,
          selectCategory
        )}
        {twitterNews}
      </div>
    </ContentPage>
  )
}

export default WhatsOn
