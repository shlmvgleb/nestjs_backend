type MaximumOneOf<T, K extends keyof T = keyof T> =
  K extends keyof T ? { [P in K]?: T[K] } & Partial<Record<Exclude<keyof T, K>, never>> : never;

type SetTTL = MaximumOneOf<{
  EX: number;
  PX: number;
  EXAT: number;
  PXAT: number;
  KEEPTTL: true;
}>;

type SetGuards = MaximumOneOf<{
  NX: true;
  XX: true;
}>;

interface SetCommonOptions {
  GET?: true;
}

export type SetOptions = SetTTL & SetGuards & SetCommonOptions;
