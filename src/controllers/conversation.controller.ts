import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Conversation} from '../models';
import {ConversationRepository} from '../repositories';

export class ConversationController {
  constructor(
    @repository(ConversationRepository)
    public conversationRepository : ConversationRepository,
  ) {}

  @post('/conversations', {
    responses: {
      '200': {
        description: 'Conversation model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conversation)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conversation, {
            title: 'NewConversation',
            exclude: ['id'],
          }),
        },
      },
    })
    conversation: Omit<Conversation, 'id'>,
  ): Promise<Conversation> {
    return this.conversationRepository.create(conversation);
  }

  @get('/conversations/count', {
    responses: {
      '200': {
        description: 'Conversation model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Conversation) where?: Where<Conversation>,
  ): Promise<Count> {
    return this.conversationRepository.count(where);
  }

  @get('/conversations', {
    responses: {
      '200': {
        description: 'Array of Conversation model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Conversation, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Conversation) filter?: Filter<Conversation>,
  ): Promise<Conversation[]> {
    return this.conversationRepository.find(filter);
  }

  @patch('/conversations', {
    responses: {
      '200': {
        description: 'Conversation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conversation, {partial: true}),
        },
      },
    })
    conversation: Conversation,
    @param.where(Conversation) where?: Where<Conversation>,
  ): Promise<Count> {
    return this.conversationRepository.updateAll(conversation, where);
  }

  @get('/conversations/{id}', {
    responses: {
      '200': {
        description: 'Conversation model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conversation, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Conversation, {exclude: 'where'}) filter?: FilterExcludingWhere<Conversation>
  ): Promise<Conversation> {
    return this.conversationRepository.findById(id, filter);
  }

  @patch('/conversations/{id}', {
    responses: {
      '204': {
        description: 'Conversation PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conversation, {partial: true}),
        },
      },
    })
    conversation: Conversation,
  ): Promise<void> {
    await this.conversationRepository.updateById(id, conversation);
  }

  @put('/conversations/{id}', {
    responses: {
      '204': {
        description: 'Conversation PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() conversation: Conversation,
  ): Promise<void> {
    await this.conversationRepository.replaceById(id, conversation);
  }

  @del('/conversations/{id}', {
    responses: {
      '204': {
        description: 'Conversation DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.conversationRepository.deleteById(id);
  }
}
