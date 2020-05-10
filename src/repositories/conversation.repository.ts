import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Conversation, ConversationRelations, Message, User} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MessageRepository} from './message.repository';
import {UserRepository} from './user.repository';

export class ConversationRepository extends DefaultCrudRepository<
  Conversation,
  typeof Conversation.prototype.id,
  ConversationRelations
> {

  public readonly messages: HasManyRepositoryFactory<Message, typeof Conversation.prototype.id>;

  public readonly users: HasManyRepositoryFactory<User, typeof Conversation.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MessageRepository') protected messageRepositoryGetter: Getter<MessageRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Conversation, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
    this.messages = this.createHasManyRepositoryFactoryFor('messages', messageRepositoryGetter,);
    this.registerInclusionResolver('messages', this.messages.inclusionResolver);
  }
}
