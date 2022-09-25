import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import ContentPage from "../components/contentPage"

const groupByYear = array =>
  array.map(element => (
    <section key={element.id}>
      <h1 className="title is-medium mt-6">{element.frontmatter.year}</h1>
      <hr className="has-background-grey"></hr>
      <div className="columns">
        <div className="column">
          <p
            className="content"
            dangerouslySetInnerHTML={{ __html: element.html }}
          ></p>
        </div>
      </div>
    </section>
  ))

const Publications = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fields: { category: { eq: "publications" } } }
        sort: { order: DESC, fields: frontmatter___year }
      ) {
        nodes {
          id
          frontmatter {
            year
          }
          html
        }
      }
    }
  `)

  const content = !data.allMarkdownRemark ? (
    <h1 className="is-size-2">There are no publications yet.</h1>
  ) : (
    <>{groupByYear(data.allMarkdownRemark.nodes)}</>
  )

  return (
    <ContentPage pageTitle="Publications">
      <div className="container">{content}</div>
    </ContentPage>
  )
}

export default Publications
