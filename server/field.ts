import { throttle } from "lodash";
import * as fs from "node:fs";

// Период сброса данных на диск
const flushFilePeriodMs = 5000;

export class Field {
  readonly amount = 1000000;

  data: Buffer;
  time = Date.now();

  constructor(private _filename: string) {
    if (fs.existsSync(this._filename)) {
      this.data = fs.readFileSync(this._filename);
    } else {
      this.data = Buffer.alloc(this.amount / 8);
    }
  }

  write(index: number, value: boolean, time: number) {
    const byteIndex = Math.floor(index / 8);
    const bitIndex = index % 8;
    const prev = this.data[byteIndex];
    const next = value ? prev | (1 << bitIndex) : prev & ~(1 << bitIndex);

    this.data[byteIndex] = next;
    this.time = time;

    this._flushThrottled();
  }

  private _flushThrottled = throttle(() => this._flush(), flushFilePeriodMs);

  private _flush() {
    fs.writeFile(this._filename, this.data, () => null);
  }
}
