
export default abstract class ValueObject<Value = any> {
    protected _value: Value;

    constructor(value: Value){
        this._value = value;
    }

    get value(): Value {
        return this._value
    }
}