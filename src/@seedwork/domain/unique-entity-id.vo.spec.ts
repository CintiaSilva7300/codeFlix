import InvalidUuidError from '../errors/invalid-uuid.errors'
import UniqueEntityID from './unique-entity-id.vo'
import { validate as uuidValidate } from 'uuid'

describe('UniqueEntityId Unit Tests', () => {
  const validateSpy = jest.spyOn(UniqueEntityID.prototype as any, 'validate')
  it('should throw error when uuid is invalid', () => {
    expect(() => new UniqueEntityID('fake id')).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should accept a uuid passed in constructor', () => {
    const uuid = 'f24b02fa-0ae5-4e36-9cbb-476e4baf1123'
    const vo = new UniqueEntityID(uuid)
    expect(vo.id).toBe(uuid)
    expect(validateSpy).toHaveBeenCalled()
  })

  it('should accept a uuid passed in constructor', () => {
    const vo = new UniqueEntityID()
    expect(uuidValidate(vo.id)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
  })
})
