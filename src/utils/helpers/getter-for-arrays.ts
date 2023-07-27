import { HttpException } from '@nestjs/common';

export async function getArrayOrThrow<T>(
  getter: () => Promise<T[]>,
  exception: HttpException,
): Promise<T[]> {
  const res = await getter();

  if (!res.length) {
    throw exception;
  }

  return res;
}
