import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Message,
  Conversation,
} from '../models';
import {MessageRepository} from '../repositories';

export class MessageConversationController {
  constructor(
    @repository(MessageRepository)
    public messageRepository: MessageRepository,
  ) { }

  @get('/messages/{id}/conversation', {
    responses: {
      '200': {
        description: 'Conversation belonging to Message',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conversation)},
          },
        },
      },
    },
  })
  async getConversation(
    @param.path.string('id') id: typeof Message.prototype.id,
  ): Promise<Conversation> {
    return this.messageRepository.conversation(id);
  }
}
