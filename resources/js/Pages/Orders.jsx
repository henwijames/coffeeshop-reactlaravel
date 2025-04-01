import PageHeading from "../Components/PageHeading";
import AuthLayout from "../Layouts/AuthLayout";

const Orders = () => {
    return (
        <>
            <PageHeading title="Orders" />
        </>
    );
};

Orders.layout = (page) => (
    <AuthLayout children={page} title="Orders | Kaffee Siyap" />
);
export default Orders;
