export interface IBaseCRUDMethods {
  create(dto: unknown);
  findAll(properties?: unknown);
  findOneOrThrow(id: string);
  update(dto: unknown, file?: Express.Multer.File);
  remove(id: string);
  restore?(id: string);
}
