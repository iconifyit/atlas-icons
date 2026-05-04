
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const IconAccordion = ({ category, count, ...props }) => {
    return <Disclosure defaultOpen>
        {({ open }) => (
            <>
                <Disclosure.Button className="flex w-full items-end px-0 lg:px-6">
                    <span className="font-semibold text-xl  lg:text-[1.7rem] mr-4 lg:mr-6">{category.name}</span>
                    <span className="font-medium text-gray-500 text-lg mr-4">{count} icons</span>
                    <span className="grow mb-2">
                        <hr />
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                        />
                    </span>
                </Disclosure.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    show={open}>
                    <Disclosure.Panel static>
                        {props.children}
                    </Disclosure.Panel>
                </Transition>
            </>
        )}
    </Disclosure>
}


export default IconAccordion;