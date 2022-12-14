import React from "react"
import { graphql } from "gatsby"
import ContentPage from "../components/contentPage"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const website = frontmatter.website ? (
    <>
      {" "}
      <b>Website: </b>
      <a
        href={`${frontmatter.website}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {" "}
        {frontmatter.website}{" "}
      </a>{" "}
      <br />
    </>
  ) : (
    ""
  )
  const twitter = frontmatter.twitter ? (
    <>
      {" "}
      <b>Twitter: </b>
      <a
        href={`https://www.twitter.com/${frontmatter.twitter.replace("@", "")}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {" "}
        {frontmatter.twitter}{" "}
      </a>{" "}
      <br />
    </>
  ) : (
    ""
  )
  return (
    <ContentPage pageTitle="Members" sectionId="header">
      <div className="container">
        <div className="columns">
          <div className="column is-full">
            <h1 className="title is-large">{frontmatter.name}</h1>
          </div>
        </div>
        <div className="columns">
          <div className="column is-one-third">
            {frontmatter.image ? (
              <GatsbyImage
                alt={`Image of ${frontmatter.name}`}
                image={frontmatter.image.childImageSharp.gatsbyImageData}
              />
            ) : (
              <StaticImage
                alt="default profile picture as no profile picture was specified"
                src="../../static/defaultprofile.png"
              />
            )}

            <aside>
              <b>Role: </b>
              {frontmatter.role} <br />
              {website}
              {twitter}
            </aside>
          </div>
          <div className="column is-two-thirds text-content">
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        </div>
      </div>
    </ContentPage>
  )
}

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        name
        role
        intro
        website
        twitter
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, aspectRatio: 1.0, width: 500)
          }
        }
      }
    }
  }
`
