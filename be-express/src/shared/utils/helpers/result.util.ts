export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function isOk<T, E>(r: Result<T, E>): r is Result<T, E> {
  return r.ok;
}

export function isError<T, E>(r: Result<T, E>): r is Result<T, E> {
  return !r.ok;
}
