import { HttpException } from '@nestjs/common';

export async function getOrThrow<T>(getter: () => Promise<T>, exception: HttpException): Promise<T> {
  let res;

  try {
    res = await getter();
  } catch (e) {
    throw exception;
  }

  if (res === undefined || res === null) {
    throw exception;
  }

  return res;
}
