/**
 * Represents an item ID used in API routes.
 *
 * * @example
 * // Example of an exercise ID
 * const exerciseId: Id = 'exercise123'
 */
type Id = string;

/**
  * Represents all valid endpoint paths for the API.
 * Supports dynamic IDs for exercises and performances.
 *
 * @example
 * const endpoint: EndpointPattern = 'exercises/exercise123';
 */
export type EndpointPattern =
  | 'profiles'
  | 'exercises'
  | `exercises/${Id}`
  | `exercises/${Id}/performances`
  | `performances/${Id}`;

/**
 * Represents the payload for the `apiFetch` function.
 *
 * This type uses a **discriminated union** depending on the HTTP method:
 *
 * 1. **GET / DELETE**: these methods must not include a body.
 * 2. **POST / PATCH**: these methods may include a body of type `TBody`.
 *
 * @template TBody - The type of the request body for POST or PATCH requests. Defaults to `unknown`.
 *
 * @example
 * // GET request (no body)
 * const getPayload: ApiFetchPayload = {
 *   endpoint: 'exercises',
 *   method: 'GET'
 * };
 *
 * // POST request with body
 * const postPayload: ApiFetchPayload<{ name: string }> = {
 *   endpoint: 'exercises',
 *   method: 'POST',
 *   body: { name: 'Squat' }
 * };
 */
export type ApiFetchPayload<TBody = unknown> =
  | {
      endpoint: EndpointPattern;
      method: 'GET' | 'DELETE';
      body?: never;
    }
  | {
      endpoint: EndpointPattern;
      method: 'POST' | 'PATCH';
      body?: TBody;
    };
