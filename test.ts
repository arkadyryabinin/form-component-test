class A {
  a;
  b;
  height: number | undefined;
  constructor(x: number, y: string) {
    this.a = x;
    this.b = y;
    this.height = undefined;
  }
}

const r = new A(3, "5");
console.log(r);


interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
 
// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);

type SecretString = Array<string>;

interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

const stringKeyPair: KeyValuePair<string, number> = { key: "age", value: 25 };
const numberKeyPair = { key: 1, value: true };

