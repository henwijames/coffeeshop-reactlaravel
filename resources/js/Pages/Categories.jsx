import { useRef, useState, useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AuthLayout from "../Layouts/AuthLayout";
import PageHeading from "../Components/PageHeading";
import Modal from "../Components/Modal";
import { Edit, Plus, Trash } from "lucide-react";
import Input from "../Components/Input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Categories = ({ categories }) => {
    const modalRefs = useRef({});
    const [name, setName] = useState("");
    const [editValues, setEditValues] = useState({});
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        } else if (flash.error) {
            toast.success(flash.error);
        }
    }, [flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/categories", { name });
        setName("");
        const modal = document.getElementById("add_category");
        if (modal) modal.close();
    };

    const handleEdit = (e, id) => {
        e.preventDefault();
        router.put(
            `/categories/${id}`,
            { name: editValues[id] },
            {
                onSuccess: () => {
                    if (modalRefs.current[id]) {
                        modalRefs.current[id].close(); // Close the modal after success
                    }
                },
            }
        );
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DB924C",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/categories/${id}`, {
                    onError: (err) => {
                        toast.error(
                            err.message || "Failed to delete category!"
                        );
                        Swal.fire("Error!", "Something went wrong.", "error");
                    },
                });
            }
        });
    };

    const openModal = (category) => {
        setEditValues((prev) => ({
            ...prev,
            [category.id]: category.name, // Set default value before opening the modal
        }));

        if (modalRefs.current[category.id]) {
            modalRefs.current[category.id].showModal();
        }
    };

    return (
        <>
            <Head title="Categories | Kaffee Siyap" />
            <ToastContainer /> {/* This is needed for showing toasts */}
            <div className="flex justify-between items-center">
                <PageHeading title="Categories" />

                <Modal
                    id="add_category"
                    title="Add Category"
                    buttonName={<Plus size={14} />}
                >
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2"
                    >
                        <Input
                            name="categories"
                            placeholder="Espresso"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <button type="submit" className="btn mt-2 ml-auto">
                            Add
                        </button>
                    </form>
                </Modal>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th className="w-[200px]">Name</th>
                            <th className="w-[100px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td className="w-96">{category.name}</td>
                                <td className="flex gap-2">
                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    <button
                                        className="btn btn-primary text-white"
                                        onClick={() => openModal(category)}
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <dialog
                                        id={`my_modal_${category.id}`}
                                        className="modal"
                                        ref={(el) =>
                                            (modalRefs.current[category.id] =
                                                el)
                                        }
                                    >
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">
                                                Edit {category.name}
                                            </h3>
                                            <div className="py-4">
                                                <form
                                                    onSubmit={(e) =>
                                                        handleEdit(
                                                            e,
                                                            category.id
                                                        )
                                                    }
                                                    className="flex flex-col"
                                                >
                                                    <Input
                                                        name="editCategory"
                                                        placeholder="Edit Category"
                                                        value={
                                                            editValues[
                                                                category.id
                                                            ] || ""
                                                        }
                                                        onChange={(e) =>
                                                            setEditValues(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [category.id]:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            )
                                                        }
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="btn mt-2 ml-auto"
                                                    >
                                                        Save
                                                    </button>
                                                </form>
                                            </div>
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                    ✕
                                                </button>
                                            </form>
                                        </div>
                                    </dialog>

                                    <button
                                        className="btn btn-error text-white"
                                        onClick={() => {
                                            handleDelete(category.id);
                                        }}
                                    >
                                        <Trash size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

Categories.layout = (page) => <AuthLayout children={page} title="Categories" />;

export default Categories;
