"use client";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../redux/slices/cartslices";

export default function AddCart(props) {
    const dispatch = useDispatch();
    const { product, quantity, size } = props;
    return (
        <>
            <button
                className="btn-them"
                onClick={() => dispatch(addItem({ product, quantity, size }))} >
                {props.children}
            </button>
        </>
    )
}