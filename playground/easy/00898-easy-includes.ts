/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array

  ### Question

  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.

  For example:

  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```

  > View on GitHub: https://tsch.js.org/898
*/

/* _____________ Your Code Here _____________ */

type Includes1<T extends readonly any[], U> = T extends [first: infer First, ...rest: infer Rest] ?
  U extends First ?
    First extends U ?
      true
      : Includes<Rest, U>
    : Includes<Rest, U>
  : false

// This does not work for:

// Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
// Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,

// because np boolean being first in this case gets distributed and conditionals are not exclusive, we get an union of true | false
// see:

type Check<T extends readonly any[], U> = T extends [first: infer First, ...rest: infer Rest]
  ? U extends First
    ? First extends U
      ? '1'
      : '2'
    : '3'
  : '4'

type t3 = Check<[boolean, 2, 3, 5, 6, 7], false> // t3 = "1" | "2"

// This works for those cases:

type MyEqual<X, Y> = X extends Y ?
  Y extends X ?
    true
    : false
  : false

type Includes2<T extends readonly any[], U> = T extends [first: infer First, ...rest: infer Rest]
  ? MyEqual<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false

// as type returned from the utility is not generic, and it is not distributed, but it fails for:

// Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
// Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,

// https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650

type MyEqual2<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type Includes<T extends readonly any[], U> = T extends [first: infer First, ...rest: infer Rest]
  ? MyEqual2<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false

// This works for all cases.

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/
