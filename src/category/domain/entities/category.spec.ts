import { Category, CategoryProperties } from './category'
import { omit } from 'lodash'
import UniqueEntityID from '../../../@seedwork/domain/unique-entity-id.vo'

describe('Category Unit Tests', (): void => {
  test('constructor of category', (): void => {
    let category: Category = new Category({ name: 'Movie' })
    let props = omit(category.props, 'created_at')
    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true
    })
    expect(category.props.created_at).toBeInstanceOf(Date)

    let created_at = new Date()
    category = new Category({
      name: 'Movie',
      description: 'some category',
      is_active: false,
      created_at
    })
    expect(category.props).toStrictEqual({
      name: 'Movie',
      description: 'some category',
      is_active: false,
      created_at
    })

    category = new Category({
      name: 'Movie',
      description: 'other category'
    })
    expect(category.props).toMatchObject({
      name: 'Movie',
      description: 'other category'
    })

    category = new Category({
      name: 'Movie',
      is_active: true
    })
    expect(category.props).toMatchObject({
      name: 'Movie',
      is_active: true
    })

    created_at = new Date()
    category = new Category({
      name: 'Movie',
      created_at
    })
    expect(category.props).toMatchObject({
      name: 'Movie',
      created_at
    })
  })

  test('id field', () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityID }
    const data: CategoryData[] = [
      { props: { name: 'Movie' } },
      { props: { name: 'Movie' }, id: null },
      { props: { name: 'Movie' }, id: undefined },
      { props: { name: 'Movie' }, id: new UniqueEntityID() }
    ]

    data.forEach((i) => {
      const category = new Category(i.props, i.id as any)
      expect(category.id).not.toBeNull()
      expect(category.id).toBeInstanceOf(UniqueEntityID)
    })
  })

  test('getter if name field', () => {
    const category = new Category({ name: 'Movie' })
    expect(category.name).toBe('Movie')
  })

  test('getter and setter of description field', () => {
    let category = new Category({ name: 'Movie' })
    expect(category.description).toBe(null)

    category = new Category({
      name: 'Movie',
      description: 'some description'
    })
    expect(category.description).toBe('some description')

    category = new Category({
      name: 'Movie'
    })
    category['description'] = 'other description'
    expect(category.description).toBe('other description')

    category['description'] = undefined
    expect(category.description).toBeNull()

    category['description'] = null
    expect(category.description).toBeNull()
  })

  test('getter and setter of is_active field', () => {
    let category = new Category({ name: 'Movie' })
    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'Movie',
      is_active: true
    })
    expect(category.is_active).toBeTruthy()

    category = new Category({
      name: 'Movie',
      is_active: false
    })
    expect(category.is_active).toBeFalsy()
  })

  test('getter of created_at product', () => {
    let category = new Category({
      name: 'Movie'
    })
    expect(category.created_at).toBeInstanceOf(Date)

    let created_at = new Date()
    category = new Category({
      name: 'Movie',
      created_at
    })
    expect(category.created_at).toBe(created_at)
  })
})
