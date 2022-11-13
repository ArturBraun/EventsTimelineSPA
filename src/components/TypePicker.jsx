import React, { useRef, useState, useEffect } from "react";
import { BlockPicker } from "react-color";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { getTypes, removeType, addType } from "../data/LocalDataService";

export default function TypePicker({ selectedType, setSelectedType }) {
  const ref = useRef(null);
  const [types, setTypes] = useState([]);
  const [isAddingNewType, setIsAddingNewType] = useState(false);
  const [newType, setNewType] = useState({
    name: "",
    color: "#e8abc4",
  });
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  useEffect(() => {
    const loadedTypes = getTypes();
    setTypes(loadedTypes);
  }, []);

  const deleteType = (e, typeId) => {
    e.stopPropagation();

    const deleteTypeId = removeType(typeId, setTypes);
    if (!deleteTypeId) {
      alert(
        "Type cannot be deleted as there are existing events with this type!"
      );
    }
  };

  const saveNewType = (e) => {
    e.stopPropagation();
    addType(newType.name, newType.color, setTypes);
  };

  const blockCurrentMenuItemFromClosing = () => {
    setTimeout(() => {
      ref.current?.click();
    }, 0);
  };

  const addNewTypeClicked = () => {
    blockCurrentMenuItemFromClosing();
    setIsAddingNewType(true);
  };

  const quitAddingNewType = (e) => {
    e.preventDefault();
    setIsAddingNewType(false);
  };

  const handleNewTypeColorChange = (color) => {
    newType.color = color.hex;
  };

  const handleNewTypeNameChange = (e) => {
    newType.name = e.target.value;
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleKeyClicked = (event) => {
    // Because dropdown is automatically closing when spacebar is clicked, I need to prevent this behaviour manually, when user is adding space in new-type-input-name
    if (event.which === 32) {
      const currPos = event.target.selectionStart;
      const currStr = event.target.value;
      event.target.value =
        currStr.substring(0, currPos) + " " + currStr.substring(currPos);
      event.target.selectionStart = currPos + 1;
      event.target.selectionEnd = currPos + 1;
      event.preventDefault();
    }
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            ref={ref}
            className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            {selectedType.name ? selectedType.name : "None"}
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="cursor-pointer absolute right-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                <div
                  className="hover:bg-gray-100 block px-4 py-2 text-sm"
                  onClick={() => setSelectedType({})}
                >
                  None
                </div>
              </Menu.Item>

              {types.map((type) => (
                <Menu.Item key={type.id}>
                  <div
                    className="hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm flex"
                    onClick={() => setSelectedType(type)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={type.color}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6h.008v.008H6V6z"
                      />
                    </svg>

                    <div className="pl-2">{type.name}</div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 absolute right-4"
                      onClick={(e) => deleteType(e, type.id)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </Menu.Item>
              ))}
            </div>
            <div className="py-1">
              <Menu.Item onClick={addNewTypeClicked}>
                {isAddingNewType ? (
                  <div
                    className="hover:bg-gray-100 block px-4 py-2 text-sm grid grid-cols-4"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={newType.color}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                        onClick={handleClick}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 6h.008v.008H6V6z"
                        />
                      </svg>
                      {displayColorPicker ? (
                        <div style={popover} className="-ml-20">
                          <div onClick={handleClose} />
                          <BlockPicker
                            color={newType.color}
                            onChangeComplete={(color) =>
                              handleNewTypeColorChange(color)
                            }
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <input
                      placeholder="Name"
                      onChange={handleNewTypeNameChange}
                      type="text"
                      name="new-type-name"
                      id="new-type-input-name"
                      onKeyDown={handleKeyClicked}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-4"
                    />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 absolute right-11"
                      onClick={saveNewType}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 absolute right-4"
                      onClick={quitAddingNewType}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="hover:bg-gray-100 block px-4 py-2 text-sm">
                    Add new type
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
