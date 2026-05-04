import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { BASE_URL } from '../../../shared/baseUrl';
import http from "../../../services/httpService";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

const ChangeIconCategory = (props) => {
    const baseUrl = BASE_URL;

    const closeModal = () => {
        props.dismissDialog()
    }

    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState(null)

    useEffect(() => {
        setCategory(props.icon.category._id)
    }, [])


    const handleSelectChange = ({ currentTarget: input }) => {
        setCategory(input.value)
    };


    const changeCategoryHandler = () => {
        setLoading(true)
        http
            .post(`${baseUrl}icon/update-category`, {
                icon: props.icon,
                catId: category
            }).then(res => {
                console.log("data: ", res)
                if (res) {
                    setLoading(false)
                    props.onChangeCategoy(res.data)
                }
                // this.closeModal()

            }).catch(err => {
                setLoading(false)
            })
    }


    return (
        <Transition appear show={props.changeCategory} as={Fragment}>
            {/*  */}
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg mb-4 font-medium leading-6 text-gray-900"
                                >
                                    Are you sure?
                                </Dialog.Title>
                                <div className="mb-6">
                                    <p className="text-gray-500">
                                        Change <span className='text-black font-medium'>{props.icon.name}</span> icon category.
                                    </p>
                                </div>
                                <select value={category} onChange={(e) => handleSelectChange(e)} className='w-full mb-6 rounded-lg border-gray-300 shadow-sm !py-3 !px-8 !text-lg'>
                                    {props.categories.map(category => (

                                        <option value={category._id}>{category.name}</option>
                                    ))}
                                </select>

                                <div className="flex justify-between">
                                    <button
                                        onClick={closeModal}
                                        type="button"
                                        className="inline-flex  w-24 justify-center items-center rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={changeCategoryHandler}
                                        type="button"
                                        className="inline-flex w-24 justify-center items-center rounded-md border border-transparent bg-[#3F28FF] hover:bg-[#1B00FC] px-4 py-2 font-medium text-white"
                                    >
                                        {loading && <LoadingSpinner />}
                                        {!loading && <span>  Save  </span>}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ChangeIconCategory;