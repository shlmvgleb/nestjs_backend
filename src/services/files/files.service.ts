import { Injectable, OnModuleInit } from '@nestjs/common';
import * as SimpleStorage from 'easy-yandex-s3';
import * as dotenv from 'dotenv';
import { FileUploadFailedException } from '../../utils/exceptions/file-upload.exception';
import * as path from 'path';
import { IncorrectFileExtException } from '../../utils/exceptions/incorrect-file-ext.exception';
import { getOrThrow } from '../../utils/helpers/getter';
import { FileByIdNotFoundException } from '../../utils/exceptions/file-by-id-not-found.exception';
import { ConfigService } from '@nestjs/config';
import { S3Config } from './config/s3.config';
import { FileRemoveFailedException } from '../../utils/exceptions/file-delete.exception';
import { FileEntityDto } from './dto/file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create.file.dto';
import { MemoryStoredFile } from 'nestjs-form-data';

dotenv.config();

@Injectable()
export class FilesService implements OnModuleInit, IBaseCRUDMethods {
  constructor(private configService: ConfigService) {}

  static correctExts = ['.jpeg', '.jpg', '.png', '.bmp'];

  private storage: SimpleStorage;

  config = this.configService.get<S3Config>('cloud');

  async onModuleInit() {
    this.storage = new SimpleStorage({
      auth: {
        accessKeyId: this.config.s3.reg.keyId,
        secretAccessKey: this.config.s3.reg.secretKey,
      },
      Bucket: this.config.s3.reg.bucketName,
      debug: true,
    });
  }

  findOneOrThrow(id: string) {
    return getOrThrow(
      async () => File.query().findById(id),
      new FileByIdNotFoundException(id),
    );
  }

  async saveFileOnCloud(file: MemoryStoredFile): Promise<FileEntityDto> {
    const fileExt = path.extname(file.originalName);

    if (!FilesService.correctExts.includes(fileExt)) {
      throw new IncorrectFileExtException();
    }

    const upload = await this.storage.Upload({
      buffer: file.buffer,
    }, `/${this.config.s3.path.logo}/`);

    if (!upload) {
      throw new FileUploadFailedException();
    }

    const { key, Location: url } = upload;

    return {
      key: key,
      url: url,
    };
  }

  async create(dto: CreateFileDto) {
    const fileEntityDto = await this.saveFileOnCloud(dto.file);
    return File.query().insert(fileEntityDto);
  }

  async update(dto: UpdateFileDto) {
    const file = await this.findOneOrThrow(dto.id);
    await this.deleteFromCloud(file.key);
    const newInfo = await this.saveFileOnCloud(dto.file);
    return file.$query().patch(newInfo).returning('*').first();
  }

  async deleteFromCloud(key: string) {
    const remove = await this.storage.Remove(key);

    if (!remove) {
      throw new FileRemoveFailedException();
    }
  }

  async remove(id: string) {
    const file = await this.findOneOrThrow(id);
    return file.$query().delete().returning('*');
  }

  async restore(id: string) {
    const file = await this.findOneOrThrow(id);
    return File.query().where('id', file.id).undelete().returning('*');
  }

  async findAll() {
    return File.query().whereNotDeleted();
  }
}
