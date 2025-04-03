import { useRef } from "react";

const Modal = ({ id, title, buttonName, children }) => {
    const modalRef = useRef(null);
    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };
    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    };
    return (
        <>
            <button className="btn bg-primary text-white" onClick={openModal}>
                {buttonName}
            </button>
            <dialog id={id} className="modal" ref={modalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <div className="py-4">{children}</div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Modal;
