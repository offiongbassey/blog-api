export type ResponseHandlerType = {
  success: boolean;
  statusCode: number;
  message: string | [];
  data?: string | object;
};

export const responseHandler = ({
  success,
  statusCode,
  message,
  data,
}: ResponseHandlerType) => {
  return { success, statusCode, message, data };
};
