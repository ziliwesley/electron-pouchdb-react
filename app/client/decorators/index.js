/**
 * Auto bind `on` and `removeListener`
 * @return {Function} Decorated method
 */
export function listen(store, event) {
    return (target, key, descriptor) => {
        // An object describe from where and to what event the instance
        // will listen.
        const listener = {
            source: store,
            event: event,
            handler: key
        };

        // Push the object into the `__listeners__` array of the target
        // class
        if (target.__listeners__) {
            target.__listeners__.push(listener);
        } else {
            target.__listeners__ = [listener];
        }

        return descriptor;
    }
}
