import React, { useMemo } from "react"
import { graphql, useStaticQuery } from "gatsby"

const FilterBar = props => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { fields: { category: { eq: "projects" } } }) {
        nodes {
          id
          frontmatter {
            category
          }
        }
      }
    }
  `)

  const uniqueCategories = useMemo(() => {
    const uniqueCategories = []
    data.allMarkdownRemark.nodes.map(element => {
      const addCategories = element.frontmatter.category?.filter(
        cat => !uniqueCategories.includes(cat)
      )
      if (addCategories) {
        uniqueCategories.push(...addCategories)
      }
    })
    uniqueCategories.unshift(undefined)
    return uniqueCategories
  }, [data])

  return (
    <div className="tabs is-toggle">
      <ul className="is-flex-shrink-1 is-flex-wrap-wrap">
        {uniqueCategories.map(e => (
          <li className={`${e === props.activeCategory ? "is-active" : ""}`}>
            <a onClick={() => props.callback(e)}>
              <span className="is-capitalized">{e || "All"}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterBar
