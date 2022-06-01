import React from "react"
import ContentPage from "../components/content_page"
import AboutContent from "./aboutContent"

const About = () => {
  return (
    <ContentPage pageTitle="About" sectionId="about">
      <AboutContent />
    </ContentPage>
  )
}

export default About
