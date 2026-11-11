import type { CollegeConfig } from "./types";
import mgdcon from "./colleges/mgdcon";

export type { CollegeConfig, Bilingual, Course } from "./types";

/** Add more colleges here: `{ mgdcon, otherId: otherConfig }`. */
const colleges: Record<string, CollegeConfig> = { mgdcon };

export const DEFAULT_COLLEGE = "mgdcon";

/** Returns the college selected by the COLLEGE env variable (default "mgdcon"). */
export function getCollege(): CollegeConfig {
  const id = process.env.COLLEGE ?? DEFAULT_COLLEGE;
  const college = colleges[id];
  if (!college) {
    throw new Error(
      `Unknown COLLEGE "${id}". Valid values: ${Object.keys(colleges).join(", ")}`,
    );
  }
  return college;
}
