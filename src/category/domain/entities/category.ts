import UniqueEntityID from '../../../@seedwork/domain/unique-entity-id.vo'

export type CategoryProperties = {
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}

export class Category {
  public readonly id: UniqueEntityID

  constructor(public readonly props: CategoryProperties, id?: UniqueEntityID) {
    this.id = id || new UniqueEntityID()
    this.props.description = this.props.description ?? null
    this.props.is_active = this.props.is_active ?? true
    this.props.created_at = this.props.created_at ?? new Date()
  }

  get name(): string {
    return this.props.name
  }

  get description(): string | undefined {
    return this.props.description
  }

  private set description(value: string) {
    this.props.description = value ?? null
  }

  get is_active(): boolean | undefined {
    return this.props.is_active
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? null
  }

  get created_at(): Date | undefined {
    return this.props.created_at
  }
}
