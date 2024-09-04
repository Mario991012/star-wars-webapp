/**
 * `IResponse` represents a generic structure for handling responses from services or API calls.
 * It uses generics to define the types for the response data (`T`) and error details (`E`),
 * allowing flexibility while maintaining type safety.
 *
 * @template T - The type of the `data` property, representing the payload of the response.
 * Defaults to `any` if no type is provided.
 * @template E - The type of the `error` property, representing any error details in case of failure.
 * Defaults to `any` if no type is provided.
 *
 * @property returnCode - A numeric code indicating the result of the operation. Typically 0 for success.
 * @property data - The payload returned from the operation. The type is determined by the generic `T`.
 * @property message - A descriptive message about the result of the operation.
 * @property [error] - Optional. Contains details of any error encountered during the operation.
 * The type is determined by the generic `E`.
 *
 * @example
 * Example of a successful response with specified types:
 * ```typescript
 * const response: IResponse<{ id: number; name: string }> = {
 *   returnCode: 0,
 *   data: { id: 1, name: 'Item' },
 *   message: 'Operation successful'
 * };
 * ```
 * 
 * @example
 * Example of an error response with specified error type:
 * ```typescript
 * const errorResponse: IResponse<null, { code: number; details: string }> = {
 *   returnCode: 1,
 *   data: null,
 *   message: 'Operation failed',
 *   error: { code: 500, details: 'Internal Server Error' }
 * };
 * ```
 */
export interface IResponse<T = any, E = any> {
  returnCode: number;
  data: T;
  message: string;
  error?: E;
}
