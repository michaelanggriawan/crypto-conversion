declare interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  errors?: unknown;
  data: T;
}

type Nullable<T> = Record<string, T | null>;
