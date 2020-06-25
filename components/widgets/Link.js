import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";


export const Link = ({ to, children, onClick, ...props }) => {
    const dispatch = useDispatch();

    const click = useCallback((e) => {
        if (onClick) onClick(e);
        if (to)
            dispatch(push(to));
        e.preventDefault();
        return false;
    }, [onClick, to, dispatch]);

    return <a href={to} onClick={click} {...props}>
        {children}
    </a>;
};
