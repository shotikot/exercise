import { Autocomplete } from "components";
import { searchUsers } from "services";

export function MainScreen() {
  return (
    <div>
      <Autocomplete
        displayOption={(item) => item.name}
        fetchOptions={searchUsers}
      />
    </div>
  );
}
