import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import { InMemoryRepository } from "./in-memory.repository";
import UniqueEntityID from "../value-objects/unique-entity-id.vo";

type StubsEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubsEntityProps>{
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity>{
}

describe('InMemory Unit Test', () => {
    let repository: StubInMemoryRepository;
    beforeEach(() => (repository = new StubInMemoryRepository()));
    it('should inserts a new entity', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it('should throws error when entity not found', async () => {
        expect(repository.findById('fake id')).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));

        expect(repository.findById(new UniqueEntityID('f24b02fa-0ae5-4e36-9cbb-476e4baf1123'))).rejects.toThrow(new NotFoundError(`Entity Not Found using ID f24b02fa-0ae5-4e36-9cbb-476e4baf1123`));
    });

    it('should finds a entity by id', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repository.insert(entity);

        let entityFound = await repository.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

        entityFound = await repository.findById(entity.uniqueEntityId);
        expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });

    it('should returns all entities', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repository.insert(entity);

        const entities = await repository.findAll();

        expect(entities).toStrictEqual([entity]);
    });

    it('should throws error on update when entity not found', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        expect(repository.update(entity)).rejects.toThrow(new NotFoundError(`Entity Not Found using ID ${entity.id}`));
    })

    it('should update an entity', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repository.insert(entity);

        const entityUpdated = new StubEntity({ name: 'updated', price: 1 }, entity.uniqueEntityId);
        await repository.update(entityUpdated);

        expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
    })

    it('should throws error on delete when entity not found', async () => {
        expect(repository.delete('fake id')).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));

        expect(repository.delete(new UniqueEntityID('f24b02fa-0ae5-4e36-9cbb-476e4baf1123'))).rejects.toThrow(new NotFoundError(`Entity Not Found using ID f24b02fa-0ae5-4e36-9cbb-476e4baf1123`));
    })

    it('should delete an entity', async () => {
        const entity = new StubEntity({ name: 'name value', price: 5 });
        await repository.insert(entity);
        await repository.delete(entity.uniqueEntityId);
        expect(repository.items).toHaveLength(0)

        await repository.insert(entity);
        await repository.delete(entity.uniqueEntityId);
        expect(repository.items).toHaveLength(0)
    })
})