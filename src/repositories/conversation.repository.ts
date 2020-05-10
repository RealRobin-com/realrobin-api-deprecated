import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Conversation, ConversationRelations, Message} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MessageRepository} from './message.repository';

export class ConversationRepository extends DefaultCrudRepository<
  Conversation,
  typeof Conversation.prototype.id,
  ConversationRelations
> {

  public readonly messages: HasManyRepositoryFactory<Message, typeof Conversation.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MessageRepository') protected messageRepositoryGetter: Getter<MessageRepository>,
  ) {
    super(Conversation, dataSource);
    this.messages = this.createHasManyRepositoryFactoryFor('messages', messageRepositoryGetter,);
    this.registerInclusionResolver('messages', this.messages.inclusionResolver);
  }
}
