import { useCallback, useEffect, useRef, useState } from "react";
import CustomInput from "../CustomInput/customInput";
import "./dropDownMenu.css"

export interface DropDownMenuProp {
    data: Record<number, string>
    onChange?: (value: number | null) => void
}

function DropDownMenu({ data, onChange }: DropDownMenuProp) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<number | null>(null)
    const deafaultEmpty = 'Válassza ki a nemét';
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const clickLi = useCallback((id: number) => {
        setSelected(id);
        if(onChange)
            onChange(id);
        setOpen(false)
    }, [onChange])
    const clikcArrow = useCallback(() => {
        setOpen(prev => !prev)
    }, [])

    const outsideClickHandler = (evt: MouseEvent) => {
        if (dropdownRef.current?.contains(evt.target as HTMLElement) === false)
            setOpen(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', outsideClickHandler);
        return () => document.removeEventListener('mousedown', outsideClickHandler);
    })

    return (
        <div className="customDropDown" ref={dropdownRef}>
            <CustomInput>
                {selected === null ? deafaultEmpty : data[selected]}
            </CustomInput>
            <span onClick={clikcArrow} className="material-symbols-outlined">{open ? 'arrow_drop_down' : 'arrow_drop_up'}</span>
            {open ? <ul>
                {Object.entries(data).map(([key, value]) => (<li key={key} onClick={(e) => clickLi(Number.parseInt(e.currentTarget.dataset.id ?? '-1'))} data-id={key}>{value}</li>))}
            </ul> : null}
        </div>
    )
}

export default DropDownMenu;