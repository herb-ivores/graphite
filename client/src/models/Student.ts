enum Status {
    Passed = "Passed",
    Failed = "Failed"
}

class Student {
    readonly id?: number
    readonly lastName: string
    readonly firstName: string
    readonly _prelim?: number
    readonly _midterm?: number
    readonly _final?: number

    private get _average() {
        return this._prelim && this._midterm && this._final ?
            (this._prelim + this._midterm + this._final) / 3 : undefined
    }

    get prelim() {
        return this._prelim?.toFixed(2)
    }

    get midterm() {
        return this._midterm?.toFixed(2)
    }

    get final() {
        return this._final?.toFixed(2)
    }

    get average() {
        return this._average?.toFixed(2)
    }

    get status() {
        return this._average ? this._average >= 75 ? Status.Passed : Status.Failed : undefined
    }

    constructor(
        lastName: string,
        firstName: string,
        prelim?: number,
        midterm?: number,
        final?: number,
        id?: number,
    ) {
        this.id = id
        this.lastName = lastName
        this.firstName = firstName
        this._prelim = prelim
        this._midterm = midterm
        this._final = final
    }
}

export {Student, Status};