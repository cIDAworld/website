import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import ContentPage from "../components/content_page"
import MemberCard from "../components/member_card"

const Members = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        filter: { fields: { category: { eq: "members" } } }
        sort: { fields: frontmatter___role }
      ) {
        nodes {
          id
          frontmatter {
            slug
            name
            role
            intro
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.0)
              }
            }
          }
        }
      }
    }
  `)
  return (
    <ContentPage pageTitle="Members">
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {data.allMarkdownRemark.nodes.map(element => (
            <div
              className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile is-flex"
              key={element.id}
            >
              <MemberCard
                slug={element.frontmatter.slug}
                name={element.frontmatter.name}
                role={element.frontmatter.role}
                intro={element.frontmatter.intro}
                image={
                  element.frontmatter.image?.childImageSharp.gatsbyImageData
                }
              />
            </div>
          ))}
        </div>
      </div>
    </ContentPage>
  )
}

export default Members
