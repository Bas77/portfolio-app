import { render, screen, fireEvent } from "@testing-library/react"
import { TechCard } from "../component/tech-card"

describe("TechCard Component", () => {
  const defaultProps = {
    name: "React",
    icon: "https://api.iconify.design/vscode-icons:file-type-reactjs.svg",
    color: "20, 184, 166",
    description: "A JavaScript library for building user interfaces with reusable components.",
  }

  it("renders correctly with required props", () => {
    render(<TechCard {...defaultProps} />)

    // Check if the name is rendered
    expect(screen.getByTestId("tech-card")).toBeInTheDocument()

    // Check if the icon is rendered
    const iconElement = document.querySelector("img")
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveAttribute("src", defaultProps.icon)
  })

  it("shows tooltip on hover", () => {
    render(<TechCard {...defaultProps} />)

    // Initially, the tooltip should not be visible
    const tooltipText = screen.getByTestId('tech-tooltip')
    expect(tooltipText).toHaveStyle("opacity: 0")

    // Hover over the card
    fireEvent.mouseEnter(screen.getByText("React").closest("div")!)

    // Now the tooltip should be visible
    expect(tooltipText).toHaveStyle("opacity: 1")

    // Mouse leave
    fireEvent.mouseLeave(screen.getByText("React").closest("div")!)

    // Tooltip should be hidden again
    expect(tooltipText).toHaveStyle("opacity: 0")
  })

  it("renders with experience when provided", () => {
    const propsWithExperience = {
      ...defaultProps,
      experience: "3+ years",
    }

    render(<TechCard {...propsWithExperience} />)

    // Check if the experience is rendered in the tooltip
    expect(screen.getByText("Experience:")).toBeInTheDocument()
    expect(screen.getByText("3+ years")).toBeInTheDocument()
  })

  it("applies color styling correctly", () => {
    render(<TechCard {...defaultProps} />)

    // Check if the color is applied to the icon container
    const iconContainer = screen.getByTestId("tech-card")
    fireEvent.mouseLeave(screen.getByText("React").closest("div")!)
    expect(iconContainer).toHaveStyle(`boxShadow: rgb(0 0 20px 0 rgba${defaultProps.color}, 0.3)`)
  })
})