export * from "./api";
export * from "./navigation";

export type Theme = "light" | "dark" | "system";

export interface SelectOption<T = string> {
  label: string;
  value: T;
}
