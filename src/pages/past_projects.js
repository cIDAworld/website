import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import ContentPage from "../components/content_page"

const PastProjects = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fields: { category: { eq: "pastprojects" } } }
        sort: { fields: frontmatter___title }
      ) {
        nodes {
          frontmatter {
            title
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  `)
  useEffect(() => {
    console.log(data.allMarkdownRemark.nodes)
  })
  return (
    <ContentPage pageTitle="Past Projects">
      <div className="container">
        <div className="columns is-multiline">
          {data.allMarkdownRemark.nodes.map(element => (
            <div className="column is-half is-flex">
              <div className="box is-flex is-flex-direction-column is-flex-grow-1">
                <h1 className="is-size-3">{element.frontmatter.title}</h1>

                <GatsbyImage
                  className="is-flex-grow-1"
                  alt={`image of ${element.frontmatter.title}`}
                  image={
                    element.frontmatter.image.childImageSharp.gatsbyImageData
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContentPage>
  )
}

export default PastProjects
