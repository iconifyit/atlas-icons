import { useState, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { BASE_URL } from '../../../shared/baseUrl';
import { Fragment } from "react";
import http from "../../../services/httpService";

const EditCategoryName = (props) => {
    const [category, setCategory] = useState(null);
    const [categoryNameIsValid, setCategoryNameIsValid] = useState(true);
    const baseUrl = BASE_URL;
    const closeModal = () => {
        props.closeModal()
    }

    useEffect(() => {
        setCategory(props.category);
    }, [props.category])

    const handleChange = ({ currentTarget: input }) => {
        setCategory(category => ({ ...category, name: input.value }))
    };


    const saveCategory = () => {
        if (category.name.trim() === "") {
            setCategoryNameIsValid(false);
            return;
        }
        setCategoryNameIsValid(true);

        http
            .put(`${baseUrl}category/category-name`, { category })
            .then((res) => {
                props.categorySaved(res.data);
                closeModal();

            }).catch(err => console.log(err));
    }


    return (
        <>
            <Transition appear show={props.isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-12 py-8 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 mb-6"
                                    >
                                        Change name
                                    </Dialog.Title>
                                    <div className="mb-6">
                                        <label className="!mb-1 !text-base block" htmlFor="category" >
                                            New name
                                        </label>
                                        <input value={category?.name} className="w-full rounded-lg border-gray-300 shadow-sm !py-3 !px-8 !text-lg" id="category" name="packname" onChange={(e) => handleChange(e)} type="text" />
                                        {!categoryNameIsValid && (
                                            <p className="text-red-500 text-sm font-medium">Category name must not be empty.</p>
                                        )}
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-blue-100 px-5 py-2 font-medium text-blue-900 "
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-5 py-2 font-medium text-blue-900 "
                                            onClick={saveCategory}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>

    )
}


export default EditCategoryName;