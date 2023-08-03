import React, { useState, useCallback } from "react";
import { IAutocompleteProps } from "./autocomplete.types";
import "./autocomplete.css";

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
    }, 300);

    setDebounceTimer(newDebounceTimer);
  };

  const handleSelectOption = (item: T) => {
    setQuery(displayOption(item));
    setOptions([]);
    onSelect && onSelect(item);
  };

  const highlightMatch = (item: T) => {
    const itemStr = displayOption(item);
    const matchIndex = itemStr.toLowerCase().indexOf(query.toLowerCase());
    if (matchIndex === -1) {
      return <span>{itemStr}</span>;
    }
    const beforeMatch = itemStr.slice(0, matchIndex);
    const match = itemStr.slice(matchIndex, matchIndex + query.length);
    const afterMatch = itemStr.slice(matchIndex + query.length);
    return (
      <span>
        {beforeMatch}
        <span className="matchingText">{match}</span>
        {afterMatch}
      </span>
    );
  };

  return (
    <div className="autocompleteContainer">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        autoComplete="off"
      />
      {isLoading ? (
        <div className="isLoadingMessage">Loading...</div>
      ) : (
        <ul>
          {options.map((item, index) => (
            <li key={index} onClick={() => handleSelectOption(item)}>
              {highlightMatch(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
