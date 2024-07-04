const tTime = 8;
const tIndex = 4;
const tValue = 1;
const tCommit = tTime + tIndex + tValue;

export class History {
  readonly deep = 1000;

  private _commits = Buffer.alloc(this.deep * tCommit);
  private _pointer = 0;

  append(index: number, value: boolean, time: number) {
    let pointer = this._pointer;

    this._commits.writeDoubleBE(time, pointer);
    pointer += tTime;
    this._commits.writeUInt32BE(index, pointer);
    pointer += tIndex;
    this._commits.writeUInt8(value ? 1 : 0, pointer);
    pointer += tValue;

    if (pointer >= this._commits.length) {
      pointer = 0;
    }

    this._pointer = pointer;
  }
}
