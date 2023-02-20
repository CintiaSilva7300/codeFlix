import { Category } from "../../domain/entities/category";
import { InMemorySeachableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";
import CategoryRepository from "../../domain/repository/category.repository";


export default class CategoryInMemoryRepository
    extends InMemorySeachableRepository<Category>
    implements CategoryRepository { }