import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { Register } from "./register";

vi.mock("@aws-sdk/client-s3", () => {
  return {
    S3Client: vi.fn().mockImplementation(() => ({
      send: vi.fn().mockResolvedValue({}),
    })),
    PutObjectCommand: vi.fn(),
  };
});

vi.mock("react-hook-form", () => {
  return {
    useForm: vi.fn(() => ({
      register: vi.fn(),
      handleSubmit: vi.fn((fn) => (e: any) => {
        e.preventDefault();
        return fn({ Firstname: "John", Lastname: "Doe" });
      }),
      formState: { errors: {} },
    })),
  };
});

describe("Register Component", () => {
  it("renders correctly", () => {
    render(<Register />);
    expect(screen.getByText("Firstname")).toBeInTheDocument();
    expect(screen.getByText("Lastname")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("displays validation errors when inputs are empty", async () => {
    render(<Register />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.includes("First name is required")
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("Last name is required"))
      ).toBeInTheDocument();
    });
  });

  it("image upload is triggered when a file is selected", async () => {
    render(<Register />);

    const file = new File(["dummy content"], "profile-pic.jpg", {
      type: "image/jpeg",
    });
    const input = screen.getByTestId("file-upload");
    vi.spyOn(window, "alert").mockImplementation(() => {});

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("upload succesful");
    });
    vi.restoreAllMocks();
  });
});
