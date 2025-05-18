import { render, screen } from "@testing-library/react"
import ProjectsPage from "../projects/page"
import ProjectDetail from "../projects/[id]/page"

// Mock the useSettings hook
jest.mock("../context/settings-context", () => ({
  useSettings: () => ({
    isLenisEnabled: false,
  }),
}))

// Mock the useParams hook
jest.mock("next/navigation", () => ({
  useParams: jest.fn(() => ({ id: "pharmaplan" })),
  notFound: jest.fn(),
}))

// Mock Lenis
jest.mock("lenis", () => {
  return jest.fn().mockImplementation(() => ({
    raf: jest.fn(),
    destroy: jest.fn(),
    scrollTo: jest.fn(),
  }))
})

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    footer: ({ children, ...props }: any) => <footer {...props}>{children}</footer>,
  },
}))

describe("Projects Page", () => {
  it("renders the projects page title", () => {
    render(<ProjectsPage />)
    expect(screen.getByText("Projects")).toBeInTheDocument()
  })

  it("renders project cards", () => {
    render(<ProjectsPage />)

    // Check for project names
    expect(screen.getByText("PharmaPlan")).toBeInTheDocument()
    expect(screen.getByText("The Knowledge Cache")).toBeInTheDocument()
    expect(screen.getByText("Personal Portfolio")).toBeInTheDocument()

    // Check for project descriptions
    expect(screen.getByText(/A comprehensive health solution platform/)).toBeInTheDocument()
    expect(screen.getByText(/A flashcard learning app with full CRUD functionality/)).toBeInTheDocument()
    expect(screen.getByText(/My personal portfolio website showcasing projects/)).toBeInTheDocument()
  })

  it("renders project links", () => {
    render(<ProjectsPage />)

    // Check for "View More" links
    const viewMoreLinks = screen.getAllByText("View More")
    expect(viewMoreLinks.length).toBe(3)

    // Check for GitHub links
    const codeLinks = screen.getAllByText("Code")
    expect(codeLinks.length).toBe(3)

    // Check for Live Demo links
    const demoLinks = screen.getAllByText("Live Demo")
    expect(demoLinks.length).toBe(3)
  })
})

describe("Project Detail Page", () => {
  it("renders the project detail page for web projects", () => {
    render(<ProjectDetail />)

    // Check for project name
    expect(screen.getByText("PharmaPlan")).toBeInTheDocument()

    // Check for sections
    expect(screen.getByText("Overview")).toBeInTheDocument()
    expect(screen.getByText("Features")).toBeInTheDocument()
    expect(screen.getByText("Technologies Used")).toBeInTheDocument()

    // Check for links
    expect(screen.getByText("View Code")).toBeInTheDocument()
    expect(screen.getByText("Live Demo")).toBeInTheDocument()
    expect(screen.getByText("Back to Projects")).toBeInTheDocument()
  })

  it("renders the correct project type icon", () => {
    render(<ProjectDetail />)

    // For web projects, it should show the Globe icon
    // We can't directly test for the icon, but we can check for its wrapper
    const globeIcon = document.querySelector('svg[class*="text-blue-400"]')
    expect(globeIcon).toBeInTheDocument()
  })
})
