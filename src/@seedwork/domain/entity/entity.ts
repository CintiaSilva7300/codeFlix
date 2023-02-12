import UniqueEntityID from "../value-objects/unique-entity-id.vo";

export default abstract class Entity<Props> {
    public readonly uniqueEntityId: UniqueEntityID

    constructor(public readonly props: Props, id?: UniqueEntityID) {
        this.uniqueEntityId = id || new UniqueEntityID();
    }

    get id() {
        return this.uniqueEntityId.value;
    }

    toJSON(): Required<{ id: string } & Props> {
        return {
            id: this.id,
            ...this.props
        } as Required<{ id: string } & Props>
    }
}