import React from "react";

function debounce(fn, delay) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

export function useDebounce(callback, delay) {
    const callbackRef = React.useRef(callback)
    // Why useLayoutEffect? -> https://kcd.im/uselayouteffect
    React.useLayoutEffect(() => {
        callbackRef.current = callback
    })
    return React.useMemo(
        () => debounce((...args) => callbackRef.current(...args), delay),
        [delay],
    )
}
