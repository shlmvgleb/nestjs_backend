import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './entities/category.entity';
import { getOrThrow } from '../../utils/helpers/getter';
import { CategoryByIdNotFoundException } from '../../utils/exceptions/category-not-found-by-id.exception';
import { WrongParentIdForCategoryException } from '../../utils/exceptions/wrong-parent-id-for-category.exception';
import { CategoryHaveProductsException } from '../../utils/exceptions/category-have-items.exception';
import { CategoryHaveChildException } from '../../utils/exceptions/category-have-child.exception';
import { IBaseCRUDMethods } from '../../utils/types/base-crud-methods';

@Injectable()
export class CategoryService implements IBaseCRUDMethods {
  async create(dto: CreateCategoryDto) {
    if (dto.parentId) {
      await this.findOneOrThrow(dto.parentId);
    }

    return Category.query().insert(dto);
  }

  async findOneOrThrow(id: string) {
    return getOrThrow(
      async () => Category
        .query()
        .findById(id),
      new CategoryByIdNotFoundException(id),
    );
  }

  async findOneAndFetchChildOrThrow(id: string) {
    return getOrThrow(
      async () => Category
        .query()
        .whereNotDeleted()
        .findById(id)
        .withGraphFetched('childCategories(notDeleted).^'),
      new CategoryByIdNotFoundException(id),
    );
  }

  async findAllRecursive(properties) {
    const direction: 'asc' | 'desc' = properties.priorityDirection;
    return Category
      .query()
      .skipUndefined()
      .whereNotDeleted()
      .where('parentId', null)
      .orderBy('priority', direction)
      .withGraphFetched('childCategories(notDeleted).^')
      .modifyGraph('childCategories(notDeleted).^', builder => {
        builder.orderBy('priority', direction);
      });
  }

  async findAll(properties) {
    const direction: 'asc' | 'desc' = properties.priorityDirection;
    return Category
      .query()
      .skipUndefined()
      .whereNotDeleted()
      .orderBy('priority', direction);
  }

  async update(dto: UpdateCategoryDto) {
    if (dto.parentId === dto.id) {
      throw new WrongParentIdForCategoryException(dto.id);
    }

    if (dto.parentId) {
      await this.findOneOrThrow(dto.parentId);
    }

    const category = await this.findOneOrThrow(dto.id);

    return category.$query().patch(dto).returning('*');
  }

  async remove(id: string) {
    const category = await this.findOneAndFetchChildOrThrow(id);

    if (category.childCategories.length) {
      throw new CategoryHaveChildException(category.id);
    }

    const products = await category.$relatedQuery('products').whereNotDeleted();

    if (products.length) {
      throw new CategoryHaveProductsException(category.id);
    }

    return category.$query().delete().returning('*');
  }

  restore(id: string) {
    return Category
      .query()
      .where('id', id)
      .undelete()
      .returning('*');
  }
}
