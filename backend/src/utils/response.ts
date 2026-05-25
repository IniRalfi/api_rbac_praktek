import { Response } from "express";

export const sendSuccess = (
  res: Response,
  data: any = null,
  message = "Success",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message = "Error Occured",
  statusCode = 500,
  errors: any = null
) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};
