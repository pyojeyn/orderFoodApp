import CartContext from "./cart-context";
import { useReducer, useState } from "react";


const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD'){

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id); // 인덱스
        const existingCartItem = state.items[existingCartItemIndex] // 인덱스로 해당 요소 가져오기.
        
        let updatedItems;

        if(existingCartItem) {
           const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem; // 새로 덮어씌어주기. 
        }else {
            // 새로운 항목 
           updatedItems = state.items.concat(action.item);
        }

        
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    };  

    if(action.type === 'REMOVE') {
    
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        ); // 인덱스

        console.log(existingCartItemIndex)

        const existingItem = state.items[existingCartItemIndex] // 인덱스로 해당 요소 가져오기.
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }else{
            const updatedItem = { ...existingItem, amount:existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'CLEAR') {
        return defaultCartState;
    }


    return defaultCartState;
};


const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id});
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    }


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;