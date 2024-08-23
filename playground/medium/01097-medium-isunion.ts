/*
  1097 - IsUnion
  -------
  by null (@bencor) #medium #union

  ### Question

  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

  For example:

  ```ts
  type case1 = IsUnion<string> // false
  type case2 = IsUnion<string | number> // true
  type case3 = IsUnion<[string | number]> // false
  ```

  > View on GitHub: https://tsch.js.org/1097
*/

/* _____________ Your Code Here _____________ */

type IsUnion<T, C = T> = (T extends T ? C extends T ? true : false : never) extends true ? false : true
// type Distributive<T> = T extends T ? ConditionTrue<T> : never; takes advantage of Distributive Conditional Types to evaluate ConditionTrue separately for each value in a union type T. For example, Distributive<string|number> is evaluated as ConditionTrue<string> | ConditionTrue<number>. This works as T extends MATCH ? ... : never with any type MATCH for which the condition will always evaluate to true, such as any or unknown.

type DoubleDistribute<T, TRUE, FALSE, C = T> = T extends T ? C extends T ? TRUE : FALSE : never
type IsUnionDetailed<T> = DoubleDistribute<T, true, unknown> extends true ? false : true

// DoubleDistribute has two distributive conditions: one for T and one for C, a copy of T. This effectively creates a nested loop where every type in the (potentially union) input type T is evaluated one by one against all others in T to return either TRUE or FALSE. The result of DoubleDistribute is then a union of all individual evaluations. Given that any type in T extends itself, a TRUE type is guaranteed in the resulting union. If T is a union type, each of its possible types will not extends all the others, leading to some FALSE types being included in the resulting union. Therefore, DoubleDistribute is either TRUE if T is a single (not union) type or TRUE|FALSE if T is a union.

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1097/answer
  > View solutions: https://tsch.js.org/1097/solutions
  > More Challenges: https://tsch.js.org
*/
