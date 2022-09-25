import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      cidaLogo: file(relativePath: { eq: "logos/cida_logo.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      uniLogo: file(relativePath: { eq: "logos/essex_logo_white.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
    }
  `)
  return (
    <footer className="footer has-background-dark has-text-light">
      <div className="container is-flex is-justify-content-space-evenly is-align-items-center">
        <div id="footer-address">
          <a
            href="https://www.essex.ac.uk/centres-and-institutes/ideology-and-discourse-analysis"
            target="_blank"
            rel="noreferrer noopener"
          >
            <GatsbyImage
              className="logo"
              alt="cida logo"
              image={data.cidaLogo.childImageSharp.gatsbyImageData}
            />
          </a>
          <address>
            Department of Government
            <br />
            University of Essex
            <br />
            Wivenhoe Park
            <br />
            Colchester CO4 3SQ
          </address>
        </div>
        <div id="footer-contact">
          <p>
            <b>General Enquiries:</b>
          </p>
          <p>Tel: +44 (0) 1206 873333</p>
          <p>
            Email: &nbsp;
            <a href="mailto:enquiries@essex.ac.uk">enquiries@essex.ac.uk</a>
          </p>
        </div>
        <div id="footer-uni-logo">
          <GatsbyImage
            className="logo"
            alt="cida logo"
            image={data.uniLogo.childImageSharp.gatsbyImageData}
          />
        </div>
        <div id="footer-credit">
          <p>Website design:</p>
          <p>
            <a
              href="http://www.sebastianlobbers.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sebastian L&ouml;bbers
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
