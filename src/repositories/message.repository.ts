import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Message, MessageRelations, Conversation} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ConversationRepository} from './conversation.repository';

export class MessageRepository extends DefaultCrudRepository<
  Message,
  typeof Message.prototype.id,
  MessageRelations
> {

  public readonly conversation: BelongsToAccessor<Conversation, typeof Message.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ConversationRepository') protected conversationRepositoryGetter: Getter<ConversationRepository>,
  ) {
    super(Message, dataSource);
    this.conversation = this.createBelongsToAccessorFor('conversation', conversationRepositoryGetter,);
    this.registerInclusionResolver('conversation', this.conversation.inclusionResolver);
  }
}
