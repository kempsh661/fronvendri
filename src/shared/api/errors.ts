export type ApiFieldErrors = Record<string, string>;

export type ApiErrorBody = {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  fieldErrors?: ApiFieldErrors | null;
};

export class ApiError extends Error {
  readonly status: number;
  readonly body: ApiErrorBody | null;

  constructor(status: number, message: string, body: ApiErrorBody | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export function getApiErrorMessage(error: unknown, fallback = "Ocurrió un error") {
  if (error instanceof ApiError) {
    return error.message || fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
