// React Imports
import { Fragment, useState } from "react";
// Headledd UI Imports
import { Listbox, Transition } from "@headlessui/react";
// React Icons Imports
import { BiChevronDown } from "react-icons/bi";

const CustomFilter = ({ filters, setForm, form }) => {
  const [selected, setSelected] = useState(form.category);

  const changeHandler = (e) => {
    setSelected(e.name);
    setForm({
      ...form,
      category: e.name,
    });
  };

  return (
    <div className="w-56 text-left">
      <Listbox value={selected} onChange={changeHandler}>
        <div className="relative">
          {/* //   BUTTON SECTION    //*/}
          <Listbox.Button className="relative cursor-pointer w-full rounded-lg bg-gray-100 p-4 lg:p-6 pr-10 text-left">
            <span className="block truncate">
              {selected || "Select a Category"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BiChevronDown className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* //   LIST OPTIONS SECTION    //*/}
            <Listbox.Options className="absolute mt-1 h-[200px] w-full overflow-auto bg-white shadow-2xl shadow-gray-300">
              <Listbox.Option value="" className="py-2 px-4 text-gray-400">
                Select a Category
              </Listbox.Option>
              {filters.map((filter, index) => (
                <Listbox.Option
                  key={index}
                  value={filter}
                  className="py-2 px-4 hover:bg-gray-100 transition duration-100 ease-in-out cursor-pointer"
                >
                  {filter.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
