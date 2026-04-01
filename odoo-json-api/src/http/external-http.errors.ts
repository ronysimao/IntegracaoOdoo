import { isAxiosError } from 'axios';

type OdooJsonRpcErrorData = {
  debug?: unknown;
  message?: unknown;
  name?: unknown;
};

type OdooJsonRpcError = {
  code?: unknown;
  data?: OdooJsonRpcErrorData;
  message?: unknown;
};

type OdooJsonRpcResponse = {
  error?: OdooJsonRpcError;
};

const asNonEmptyString = (value: unknown) => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const parsedValue = value.trim();

  return parsedValue || undefined;
};

const parseOdooJsonRpcResponse = (
  data: unknown,
): OdooJsonRpcResponse | undefined => {
  if (!data) {
    return undefined;
  }

  if (typeof data === 'string') {
    try {
      const parsedData = JSON.parse(data) as unknown;

      return parseOdooJsonRpcResponse(parsedData);
    } catch {
      return { error: { message: data } };
    }
  }

  if (typeof data !== 'object' || Array.isArray(data)) {
    return undefined;
  }

  return data as OdooJsonRpcResponse;
};

const extractOdooJsonRpcMetadata = (data: unknown) => {
  const parsedResponse = parseOdooJsonRpcResponse(data);
  const rpcError = parsedResponse?.error;
  const errorName = asNonEmptyString(rpcError?.data?.name);
  const errorCode =
    typeof rpcError?.code === 'number' || typeof rpcError?.code === 'string'
      ? String(rpcError.code)
      : undefined;
  const message =
    asNonEmptyString(rpcError?.data?.message) ??
    asNonEmptyString(rpcError?.message);

  return {
    errorCode,
    errorName,
    message,
  };
};

export const extractOdooJsonRpcDetail = (data: unknown) => {
  const { errorCode, errorName, message } = extractOdooJsonRpcMetadata(data);
  const metadata: string[] = [];

  if (errorName) {
    metadata.push(`nome=${errorName}`);
  }

  if (errorCode) {
    metadata.push(`código=${errorCode}`);
  }

  if (message && metadata.length > 0) {
    return `${message} (${metadata.join(', ')})`;
  }

  if (message) {
    return message;
  }

  if (metadata.length > 0) {
    return metadata.join(', ');
  }

  return 'Erro desconhecido';
};

export const isOdooJsonRpcUnauthorized = (data: unknown, status?: number) => {
  if (status === 401 || status === 403) {
    return true;
  }

  const { errorName, message } = extractOdooJsonRpcMetadata(data);
  const normalizedErrorName = errorName?.toLowerCase();
  const normalizedMessage = message?.toLowerCase();

  return Boolean(
    normalizedErrorName?.includes('accessdenied') ||
    normalizedMessage?.includes('access denied') ||
    normalizedMessage?.includes('credenciais') ||
    normalizedMessage?.includes('credenciais inválidas') ||
    normalizedMessage?.includes('senha incorreta'),
  );
};

export const extractOdooJsonRpcAxiosDetail = (error: unknown) => {
  if (!isAxiosError(error)) {
    return extractOdooJsonRpcDetail(error);
  }

  const detail = extractOdooJsonRpcDetail(error.response?.data);

  if (detail !== 'Erro desconhecido') {
    return detail;
  }

  return error.message || 'Erro desconhecido';
};
