import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import DeleteIconDialog from "../DeleteIconDialog/DeleteIconDialog";
import ChangeIconCategory from "../ChangeIconCategory/ChangeIconCategory";



const IconDropdownMenu = (props) => {
    const [deleteIcon, openDeleteIcon] = useState(false);
    const [changeCategory, openChangeCategory] = useState(false);
    const dismissDeleteDialog = () => {
        openDeleteIcon(false);
    }
    const dismissChangeCatDialog = () => {
        openChangeCategory(false);
    }

    const onDeleteIcon = (id) => {
        dismissDeleteDialog();
        props.onDeleteIcon(id)
    }

    const onChangeCategoy = (id) => {
        dismissChangeCatDialog();
        props.onChangeCategoy(id)
    }


    return (
        <>
            <div className=" text-right">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md p-2 ">
                            {/* Options */}
                            <EllipsisVerticalIcon
                                className=" h-5 w-5 text-gray-200 hover:text-gray-300"
                                aria-hidden="true"
                            />
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
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    <button
                                        onClick={() => { openChangeCategory(true) }}
                                        type='button'
                                        className={`group flex w-full items-center rounded-md px-2 text-gray-900 py-2 text-sm`}
                                    >

                                        Change Category
                                    </button>
                                </Menu.Item>
                                <Menu.Item>
                                    <button
                                        onClick={() => { openDeleteIcon(true) }}
                                        type='button'
                                        className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >

                                        Delete Icon
                                    </button>
                                </Menu.Item>
                            </div>

                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <DeleteIconDialog
                icon={props.icon}
                onDeleteIcon={onDeleteIcon}
                dismissDialog={dismissDeleteDialog}
                deleteIcon={deleteIcon} />

            <ChangeIconCategory icon={props.icon}
                categories={props.categories}
                onChangeCategoy={onChangeCategoy}
                dismissDialog={dismissChangeCatDialog}
                changeCategory={changeCategory}
            />
        </>
    )



}

export default IconDropdownMenu;