import { Autocomplete } from "components";
import React, { useState } from "react";
import { searchUsers } from "services";

export function MainScreen() {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div>
      <Autocomplete
        displayOption={(item) => item.name}
        fetchOptions={searchUsers}
        onSelect={(x) => setSelectedValue(x?.name || "")}
      />
    </div>
  );
}
