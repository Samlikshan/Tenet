export interface IBcryptProvider {
  hash(string: string): Promise<string>;
  compare(stringA: string, stringB: string): Promise<boolean>;
}
