import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Conversation,
  User,
} from '../models';
import {ConversationRepository} from '../repositories';

export class ConversationUserController {
  constructor(
    @repository(ConversationRepository) protected conversationRepository: ConversationRepository,
  ) { }

  @get('/conversations/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Conversation has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.conversationRepository.users(id).find(filter);
  }

  @post('/conversations/{id}/users', {
    responses: {
      '200': {
        description: 'Conversation model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conversation.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInConversation',
            exclude: ['id'],
            optional: ['conversationId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.conversationRepository.users(id).create(user);
  }

  @patch('/conversations/{id}/users', {
    responses: {
      '200': {
        description: 'Conversation.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.conversationRepository.users(id).patch(user, where);
  }

  @del('/conversations/{id}/users', {
    responses: {
      '200': {
        description: 'Conversation.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.conversationRepository.users(id).delete(where);
  }
}
