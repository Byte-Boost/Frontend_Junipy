import type enMessages from '../locales/en.json'

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export type I18nKeys = NestedKeyOf<typeof enMessages>

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t(key: I18nKeys): string
    $t(key: string): string
  }
}

export {}