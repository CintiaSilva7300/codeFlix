import { EntityValidationError } from '../../../@seedwork/domain/errors/validation-error'
import Entity from '../../../@seedwork/domain/entity/entity'
import UniqueEntityID from '../../../@seedwork/domain/value-objects/unique-entity-id.vo'
import CategoryValidatorFactory from '../validators/category.validator'

export type CategoryProperties = {
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityID) {
    Category.validate(props)
    super(props, id)
    this.props.description = this.props.description ?? null
    this.props.is_active = this.props.is_active ?? true
    this.props.created_at = this.props.created_at ?? new Date()
  }

  update(name: string, description: string): void {
    Category.validate({ name, description })
    this.props.name = name;
    this.description = description;
  }

  // static validate(props: Omit<CategoryProperties, 'created_at'>) {
  //   ValidatorRules.values(props.name, 'name').required().string().maxLength(255);
  //   ValidatorRules.values(props.description, 'description').string();
  //   ValidatorRules.values(props.is_active, 'is_active').boolean();
  // }

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors)
    }
  }

  activate() {
    this.props.is_active = true;
  }

  deactivate() {
    this.props.is_active = false;
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
