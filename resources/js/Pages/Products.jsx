import PageHeading from "../Components/PageHeading";
import AuthLayout from "../Layouts/AuthLayout";

const Products = () => {
    return (
        <>
            <PageHeading title="Products" />
        </>
    );
};

Products.layout = (page) => (
    <AuthLayout children={page} title="Products | Kaffee Siyap" />
);
export default Products;
