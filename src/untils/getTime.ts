export const getTime = () => {
    const hour = new Date().getHours()
    let message = ''
    if (hour >= 6 && hour < 12) {
        message = 'Good Morning'
    } else if (hour >= 12 && hour < 18) {
        message = 'Good Afternoon'
    } else if (hour >= 18 && hour < 24) {
        message = 'Good Evening'
    } else {
        message = 'Good Night'
    }
    return message
}