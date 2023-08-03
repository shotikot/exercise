import React, { useState, useCallback } from "react";
import { IAutocompleteProps } from "./autocomplete.types";
import styles from "./autocomplete.module.scss";

export function Autocomplete<T>({
  fetchOptions,
  onSelect,
  displayOption,
}: IAutocompleteProps<T>) {
  const [query, setQuery] = useState<string>("");
  const [options, setOptions] = useState<T[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const fetchSearchResults = useCallback(
    async (searchQuery: string) => {
      setLoading(true);

      const data = await fetchOptions(searchQuery);

      setOptions(data);
      setLoading(false);
    },
    [fetchOptions]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newDebounceTimer = setTimeout(() => {
      fetchSearchResults(value);
    }, 300); // 

    setDebounceTimer(newDebounceTimer);
  };

  const handleSelectOption = (item: T) => {
    setQuery(displayOption(item));
    setOptions([]);
    onSelect(item);
  };

  return (
    <div className={styles.autocompleteContainer}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        autoComplete="off"
      />
      {isLoading ? (
        <div className={styles.isLoadingMessage}>Loading...</div>
      ) : (
        <ul>
          {options.map((item, index) => (
            <li key={index} onClick={() => handleSelectOption(item)}>
              {displayOption(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
