import React from "react";
import AuthLayout from "../Layouts/AuthLayout";
import PageHeading from "../Components/PageHeading";

const Settings = () => {
    return (
        <>
            <PageHeading title="Settings" />
        </>
    );
};

Settings.layout = (page) => (
    <AuthLayout children={page} title="Settings | Kaffee Siyap" />
);
export default Settings;
