type Kebab<S extends string> = S extends `_${infer R}`
  ? `-${Uncapitalize<R>}`
  : S extends ` ${infer R}`
    ? `-${Uncapitalize<R>}`
    : S extends Uncapitalize<S>
      ? S
      : `-${Uncapitalize<S>}`;

/**
 * Convert string to Kebab-case
 * kaba case => kebab-case
 * snake_case => snake-case
 * camelCase => camel-case
 * kaba-case => kaba-case
 */
export type KebabCase<S extends string> = S extends `${infer Start}${infer End}`
  ? `${Uncapitalize<Start>}${KebabCase<Kebab<End>>}`
  : S;
