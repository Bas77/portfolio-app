import type React from "react"
import { render, fireEvent, act } from "@testing-library/react"
import { useCursorSpotlight } from "../hooks/use-cursor-spotlight"
import CursorSpotlight from "../component/cursor-spotlight"

// Mock the useSettings hook
jest.mock("../context/settings-context", () => ({
  useSettings: jest.fn(() => ({
    isSpotlightEnabled: true,
  })),
  SettingsProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Test component that uses the hook
function TestComponent() {
  const { position, isActive } = useCursorSpotlight()
  return (
    <div data-testid="test-component">
      <div data-testid="position-x">{position.x}</div>
      <div data-testid="position-y">{position.y}</div>
      <div data-testid="is-active">{isActive ? "active" : "inactive"}</div>
    </div>
  )
}

describe("useCursorSpotlight hook", () => {
  it("initializes with default values", () => {
    const { getByTestId } = render(<TestComponent />)

    expect(getByTestId("position-x").textContent).toBe("0")
    expect(getByTestId("position-y").textContent).toBe("0")
    expect(getByTestId("is-active").textContent).toBe("active")
  })

  it("updates position on mouse move", () => {
    const { getByTestId } = render(<TestComponent />)

    act(() => {
      // Simulate mouse movement
      fireEvent.mouseMove(window, { clientX: 100, clientY: 200 })
    })

    expect(getByTestId("position-x").textContent).toBe("100")
    expect(getByTestId("position-y").textContent).toBe("200")
  })
})

describe("CursorSpotlight component", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("renders nothing when spotlight is disabled", () => {
    // Override the mock to return disabled
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("../context/settings-context").useSettings.mockReturnValue({
      isSpotlightEnabled: false,
    })

    const { container } = render(<CursorSpotlight />)
    expect(container.firstChild).toBeNull()
  })

  it("renders the spotlight when enabled and active", () => {
    // Override the mock to return enabled
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("../context/settings-context").useSettings.mockReturnValue({
      isSpotlightEnabled: true,
    })

    // Mock the hook to return active state
    jest.mock("../hooks/use-cursor-spotlight", () => ({
      useCursorSpotlight: () => ({
        position: { x: 100, y: 200 },
        isActive: true,
      }),
    }))

    const { container } = render(<CursorSpotlight />)

    // Fast-forward timers to trigger the fade-in effect
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // The component should render after mounting and setting state
    expect(container.firstChild).not.toBeNull()
  })
})
