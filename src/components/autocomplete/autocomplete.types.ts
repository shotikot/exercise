export interface IAutocompleteProps<T> {
  fetchOptions: (query: string) => Promise<T[]>;
  onSelect: (item: T | null) => void;
  displayOption: (item: T) => string;
}
