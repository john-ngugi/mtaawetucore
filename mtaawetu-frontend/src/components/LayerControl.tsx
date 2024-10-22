import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
// Ensure the Props interface includes onClick
interface Props {
  onClick: (styleName: string) => void;
}

function LayerControl({ onClick }: Props) {
  const items = ["Streets", "Satellite", "Light", "Dark"];
  const [selected, setSelected] = useState(items[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-sm font-medium leading-6 text-gray-600 mt-2">
        {"Basemaps"}
      </Label>
      <div className="relative ">
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <span className="block truncate">{selected}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {items.map((item) => (
            <ListboxOption
              key={item}
              value={item}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-700 hover:bg-indigo-600 hover:text-white"
              onClick={() => onClick(item)} // Call onClick when an option is clicked
            >
              <div className="flex items-center">
                <span className="block truncate font-normal">{item}</span>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}

export default LayerControl;
