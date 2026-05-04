import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "./GetNotifiedModal.module.scss";
import LoadingSpinner from "../LoadingSpinner";
import useInput from "../../../hooks/use-input";
import { toast } from "react-toastify";
import fileDownload from "js-file-download";
import http from "../../../services/httpService";
import { BASE_URL } from "../../../shared/baseUrl";
import { BellAlertIcon } from "@heroicons/react/24/outline";

const GetNotifiedModal = ({ modalIsOpen, setModalOpen }) => {
  const [loading, setLoading] = useState(false);
  const baseUrl = BASE_URL;
  const {
    value: emailVal,
    isValid: emailIsValid,
    hasError: emailHasError,
    reset: resetEmailInput,
    valueChangeHandler: emailChangedHandler,
  } = useInput((value) => value.includes("@"));

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!emailIsValid || emailHasError) {
      toast.error(`Please enter a valid email`);
      return;
    }

    setLoading(true);
    http
      .post(`${baseUrl}mail-list`, { email: emailVal })
      .then((res) => {
        if (res.status === 200) {
          resetEmailInput();
          setLoading(false);
          setModalOpen(false);
          toast.success(`You've been successfully subscribed!`);
          window.location = `${baseUrl}category/download-all`
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(`An error occurred`);
      });
  };

  return (
    <Transition appear show={modalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full px-6 py-9 max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <BellAlertIcon className="w-24 xl:w-28 mx-auto text-[#A1DD1D] mb-4 xl:mb-6" />
                <h2 className={styles.heading}>Download All Icons</h2>
                <h3 className={styles.subheading}>
                  Download the entire collection and stay updated with newly
                  added icons and freebies.
                </h3>
                <form onSubmit={formSubmissionHandler}>
                  <div className={styles.mailListInput}>
                    <input
                      placeholder="Email address"
                      name="email"
                      id="email"
                      onChange={emailChangedHandler}
                      value={emailVal}
                    />
                    <div className="flex justify-between flex-col-reverse md:flex-row">
              
                      <a href={`${baseUrl}category/download-all`}>
                        Download
                      </a>

                      <button
                        disabled={loading}
                        className="flex items-center justify-center"
                      >
                        {loading && (
                          <span className="absolute">
                            <LoadingSpinner />
                          </span>
                        )}
                        <span className={loading ? "opacity-0" : ""}>
                          Download & Subscribe
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GetNotifiedModal;
