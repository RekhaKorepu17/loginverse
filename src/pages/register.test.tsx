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
  
});
