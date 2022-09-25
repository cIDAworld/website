import React from "react"

import ContentPage from "../components/contentPage"

export default function Error404() {
  return (
    <ContentPage pageTitle="Page Not Found" grey={true}>
      <p>Oops, nothing here (404 error).</p>
    </ContentPage>
  )
}
