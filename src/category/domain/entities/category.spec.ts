import { Category } from "./category";

describe("Category Unit Test", (): void => {
    test('constructor of category', () => { 

        const created_at = new Date()
        const category = new Category({
            name: 'Movie',
            description: 'description',
            is_active: true, 
            created_at: created_at
        })

        expect(category.props).toStrictEqual({
            name: 'Movie',
            description: 'description',
            is_active: true, 
            created_at: created_at
        })
     })
})