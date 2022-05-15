import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function About() {
  const links = ["staff", "sponsors", "facilities"]
  const data = useStaticQuery(graphql`
    {
      about: markdownRemark(fields: { category: { eq: "home" } }) {
        html
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
  `)
  return (
    <section className="section is-medium has-background-light" id="about">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <GatsbyImage
              image={
                data.about.frontmatter.image.childImageSharp.gatsbyImageData
              }
            />
          </div>
          <div className="column is-two-thirds text-content">
            <div dangerouslySetInnerHTML={{ __html: data.about.html }}></div>
            <div className="buttons">
              <a href="#" className="button is-link is-large">
                <span class="icon">
                  <i class="fab fa-twitter"></i>
                </span>
              </a>
              <a href="#" className="button is-link is-large">
                <span class="icon">
                  <i class="fab fa-facebook"></i>
                </span>
              </a>
              <a href="#" className="button is-link is-large">
                Master / PhD programmes
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-6">
        <div className="columns is-centered has-text-centered">
          <h1 className="is-size-2 has-text-weight-semibold">
            Associated Centres
          </h1>
        </div>
      </div>
    </section>
  )
}
