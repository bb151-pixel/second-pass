// Access codes live in the PRACTICE_ACCESS_CODES environment variable
// (comma-separated). Give one to each paying student.
export function validAccessCode(code: string | null | undefined): boolean {
  const codes = (process.env.PRACTICE_ACCESS_CODES ?? "")
    .split(",")
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean);
  return !!code && codes.includes(code.trim().toUpperCase());
}
