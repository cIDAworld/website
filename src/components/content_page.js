import React from "react"

import Layout from "./layout"

export default function ContentPage(props) {
  return (
    <Layout
      title={props.headTitle || props.pageTitle}
      redirect={props.redirect}
    >
      <section
        className="section is-medium has-background-light"
        id={props.sectionId || ""}
      >
        {props.children}
      </section>
    </Layout>
  )
}
