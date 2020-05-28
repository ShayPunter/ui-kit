import React, { useState, useRef, forwardRef } from "react";

import { makeClass } from "@ractf/util";

import style from "./Select.module.scss";


export default forwardRef(({ name, options, initial }, ref) => {
    const [selected, setSelected] = useState(options[(initial && initial > -1) ? initial : 0]);
    const [itemsStyle, setItemsStyle] = useState({ display: "none" });
    const head = useRef();

    const doOpen = () => {
        if (itemsStyle.display === "none") {
            let rect = head.current.getBoundingClientRect();
            setItemsStyle({
                display: "block",
                top: rect.bottom,
                left: rect.left,
                width: rect.width,
            });
        } else {
            setItemsStyle({ display: "none" });
        }
    };
    const select = (value) => {
        setItemsStyle({ display: "none" });
        setSelected(value);
    };

    if (ref)
        ref.current = { props: { name }, state: { val: selected.key } };

    return <div className={style.select}>
        <select>
            {options.map(i => <option key={i.key} value={i.key}>{i.value}</option>)}
        </select>
        {itemsStyle.display === "block" && <div onClick={doOpen} className={"blanker"} />}
        <div ref={head} onClick={doOpen}
            className={makeClass(style.head, (itemsStyle.display === "block") && style.sOpen)}
        >
            {selected.value}
        </div>
        <div className={style.items} onClick={doOpen} style={itemsStyle}>
            {options.map(i => <div onClick={() => select(i)} key={i.key}>{i.value}</div>)}
        </div>
    </div>;
});
