import { controlKeys, menuKeys } from "./const";
import React from "react";

export const Keys = () => {
    return (
        <div className={"shortcuts"}>
            <h2>Keys</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Description</th>
                        <th>Key</th>
                    </tr>
                </thead>
                <tbody>
                    {[...controlKeys, ...menuKeys].map(
                        ([className, key, label]) => (
                            <tr>
                                <td aria-label={label} className={className} />
                                <td>{label}</td>
                                <td>{key}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};
