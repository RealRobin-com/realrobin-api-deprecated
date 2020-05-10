import {Entity, model, property} from '@loopback/repository';

@model()
export class Conversation extends Entity {
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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Conversation>) {
    super(data);
  }
}

export interface ConversationRelations {
  // describe navigational properties here
}

export type ConversationWithRelations = Conversation & ConversationRelations;
