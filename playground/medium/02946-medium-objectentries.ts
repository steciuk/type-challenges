/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #medium #object

  ### Question

  Implement the type version of ```Object.entries```

  For example

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```

  > View on GitHub: https://tsch.js.org/2946
*/

/* _____________ Your Code Here _____________ */

type ObjectEntries1<T extends object, K extends keyof T = keyof T> = K extends any ? [K, T[K]] : never
type t1 = ObjectEntries1<Partial<Model>>
//   ^?
// Fails for this case, cause every prop gets `undefined` in its type union

type ObjectEntries2<T extends object, K extends keyof T = keyof T> = K extends any ? [K, Required<T>[K]] : never
type t2 = ObjectEntries2<{ key?: undefined }>
//   ^?
// Fails for this case, cause we miss `undefined`

type ObjectEntries<T extends object> = {
  [key in keyof T]-?: [key, Required<T>[key] extends never ? undefined : Required<T>[key]]
}[keyof T]

type t3 = ObjectEntries<Partial<Model>>
type t4 = ObjectEntries<{ key?: undefined }>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2946/answer
  > View solutions: https://tsch.js.org/2946/solutions
  > More Challenges: https://tsch.js.org
*/
