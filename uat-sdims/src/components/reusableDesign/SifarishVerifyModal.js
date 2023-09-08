import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTrashAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function SifarishVerifyModal({
  visible,
  onClose,
  onOk,
  heading,
  title,
  leftButton,
  rightButton,
 

}) {
  const [approvalStatus, setApprovalStatus] = useState(null);
  console.log(approvalStatus,"approvalStatus");
  const handleApproveClick = () => {
    setApprovalStatus(true);
  };

  const handleRejectClick = () => {
    setApprovalStatus(false);
  };

  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  if (!visible) return null;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FaTrashAlt className="h-6 w-6 text-red-600" aria-hidden="true" />
                      <div className="h-6 w-6 text-red-600" aria-hidden="true" >
                        {icons}
                      </div>
                    </div> */}
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-red-600"
                      >
                        {heading}
                      </Dialog.Title>
                      <div className="mt-5">
                        {/* <p className="text-sm text-gray-500">
                          {title}
                        </p> */}
                        <div className="flex gap-2">
                          <button
                            className={`border-2 px-4 py-1 rounded-lg shadow-2xl font-bold text-lg ${
                              approvalStatus === true
                                ? "bg-green-500"
                                : " text-gray-300 "
                            }`}
                            onClick={handleApproveClick}
                          >
                            {" "}
                            स्वीकृत{" "}
                          </button>
                          <button
                            className={`border-2 px-4 py-1 rounded-lg shadow-2xl font-bold text-lg ${
                              approvalStatus === false
                                ? "bg-red-500"
                                : "text-gray-300"
                            }`}
                            onClick={handleRejectClick}
                          >
                            {" "}
                            अस्वीकृत{" "}
                          </button>
                        </div>
                        <div className="pt-4">
                          {approvalStatus === null ? (
                            ""
                          ) : approvalStatus ? (
                            <text className="text-lg  font-bold pr-2 text-green-500 ">
                              रकम खुलाउनुहोस्
                            </text>
                          ) : (
                            <text className="text-lg  font-bold pr-2 text-red-500 ">
                              कारण खुलाउनुहोस्
                            </text>
                          )}
                          {approvalStatus === null ? (
                            ""
                          ) : approvalStatus ? (
                            <input
                              className="border-2  border-gray-700 px-1 py-3  "
                              type="string"
                            ></input>
                          ) : (
                            <input
                              className="border-2  border-gray-700 px-1 py-3 "
                              type="string"
                            ></input>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={onOk}
                  >
                    {rightButton}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    ref={cancelButtonRef}
                    onClick={onClose}
                  >
                    {leftButton}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
