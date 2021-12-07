import React from "react";
import { Template } from "@njmaeff/webpack-static-site/components/template";

export const ModalTemplate: React.FC<JSX.IntrinsicElements["template"]> = ({
    children,
    ...props
}) => {
    return (
        <Template {...props}>
            <div
                tabIndex={1}
                role="dialog"
                aria-modal="true"
                className={"modal-overlay"}
            >
                <div className={props.className ?? "modal"}>{children}</div>
            </div>
        </Template>
    );
};
