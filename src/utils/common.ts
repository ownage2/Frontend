// 작성 시간
export const displayedAt = (createdAt: string) => {
    const milliSeconds = new Date().getTime() - new Date(createdAt).getTime();
    const seconds = milliSeconds / 1000
    if (seconds < 60) return `방금 전`
    const minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}분 전`
    const hours = minutes / 60
    if (hours < 24) return `${Math.floor(hours)}시간 전`
    const days = hours / 24
    if (days < 7) return `${Math.floor(days)}일 전`

    return getDateNotation(createdAt);

    // const weeks = days / 7
    // if (weeks < 5) return `${Math.floor(weeks)}주 전`
    // const months = days / 30
    // if (months < 12) return `${Math.floor(months)}개월 전`
    // const years = days / 365
    // return `${Math.floor(years)}년 전`
}

// 날짜 표기 (YY.MM.DD)
export const getDateNotation = (input?: string) => {
    const date = input ? new Date(input) : new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
}

// 기본 이미지
export const getProfileImage = (image?: string | null) => {
    return (image) ? image : "https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png?gif=1&w=640&h=640&c=c&webp=1"
}

// Throttle
export const throttle = (handler: (...args: any[]) => void, timeout = 500) => {
    let invokedTime: number
    let timer: number
    return function (this: any, ...args: any[]) {
        if (!invokedTime) {
            handler.apply(this, args)
            invokedTime = Date.now()
        } else {
            clearTimeout(timer)
            timer = window.setTimeout(() => {
                if (Date.now() - invokedTime >= timeout) {
                    handler.apply(this, args)
                    invokedTime = Date.now()
                }
            }, Math.max(timeout - (Date.now() - invokedTime), 0))
        }
    }
}