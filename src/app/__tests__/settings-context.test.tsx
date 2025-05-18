"use client"

import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SettingsProvider, useSettings } from "../context/settings-context"

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, "localStorage", { value: localStorageMock })

// Test component that uses the settings context
function TestComponent() {
  const { isSpotlightEnabled, toggleSpotlight, isLenisEnabled, toggleLenis, isSidebarOpen, toggleSidebar } =
    useSettings()

  return (
    <div>
      <div data-testid="spotlight-status">{isSpotlightEnabled ? "enabled" : "disabled"}</div>
      <div data-testid="lenis-status">{isLenisEnabled ? "enabled" : "disabled"}</div>
      <div data-testid="sidebar-status">{isSidebarOpen ? "open" : "closed"}</div>
      <button data-testid="toggle-spotlight" onClick={toggleSpotlight}>
        Toggle Spotlight
      </button>
      <button data-testid="toggle-lenis" onClick={toggleLenis}>
        Toggle Lenis
      </button>
      <button data-testid="toggle-sidebar" onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
    </div>
  )
}

describe("SettingsContext", () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  it("provides default values", () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>,
    )

    expect(screen.getByTestId("spotlight-status")).toHaveTextContent("enabled")
    expect(screen.getByTestId("lenis-status")).toHaveTextContent("enabled")
    expect(screen.getByTestId("sidebar-status")).toHaveTextContent("closed")
  })

  it("toggles spotlight setting", async () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>,
    )

    const toggleButton = screen.getByTestId("toggle-spotlight")
    await userEvent.click(toggleButton)

    expect(screen.getByTestId("spotlight-status")).toHaveTextContent("disabled")
    expect(localStorageMock.setItem).toHaveBeenCalledWith("spotlightEnabled", "false")
  })

  it("toggles lenis setting", async () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>,
    )

    const toggleButton = screen.getByTestId("toggle-lenis")
    await userEvent.click(toggleButton)

    expect(screen.getByTestId("lenis-status")).toHaveTextContent("disabled")
    expect(localStorageMock.setItem).toHaveBeenCalledWith("lenisEnabled", "false")
  })

  it("toggles sidebar state", async () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>,
    )

    const toggleButton = screen.getByTestId("toggle-sidebar")
    await userEvent.click(toggleButton)

    expect(screen.getByTestId("sidebar-status")).toHaveTextContent("open")

    await userEvent.click(toggleButton)
    expect(screen.getByTestId("sidebar-status")).toHaveTextContent("closed")
  })

  it("loads saved preferences from localStorage", () => {
    // Set initial values in localStorage
    localStorageMock.getItem.mockImplementation((key: string) => {
      if (key === "spotlightEnabled") return "false"
      if (key === "lenisEnabled") return "false"
      return null
    })

    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>,
    )

    // Trigger useEffect
    act(() => {
      // Simulate component mount
    })

    expect(screen.getByTestId("spotlight-status")).toHaveTextContent("disabled")
    expect(screen.getByTestId("lenis-status")).toHaveTextContent("disabled")
  })
})
