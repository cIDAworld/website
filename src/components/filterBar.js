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

  const uniqueCategories = useMemo(
    () =>
      data.allMarkdownRemark.nodes.reduce(
        (categories, e) => {
          const newCategories = e.frontmatter.category?.filter(
            cat => !categories.includes(cat)
          )
          if (newCategories) categories.push(...newCategories)
          return categories
        },
        [undefined]
      ),
    [data]
  )

  return (
    <div className="tabs is-toggle">
      <ul className="is-flex-shrink-1 is-flex-wrap-wrap">
        {uniqueCategories.map(e => (
          <li className={`${e === props.activeCategory ? "is-active" : ""}`}>
            <button role="tab" onClick={() => props.callback(e)}>
              <span className="is-capitalized">{e || "All"}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterBar
