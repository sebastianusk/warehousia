import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddAdminInput } from '../graphql';
import AdminService from './admin.service';

@Resolver('Admin')
export default class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Mutation()
  async addAdmin(@Args('input') input: AddAdminInput) {
    return this.adminService.addAdmin(input);
  }
}
