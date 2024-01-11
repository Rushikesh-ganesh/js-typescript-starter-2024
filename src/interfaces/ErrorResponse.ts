import MessageResponse from './MessageResponse';

export default interface ErrorResponse extends MessageResponse {
  message: string;
  stack?: string;
  errors?: Record<string, any>[];
}