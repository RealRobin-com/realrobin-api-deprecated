import {model, property} from '@loopback/repository';
import {BaseEntity} from '.';

@model()
export class Message extends BaseEntity {
  @property({
    type: 'string',
    required: true,
  })
  message: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Message>) {
    super(data);
  }
}

export interface MessageRelations {
  // describe navigational properties here
}

export type MessageWithRelations = Message & MessageRelations;
