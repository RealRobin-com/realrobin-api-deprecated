import {hasMany, model, property} from '@loopback/repository';
import {BaseEntity} from '.';
import {Message} from './message.model';
import {User} from './user.model';

@model()
export class Conversation extends BaseEntity {
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

  @hasMany(() => Message)
  messages: Message[];

  @hasMany(() => User)
  users: User[];
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
