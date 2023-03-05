import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
    return (
        <ReactLoading
            type={"spin"}
            color={"#293264"}
            height={"2rem"}
            width={"2rem"}
        />
    );
}
