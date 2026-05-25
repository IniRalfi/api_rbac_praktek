export class RoleEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly permissions?: { slug: string }[]
  ) {}
}
