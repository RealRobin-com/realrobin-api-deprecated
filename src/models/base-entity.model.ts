import {Entity, model, property} from '@loopback/repository';

@model()
export class BaseEntity extends Entity {
  @property({
    type: 'string',
    id: true,
    required: false,
    generated: true,
    useDefaultIdType: false,
    postgresql: {
      dataType: 'uuid',
    },
  })
  id?: string;

  @property({
    type: 'date',
    required: false,
    defaultFn: 'now',
    postgresql: {
      dataType: 'timestamp with time zone',
    },
  })
  createdAt: string;

  @property({
    type: 'date',
    required: false,
    defaultFn: 'now',
    postgresql: {
      dataType: 'timestamp with time zone',
    },
  })
  updatedAt: string;

  constructor(data?: Partial<BaseEntity>) {
    super(data);
  }
}

export interface BaseEntityRelations {
  // describe navigational properties here
}

export type BaseEntityWithRelations = BaseEntity & BaseEntityRelations;
