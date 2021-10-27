const PENDING = "PENDING";
const RESOLVE = "RESOLVE";
const REJECT = "REJECT";
class myPromise {
    constructor(fn) {
        this.value = undefined;
        this.reason = undefined;
        this.status = PENDING;
        this.rejectCallback = [];
        this.resolveCallback = [];
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = RESOLVE;
                this.value = value;
                this.resolveCallback.forEach((f) => f());
            }
        };
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECT;
                this.reason = reason;
                this.rejectCallback.forEach((f) => f());
            }
        };
        try {
            fn(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onResolved, onRejected) {
        if (this.status == RESOLVE) {
            onResolved(this.value);
        }
        if (this.status == REJECT) {
            onRejected(this.reason);
        }
        if (this.status == PENDING) {
            this.resolveCallback.push(() => {
                onResolved(this.value);
            });
            this.rejectCallback.push(() => {
                onRejected(this.reason);
            });
        }
    }
}
let promise = new myPromise((resolve, reject) => {
    setInterval(() => {
        reject(1);
    }, 2000);
});
promise.then(
    (success) => {
        console.log(success);
    },
    (err) => {
        console.log(err);
    }
);