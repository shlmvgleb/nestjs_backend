import { ApiProperty } from '@nestjs/swagger';

export class CategoryWithoutEager {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  priority: number;

  @ApiProperty({ nullable: true })
  parentId: string;

  @ApiProperty({ nullable: true })
  deletedAt: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
